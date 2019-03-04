##  Automated Mail Recognition and Notification

For MAKEMIT 2019, my team built an automated mail system. Our elevator pitch was to "make physical mail as convenient as email".

### Mechanical Design

To make the text detection more robust, we need to check both sides of each envelope. The envelope is held at a 45-degree angle, and can be flipped to either side by a servo. This allows a single camera to image either side. We can account for this rotation later on in software.

### Optical Character Recognition

This was probably the most complex part of our processing pipeline. We used Google Tesseract to detect characters in camera images.

Overall, the OCR algorithm (LSTM based neural network) performance varies a lot based on the image quality, orientation, and lighting. We did a lot of preprocessing:

- Convert image to grayscale
- Denoise using a bilaterial filter (while preserving edges)
- Detect the corners of an envelope and apply a perspective transform to view the image top-down

<center>
![Detected edges](/images/makemit/edges.png)
</center>

<center>
![Detected envelope](/images/makemit/crop.png)
</center>

<center>
![Top-down image view](/images/makemit/birdseye.png)
</center>

We then crop the envelope into 4 quadrants, as well as the center, since these are common locations for name information.

Even after all of these enhancements, OCR performance is still a little messy. For instance,
```
========= DETECTED TEXT =========
["CHASE o\n\n, 6 PO 30x17198 I Wilmington. DE l9850-7198\n\nCHASE ‘ -I\n\n \n\n901-232700‘5405'55501-02'21 1\nDELIAN ASPAROUHOV\n\nNIGHTINGALE APP INC\n487 COMMONWEALTH I\nBOSTON. MA 02215—2201", "PRSPT STD\nU.S POS'AAGE\n9ND\nW0 CENTER\n\n\\VE.", '\'\'\'\'\'\'\' lu\'l"u\'lIl\'II"Ic\'III\'l|I-u‘\n\n   \n\nEARN 80,000 B\n\nwith the Chase Ink Busi\n\n \n\nSe»; dddddddd', 'ONUS POINTS\n\niness PreferredSM Card', '901\'232706‘5405‘55501-02‘21 1\nDELIAN ASPAROUHOV\n\nNIGHTINGALE APP INC\n487 COMMONWEALTH AVE.\nBOSTON. MA 02215—2204\n\n"\'1\'I"Iu\'l"II\'I-I\'II"II\'III\'III\'II"|I""II\'u"II“I\'I\'III \'\n\n \n\nI on nnn Rnkll IC D“']
```

We do get a few potentially useful pieces of information, such as name, address, and sender address.

### Text Matching (Edit Distance)

Oftentimes, we detected something close to the correct name, but not an exact match. In addition, we got a lot of irrelevant text.

We use **Levenshtein distance** as our similarity metric. Essential, it is the number of characters that you would need to edit to transform one string into another.

For each pair of (firstname, lastname) in our database, we compute a Levenshtein distance between that name and each detected word on the envelope. We add the smallest distances for the first and last names and normalize by the total number of characters. You can think of this as the percentage of a person's name that we had to modify to match it to two words on the envelope.

In our detected text above, we did in fact find ```DELIAN ASPAROUHOV```, giving us a distance of zero and a perfect match.

```
========== DATABASE MATCHING ==========
Name: Delian Asparouhov Score: 0.0
Match found! Sending milokhl@gmail.com an email.
```

In a different example, the OCR system detects ```5672\n\nMork Halsey\n\n487 Commonweollh Ave```, which is a misrecognition of the true name, ```Mark Halsey```. (Some other text was included for more context).

This is only a single letter edit away from the correct name, so the matching algorithm returns:
```
Name: Mark Halsey Score: 0.09090909090909091
```

### Email notification

We use ```smtplib``` in Python to send emails to the detected recipients.

<center>
![Email](/images/makemit/inbox.jpg)
</center>
