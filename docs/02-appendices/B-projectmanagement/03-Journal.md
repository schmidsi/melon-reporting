# Journal

We send a short status update every week to our stakeholders. They are also stored here for reference.

## Calendar Week 8

We started working on the thesis and made a first broad overview over the topics:

* Benjamin started to research into blockchain development particularly Solidity.
* Simon setup the repository and got in touch with possible project supporters from PwC and read a bit into the domain of legal reporting of collective investment schemes.

## Calendar Week 9

In the second week we already deep dived into the specific domains:

* Benjamin set up the Solidity development environment according to the Melon setup with dapp.tools, parity dev chain but also looked into truffle suite.
* Simon researched MiFID II and PRIIP and started the [glossary](https://github.com/melonproject/reporting-thesis/blob/master/docs/GLOSSARY.md) for these confusing abbreviations. Furthermore, he finished the strategy part.

## Calendar Week 10

This week we had the official kick-off meeting with all stakeholders. See minutes in [Appendix](https://schmidsi.gitbooks.io/melon-reporting/content/Appendix.html).

* Simon updated the project plan according to the feedback and discussed the KIID template provided by PwC with Mona
* Benjamin further read into Solidity, especially data structures like strings and byte64.

## Calendar Week 12

A lot of progress is already visible in the different areas:

* Benjamin created a very rough [working first draft of the auditing contract](https://github.com/melonproject/reporting-thesis/blob/f3da136beab45b6683dda5ec4001f5415c877870/packages/contracts/Auditing.sol)
* Simon [visualized the logical data structure and started to derive different report requirements according to these structures](https://melonproject.github.io/reporting-thesis/02-research/).

Furthermore, we had our first coach meeting.

## Calendar Week 15

* Benjamin started with the auditing interface proposal and it's implementation. Furthermore, he created a rudimentary web interface to this auditing contract.
* Simon refined the documentation outline of the report, created the prototype specification proposal and started to walk through the FINMA KIID document. Furthermore he met with Jenna Zenk and John Orthwein to sync risk management with reporting.

The research takes longer than expected, therefore we jumped forward for the prototype and will implement directly a standard report mockup draft without proper written research foundation. Simon already knows in his head how such a standard report needs to look like. More validating research can also be done later. It is important to have something to show now rather than thorough research.

## Calendar Week 17: Project Week

_Review project week and meeting invitation_

Hello everybody

This week we worked intensely on the thesis and achieved our goals. We will discuss them with you at our next big meeting:

Thursday, 3. Mai 14:00 at our offices at Park Hotel, Industriestrasse 14, 6300 Zug.

Until then, here is a quick

**Summary**

_Use cases_

We created more [detailed use cases](/thesis/03-analysis/UseCases.html) which are part of our requirements engineering that should act as the official goals for our thesis. I pasted them at the end of this mail.

_Auditing Contract Standard Proposal_

We submitted a [Melon Improvement Proposal](https://github.com/melonproject/MIP/issues/1) to the MIP repository so that all other developers and interested parties see what we are up to and can join the conversation. I pasted the text at the end of this mail.

_Report Mockup_

We created a full [report mockup](/assets/Melon-Report-Mockup-v1.pdf) that shows in a tangible way how Melon Fund reporting will look like in the future. I attached a PDF export to this mail.

_Fund Report Data Schema_

Also, we wrote a [JSON Schema and a reference file](/thesis/04-solution/FundReportDataSchema.html) how the underlying data of future fund reports look like. This is also pasted at the end of this mail.

_Reorganise documentation_

Furthermore, we reorganized the documentation as suggested by our coaches.

[**Agenda for the meeting**](/appendix/E-minutes/)

* Present & discuss results from prototype iteration
* Decide project goals (use cases)
* Questions & discussion

**Questions**

We already have the following questions:

* Volatility for reports: from inception to timespanEnd or from timespanStart to timespanEnd?
* Risk Mgmt: is data immutable?
* priceHistory: is daily interval good?
* priceHistory: which value? mean or median or snapshot?
* Address to real name lookups on-chain?

## Calendar Week 19

Hello everybody

### Minutes

Last week we met in Zug for the presentation and a fruitful discussion of our prototype work. You find the minutes [online](https://melon-reporting.now.sh/02-appendices/E-minutes/) but also copy/pasted to this mail for your reading convenience.

### Work

* We updated the [project planning](https://github.com/melonproject/reporting-thesis/projects/1) according to the feedback from this meeting
* We added [decisions](https://melon-reporting.now.sh/02-appendices/B-projectmanagement/06-Decisions.html) derived from this meeting. Also pasted to this mail. The main decision is that we will focus on on-chain data but document the interface how in the future off-chain data (e.g. from IPFS) could also be used.
* Benjamin deployed the auditing prototype smart contracts to kovan and the simple front-end to now: https://auditing-frontend-hccgfdqbgw.now.sh/. Please make sure that you have MetaMask installed if accessing this link otherwise an ugly error will appear.

### Small planning shift

We realized that there is too little time and resources left until the end of the second iteration on 5th July. But we already have two counter measures:

* We promised to also hand in a first draft of the report to the coaches by 5th July. We decided that the main focus for this iteration should be the product and not the report. So we'll focus on building the product and will work on the report later on: **The new deadline for the first draft of the report is: 11th July**, so that the coaches have enough time to read it until the coach meeting on 17th July.
* Simon will try to synchronize the general Melon-planning with the thesis planning better in order to move some days from the final sprint in August to June.

### Next steps

* **All**: Find more users for explorative user testings / interviews. If you know someone who is interested in our work and could have good feedback, please send me the contacts.
* Enhance mockup with all the feedback. The mockup will have much more features on it as we will actually implement. This is by intention: The mockup should also guide and inspire future work.
* Start with the real product:
  * Deterministic data extraction module with GraphQL endpoint
  * Report rendering/visualization
* **Next milestone: 12th June: Final specification** presented to the coaches in Brugg.
