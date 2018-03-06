# Strategy

## Vision

Creating functionality on top of the Melon protocol that automates reporting/auditing almost completely:

> a) Something that a real fund manager would be able to confidently say: “This solves my reporting issues and makes my life a lot easier”

> b) Something that can be show-cased to FINMA (and other regulators) and show them how: "This will make _their_ life over-seeing a lot easier”

## Hypothesis

It is possible to extract and visualize all relevant data from the Melon protocol on the Ethereum blockchain in a way that could be legally acceptable by regulators. Furthermore, this data can be audited and digitally signed and a track record of these audits can be placed on the blockchain again.

## Boundaries

### Legal

This is a technical thesis and therefore we do not deeply research into the legal aspects of fund management and reporting. But we will find ways how technology can support the legal processes.

### Technical

## Risks

| Name                                       | Counter measures                                                                                              | Risk (\*)  |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ---------- |
| Distractions from classes                  | Clear timeboxing. Clear planning. Buffers.                                                                    | 2 \* 1 = 2 |
| Distractions from job                      | Clear timeboxing. Clear planning. Clear and upfront communication of availabilities. Support from management. | 1 \* 1 = 1 |
| Project team out of sync                   | Weekly team work time slots. Open communication. Weekly reports.                                              | 2 \* 2 = 4 |
| Dependency on systems out of project scope | Apply subsystem decomposition and isolation techniques from the beginning.                                    | 3 \* 2 = 6 |
| Loosing focus / distraction by details     | Weekly reports to coaches and project sponsors to gather feedback.                                            | 3 \* 2 = 4 |
|                                            |                                                                                                               |            |
|                                            |                                                                                                               |            |

(\*) Probability of occurence (1-3) \* severity (1-3) = risk

## Planning

![](assets/Timeline - Projektplan.svg)

### Strategy

In a first step the foundation of the project is laid. Vision, hypothesis and boundaries are defined and agreed upon with the stake holders and a rough planning is created. Furthermore repositories are created, docs initialized, etc.

**Deadline**: 2.3.2018

**Expected results**:

* Project vision
* Hypothesis
* Project boundaries
* Rough planning
* Basic setup of environment

### Research

The next step is to deep dive into the problem domain. We read and summarize the important articles about the topic and learn the underlying technologies. Also part of research are interviews.

**Deadline**: 20.4.2018

**Expected results**:

* Overview & summary of material: Articles, law, templates, ...
* Knowledge of underlying technologies (Blockchain, Solidity, React, Redux, Digital signing, etc.)
* Transcripts of interviews

### Prototype

The collected knowledge from the research phase is now transformed into a first prototype which can be challenged by the stake holders and test users.

**Deadline**: 27.4.2018

**Expected results**:

* Prototypes
* Wireframes

### Evaluate

Testing & discussing the prototype with the stake holders and test users give us valuable insights for the further development.

**Deadline**: 22.6.2018

**Expected results**:

* Evaluation reports
* User testing reports

### Design

Already during the evaluation phase we start the design phase to have an iterative process: The prototype and wireframes are adjusted from the feedback but also the work on the final mockups and software architecture is started.

**Deadline**: 29.6.2018 (+ ongoing iterations)

**Expected results**:

* Mockups
* Software Architecture
* Specifications

### Production

Iterative development and finish a release candidate. Also in combination with design and review phase. Basically in the following loop:
Design -> Production -> Review -> Design -> ...

**Deadline**: 10.8.2018

**Expected results**:

### Review

Collect feedback of the release candidate, finish documentation and submission of the thesis.

**Deadline**: 17.8.2018

**Expected results**:

## Journal

We send a short status update every week to our stakeholders. They are also pasted here for reference.

### Calendar Week 8

We started working on the thesis and made a first broad overview over the topics:

* Benjamin started to research into blockchain development particularly Solidity.
* Simon setup the repository and got in touch with possible project supporters from PwC and read a bit into the domain of legal reporting of collective investment schemes.

### Calendar Week 9

In the second week we already deep dived into the specific domains:

* Benjamin set up the Solidity development environment according to the Melon setup with dapp.tools, parity dev chain but also looked into truffle suite.
* Simon researched MiFID II and PRIIP and started the glossary for these confusing abbreviations: https://github.com/melonproject/reporting-thesis/blob/master/docs/GLOSSARY.md
