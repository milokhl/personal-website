# WaveNet Encoding Analysis

This was my final project for 21M.080: Introduction to Music Technology.

**I borrow many figures the paper "Neural Audio Synthesis of Musical Notes with WaveNet Autoencoders" by Engel. et. al. ```[3]```, and encourage the reader to check out this paper for more information about the NSynth WaveNet architecture, training, and results.**

## Motivation

The key idea behind an autoencoder network is that the learned embedding can represent a complex sound in a small number of parameters (```16``` in the case of NSynth WaveNet). However, if we think of each component of these embeddings as a knob on a synth, we don’t really know what each one does (at least I don't). My goal for this project is to investigate how numerical alterations to the embeddings affects qualitative aspects of the sound. Is there an interpretable meaning to each of the ```16 parameters```? What are the properties of this vector space?

## Background

WaveNets were originally introduced in ```[6]``` as a new **autoregressive model** for text-to-speech applications. The authors of this paper tested the results on human listeners, and found that it produced much more realistic results. There were a number of technical contributions of the paper; the neural network uses many tricks to achieve a high temporal resolution and output bit depth while reducing the computational cost. The paper brings together **causal convolutions**, **gated activation units**, and **residual and skip connections** as building blocks for a complicated (convoluted?) but highly successful way to generate audio.

One limitation of the original WaveNet is that the network depends on *external* conditioning. For example, in a text to speech application, the network requires additional inputs, such as the identity of the speaker, and context from the text. In a musical setting, this means that the network would need explicit external information about an instrument in order to produce notes from it.

Engel et. al., in “Neural Audio Synthesis of Musical Notes with WaveNet Autoencoders” ```[3]``` modify the original WaveNet so that it does not rely on external conditioning. Instead, the network learns to extract a meaningful representation of timbre and pitch from input audio in the form of **temporal embeddings**.

<figure class="figure">
  <img class="figure-img rounded mt-1" width="100%" src="/images/wavenet/architecture.png">
  <figcaption class="figure-caption"></figcaption>
</figure>

In this way, it is *implicitly* identifying characteristics of an instrument, rather than requiring them to be explicitly fed in as input. Without external conditioning, the **NSynth WaveNet** is much more powerful, because there are no input parameters that need to be controlled by a human. The authors show that the learned temporal embeddings can be extracted from audio clips that the network was not trained on and used to create new sounds through **interpolation in the embedding space**.

Since the publication of the NSynth WaveNet paper, the team at Google has released many apps that show how the embeddings of multiple instruments (i.e a cat and a flugelhorn) can be interpolated between to produce a new hybrid instrument ```[2]```.

<figure class="figure">
  <img class="figure-img rounded mt-1" width="100%" src="/images/wavenet/embeddings_ex1.png">
  <figcaption class="figure-caption">An example of temporal embeddings for three instruments. Each colored line corresponds to one of the 16 componenets of the vector. In [3] the authors extract a temporal embedding vector for each 32ms of audio. For computational reasons, I use two second audio clips in my project, so each clip produces only ~63 embeddings. From a 16kHz audio source, this is a huge amount of compression!</figcaption>
</figure>

## Computational Challenges with NSynth

Google Magenta's NSynth model is a very large neural network. The pretrained weights for the network were over ```900MB```! Because this model is large and generates audio *samples* one at a time, synthesizing audio is very computational intensive, even at ```16kHz```.

This was probably the most challenging aspect of this project. Running the network on CPU was too slow to reasonably complete my final project in a weekend. Running some example code for WaveNet used up all of the available memory on my computer. The only feasible options were to do my project on a large AWS instance, or try to use the discrete graphics card on my computer.

I installed NVIDIA drivers for my GeForce GTX 1050M GPU, and built tensorflow, Google's machine learning library, from source. Even with GPU support, it takes about **3 minutes for me to generate 2 seconds of audio using the network**. This is why instruments that are based on NSynth such as ```[2]``` rely on precomputing audio samples so that the network doesn't have to run in real time. I think that the massive size of NSynth and other WaveNet architectures is the largest barrier to seeing them used in more musical applications.

## Analysis

There were two ways I tried to gain insight into the temporal embeddings. In the "causal" approach, I modify the temporal embeddings of an instrument playing a note, and then synthesize an output clip of audio using NSynth WaveNet. In the "derived" approach, I take several related input clips of audio (i.e different notes played by the same piano), extract embeddings from them, and compare the results.

I ran a number of different experiments, and detail my results below!

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

### Experiment 1: Zero Analysis

### Experiment 2: Gain Analysis

### Experiment 3: Sign Analysis

### Experiment 4 & 6: Pitch Analysis

### Experiment 5: Additive Analysis

### Experiment 7: Creating Vibrato

## Future Work

## References
1. NSynth: Neural Audio Synthesis. https://magenta.tensorflow.org/nsynth.
2. NSynth Super. https://nsynthsuper.withgoogle.com/.
3. J. Engel, A. Roberts, S. Dieleman, D. Eck, K. Simonyan, M. Norouzi. “Neural Audio Synthesis of Musical Notes with WaveNet Autoencoders”. https://arxiv.org/pdf/1704.01279.
4. NSynth Source Code. https://github.com/tensorflow/magenta/tree/master/magenta/models/nsynth.
5. Max/MSP Interface for NSynth. https://github.com/tensorflow/magenta-demos/tree/master/nsynth.
6. van den Oord, A¨aron, Dieleman, Sander, Zen, Heiga, Simonyan, Karen, Vinyals, Oriol, Graves, Alex, Kalchbrenner, Nal, Senior, Andrew W., and Kavukcuoglu, Koray. Wavenet: A generative model for raw audio. CoRR, abs/1609.03499, 2016a. URL http://arxiv.org/abs/1609.03499.
