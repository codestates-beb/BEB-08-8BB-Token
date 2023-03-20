//Contract based on [<https://docs.openzeppelin.com/contracts/3.x/erc721>](<https://docs.openzeppelin.com/contracts/3.x/erc721>)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "./testERC20.sol";
interface TestERC20Interface {
    function balanceOf(address account) external view returns (uint256);
    function transferERC20(address _sender, address _recipient, uint256 _amount) external;
} 

contract MyNFTs is ERC721URIStorage, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("8BB_NFT", "8Bb_NFT") {}

    //interface 연결하는 함수.
    //erc20.sol ICToken 배포 후 erc721.sol MyNFTs 배포 
    //erc20.sol ICToken의 컨트랙트 주소를 함수에 입력하면 두 컨트랙트가 연결됩니다. 
    TestERC20Interface erc20Contaract; 
    function setInterface(address _address) external onlyOwner {
        erc20Contaract = TestERC20Interface(_address); 
    }

    //잔고 확인. 함수 실행한 주소의 ERC20토큰 잔고를 보여 준다. 
    function balanceERC20() public view returns(uint256 balance) {
        balance = erc20Contaract.balanceOf(msg.sender);
    }

    // 민팅 비용 설정, 편의상 민팅 비용은 15로 설정한다. 
    uint256 mintingFee = 15; 
    function setMintingFee(uint256 _mintingFee) external onlyOwner returns(uint256) {
        mintingFee = _mintingFee; 
        return mintingFee;
    } 

    // nft 판매 정보가 담긴 구조체 
    struct NFTInfo { 
        uint256 price;
        bool isForSale; // 판매 대상이 아니라면 false, 판매 중이라면 ture
    }
    mapping(uint256 => NFTInfo) tokenIdToNFTInfo;

    // 누구나 민팅할 수 있도록 onlyOwner 제거 
    function mintNFT(string memory tokenURI)
        public
        returns (uint256)
    {
        // NFT 민팅 할 때 mintingFee에 해당하는 금액을 contract owner에게 전송해야 한다.
        // _owner가 민팅 할 때는 비용을 지불하지 않거나, _owner는 민팅할 수 없게 설정해야 할 것 같음. 일단은 전자로 작성함.   
        address _owner = owner();
        if(msg.sender != _owner){
            erc20Contaract.transferERC20(msg.sender, _owner, mintingFee);
        }

        _tokenIds.increment();

        address recipient = msg.sender; 
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // 민팅할 때 판매 정보 구조체 mapping
        tokenIdToNFTInfo[newItemId] = NFTInfo(0, false);

        return newItemId;
    } 

    // 판매정보 구조체 수정 
    function sell (uint256 _tokenId, uint256 _price) public onlyOwner {
        tokenIdToNFTInfo[_tokenId].price = _price; 
        tokenIdToNFTInfo[_tokenId].isForSale = true; 
    }

    function tokenIdToPrice (uint256 _tokenId) public view returns(uint256 price, string memory message) {
        if(tokenIdToNFTInfo[_tokenId].isForSale){
            price = tokenIdToNFTInfo[_tokenId].price;
            message = "This itms is for sale.";
        } else {
            price = 0; 
            message = "This item is not for sale."; 
        }
    }
  
    // 구매자가 nft를 이동시킬 수 없음. 따라서 구매함수 만으로 nft이동시키는 것 불가.
    // 구매 메커니즘 회의에서 결정하기. event 메커니즘 활용할 경우 백에서 처리해줘야 함.     
    function buy (uint256 _tokenId) public {
        require(tokenIdToNFTInfo[_tokenId].isForSale == false, "This item is not for sale.");
        require(erc20Contaract.balanceOf(msg.sender) >= tokenIdToNFTInfo[_tokenId].price, "price exceeds balance");  
        address _NFTOwner = _ownerOf(_tokenId); 
        // 미완성 코드
    }
}