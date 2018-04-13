# Meetings

## Coachmeeting 2018-04-13

Present:

* Simon Emanuel Schmid
* Benjamin Zumbrunn
* Sarah Hauser (FHNW)
* Markus Knecht (FHNW)

### Agenda

* Present and discuss documentation outline
* Discuss and approve prototype specification
* Discuss and approve project goals
* Discuss more detailed project plan (Github)
* Possible collaboration for the [Melon Hackathon](http://hackathon.melonport.com/)
* Citations?

## Coachmeeting 2018-03-27

Present:

* Simon Emanuel Schmid
* Benjamin Zumbrunn
* Sarah Hauser (FHNW)
* Markus Knecht (FHNW)

### Agenda

* Present updated project plan (3 iterations)
* Discuss current state:
  * State of research
  * State of solidity
* Fix date for thesis defense

### Bachelor thesis defence

Accoring to Ms. Hauser, our defence can be held in the first week of the presentations: September 3rd to 7th.

### Project plan

There are some mistakes on the project plan:

* prototype date is wrong -> 19.4.
* first iteration -> should be second iteration

For 19.4.: attach to milestone: fix project plan with more details

For 17.4.: send coaches a draft of the documentation (list of contents is fixed)

After the first draft of the product, the first draft of documentation will be reviewed by coaches (5.7.).

For 5.7.: everything about the final product must be decided

* requirements fixed
* all documents available
* all data available
* all prototypes ready for extension

### State of research

Simon went through the research chapter with the coaches and discussed what he
is working on right now.

Decide soon: which market will the product be for? (europe/swiss)
Hauser: do not solve the problem of "different markets"

Define exact terms for the "technical" world and the "customer" world that will
be used througout the project.

For the risk profile:
Suggestion: if we cannot calculate the "monte carlo" risk, we should show that it is possible with the data that we have.

### State of solidity

Benjamin showed the draft of the auditing contract prototype and discussed the result with the coaches.

Notes from Mr. Knecht:

* bytes32 signature to bytes32 rs components doesn't make sense (information loss)
* Assembly code is critical: maybe deliver rsv of the signature directly
* Check if delivering a signature is really important. (The 'sender' of the audit
  already delivers a signature with his address)
* Define prototype specification with use cases.

## Kick-off meeting 2018-03-07

Present:

* Simon Emanuel Schmid
* Benjamin Zumbrunn
* Mona El Isa (Melonport)
* Reto Trinkler (Melonport)
* Sarah Hauser (FHNW)
* Markus Knecht (FHNW)

### FHNW

* Ms. Hauser is away for the whole month of may
* Always send protocols from meetings to both coaches
* Always send decisions about the project (with melonport) to both coaches

### Thesis release

* A poster and an interactive demo is required
* Two printed versions of the thesis must be provided for the FHNW
* Send in a draft of the thesis as soon as possible for review
* Plan three iterations of work/evaluate
* Define milestones and give more detail on planned work

### Project

We might be able to assemble the benchmark data from coinmarketcap or similar
platforms.

Our Gitbook solution for project reporting is agreed by the coaches.

Possible verification of the generated reports:

* History of all concerning trades
* Hyperlinks which point directly to the blockchain on IPFS (see IPFS Mesh)

### Dates

* We will send a doodle with tuesday-dates (3pm-6pm) for coach reviews at Campus Brugg/Windisch

#### Progress Meetings in Zug

We already fixed the following dates for progress meetings with all stakeholders.
They will happen in the Melonport Office in Zug.

* May 3, 14:00: Presentation of the prototype
* July 5, 14:00: Discuss Design & Architecture before final sprint
* August 6, 14:00: Last meeting before submission
