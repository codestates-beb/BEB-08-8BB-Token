// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface ERC20Interface {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function transferFrom(address spender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Transfer(address indexed spender, address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 oldAmount, uint256 amount);
}

abstract contract OwnerHelper {
  	address private _owner;

  	event OwnershipTransferred(address indexed preOwner, address indexed nextOwner);

  	modifier onlyOwner {
			require(msg.sender == _owner, "OwnerHelper: caller is not owner");
			_;
  	}

  	constructor() {
      _owner = msg.sender;
  	}

    function owner() public view virtual returns (address) {
      return _owner;
    }

  	function transferOwnership(address newOwner) onlyOwner public {
      require(newOwner != _owner);
      require(newOwner != address(0x0));
      address preOwner = _owner;
	    _owner = newOwner;
	    emit OwnershipTransferred(preOwner, newOwner);
  	}
}

library SafeMath {
  	function mul(uint256 a, uint256 b) internal pure returns (uint256) {
			uint256 c = a * b;
			assert(a == 0 || c / a == b);
			return c;
  	}

  	function div(uint256 a, uint256 b) internal pure returns (uint256) {
	    uint256 c = a / b;
			return c;
  	}

  	function sub(uint256 a, uint256 b) internal pure returns (uint256) {
			assert(b <= a);
			return a - b;
  	}

  	function add(uint256 a, uint256 b) internal pure returns (uint256) {
			uint256 c = a + b;
			assert(c >= a);
			return c;
	}
}

contract ICToken is ERC20Interface, OwnerHelper {
    using SafeMath for uint256;

    mapping (address => uint256) public _balances;
    mapping (address => mapping (address => uint256)) public _allowances;

    uint256 public _totalSupply;
    string public _name;
    string public _symbol;
    uint8 public _decimals;

    constructor() {
      _name = "8BB";
      _symbol = "8BB";
      _decimals = 3;
      _totalSupply = 100000000;
      _balances[msg.sender] = _totalSupply;
    }

    function name() public view returns (string memory) {
      return _name;
    }

    function symbol() public view returns (string memory) {
      return _symbol;
    }

    function decimals() public view returns (uint8) {
      return _decimals;
    }

    function totalSupply() external view virtual override returns (uint256) {
      return _totalSupply;
    }

    function balanceOf(address account) external view virtual override returns (uint256) {
      return _balances[account];
    }

    function transfer(address recipient, uint amount) public virtual override returns (bool) {
      _transfer(msg.sender, recipient, amount);
      emit Transfer(msg.sender, recipient, amount);
      return true;
    }

    function transferERC20(address _sender, address _recipient, uint256 _amount) external virtual {     
      require(_sender != address(0), "ERC20: transfer from the zero address");
      require(_recipient != address(0), "ERC20: transfer to the zero address");
      require(_balances[_sender] >= _amount, "ERC20: transfer amount exceeds balance");
      _balances[_sender] = _balances[_sender].sub(_amount); 
      _balances[_recipient] = _balances[_recipient].add(_amount);
    }

    function allowance(address owner, address spender) external view override returns (uint256) {
      return _allowances[owner][spender];
    }

    function approve(address spender, uint amount) external virtual override returns (bool) {
      uint256 currentAllowance = _allowances[msg.sender][spender];
      require(_balances[msg.sender] >= amount,"ERC20: The amount to be transferred exceeds the amount of tokens held by the owner.");
      _approve(msg.sender, spender, currentAllowance, amount);
      return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external virtual override returns (bool) {
      _transfer(sender, recipient, amount);
      emit Transfer(msg.sender, sender, recipient, amount);
      uint256 currentAllowance = _allowances[sender][msg.sender];
      require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
      _approve(sender, msg.sender, currentAllowance, currentAllowance - amount);
      return true;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
      require(sender != address(0), "ERC20: transfer from the zero address");
      require(recipient != address(0), "ERC20: transfer to the zero address");
      uint256 senderBalance = _balances[sender];
      require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
      _balances[sender] = senderBalance.sub(amount);
      _balances[recipient] = _balances[recipient].add(amount);
    }

    function _approve(address owner, address spender, uint256 currentAmount, uint256 amount) internal virtual {
      require(owner != address(0), "ERC20: approve from the zero address");
      require(spender != address(0), "ERC20: approve to the zero address");
      _allowances[owner][spender] = amount;
      emit Approval(owner, spender, currentAmount, amount);
    }

    event NewPosting(string title, string author, uint256 postingTime);
    event EditPosting(uint256 postingTime); 
    event AddComment(uint256 commentTime); 
    event EditComment(uint256 commentTime);

    uint256 public airDropTokenPostAmount = 50;
    uint256 public airDropTokenCommentAmount = 10; 
    uint256 postId = 0; //postId는 1부터 시작한다. 

    struct NewPost {
        string title; // 새 포스팅의 제목.
        string author; // 표시되는 저자명. 
        string body; // 글의 본문. 
        uint256 postingTime; // 글을 작성한 시간.
        uint256 commentCount; // 0으로 시작해서 댓글을 하나 쓸때마다 1씩 더한다. 
        bool edit; // 글을 수정하기 전에는 false. 
    }
    struct Comment {
        string comment; 
        uint256 commentTime; 
    }

    mapping (uint256 => NewPost) postIdToNewPost; 
    mapping (uint256 => address) postIdToAddress;
    mapping (uint256 => mapping(uint256 => Comment)) commentIdToComment; 
    mapping (uint256 => mapping(uint256 => address)) commentIdToAddress;
    

    function generateNewPost (string memory _title, string memory _author, string memory _body) public returns(uint256) {
        postId = postId.add(1); 
        postIdToNewPost[postId] = NewPost(_title, _author, _body, block.timestamp, 0, false);
        postIdToAddress[postId] = msg.sender; 
        address _recipient = msg.sender; 
        _airDropTokenToGenerateNewPost(_recipient);
        emit NewPosting(_title, _author, block.timestamp);
        return postId.sub(1); // postId에 1을 더했기 때문에 출력하는 값은 1을 뺀 값을 출력한다.  
    }

    function _airDropTokenToGenerateNewPost (address _recipient) private {
        address _owner = owner();
        _transfer(_owner, _recipient, airDropTokenPostAmount);
    }

    function editPost (string memory _body, uint256 _postId) public {
        require(msg.sender == postIdToAddress[_postId]);
        postIdToNewPost[_postId].body = _body; 
        postIdToNewPost[_postId].postingTime = block.timestamp;
        postIdToNewPost[_postId].edit = true;
        emit EditPosting(block.timestamp);
    }

    function addComment (string memory _comment, uint256 _postId) public returns(uint256 commentId) {
        commentId = postIdToNewPost[_postId].commentCount.add(1);
        commentIdToComment[_postId][commentId].comment = _comment; 
        commentIdToComment[_postId][commentId].commentTime = block.timestamp; 
        commentIdToAddress[_postId][commentId] = msg.sender;
        postIdToNewPost[_postId].commentCount.add(1);  
        address _recipient = msg.sender; 
        _airDropTokenToComment(_recipient);
        emit AddComment(block.timestamp);
    }

    function _airDropTokenToComment (address _recipient) private {
        address _owner = owner();
        _transfer(_owner, _recipient, airDropTokenCommentAmount);
    } 

    function editComment (string memory _comment, uint256 _postId, uint256 _commentId) public {
        require(msg.sender == commentIdToAddress[_postId][_commentId]); 
        commentIdToComment[_postId][_commentId].comment = _comment; 
        commentIdToComment[_postId][_commentId].commentTime = block.timestamp; 
        emit EditComment(block.timestamp);
    }

    function showPostById(uint256 _postId) public view returns(NewPost memory post) {
        post = postIdToNewPost[_postId]; 
    }

    function showCommentById(uint256 _postId, uint256 _commentId) public view returns(Comment memory comment) {
        comment = commentIdToComment[_postId][_commentId]; 
    }

    function totalPost() public view returns(uint256) {
        return postId; 
    }
}