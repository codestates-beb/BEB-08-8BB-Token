// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./dataStore.sol";

contract NFTLootBox is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 token;
    uint256 nftPrice;
    IDataStore dataStore;

    constructor() ERC721("MyNFTs", "MNFT") {
        nftPrice = 10;
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        require(token.balanceOf(recipient) >= nftPrice, "transferFrom err");

        token.transferFrom(recipient, msg.sender, nftPrice);
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function setToken (address tokenAddress) public onlyOwner returns (bool) {
        require(tokenAddress != address(0x0));
        token = IERC20(tokenAddress);
        return true;
    }

    function setDataStore (address dataStoreAddress) public onlyOwner returns (bool) {
        require(dataStoreAddress != address(0x0));
        dataStore = IDataStore(dataStoreAddress);
        return true;
    }

    function mintSet(address recipient, string memory tokenURI, uint id, uint256 user_id) public onlyOwner {
        uint256 token_id = mintNFT(recipient, tokenURI);
        dataStore.setNftData(id, user_id, token_id, tokenURI);
    }
}