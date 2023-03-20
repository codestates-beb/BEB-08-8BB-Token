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
    function addBalance(address _address, uint256 _amount) external returns(uint256 addressBalance);
    function subBalance(address _address, uint256 _amount) external returns(uint256 addressBalance);
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
    function setTestERC20InterfaceAddress(address _address) external onlyOwner {
        erc20Contaract = TestERC20Interface(_address); 
    }

    //잔고 확인. 함수 실행한 주소의 ERC20토큰 잔고를 보여 준다. 
    function balanceERC20() public view returns(uint256 balance) {
        balance = erc20Contaract.balanceOf(msg.sender);
    }

    //erc20토큰 전송 함수. mapping 직접 활용.
    //interface로 transfer 함수 가져오면 실행되지 않는 오류가 발생 
    //erc20.sol에 _balances mapping을 관리하는 함수를 만들고 해당 함수를 가져와 함수 만든 것. 
    function erc20transfer(address _recipient, uint256 _amount) private returns(uint256 senderBalance, uint256 recipientBalance){
        require(msg.sender != address(0), "ERC20: transfer from the zero address");
        require(_recipient != address(0), "ERC20: transfer to the zero address");
        require(erc20Contaract.balanceOf(msg.sender) >= _amount, "ERC20: transfer amount exceeds balance");
        senderBalance = erc20Contaract.subBalance(msg.sender, _amount);
        recipientBalance = erc20Contaract.addBalance(_recipient, _amount); 
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
            erc20transfer(_owner, mintingFee);
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

    function tokenIdToPrice (uint256 _tokenId) public returns(uint256 price, string memory massage) {
        if(tokenIdToNFTInfo[_tokenId].isForSale){
            price = tokenIdToNFTInfo[_tokenId].price;
            massage = "This itms is for sale.";
        } else {
            price = 0; 
            massage = "This item is not for sale."; 
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