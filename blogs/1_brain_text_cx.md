
## Introduction

In recent years, advances in neural decoding techniques have shown promise in restoring communication and motor function in individuals with severe neurological impairments. In this blog post, we present a case study of neural decoding applied to handwriting tasks in a patient (T5) with a spinal cord injury. Our aim is to demonstrate the feasibility and potential clinical utility of neural interfaces for individuals with motor disabilities.

![test](https://github.com/mralioo/portfolio/blob/1_portfolio_streamlit/images/bcx_gif.gif?raw=true)


In the realm of Brain-Computer Interface (BCI) research, significant strides have been made in facilitating assertive communication, primarily revolving around point-and-click typing using a 2D computer cursor. However, a groundbreaking development in this domain emerged with the introduction of intracortical BCIs. Among these advancements, a notable study conducted by the brainGate research group has garnered attention. This study delves into the realm of controlling a cursor on a computer screen and typing on a virtual keyboard solely through the manipulation of sensory-motor brain activity.

The BrainGate system stands as the epitome of state-of-the-art technology, boasting the remarkable achievement of enabling typing speeds of up to 40 words per minute. This remarkable feat underscores the transformative potential of neural decoding techniques in empowering individuals with severe neurological impairments to communicate assertively and efficiently.


## Experiment Setup and Participant Information
Before delving into the intricacies of the handwriting BCI system and the underlying algorithms, it's imperative to provide an overview of the experiment setup employed in this pioneering research.

### Participant Information
The test participant in this study is a right-handed male, aged 65 years old, who has sustained a high-level C4 C spinal cord injury. Despite this impairment, the individual possesses cognitive abilities and retains the capacity for mental motor imagery.

### Experimental Procedure
The experiment begins with the placement of two 96-electrode intracortical arrays within the hand "knob" area of the participant's left hemisphere. This strategic positioning allows for the recording of neural activity associated with motor function and motor imagery.

During the experiment, the participant is presented with a series of sentences displayed on a screen. The task involves the participant mentally attempting to write the given sentences letter by letter, as if their hand were not paralyzed. This mental motor imagery serves as the basis for decoding brain activity into characters.

#### Task Paradigm
- **Session Structure:** 3-5 hour sessions, 2-3 times per week, with uninterrupted blocks of 5-10 minutes.
- **Tasks:** Employed an instructed delay paradigm, with sentence writing blocks and rest periods.

#### Experiment Setup
- **Prompting:** Computer monitor displaying sentences or characters to write.
- **Cueing:** Transition from reading to writing signaled by a green cue after a delay period.

### Data Collection
Data collection occurs in blocks lasting 5 to 10 minutes, comprising uninterrupted series of trials. Each trial adheres to a delay paradigm, where specific visual cues mark the beginning of each phase. These cues serve to synchronize the participant's mental motor imagery with the experimental protocol, facilitating accurate decoding of neural signals.

#### Neural Signal Recording
- **Electrode Arrays:** Two 96 electrode intracortical arrays (Neuroport arrays) placed in the hand “knob” area of T5’s left-hemisphere precentral gyrus.
- **Signal Processing:** Analog filtering from 0.3 Hz to 7.5 kHz, digitization at 30 kHz, common average reference filtering, and digital bandpass filtering from 250 to 3000 Hz.


## Neural Decoding Methods
![Alt text](https://github.com/mralioo/portfolio/blob/1_portfolio_streamlit/images/bcx_workflow.png?raw=true)

[//]: # (### Data Analysis)

[//]: # (- **Principal Components Analysis &#40;PCA&#41;:** Reduced neural activity to top 3 dimensions.)

[//]: # (- **Time-Aligned Analysis:** Removal of temporal variability for consistent neural patterns.)

[//]: # (- **t-Distributed Stochastic Neighbor Embedding &#40;t-SNE&#41;:** Nonlinear dimensionality reduction for visualization.)

[//]: # ()
[//]: # (### Linear Decoder)

[//]: # (- **Training:** Linear decoding of pen tip velocity from neural activity.)

[//]: # (- **Decoder Structure:** Computed velocity based on threshold crossing rates and hand-made templates.)

[//]: # ()
[//]: # (### Recurrent Neural Network &#40;RNN&#41; Decoder)

[//]: # (- **Architecture:** Two-layer gated recurrent unit &#40;GRU&#41; RNN trained with an output delay.)

[//]: # (- **Preprocessing:** Binning, z-scoring, smoothing, and concatenation of threshold crossing rates.)

[//]: # ()
[//]: # (### Data Labeling)

[//]: # (- **Challenge:** Unknown character labeling addressed using forced-alignment or unsupervised inference techniques.)

[//]: # ()
[//]: # (## Performance Evaluation)

[//]: # ()
[//]: # (### Metrics)

[//]: # (- **Character Error Rate:** Edit distance between decoded sentence and prompt.)

[//]: # ()
[//]: # (### Real-Time Evaluation)

[//]: # (- **Continuous Training:** RNN retraining with new data on each session.)

[//]: # ()
[//]: # (## Language Model Integration)

[//]: # ()
[//]: # (### Retrospective Analysis)

[//]: # (- **Custom Language Model:** Autocorrection of decoding errors for improved accuracy.)

[//]: # ()
[//]: # (## Conclusion)

[//]: # ()
[//]: # (This case study demonstrates the application of neural decoding techniques to handwriting tasks in a patient with a spinal cord injury. The results highlight the potential of neural interfaces for restoring communication and motor function in individuals with severe neurological impairments.)


## References
- Original Paper: [Nature Article](https://www.nature.com/articles/s41586-021-03506-2)

