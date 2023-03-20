//Contract based on [<https://docs.openzeppelin.com/contracts/3.x/erc721>](<https://docs.openzeppelin.com/contracts/3.x/erc721>)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "./testERC20.sol";
interface TestERC20Interface {
    function transferERC20(address _sender, address _recipient, uint256 _amount) external;
    function addressToIdFunc(address _address) external view returns(uint256);
} 

contract MyNFTs is ERC721URIStorage, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    TestERC20Interface token;

    constructor() public ERC721("8BB_NFT", "8Bb_NFT") {}

    //erc20.sol ICToken 배포 후 erc721.sol MyNFTs 배포 
    //erc20.sol ICToken의 컨트랙트 주소를 함수에 입력하면 두 컨트랙트가 연결됩니다. 
    function setToken(address tokenAddress) public onlyOwner returns(bool) {
        require(tokenAddress != address(0x0));
        token = TestERC20Interface(tokenAddress);
        return true;  
    }

    // 민팅 비용 설정, 편의상 민팅 비용은 15로 설정한다. 
    uint256 nftPrice = 15; 
    function setNftPrice(uint256 _nftPrice) public onlyOwner returns(uint256) {
        nftPrice = _nftPrice; 
        return nftPrice;
    } 

    // nft 정보 담긴 구조체  
    struct Nft {
        uint256 id; 
        uint256 userId;
    }
    mapping(uint256 => Nft) idToNft;

    // 누구나 민팅할 수 있도록 onlyOwner 제거
    // _id는 db에서 지정하는 값이 된다.
    // _id는 1부터 시작해야 한다.

    function mintNFT(uint256 _id, string memory tokenURI)
        public
        returns (uint256)
    {
        // _recipient는 msg.sender로 한다.
        address _recipient = msg.sender; 

        // NFT 민팅 할 때 nftPrice에 해당하는 금액을 contract owner에게 전송해야 한다.
        // _owner는 민팅할 수 없다.    
        address _owner = owner();
        require(msg.sender != _owner, "Contract owner cannot mint NFT.");
        require(idToNft[_id].id == 0, "This ID has already been used. Please use a different ID.");

        // approve 없이 민팅 가능하게 하기 위해서 별도의 전송함수 사용한다.  
        token.transferERC20(_recipient, _owner, nftPrice);
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // 민팅할 때 판매 정보 구조체 mapping
        uint256 userId = token.addressToIdFunc(msg.sender); 
        idToNft[newItemId] = Nft(_id, userId);

        return _id;
    } 
}