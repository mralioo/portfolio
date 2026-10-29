---
title: "BBCPy_DNN"
summary: "Deep-learning interface for the BBCPy brain-computer-interface toolbox (TU Berlin): train, tune and benchmark PyTorch models on motor-imagery EEG with a standardized, automated ML lifecycle. Built during my master's thesis."
stack: ["Python", "PyTorch", "PyTorch Lightning", "Hydra", "Optuna", "MLflow", "EEG / BCI"]
repo: "https://github.com/mralioo/BBCPy_DNN"
featured: false
image: "/projects/bbcpy-dnn.jpg"
order: 6
---

BBCPy_DNN is an integral component of the **BBCPy toolbox**, designed to facilitate the
development and exploration of Deep Neural Networks (DNNs) within the PyTorch framework.
It supports a lifecycle that seeks to cultivate the best-performing models, delivering
superior results through continuous improvement.

## Why it exists

Motor imagery-based brain-computer interfaces (MI-BCIs) represent a significant paradigm
within the field of neurotechnology, particularly for individuals with paralysis. By
mentally rehearsing motor movements, MI-BCIs facilitate control over prosthetic limbs or
wheelchairs. Building a classifier for MI-BCI applications involves complex processing and
feature extraction from brain signals to distinguish between different mental states.

BCI is inherently multidisciplinary, demanding expertise not only in neuroscience, machine
learning and electrical engineering but also in software development. Integrating these
disciplines calls for a comprehensive toolbox that covers the standard methods and is
regularly updated with new datasets and algorithms, so scientists and engineers can
prototype and develop algorithms quickly. Given the growing role of deep learning, my
thesis introduced a **deep learning interface incorporated into an existing BCI toolbox**.
It streamlines the development and training of neural networks and follows a more
automated, standardized machine learning lifecycle.

## Benchmark data

Using the **Sensorimotor Rhythm (SMR) dataset**, the largest open BCI dataset available
(EEG from 62 healthy participants, four classes: left hand, right hand, both hands, rest),
the thesis integrated it into BBCPy as a standard resource and used it as the benchmark
for evaluating deep learning models on the motor-imagery classification task.


## How it's built

- **PyTorch Lightning** trainers for baseline and DNN models (EEGNet, TSception, EEG-Conformer).
- **Hydra** configuration (paths, data, model, trainer, hyperparameter search, experiment,
  logger) so experiments change without touching source code.
- **Optuna** hyperparameter optimization and **MLflow** experiment tracking and reporting.
- Reuses BBCPy's EEG data types, SMR loaders and scikit-learn-style pipelines and model selection.

## Context

This toolbox was developed during my master's thesis as part of **The Berlin
Brain-Computer Pynterface (BBCPy)** project by the Neurotechnology Group at TU Berlin.
BBCPy is engineered as a versatile system for BCI applications, suitable for both offline
analysis and online experiments.
