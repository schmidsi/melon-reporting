# Minutes

## Meeting 2018-07-05

Present:

- Simon Emanuel Schmid
- Benjamin Zumbrunn
- Sarah Hauser (FHNW)
- Markus Knecht (FHNW)
- Mona El Isa (Melonport)
- John Orthwein (Melonport)
- Jenna Zenk (Melonport)

### Agenda

- Goals
- Walkthrough
- Updated Mockup
- Feedback so far
- Mock data generator proposal
- Data extractor
- New contract + tests
- FHNW misc

### Notes

http://localhost:3000/report/0xC4ce568951958746904065Ee9E1C0aeE927D5260/1530267228/1530720180

#### To Discuss:

- Investor data is not easily available
  - Only through event logs
  - Even a simple list of investors is not easily extractable
  - Maybe create helper functions

### Walkthrough
Also save text representation of "opinion" to show better what's not good.

### Updated Mockup
Write down the reasoning of the Web Interface in the thesis!
Why is it easy to use, why something is implemented this way, Stakeholders agreed on it etc.

### Mock data generator proposal
Arguments for generator:
* Fund Database and Blockchain Sync Service will be done by Melonport anyway
* Mock data could inspire the redesign of the new protocol

Arguments against generator:
* Disconnection from "real project"

Build a hybrid with real data (like meta, audits...) and mockup data (trades...)

### Data extractor

### New contract + tests
Argue about worst, mid and best case
Big O notation!
also visualize this

Variants expensiveness
Make really clear: gas cost and theoretical!

Maybe argument about building blocks, not variants
Show how the architecture looks for the variants... (what is a map?)

Come back to "reality"... how does an auditor usually operate and which variant would be best for this?
Argue about risk management!!! isComplete is most important there

Problem with gas limits: are there any limits with filling gaps?

### FHNW misc
Do weekly updates again
Focus also on "easy to use interface".


## Meeting 2018-06-12

Present:

- Simon Emanuel Schmid
- Benjamin Zumbrunn
- Sarah Hauser (FHNW)
- Markus Knecht (FHNW)

### Agenda

- Meeting PWC
- Final Specification
- GraphQL
- Unit tests

### PWC

Document the "priorities" of PWC --> they are interested that the data shown is correct, they want to know why it is correct, where it comes from etc.
Hauser: stay with PWC, otherwise the "initial work" was useless.

### Final specification

Determinism: it's more than just that: it's a "transient function" in functional programming.
It's probably _bijective_ in mathematics.
Maybe it's better to not use one of these terms and just describe what the implications of the extractor function is
--> Draw a box in the documentation with the exact specification.

For trusting the data, the database layer gives another problem.
Better: think about how we can easily verify the correctness of the data.

Think about the actors and their needs

- Auditor: has to trust the data, because he signs it
- Investor: wants to quickly see the reports

Idea: Just save the report JSON after an audit was made to a database. An investor could then easily look at the report.
Plus: Verification is also easy then: compare the datahash of the JSON with the hash from the audit on the blockchain.

But: look also for other ideas! Tradeoffs from verification.

### Smart Contract & storage

Document the risk management stakeholder better: why does he need the isComplete function, etc.

Look for other possibilities how to sort the array...

Idea: maybe audit saving with mapping is possible? linked list data structure in solidity?
Idea: maybe say "only 4 audits per year are possible". Then the size / timespans would be fixed.

Test long arrays with lots of audits: is the gas cost reasonable?

### Next steps

- Implement alpha version (5.7.2018) (super tight schedule)
- Documentation

## Meeting 2018-06-07

Present:

- Simon Emanuel Schmid
- Benjamin Zumbrunn
- Michael Taschner (PWC)
- Sabine Bartenschlager-Igel (PWC)

### Reporting

Michael: It would be interesting to retroactively construct transactions (with historic prices).
Relevant for Melon in general: look at rules of traditional asset management.
Sabine & Michael will look into: what is important for an auditor when going through a report.

Note: We used most of the time to explain blockchain and Melon funds, we did not focus on the report.

Note: The people from PWC use the term _managed account_, not _fund_ for Melon funds.

## Meeting 2018-05-22

Present:

- Simon Emanuel Schmid
- Benjamin Zumbrunn
- Markus Knecht (FHNW)

### Documentation

Be careful what is important (appendix/content).

### Expert meeting

Write mail to expert: in which products might he be interested now?
(Maybe he does not want to see anything at all for now.)

### Bachelor defence

Maybe hold presentation in english, but this has to be communicated / asked beforehand.

Assessment sheet: Knecht sends it to us (with the bonus points for blockchain projects).

### Method

Say explicitly that the approach from Melonport (and in the Blockchain space generally) is something new (old world/new world) and wants to be a bit _disruptive_.

--> Describe Melonport in some sentences.

### Modular approach

Try to build systems that are as modular as possible and describe this in the documentation.

### Test presentation

Organize a rehearsal presentation after the thesis contribution date (week 34?).

### Tasks

- Write mail for english presentation
- Write mail to expert
- Organize rehearsal presentation

## Meeting 2018-05-18

Present:

- Simon Emanuel Schmid
- Benjamin Zumbrunn
- Markus Knecht (FHNW)
- Jörg Luthiger (FHNW)
- Konrad Durrer

### System architecture

Arrows are wrong or not very descriptive --> Do this in proper UML

### Questions

- What is the database technology? --> look with Melonport
- Describe WHY we used the technologies, most importantly for the consolidation service/database
- Evaluate the
- In which interval does the consolidation service cache the data?
- Provide a "button" to toggle the consolidation service or use "own" software
- "Usability in the technology stack": how easy is it to use the product without the consolidation service?

### Thesis defence

Date: 3.9.2018
Morning

## Meeting 2018-05-03

Present:

- Simon Emanuel Schmid
- Benjamin Zumbrunn
- Mona El Isa (Melonport)
- Reto Trinkler (Melonport)
- John (Melonport)
- Markus Knecht (FHNW)

### Questions

- Volatility for reports: from inception to timespanEnd or from timespanStart to timespanEnd?
- Risk Mgmt: is data immutable?
- priceHistory: is daily interval good?
- priceHistory: which value? mean or median or snapshot?
- Off-chain data / legal data we need to consider
- Is there a possibility to look up names for addresses (uPort)? if yes, are they "hashable"?
- Datahash could be a direct ipfs hash? (ipfsjs)

### Agenda

- Goals
- Use Cases
- Data Schema
- MIP
- Mockup
- Discussion
- Questions

### Goals

Goals and use cases are agreed upon by the coaches and client (i.e. Melonport)

### Use Cases

John: Comment timespan is usually there, but not legally binding (just provides context)

Enhance report with costs around funds (gas prices)

### Data Schema

priceHistory: in the old world its a snapshot
maybe use "volume weighed average price"? might be too complicated to calculate...

### MIP

What if an auditor refuses an audit?

New: status for add() function

- unqualified opinion (good)
- qualified opinion (bad)
- disclaimer opinion
- adverse opinion

### Mockup

Strategy might be optional for fund managers, but is highly encouraged!

#### Meta

Possible new attributes

- Style
- Substrategies
- Substyles
  --> List of strategies / styles to pick from

John provides us with the most recent strategies and styles from the hedge fund.
We might have to invent new strategy/style standards for crypto.

Discussion about whitelist: we now assume that it is fixed.
Might be future work ("changing whitelists"):

- Sharpe ratio: absolute measure (positions) -> we leave it in.
- Alpha is not a trivial calculation.
- Volatilty: minimum 12 months, if the timespan is < 12 months, it says N/A (Mona provides example for <12 years)
- Redeem fee might come in the future

Benchmark is not in the fund report data yet.
Benchmarks have to be bound to strategy

- Weighted average of the share price of all fund weighed by AUM.
- Proposal from John: not benchmark, but **reference fund**

#### Holdings

Token correlation matrix is good

- correlation between -1 and
- top right values are all 1
- max drawdown
- downside deviation
- top 3 gainers / losers
- price change

#### Trades

- for every trade: show gas price
- filters (for the website)
- transaction hash of trade
- Profit (for profitability), is an absolute number
- New Chapter/Page: Positions
- Open/Close: Mona gives a few examples

#### Participation

Knecht looks up if names can be looked up with ENS

- show addresses with green tick
- ... (kind of off-topic) can the manager "kick" red flag participants?

#### Audits

- ENS names for auditors (it's about reputation for them)

### Discussion

- one real stakeholder for each actor (Mona: maybe regulator from Liechtenstein?)
- include Bank Frick for feedback

- Use cases: show which value from the report is useful for which actor

### Questions

Possible Off-chain data / legal data:

- Jurisdiction

Don't waste time on name lookup.

Sha256 should fit into bytes32, just save the hex representation.

Knecht: think about extensibility of the product (so future work is easily implementable).

## Coachmeeting 2018-04-17

Present:

- Simon Emanuel Schmid
- Benjamin Zumbrunn
- Sarah Hauser (FHNW)
- Markus Knecht (FHNW)

### Agenda

- Present and discuss documentation outline
- Discuss and approve prototype specification
- Discuss and approve project goals
- Discuss more detailed project plan (Github)
- Possible collaboration for the [Melon Hackathon](http://hackathon.melonport.com/)
- Citations?

### Documentation outline

The content of the report is good, but the structure is not as intended.
Write as if the project is finished, e.g. do not include something like a step by step report.
Place planning, iterations, milestones, variants, prototype etc. on the end of the document.

- Research -> State of the art. Or choose a different term, Ms. Hauser will supply one
- Delete conclusion & approach
- New chapter Analysis: summary of what we learned from the "research",
- Evaluate chapter: in appendix
- Design + Production -> new Chapter Solution

We propose a new outline via mail.

### Protoype specification

The MIP is a good idea, but we should not focus on creating the process to define such MIPs (do not waste time...).
Document the concept of _Contract Standard Proposal_ in the chapter _state of the art_.
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

Define the goals from the _user perspective_, **not** from the technical perspective.

Show the current project goals in the meeting with Melonport as _ideas_.
Knecht: Specify the _what_, not the _how_.

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

- Simon Emanuel Schmid
- Benjamin Zumbrunn
- Sarah Hauser (FHNW)
- Markus Knecht (FHNW)

### Agenda

- Present updated project plan (3 iterations)
- Discuss current state:
  - State of research
  - State of solidity
- Fix date for thesis defense

### Bachelor thesis defence

Accoring to Ms. Hauser, our defence can be held in the first week of the presentations: September 3rd to 7th.

### Project plan

There are some mistakes on the project plan:

- prototype date is wrong -> 19.4.
- first iteration -> should be second iteration

For 19.4.: attach to milestone: fix project plan with more details

For 17.4.: send coaches a draft of the documentation (list of contents is fixed)

After the first draft of the product, the first draft of documentation will be reviewed by coaches (5.7.).

For 5.7.: everything about the final product must be decided

- requirements fixed
- all documents available
- all data available
- all prototypes ready for extension

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

- bytes32 signature to bytes32 rs components doesn't make sense (information loss)
- Assembly code is critical: maybe deliver rsv of the signature directly
- Check if delivering a signature is really important. (The 'sender' of the audit
  already delivers a signature with their address)
- Define prototype specification with use cases.

## Kick-off meeting 2018-03-07

Present:

- Simon Emanuel Schmid
- Benjamin Zumbrunn
- Mona El Isa (Melonport)
- Reto Trinkler (Melonport)
- Sarah Hauser (FHNW)
- Markus Knecht (FHNW)

### FHNW

- Ms. Hauser is away for the whole month of may
- Always send protocols from meetings to both coaches
- Always send decisions about the project (with melonport) to both coaches

### Thesis release

- A poster and an interactive demo is required
- Two printed versions of the thesis must be provided for the FHNW
- Send in a draft of the thesis as soon as possible for review
- Plan three iterations of work/evaluate
- Define milestones and give more detail on planned work

### Project

We might be able to assemble the benchmark data from coinmarketcap or similar
platforms.

Our Gitbook solution for project reporting is agreed by the coaches.

Possible verification of the generated reports:

- History of all concerning trades
- Hyperlinks which point directly to the blockchain on IPFS (see IPFS Mesh)

### Dates

- We will send a doodle with tuesday-dates (3pm-6pm) for coach reviews at Campus Brugg/Windisch

#### Progress Meetings in Zug

We already fixed the following dates for progress meetings with all stakeholders.
They will happen in the Melonport Office in Zug.

- May 3, 14:00: Presentation of the prototype
- July 5, 14:00: Discuss Design & Architecture before final sprint
- August 6, 14:00: Last meeting before submission
