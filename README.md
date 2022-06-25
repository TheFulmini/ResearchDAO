# Disclaimer
This project is not finished and is developped for the Brussels Blockchain Week 2022 Hackathon.

It might be improve, especially some features are stilll not available. 

Fork this as your convenience to improve it and maybe create a real alternative to fund PhD Thesis' in an alternative way. 

# Goal

Create a platform to enable the funding of PhD Thesis'. 
Let as much freedom as possible for researcher and as much security as possible for investor. 

# Steps

## First
Generate a fundraising with a goal. If the goal is reached : generate a NFT which represents Thesis project and a DAO which is the owner of this NFT. 
This NFT must represents the property of the Thesis output. It's not finished, so legal part of this NFT is absolutely not defined : lawyers and notaries have to validate this NFT before it's official. 

## Second 
During the Thesis DAO allows funds on the wallet of the PhD student. 
Can decide some question put by PhD student on DAO. 

During this time, voting token which are in ERC721A standard are tradable on market place. They can raise in value or lose value but the voting power is not affected. Each token gives a power voting for proposal in the DAO PhD Thesis'. 

## Third
At the end of the PhD Thesis' what happens ?

If something is deposit or created by the PhD Thesis', NFT might represents property of this outcomes. 
DAO allow investors to decide what to do of this NFT. 

We see that we need to develop a legal framework to ensure property of outcomes PhD Thesis' is really embbeded in the NFT (standard ERC 721).

# Technical part

Contracts for governance are taking from https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance

Contracts for NFTs are taking from : 
- https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC721, for the main NFT Ownership, 
- https://github.com/chiru-labs/ERC721A/tree/main/contracts for the voting token.

Contracts for fundraising are coding by @tforg7. 

Frontend interface is coding by : @maxdesalle.

Deck was realized by @TheFulmini. 

## First front end implementation

https://www.tally.xyz/governance/eip155:4:0x7BFf4A74c7fDfF77f7Bd7c29231a51EE5664cDc4

## Decks

Slides presented available here 👉 https://docs.google.com/presentation/d/14UB0tiP1S2rVOGd340HviTQir9L3f-bylL2po-Adl9c/edit?usp=sharing


### Precisions

#### Why an ERC721A for voting token ? 
To avoid liquidity crisis and allow easily peer-to-peer trading of vote token. NFT is the best form of token to enable peer-to-peer trading.  

#### Short reflexion on the NFT owned by a DAO. 
Let N be a NFT acces token or ownership token. So, if a DAO owns N, every members of the DAO own this NFT and take part of the ownership or access allows by N. 
It can be a real solution to distrubute ownership (patent, royalties, more generally from intellectual property to real estate property). 
We can imagine that we can share access NFT through DAO such that each member has access gives by the NFT.

#### This repo
It will a bit evolve to contain all things developp during the Hackathon but the ending implementation apparently will not be available. It's mainly a testing repo could be seen as a MVP (Minimum Viable Project).
