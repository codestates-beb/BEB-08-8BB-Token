// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

struct User {
    uint256 id;
    string nickname;
    address _address;    
}
struct Post {
    uint256 id; 
    uint256 user_id; 
    string title;
    string content;
    uint256 hits;
}
struct NFT {
    uint256 id;
    uint256 user_id;
    uint256 token_id;
    string token_URI;
}

interface IDataStore {
    function setUserData(uint id, string memory nickname, address _address) external;
    function setPostData(uint id, uint256 user_id, string memory title, string memory content, uint256 hits) external;
    function setNftData(uint id, uint256 user_id, uint256 token_id, string memory token_URI) external;
    function getUserData(uint id) external view returns(User memory);
    function getPostData(uint id) external view returns(Post memory);
    function getNftData(uint id) external view returns(NFT memory);
    function getAllowances(address _addr) external view returns(bool);
    function approve(address _addr) external;
}

contract DataStore {
    mapping(uint => User) private userData;
    mapping(uint => Post) private postData;
    mapping(uint => NFT) private nftData;
    mapping (address => bool) private allowances;
    address private tokenOwner;

    constructor() { 
        tokenOwner = msg.sender;
        allowances[tokenOwner] = true;
    }
    //데이터 넣기, 업데이트
    function setUserData(uint id, string memory nickname, address _address) public {
        require(allowances[msg.sender], "DataStore: only allowances possible");
        require(id > 0, "DataStore: id doesn't exist");
        userData[id] = User(id, nickname, _address);
    }
    function setPostData(uint id, uint256 user_id, string memory title, string memory content, uint256 hits) public {
        require(allowances[msg.sender], "DataStore: only allowances possible");
        require(id > 0, "DataStore: id doesn't exist");
        require(userData[user_id].id > 0, "DataStore: userid doesn't exist");
        postData[id] = Post(id, user_id, title, content, hits);
    }
    function setNftData(uint id, uint256 user_id, uint256 token_id, string memory token_URI) public {
        require(allowances[msg.sender], "DataStore: only allowances possible");
        require(id > 0, "DataStore: id doesn't exist");
        require(userData[user_id].id > 0, "DataStore: userid doesn't exist");
        nftData[id] = NFT(id, user_id, token_id, token_URI);
    }
    //데이터 가져오기
    function getUserData(uint id) public view returns(User memory) {
        require(allowances[msg.sender], "DataStore: only allowances possible");
        return userData[id];
    }
    function getPostData(uint id) public view returns(Post memory) {
        require(allowances[msg.sender], "DataStore: only allowances possible");
        return postData[id];
    }
    function getNftData(uint id) public view returns(NFT memory) {
        require(allowances[msg.sender], "DataStore: only allowances possible");
        return nftData[id];
    }
    //datastore 접근, 승인
    function approve(address _addr) public {
        require(tokenOwner == msg.sender, "DataStore: only owner possible");
        allowances[_addr] = true;
    }
    function getAllowances(address _addr) public view returns(bool) {
        require(tokenOwner == msg.sender, "DataStore: only owner possible");
        return allowances[_addr];
    }    
}