# SFAMA FINMA KIID Template (German)

The first document we look at is the SFAMA KIID guidelines (in German) which is available on their website and acts as guideline how to compose a KIID to submit to FINMA. It also contains a KIID template on pages 13-14, {{"KIIDRichtlinien"|cite}}.

## Praeamble

Prepended to every KIID document there is the following legal text:

> _Wesentliche Informationen für die Anlegerinnen und Anleger_: Gegenstand dieses Dokuments sind wesentliche Informationen für die Anlegerinnen und Anleger über diese kollektive Kapitalanlage. Es handelt sich nicht um Werbematerial. Diese Informationen sind gesetzlich vorgeschrieben, um Ihnen die Wesensart dieser kollektiven Kapitalanlage und die Risiken einer Anlage zu erläutern. Wir raten Ihnen zur Lektüre dieses Dokuments, sodass Sie eine fundierte Anlageentscheidung treffen können.

Which seems to be the same as in english KIID documents from EFAMA. Here in english:

> _Key information for investors_: This document provides key investor information about this collective investment scheme. It is not marketing material. The information is required by law to help investors understand the nature and the risks of investing in this Fund. Investors are advised to read it so to make an informed decision about whether to invest.

**Data classification**: off-chain, free text, given

## Fund name

> 123 Kollektive Kapitalanlage [, ein Teilvermögen des 123 Umbrella Fonds, Klasse A]

The long name of the fund. E.g. "Credit Suisse (CH) Small Cap Switzerland Equity Fund"

**Data classification**: on-chain, free text, static

## ID/ISIN

> (ISIN: xxxxyyyyyzzz)

The funds ISIN identification. For us this can be the address of the deployed fund contract if fund is not submitted to isin.org.

**Data classification**: on-chain, generated

## Legal entity

> Fondsleitung: ABC Fondsleitung (Schweiz) AG [, eine Gesellschaft ABC Gruppe]

**Data classification**: off-chain, free text, static

## Objectives and investment policy

> Anlageziele und Anlagepolitik

### Asset categories

> Hauptkategorien der für die Anlage in Frage kommenden Finanzinstrumente;

A Melon fund selects its manageable assets during setup and they can't change anymore later. So this can be displayed as a simple list.

**Data classification**: on-chain, static, configuration

### Participation

> Hinweis auf das Kündigungsrecht des Anlegers unter Angabe der Rücknahmefrequenz

Generally, Melon funds do not restrict investors from withdrawing funds or termination. But every fund can have a separate Participation/compliance module (see [Melon smart-contracts: ComplianceInterface](https://github.com/melonproject/smart-contracts/blob/v0.7.2-alpha.1/src/compliance/ComplianceInterface.sol#L6)) which can restrict investing & redemption through boolean functions with the following inputs: `investor`, `shareQuantity`, `giveQuantity`. Therefore participation modules can restrict withdrawal according to liquidity, ...

The redemption of shares is also restricted if the fund does not hold enough of the quote asset (i.e. cash, e.g. ETH or DAI). That said, it is always possible to redeem in slices (emergency redeem: Receive the managed assets directly in proportion of shares).

**Data classification**: on-chain, static, configuration

**Data representation**: Common participation modules could be described with free text.

### Strategy/Objectives

> Angabe, ob die kollektive Kapitalanlage ein bestimmtes Ziel in Bezug auf einen branchen-spezifischen, geografischen oder anderen Marktsektor oder in Bezug auf spezifische Anlageklassen verfolgt;

This is just free text describing the strategy/objectives of the fund. For a manual audit, it should be easy to verify if the objectives are followed or not.

**Data classification**: off-chain, free text

#### Open questions

* What are examples of strategy/objectives?
* How are those currently enforced?
* What happens if a fund manager violates these objectives?
* Example: Credit Suisse (CH) Small Cap Switzerland Equity Fund: Invests in small titles in Switzerland.
  * What happens if the fund invests in a company not listed in Switzerland?
  * What happens if a company that this fund is invested in is bought by an US company?

### Automation

> Angabe, ob die kollektive Kapitalanlage die Anlageentscheide nach freiem Ermessen treffen kann und ob ein Referenzwert herangezogen wird;

_Note_: It also talks about benchmarks or reference prices but we will go into this topic later.

A Melon fund could be automatically managed by a bot similar to an ETF which is currently not visible on-chain. In the future it might be possible to store some strategies on-chain but for this thesis we stick to the status quo: A fund can indicate automation just by describing it with free text. An auditor might check a fund for automation which did not declare its automation or check if automation was executed as described.

**Data classification**: off-chain, free text.

### Income distribution

> Angabe, ob die Erträge der kollektiven Kapitalanlage ausgeschüttet oder thesauriert werden.

Not applicable. An investor always holds a percentage of the AUM in Melon. There is no concept of dividends or similar.

**Data classification**: Not applicable

### Leverage, Hedging, Arbitrage, Dept Securities

> Werden besondere Anlagetechniken verwendet, wie z.B. „hedging“, „arbitrage“ oder „leverage“, so sind deren Auswirkungen auf die Wertentwicklung der kollektiven Kapitalanlage anzugeben;
> Investiert die kollektive Kapitalanlage in Schuldtitel, sind diese zu beschreiben;

The Melon smart contracts by itself do currently not actively support leverage, hedging, etc. That said, it is theoretically possible to buy into an asset/token which could be leveraged. E.g. Lendroid, Salt lending, ...

Risk assessment is done per asset.

**Data classification**: Not applicable, free text

### Asset selection criteria

> Nach welchen Kriterien die Anlagen ausgewählt werden, z.B. nach „Wachstum“, „Wert“ oder „hohe Dividenden“ mit Erläuterung dieser Kriterien;

In the current smart contract implementation, the asset universe is predefined by the PriceFeed: A fund cannot invest in an asset which is not prelisted on the general pricefeed. Assets are not categorized.

**Data classification**: N/A yet, free text

#### Open questions

* Will assets on the blockchain be categorized in the future so that a fund can set a asset selection critera as smart contract? E.g. A fund that only invests in renewable energy cannot buy a token representing a share on a atomic power plant.

### Factors influencing performance

> bei strukturierten kollektiven Kapitalanlagen die Faktoren, welche die Ausschüttungen sowie die Wertentwicklung der kollektiven Kapitalanlage beeinflussen;

There are no other factors influencing performance than the actual performance of the fund.

**Data classification**: Not applicable, given

### Transaction costs

> dass die Transaktionskosten zu Lasten des Fondsvermögens gehen und somit den Ertrag der kollektiven Kapitalanlage schmälern;

Transaction costs (i.e. gas) are paid by the fund manager in the current implementation. It is her responsibility to set the fees in a way that the transaction costs are paid. In future versions we might implement a feature which deducts transaction costs directly from the fund performance.

**Data classification**: Not applicable, given

### Minimum holding period

> Sofern im Prospekt oder anderweitig eine Mindesthaltedauer empfohlen wird, ist der folgende Wortlaut beizufügen: „Empfehlung: Diese kollektive Kapitalanlage ist unter Umständen für Anlegerinnen und Anleger nicht geeignet, die ihr Geld innerhalb eines Zeitraumes von […] aus der kollektiven Kapitalanlage wieder zurückziehen wollen.“;

There is no concept of minimum holding period in the current implementation. That said, it might be part of the managers strategy to recommend something or enforces it through a participation module.

**Data classification**: free-text, (on-chain, static, configuration through a participation module)

### Funds of funds

> Bei Dachfonds ist anzugeben, nach welchen Kriterien die Zielfonds ausgewählt werden.

It is currently forbidden to create fund of funds.

**Data classification**: Not applicable

## Risk profile

### Risk indicator

Comparable indicator between 1 (low risk/low reward) to 7 (high risk/high reward). The SFAMA document {{"KIIDRichtlinien"|cite}}, pages 16ff describes how to calculate this indicator. It is the same as ESMA's SRRI calculation. It is mainly based on overall volatility of a fund.

**Data classification**: Complicated, historic, on-chain

### Given explanations

There are some given explanations:

> • dass der Indikator keine zuverlässige Aussage über die zukünftige Wertentwicklung enthält;
> • dass die Risikokategorie Veränderungen unterliegen und über die Jahre variieren kann;
> • dass die geringste Risikokategorie nicht einer risikofreien Anlage entspricht;

Which are just warnings about risks in general.

**Data classification**: Given
