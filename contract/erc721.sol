// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTLootBox is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 token;
    uint256 nftPrice;

    // address owner; onlyOwner library 적용으로 제외

    constructor() ERC721("MyNFTs", "MNFT") {
        nftPrice = 15;
    }

    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        // 서버에서 먼저 nft 생성자(= recipient)의 address와 NFT의 tokenURI를 받은 후 서버(주소/owner)에서 이 함수를 사용하여 nft를 생성한다.
        // 때문에 먼저 nft 생성자가 NFT를 발행할 수 있는 최소 조건인 15개의 토큰을 갖고 있는지 확인한다.
        require(token.balanceOf(recipient) > nftPrice);

        token.transferFrom(recipient, msg.sender, nftPrice);

        // tokenId가 증가함으로써 각각의 NFT에 번호를 매긴다.
        // 이떄 tokenId는 NFt struct에 저장되는 Id 값과는 별개로 플랫폼에 존재하는 고유의 NFT를 순차적으로 표시한다.
        // 어떤 역할을 추가적으로 하는지는 토의 필요
        _tokenIds.increment();

        // newItemId라는 변수에 지정
        uint256 newItemId = _tokenIds.current();

        // 밑의 함수를 실행시켜 recipient의 newItemId에 따른 tokenURI를 저장한다.
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    // 어떤 토큰을 사용할 것인지에 대한 설정: token ca = tokenAddress
    function setToken(address tokenAddress) public onlyOwner returns (bool) {
        require(tokenAddress != address(0x0));
        token = IERC20(tokenAddress);
        return true;
    }
}
