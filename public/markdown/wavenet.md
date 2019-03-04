# WaveNet Encoding Analysis

This was my final project for 21M.080: Introduction to Music Technology.

Code for this project: [https://github.com/miloknowles/wavenet-embeddings](https://github.com/miloknowles/wavenet-embeddings)

<div class="alert alert-primary" role="alert">
  I borrow many figures the paper "Neural Audio Synthesis of Musical Notes with WaveNet Autoencoders" by Engel. et. al. [3], and encourage the reader to check out this paper for more information about the NSynth WaveNet architecture, training, and results.
</div>

<div class="alert alert-warning" role="alert">
  Throughout this paper, I use the words "encoding" and "embedding" interchangeably.
</div>

## Motivation

The key idea behind an autoencoder network is that the learned embedding can represent a complex sound in a small number of parameters (```16``` in the case of NSynth WaveNet). However, if we think of each component of these embeddings as a knob on a synth, we don’t really know what each one does. My goal for this project is to investigate how numerical alterations to the embeddings affects qualitative aspects of the sound. Is there an interpretable meaning to each of the ```16 parameters```? What are the properties of this vector space?

<hr class="mb-5">

## Background

WaveNets were originally introduced in ```[6]``` as a new **autoregressive model** for text-to-speech applications. The authors of this paper tested the results on human listeners, and found that it produced much more realistic results. There were a number of technical contributions of the paper; the neural network uses many tricks to achieve a high temporal resolution and output bit depth while reducing the computational cost. The paper brings together **causal convolutions**, **gated activation units**, and **residual and skip connections** as building blocks for a complicated (convoluted?) but highly successful way to generate audio.

One limitation of the original WaveNet is that the network depends on *external* conditioning. For example, in a text to speech application, the network requires additional inputs, such as the identity of the speaker, and context from the text. In a musical setting, this means that the network would need explicit external information about an instrument in order to produce notes from it.

Engel et. al., in “Neural Audio Synthesis of Musical Notes with WaveNet Autoencoders” ```[3]``` modify the original WaveNet so that it does not rely on external conditioning. Instead, the network learns to extract a meaningful representation of timbre and pitch from input audio in the form of **temporal embeddings**.

<figure class="figure">
  <img class="figure-img rounded mt-1" width="100%" src="/images/wavenet/architecture.png">
  <figcaption class="figure-caption"></figcaption>
</figure>

In this way, it is *implicitly* identifying characteristics of an instrument, rather than requiring them to be explicitly fed in as input. Without external conditioning, the **NSynth WaveNet** is much more powerful, because there are no input parameters that need to be controlled by a human. The authors show that the learned temporal embeddings can be extracted from audio clips that the network was not trained on and used to create new sounds through **interpolation in the embedding space**.

Since the publication of the NSynth WaveNet paper, Google Magenta has released many apps that show how the embeddings of multiple instruments (i.e a cat and a flugelhorn) can be combined to produce a new hybrid instrument ```[2]```.

<figure class="figure">
  <img class="figure-img rounded mt-1" width="100%" src="/images/wavenet/embeddings_ex1.png">
  <figcaption class="figure-caption">An example of temporal embeddings for three instruments. Each colored line corresponds to one of the 16 componenets of the vector. In [3] the authors extract a temporal embedding vector for each 32ms of audio. For computational reasons, I use two second audio clips in my project, so each clip produces only ~63 embeddings. From a 16kHz audio source, this is a huge amount of compression!</figcaption>
</figure>

<hr class="mb-5">

## Computational Challenges with NSynth

Google Magenta's NSynth model is a very large neural network. The pretrained weights for the network were over ```900MB```! Because this model is large and generates audio *samples* one at a time, synthesizing audio is very computational intensive, even at ```16kHz```.

This was probably the most challenging aspect of this project. Running the network on CPU was too slow to reasonably complete my final project in a weekend. Running some example code for WaveNet used up all of the available memory on my computer. The only feasible options were to do my project on a large AWS instance, or try to use the discrete graphics card on my computer.

I installed NVIDIA drivers for my GeForce GTX 1050M GPU, and built tensorflow, Google's machine learning library, from source. Even with GPU support, it takes about **3 minutes for me to generate 2 seconds of audio using the network**. When I synthesize multiple clips of output audio in a batch, the network is much more efficient: if I synthesize 8 audio clips in a batch, the total time is about 6 minutes. Amortized across the 8 clips, this means that each second of audio only takes about 24 seconds to produce.

This is why instruments that are based on NSynth such as ```[2]``` rely on precomputing audio samples so that the network doesn't have to run in real time. I think that the massive size of NSynth and other WaveNet architectures is the largest barrier to seeing them used in more musical applications.

<hr class="mb-5">

## Analysis

There were two ways I tried to gain insight into the temporal embeddings. In the *causal* approach, I modify the temporal embeddings of an instrument playing a note, and then synthesize an audio clip from the modified embedding using NSynth WaveNet as a decoder. In the other approach, I take several related input clips of audio (i.e different notes played by the same piano), extract embeddings from them, and compare properties of the embeddings.

I ran a number of different experiments, and detail my results below!

<hr class="mb-5">

### Experiment 0: Audio Reconstruction Quality

First, I want to show some illustrative examples of what the NSynth WaveNet model is capable of. Below are some examples of original audio clips, and the reconstructed audio using the neural network. Remember that each ```2 second``` clip is compressed down to ```63``` embedding vectors of size ```16```, and this is the only information that the decoder network has access to from the original audio!

<div class="container mt-3">
  <div class="row"><h5>English Horn</h5></div>
  <div class="row">
    <div class="col-md-5">
      <iframe width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/542738739%3Fsecret_token%3Ds-c9gRv&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
    </div>
    <div class="col-md-5">
      <iframe width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/542756514%3Fsecret_token%3Ds-uAqHA&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
    </div>
  </div>
</div>

<div class="container mt-3">
  <div class="row"><h5>Voice Lead Synth</h5></div>
  <div class="row">
    <div class="col-md-5">
      <iframe width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/543512646%3Fsecret_token%3Ds-uoxXT&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
    </div>
    <div class="col-md-5">
      <iframe width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/543512259%3Fsecret_token%3Ds-WydnB&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
    </div>
  </div>
</div>

<div class="container mt-3">
  <div class="row"><h5>Banjo</h5></div>
  <div class="row">
    <div class="col-md-5">
      <iframe width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/543511074%3Fsecret_token%3Ds-Kvkwj&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
    </div>
    <div class="col-md-5">
      <iframe width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/543511506%3Fsecret_token%3Ds-VbjFe&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
    </div>
  </div>
</div>

<div class="container mt-3">
  <div class="row"><h5>Banjo</h5></div>
  <div class="row">
    <div class="col-md-5">
      <iframe width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/543513405%3Fsecret_token%3Ds-D2Xa8&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
    </div>
    <div class="col-md-5">
      <iframe width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/543513636%3Fsecret_token%3Ds-donNK&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false"></iframe>
    </div>
  </div>
</div>

<div class="mt-3"></div>

NSynth WaveNet seems to do well with **monophonic** wind-like instruments, such as the English Horn and the Voice Lead Synth. As the authors note in ```[3]```, WaveNet has a very characteristic sound, and tends to accentuate higher harmonics. Unfortunately, I found that for string instruments, the results are not so good. The banjo note goes out of tune, and the sound of the plucked string is somewhat lost. **NSynth WaveNet was only trained on monophonic instruments**, so it's a little unfair of me to throw a guitar chord at it. We can hear that the network jumps around between several pitches in the chord, doing it's best to reconstruct several notes at once. The result sounds really distorted and dissonant.

<div class="container">
  <div class="row"><h5>Piano Octaves</h5></div>
  <div class="row">
    <iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/662401953%3Fsecret_token%3Ds-JGGf0&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
  </div>
</div>

<div class="mt-3"></div>

I tried reconstructing several octaves of a C from a piano. All of the reconstructed notes are the correct pitch. Note that the NSynth WaveNet has trouble with piano notes in general (plucked strings!), and heavily distorts low pitches on any instrument. At the highest piano note, the reconstruction starts to sound like a piano!

<hr class="mb-5">

### Experiment 1: Removing a Component

As a first experiment, I wanted to see what happens if you ***remove* a component from the temporal embeddings by setting it to zero at every timestep**. If the embedding really is a "driving function for a nonlinear oscillator" as the authors of ```[3]``` hypothesize, we should lose some component of the generated sound. What gets lost?

#### Results: English Horn
<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/662142897%3Fsecret_token%3Ds-clUKj&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

<div class="mt-3"></div>

This simple modification to only one component of the vector produces very bizarre results. For at least 5 of the components, removal seems to produce static or distortion. For the English horn, removing the 0th, 2th, 4th, 5th, 7th, 10th and 12th leaves us with harmonics: 4th, major 7th, minor 3rd, root, minor 3rd, major 3rd, and 9th by my ears. However, there are strange artifacts along with these overtones. For example, the 2th component modification creates a C#-A#-F# descending arpeggio on the release of the note. None of these pitches are "nicely" related to the C!

<div class="mt-3"></div>

#### Results: Banjo
<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/662147985%3Fsecret_token%3Ds-8yo2Y&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

<div class="mt-3"></div>

The banjo has even stranger results. A lot of the component removals produce noise, and only a handful create overtones that are nice intervals. Some of the overtones are F, F#, C#, G#, which doesn't make much sense given that the fundamental frequency is a G.

### Experiment 2: Gain Analysis

My next idea was to *increase* the gain on one component of the vector, while keeping the others constant. What qualities are brought out more by this change? In my implementation, I **double the magnitude** of each component.

#### Results: English Horn
<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/662160063%3Fsecret_token%3Ds-bStTQ&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

<div class="mt-3"></div>

For reference, the horn is playing a C5. **In the 16 synthesized audio clips, you can hear a lot of harmonics that are related to the fundamental**. I wrote down my shortlist of observations below in case you want to follow along.

<div class="row">
  <div class="col-md-5">
    <ul class="list-group">
      <li class="list-group-item py-0">0: Breathy, barely audible overtones</li>
      <li class="list-group-item py-0">1: Static</li>
      <li class="list-group-item py-0">2: 1 octave above root</li>
      <li class="list-group-item py-0">3: F# (the #4)</li>
      <li class="list-group-item py-0">4: both an octave below and above</li>
      <li class="list-group-item py-0">5: 5th, but with vibrato</li>
      <li class="list-group-item py-0">6: root</li>
      <li class="list-group-item py-0">7: really breathy octave above</li>
      <li class="list-group-item py-0">8: noise</li>
      <li class="list-group-item py-0">9: higher noise</li>
      <li class="list-group-item py-0">10: vibrato root</li>
      <li class="list-group-item py-0">11: higher octave, like a train whistle</li>
      <li class="list-group-item py-0">12: two octaves up, really unstable, like tea kettle</li>
      <li class="list-group-item py-0">13: noise</li>
      <li class="list-group-item py-0">14: higher noise</li>
      <li class="list-group-item py-0">15: screeching octave up</li>
    </ul>
  </div>
</div>

<div class="mt-3"></div>

#### Results: Voice Lead Synth
<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/662161701%3Fsecret_token%3Ds-w8Nmg&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

<div class="mt-3"></div>

Doing the same modifications to the Voice Lead Synth, we get the **exact same pattern!** You can listen to all of the gain-modified Voice Lead Synth clips while following along with the notes for the English Horn and observe the same characteristics.

The Voice Lead Synth is also playing a C note. My next question was: **do these harmonic interval relationships generalize to different pitches?** Maybe I just got lucky because both instruments are playing a C. I used the Banjo (below), playing a G to investigate.

#### Results: Banjo
<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/662162496%3Fsecret_token%3Ds-4z8Fl&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

<div class="mt-3"></div>

Some components still bring out the same intervals relative to the fundamental. Components 2, 6, 7, 10, and 11 still produce the root, G (although out of tune).

However, there are some notable differences. Component 3 plays an F#, which is the **same pitch that was played for the C instruments**. So the absolute pitch has stayed the same, but the interval relative to the root note has changed from a #4 to a major 7th. Similarly, component 4 produces a low C note, which is the same absolute pitch from the examples with the C instruments. And component 5 sounds like a G# (or a detuned G?), which is close to the G note that was played for the C instruments. So **components 3, 4, 5 seem to cause an absolute pitch to be played while the others produce relative pitches or noise.**

### Experiment 3: Sign Analysis

Next, I tried **flipping the sign of one component at a time.**

#### Example: Banjo

<div class="alert alert-danger" role="alert">
  WARNING: Some of these clips are loud! Keep volume low.
</div>

<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/662178753%3Fsecret_token%3Ds-ZdNv2&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

<div class="mt-3"></div>

Flipping the sign of each component causes even more distortion and destruction of the original audio characteristics. More of the component modifications produce noise, and only a few have discernible pitches. Component 10 sounds the most like a banjo, but this may just be a fluke. This experiment indicates that **the sign of each component may be more important than it's magnitude**.

### Experiment 4: Pitch Analysis

So far, we have seen that some components of the embedding vector are correlated to relative pitches, and some produce absolute pitches. This begs the question: **how is pitch being encoded by the neural network?**

The authors of ```[3]``` state in their paper that **pitch and timbre are highly entangled by the NSynth WaveNet**.

<div class="alert alert-secondary" role="alert">
  "By conditioning on pitch during training, we hypothesize that we should be able to generate multiple pitches from a single Z vector that preserve the identity of timbre and dynamics. Our initial attempts were unsuccessful, as it seems our models had learned to ignore the conditioning variable."
</div>

The authors hoped that if the pitch of a note is provided as input during training, the network will learn to use it. This would decouple the representation of pitch from the representation of timbre, allowing the temporal embeddings to be only responsible for timbre. However, the network still tries to encode pitch inside of the embedding.

<figure class="figure">
  <img class="figure-img rounded mt-1" width="60%" src="/images/wavenet/pitch_correlation.png">
  <figcaption class="figure-caption">The correlation between embedding vectors across 88 notes at 127 velocity. Darker blue colors indicate high correlation, while white indicates no correlation. The diagonal represents the correlation of an embedding with itself, which we expect to be the maximum. We can see that for the average across all instruments, there is a large correlation between embedding vectors for a wide range of notes. Even embedding vectors for notes several octaves apart are highly correlated. This suggests that the pitch of these notes is encoded by a very small numerical difference.</figcaption>
</figure>

<div class="alert alert-secondary" role="alert">
  "We see that each instrument has a unique partitioning into two or more registers over which notes of different pitches have similar embeddings. Even the average over all instruments shows a broad distinction between high and low registers. On reflection, this is unsurprising as the timbre and dynamics of an instrument can vary dramatically across its range."
</div>

To verify these observations in a different way, I plotted the embeddings extraced from audio clips for ```A3, C#4, D#4, F#4, A4``` on a piano. Based on the correlation diagram above, we would expect these embeddings to look very similar, despite encoding very different pitches.

<figure class="figure">
  <img class="figure-img rounded mt-1" width="100%" src="/images/wavenet/different_pitch_embeddings.png">
  <figcaption class="figure-caption">Temporal embeddings extracted for five different pitches played on a piano. To the human eye, these embeddings are nearly identical. Notice that all 16 components are stacked in the exact same ordering (represented by their colors) for every note. As a sanity check, I generated audio from the network from these nearly identical looking embeddings. Amazingly, they do produce the correct pitches.</figcaption>
</figure>

To try to isolate pitch from timbre as much as possible, I did analysis on some pure sinewaves.
I found a [great tool for generating sine tones](https://www.audiocheck.net/audiofrequencysignalgenerator_sinetone.php) and downloaded tones ranging from 100Hz to 5000Hz. Because WaveNet operates at 16kHz, it was not possible to use any tones above the Nyquist frequency of 8kHz. Below, I plotted the average value of each component of the embeddings against the frequency in Hz.

<figure class="figure">
  <img class="figure-img rounded mt-1" width="100%" src="/images/wavenet/sine_encoding_vs_pitch.png">
  <figcaption class="figure-caption">Note: Due to limited colors in pyplot, certain components have the same color as each other. Sorry!</figcaption>
</figure>

It appears that the components tend to spread out as frequency increases. There is roughly a **linear relationship between each component's magnitude and the frequency of the note**. However, several components break this trend and have a significant curvature. **Fitting a set of nonlinear functions to the curves might provide a method for artificially changing the pitch of any instrument. This is definitely an avenue I would like to explore in the future.**

For completeness, here are the synthesized audio clips from these embeddings. NSynth WaveNet does a pretty good job recreating sine tones.

<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/662436369%3Fsecret_token%3Ds-skOaX&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
 
### Experiment 5: Creating Vibrato

Finally, I wanted to see what the effect of **applying an LFO to all of the embedding components.** In an analog synth, we could modulate the frequency of an oscillator with an LFO to produce vibrato.

This is what the temporal embeddings look like when a ```10Hz``` LFO is added to each component, causing them to deviate by ```10%``` of their average amplitude. My hypothesis is that this will produce a vibrato effect.

<figure class="figure">
  <img class="figure-img rounded mt-1" width="60%" src="/images/wavenet/vibrato_10hz.png">
  <figcaption class="figure-caption">The raw temporal embeddings and the modified result when an LFO is applied at 10Hz.</figcaption>
</figure>

<div class="mt-3"></div>

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/543562473%3Fsecret_token%3Ds-DCLPI&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

<div class="mt-3"></div>

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/543562947%3Fsecret_token%3Ds-UxXwO&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

<div class="mt-3"></div>

The vibrato is much more convincing at ```20 Hz```. As the embeddings oscillate, some harmonics become louder and softer, as if we are controlling the center frequency of a filter.

<hr class="mb-5">

## Conclusions & Future Work

My project gave me a lot of insight into NSynth WaveNet's embeddings, but much more analysis is necessary to understand what is going on.

In a very rough abstract sense, **we can think of the embeddings as complex parameters to a filter** (the decoder network). Through numerical modifications to individual embedding components, I discovered that some are strongly correlated with particular harmonics, but not for all instruments and pitches. Increasing some components brings out different overtones. Applying a small oscillation to the components seems to move around the center frequency of a filter.

I also discovered that the **embeddings are very unstable**, and do not tolerate much modification before the original sound is lost. Setting some components to zero, doubling them, or flipping their sign created horrible distortion or white noise in many cases.

**Pitch and timbre are highly entangled in the encodings**. Analysis on pure sine waves was an effective way to isolate the relationship between encoding magnitude and frequency, and is a promising route for future analysis. I would like to perform all of the experiments detailed above on the pure sine tones to see if cleaner patterns emerge.

<hr class="mb-5">

## References
1. NSynth: Neural Audio Synthesis. [https://magenta.tensorflow.org/nsynth](https://magenta.tensorflow.org/nsynth).
2. NSynth Super. [https://nsynthsuper.withgoogle.com/](https://nsynthsuper.withgoogle.com/).
3. J. Engel, A. Roberts, S. Dieleman, D. Eck, K. Simonyan, M. Norouzi. “Neural Audio Synthesis of Musical Notes with WaveNet Autoencoders”. [https://arxiv.org/pdf/1704.01279](https://arxiv.org/pdf/1704.01279).
4. Google Magenta: NSynth Model. Github. [https://github.com/tensorflow/magenta/tree/master/magenta/models/nsynth](https://github.com/tensorflow/magenta/tree/master/magenta/models/nsynth).
5. Max/MSP Interface for NSynth. [https://github.com/tensorflow/magenta-demos/tree/master/nsynth](https://github.com/tensorflow/magenta-demos/tree/master/nsynth).
6. van den Oord, A¨aron, Dieleman, Sander, Zen, Heiga, Simonyan, Karen, Vinyals, Oriol, Graves, Alex, Kalchbrenner, Nal, Senior, Andrew W., and Kavukcuoglu, Koray. Wavenet: A generative model for raw audio. CoRR, abs/1609.03499, 2016a. [http://arxiv.org/abs/1609.03499](http://arxiv.org/abs/1609.03499).
