// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/utils/Counters.sol"; // 증감
import "@openzeppelin/contracts/utils/math/SafeMath.sol"; // 계산

import "./erc20.sol";
import "./erc721.sol";

// error: 몇개의 함수명이 겹쳐서 ICToken을 수정했다고 해도 이전에 deploy 된 ICToken이 있으면 에러가 발생한다. 그 컨트랙트를 취소해야 정상적으로 반영된다.
contract post is ICToken, NFTLootBox {
    using SafeMath for uint256; // 라이브러리 상속 설정

    // // evert 설정 수정 필요 (사용 유무에 따라 활성화)
    //     event NewPosting(string title, string author, uint256 postingTime); /// 생성
    //     event EditPosting(uint256 postingTime); /// 수정
    //     event AddComment(uint256 commentTime); /// 댓글
    //     event EditComment(uint256 commentTime); /// 댓글 수정

    // 필요 변수 설정
    uint256 public TokenPostAmount = 50; /// 한개의 Post 마다 부여되는 토큰의 수
    // uint256 public postCount = 0; /// 플랫폼 내에서 post를 진행한 횟수 => 이게 필요한지는 검토 필요
    // uint256 public NFTCount = 0; /// 마찬가지
    // <=

    // User 정보 설정(중복확인 및 최소조건 설정) 및 주소별 저장 =>

    // struct 설정
    struct User {
        uint256 id;
        string nickname;
        address _address;
        // int32 token_amount;
        // int256 eth_amount; // -> 가나쉬 네트워크에 초기 부여되는 이더 값을 설정 추후에 가능하면 web3를 통한 연동 방법 구상
        // string created_at; // -> 개인적인 생각으로 프론트엔드에서 아이디가 만들어진 시점을 가져와서 DB에 저장하고 그 값을 가져오면 될 것 같음
    }

    // mapping 설정
    mapping(uint => User) public idToUser; // 한개의 unique한 id에 따른 정보 저장 및 확인
    mapping(uint => bool) private usedUserIds; // User id 중복 확인
    mapping(string => bool) private usedNickname; // nickname 중복확인
    mapping(address => uint256) public addressToId; // 각 주소(User)에 따라 부여되고 저장된 ID 값을 별도로 저장 => 추후 msg.sender를 사용하여 id와 같은 user_id를 부여

    // DB에서 데이터를 넣는다면 ownable을 설정해줘야 하는가? 토의 필요
    // 함수 설정
    function PbuildUserMap(
        uint inputId,
        address inputAddr,
        string memory inputNickname
    ) public {
        // 함수명을 좀더 직관적으로 변경
        // 유효성 검사
        //require(inputId != 0 , "ID must be entered."); // Check that id is not empty // 토의 필요
        require(inputAddr != address(0), "Address must be entered."); // Check that addr is not empty
        require(bytes(inputNickname).length > 0, "Nickname must be entered."); // Check that nickname is not empty
        require(!usedUserIds[inputId], "ID must be unique."); // Check that id has not been used before
        require(!usedNickname[inputNickname], "Nickname must be unique."); // Check that nickname has not been used before

        // DB에서 주어진 ID 값에 따라 struct에 데이터 저장
        idToUser[inputId].id = inputId;
        idToUser[inputId].nickname = inputNickname;
        idToUser[inputId]._address = inputAddr;

        addressToId[inputAddr] = inputId;

        //중복 방지 설정
        usedUserIds[inputId] = true;
        usedNickname[inputNickname] = true;
    }

    // <=

    // post 발행 => (db가 위의 struct 정보를 넣었을 떄 유효성을 검사?하고 맞다면 token을 줄 수 있어야 한다.)

    // struct 설정
    struct Post {
        uint256 id; // 를 키로 받아서 Post를 구조체로 받아내도록 ->
        uint256 user_id; // user의 id로서 형성되는 키 값 => 이 키 값으로 user가 형성했거나 얻은 post 정보를 알 수 있음
        // user struct의 id와 user_id를 일치시켜 user가 갖고 있는 Post를 구별할 수 있게 한다.
        string title;
        string content;
        //string created_at; // 개인적인 생각으로 프론트엔드에서 post가 만들어진 시점을 가져와서 DB에 저장하고 그 값을 가져오면 될 것 같음
    }

    // mapping 설정
    mapping(uint256 => Post) public idToPost; // DB에서 주어지는 ID값에 따라 Post를 저장
    mapping(uint256 => bool) private usedPostIds; // Post id 중복 확인

    // DB에서 데이터를 넣는다면 ownable을 설정해줘야 하는가? 토의 필요
    // 함수 설정
    function PgenerateNewPost(
        uint256 inputId,
        string memory inputTitle,
        string memory inputContent
    ) public {
        // return id값 제외
        // 유효성 검사
        require(!usedPostIds[inputId], "ID must be unique."); // Check that ID has not been used before

        // User struct에 저장된 ID값을 Post user_id 로 지정
        uint256 userId = addressToId[msg.sender];

        // DB에서 주어진 ID 값에 따라 struct에 데이터 저장
        idToPost[inputId] = Post(inputId, userId, inputTitle, inputContent);

        // erc20 토큰 전달
        erc20transferFromOwner(msg.sender, TokenPostAmount);

        // 중복 id 방지
        usedPostIds[inputId] = true;

        // 플랫폼 내에서 발행한 post의 갯수
        //postCount = postCount.add(1);
    }

    // 해결
    // function _airDropTokenToGenerateNewPost (address _recipient) private {
    //   address _owner = owner();
    //   _transfer(_owner, _recipient, airDropTokenPostAmount);
    // }

    // function transferERC20(address _sender, address _recipient, uint256 _amount) external virtual {
    //   require(_sender != address(0), "ERC20: transfer from the zero address");
    //   require(_recipient != address(0), "ERC20: transfer to the zero address");
    //   require(_balances[_sender] >= _amount, "ERC20: transfer amount exceeds balance");
    //   _balances[_sender] = _balances[_sender].sub(_amount);
    //   _balances[_recipient] = _balances[_recipient].add(_amount);
    // }

    // mapping 을 public 으로 함으로써 필요 없어짐
    // function addressToIdFunc(address _address) external view returns(uint256) {
    //   return addressToId[_address];
    // }

    // function totalPost() public view returns(uint256) {
    //   return postCount;
    // }

    // function showPostByPostId(uint256 _postId) public view returns(Post memory post) {
    //   post = idToPost[_postId];
    // }

    // NFT 발행 =>

    //struct 설정
    struct NFT {
        uint256 id;
        uint256 user_id;
        uint256 token_id;
        string token_URI;
    }

    //mapping 설정
    mapping(uint256 => NFT) public idToNFT; // DB에서 주어지는 ID값에 따라 NFT를 저장
    mapping(uint256 => bool) private usedNFTIds; // NFT id 중복 확인

    // DB에서 데이터를 넣는다면 ownable을 설정해줘야 하는가? 토의 필요
    // 함수 설정
    function PgenerateNewNFT(
        uint256 inputId,
        address addr,
        string memory token_URI
    ) public {
        // return id값 제외
        // 유효성 검사
        require(!usedNFTIds[inputId], "ID must be unique."); // Check that ID has not been used before

        // User struct에 저장된 ID값을 Post user_id 로 지정
        uint256 userId = addressToId[msg.sender];

        // mint NFT 및 token_id 생성 ('mintNFT'함수의 newItemId가 token_id가 됨)
        uint256 token_id = mintNFT(addr, token_URI);

        // DB에서 주어진 ID 값에 따라 struct에 데이터 저장
        idToNFT[inputId] = NFT(inputId, userId, token_id, token_URI);

        // 중복 id 방지
        usedNFTIds[inputId] = true;

        // // erc20 토큰 전달
        // erc20transferFromOwner(msg.sender, TokenPostAmount);

        // 플랫폼 내에서 발행한 NFT의 갯수
        //NFTCount = NFTCount.add(1);
    }
    // <=
}
