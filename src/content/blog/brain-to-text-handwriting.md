---
title: "Brain-to-Text: Decoding Handwriting from Neural Activity"
description: "A summary of the Nature study in which a person with paralysis 'wrote' sentences just by imagining handwriting, with an intracortical BCI, an RNN decoder and a language model turning neural activity into text at about 90 characters per minute."
date: 2024-03-20
tags: ["bci", "neurotechnology", "deep-learning", "rnn", "paper-summary"]
draft: false
cover: "/blog/brain-to-text-handwriting/bcx_intro_image.png"
---

*Originally written in March 2024 for my first portfolio. Summary of Willett et al.,
"High-performance brain-to-text communication via handwriting", Nature 593 (2021).*

## Introduction

In recent years, advances in neural decoding techniques have shown promise in restoring
communication and motor function in individuals with severe neurological impairments. In
this post I walk through a case study of neural decoding applied to handwriting in a
participant (T5) with a spinal cord injury, showing the feasibility and potential clinical
value of neural interfaces for people with motor disabilities.

<video autoplay muted loop playsinline aria-label="Animation of decoded handwriting appearing on screen as the participant imagines writing"><source src="/blog/brain-to-text-handwriting/bcx_handwriting.webm" type="video/webm"><source src="/blog/brain-to-text-handwriting/bcx_handwriting.mp4" type="video/mp4"></video>

In Brain-Computer Interface (BCI) research, significant strides have been made in
assistive communication, primarily through point-and-click typing with a 2D computer
cursor. A groundbreaking development came with intracortical BCIs. A notable study by the
BrainGate research group explored controlling a cursor on a screen and typing on a virtual
keyboard purely by modulating sensorimotor brain activity.

Before this work, the state of the art for intracortical typing was about **40 characters
per minute**. The handwriting approach more than doubled that, underscoring the
transformative potential of neural decoding for people with severe neurological
impairments who want to communicate quickly and independently.

## Experiment setup and participant information

Before going into the handwriting BCI system and its algorithms, here is an overview of
the experimental setup used in this research.

![Participant imagining writing the letter "a" while an intracortical array records neural activity; on-screen prompts follow a delay ("Prepare") then "Go" paradigm. Figure: Willett et al., Nature 2021](/blog/brain-to-text-handwriting/bcx_intro_image.png)

### Participant information

The participant is a right-handed man, 65 years old, with a high-level (C4 AIS-C) spinal
cord injury. Despite this impairment, he has full cognitive abilities and retains the
capacity for mental motor imagery.

### Experimental procedure

Two 96-electrode intracortical arrays are placed in the hand "knob" area of the
participant's left hemisphere, recording neural activity associated with motor function
and motor imagery.

During the experiment, the participant sees a series of sentences on a screen and
mentally attempts to write each one letter by letter, as if his hand were not paralyzed.
This motor imagery is the basis for decoding brain activity into characters.

#### Task paradigm

- **Session structure:** 3–5 hour sessions, 2–3 times per week, with uninterrupted blocks of 5–10 minutes.
- **Tasks:** an instructed-delay paradigm, with sentence-writing blocks and rest periods.

#### Experiment setup

- **Prompting:** a computer monitor displaying the sentences or characters to write.
- **Cueing:** the switch from reading to writing is signalled by a green cue after a delay period.

### Data collection

Data are collected in blocks of 5 to 10 minutes, each an uninterrupted series of trials.
Every trial follows a delay paradigm in which visual cues mark the start of each phase.
These cues synchronize the participant's motor imagery with the protocol, which makes
accurate decoding of the neural signals possible.

#### Neural signal recording

- **Electrode arrays:** two 96-electrode intracortical arrays (Neuroport arrays) in the hand "knob" area of T5's left-hemisphere precentral gyrus.
- **Signal processing:** analog filtering from 0.3 Hz to 7.5 kHz, digitization at 30 kHz,
  common average reference filtering, and digital band-pass filtering from 250 to 3000 Hz.

## Neural decoding methods

![Decoding pipeline: threshold-crossing features feed an RNN that outputs character probabilities; thresholding gives the raw online output, and a Viterbi search with a language model gives the retrospective output. Panels B and C show example sentences and character error rate and speed per trial day, reaching about 90 characters per minute. Figure: Willett et al., Nature 2021](/blog/brain-to-text-handwriting/bcx_workflow.jpg)

Neural activity is turned into **threshold-crossing features** per electrode. A
**recurrent neural network (RNN)** reads these features over time and outputs, at every
step, the probability of each character and of a new character starting. Online,
thresholding these probabilities produces text in real time; offline, a **Viterbi search
with a language model** corrects many of the remaining errors.

## References

- Original paper: [Willett et al., "High-performance brain-to-text communication via handwriting", Nature (2021)](https://www.nature.com/articles/s41586-021-03506-2)
