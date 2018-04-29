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
