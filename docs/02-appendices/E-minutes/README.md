# Minutes

## Meeting 2018-05-03

### Questions
* Volatility for reports: from inception to timespanEnd or from timespanStart to timespanEnd?
* Risk Mgmt: is data immutable?
* priceHistory: is daily interval good?
* priceHistory: which value? mean or median or snapshot?
* Off-chain data / legal data we need to consider
* Is there a possibility to look up names for addresses (uPort)? if yes, are they "hashable"?

### Agenda
* Goals
* Use Cases
* Data Schema
* MIP
* Mockup
* Discussion
* Questions

### Goals
### Use Cases
### Data Schema
### MIP
### Mockup
### Discussion
### Questions


## Coachmeeting 2018-04-17

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

### Documentation outline
The content of the report is good, but the structure is not as intended.
Write as if the project is finished, e.g. do not include something like a step by step report.
Place planning, iterations, milestones, variants, prototype etc. on the end of the document.

* Research -> State of the art. Or choose a different term, Ms. Hauser will supply one
* Delete conclusion & approach
* New chapter Analysis: summary of what we learned from the "research", 
* Evaluate chapter: in appendix
* Design + Production -> new Chapter Solution

We propose a new outline via mail.

### Protoype specification
The MIP is a good idea, but we should not focus on creating the process to define such MIPs (do not waste time...).
Document the concept of *Contract Standard Proposal* in the chapter *state of the art*.
Standard Report Mockup Draft is a good idea.
Interchangable Fund Data Format.

Think about what we sign --> only the raw data (Melon Report)? An audit about the data?

Melon report: The JSON representing the factsheet must be constructed to also be extensible for KIID, PRIIPS etc.
It would be really nice to have a JSON that is also extensible for the "new world".

Knecht: We should not care about security considerations about signing (e.g. do I sign the data I have just seen?), but care about signing on protocol level.

Knecht: it is important that we work with ONE specific version of the protocol, e.g. the state 
of the competition in February(?).

Important: Define list of use cases, actors (regulators etc.).

### Project goals
Before specifying project goals (deliverables), define what a user can do with our project.
New milestone for 3.5.2018: Use cases are defined and agreed on.

Define the goals from the *user perspective*, **not** from the technical perspective.

Show the current project goals in the meeting with Melonport as *ideas*.
Knecht: Specify the *what*, not the *how*.

### Detailed project plan (GitHub)
Do not include the milestones in the "Kanban" board.

### Melon Hackathon
Simon will write Mr. Knecht about the hackathon.

### Citations
Use the IEEE format (with numbers), maybe there is a plugin.
Ms. Hauser sent a mail with a link.
Maybe use LaTeX when citation does not work at all.

### Expert
The expert for the project will be Konrad Durrer (CSS). He organizes a midterm presentation in May.

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
  already delivers a signature with their address)
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