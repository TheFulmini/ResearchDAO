// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./~/openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "./openzeppelin/contracts/access/Ownable.sol";
import "./openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "./openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "./openzeppelin/contracts/utils/Counters.sol";

contract NFDAO is ERC721, ERC721Burnable, Ownable, EIP712, ERC721Votes {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("NFDAO", "NFD") EIP712("NFDAO", "1") {}

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
