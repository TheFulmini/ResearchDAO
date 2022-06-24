// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTvote is ERC721, ERC721Burnable, Ownable, EIP712, ERC721Votes {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor(
        string memory name ,
        string memory symbol
    ) ERC721(name, symbol) EIP712("NFTvote", "1") {}


    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Votes)
    {
        super._afterTokenTransfer(from, to, tokenId);
    }
}

//------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

contract NFTCrowdsale {
    // Create an `address public` variable called `kasei_token_address`.
    address public NFT_token_address;
    // Create an `address public` variable called `kasei_crowdsale_address`.
    address public NFT_crowdsale_address;

    // Value to keep track of funding progress
    uint256 public totFunded = 0;
    // 
    address[] public listInvestors;

     mapping(address => uint256) public amountShares; 
    // Add the constructor.
    constructor(
        string memory name,
        string memory symbol,
        address payable wallet,
        uint goal
    ) 
        public 
        {
        // Create a new instance of the NFTvote contract, with 0 initial supply
        NFTvote token = new NFTvote(name, symbol);
        // Assign the token contract’s address to the `nft_token_address` variable.
        NFT_token_address = address(token);
        }

        // Buy shares of NFT
        // Put Eth in deposit
        //map msg.sender to amount
        function buyShare() payable public{
            uint256 balance = address(this).balance;
            address msgSender = msg.sender;
            uint256 msgValue = msg.value;
            listInvestors.push(msgSender);
            totFunded += msgValue;
            amountShares[msgSender] = msgValue;
            if (totFunded > goal){
            //    mintAll()
            //}
        }

        function mintAll() {
            // for all address in listInvestors
            for (uint i = 0; i < listInvestors.length; i++){        
                token.safeMint(listInvestors[i]);
                
            }
        }
}



