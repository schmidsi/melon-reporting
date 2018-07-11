# Problem statement

## Melonport AG

Melonport AG is a company with the mission to build the Melon Protocol until February 2019 and then hand it over to a self governing community.

## Melon Protocol

> Melon is a fully decentralized asset management protocol which allows anyone to set up, manage and/or invest in an investment fund of digital assets in a secure, robust and permissionless manner. In three words: decentralized investment infrastructure.

![](/assets/melon-protocol-diagram.png)
_Image & text by Melonport AG_

Technically it is a set of Solidity smart contracts running on the Ethereum Blockchain. There also exists a frontend acting as reference implementation on how to interact with these smart contracts.

## Vision

Creating functionality on top of the Melon protocol that automates reporting/auditing almost completely:

> a) Something that a real fund manager would be able to confidently say: “This solves my reporting issues and makes my life a lot easier”

> b) Something that can be show-cased to FINMA (and other regulators) and show them how: "This will make _their_ life over-seeing a lot easier”

## Hypothesis

It is possible to extract and visualize all relevant data from the Melon protocol on the Ethereum blockchain in a way that could be legally acceptable by regulators. Furthermore, this data can be audited and digitally signed and a track record of these audits can be placed on the blockchain again.

## Boundaries

### Legal

This is a technical thesis and therefore we do not deeply research into the legal aspects of fund management and reporting. But we will find ways how technology can support the legal processes.

### Traditional Auditing

This thesis focuses on the possibilities of auditing of funds running on the blockchain. This also implies the immutability of on-chain data and the blockchain as the single source of truth.

Furthermore do we not include any aspect of other traditional financial auditing such as: Third-party risks, company structure audits, internal control policies, banking reconciliation (not necessary), taxes and others.

That said, an auditor can still perform these audits and place its signed opinion on-chain.

### Technical

#### Melon Fund System

A lot of functionality of funds depends on third party modules: Price feeds, participation, exchanges. In this thesis, we only guarantee the official modules provided by Melonport. If modules outside of this scope could provide important functionality, we document this, but do not implement the necessary bridges.

We try to adapt to the latest Melon smart contracts but fall back to the last known working ones if the latest causing too much problem. Last known working version is [v0.7.0](https://github.com/melonproject/smart-contracts/tree/v0.7.0).

#### On-chain data

We only work actively with data that is available on-chain. Off-chain data could be merged into the reporting system and we document the interfaces to do so as future work.

### Other

We exclude margin-trading in general for this thesis.

## Approach

Melonport and most blockchain based companies see themselves as innovating startups trying to build a new and better world. Therefore it does not see itself as a service provider and its possible users as customers. The development process is more like an open community where input is very welcome but also critically assessed.

> “If I had asked people what they wanted, they would have said faster horses.”
> _Henry Ford_
