// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0; // 라이브러리 사용으로 인한 버전 수정 0.7.0 => 0.8.0

import "@openzeppelin/contracts/utils/math/SafeMath.sol"; // 계산

// 활성화
// TypeError: Contract "ICToken" should be marked as abstract. => 위의 interface와 ICToken의 상속에 있어서 함수 설정이 맞아야 한다.
contract ICToken {
    using SafeMath for uint256; // 라이브러리 상속 설정

    event erc20Transfer(
        address indexed from,
        address indexed to,
        uint256 amount
    ); // event 설정

    mapping(address => uint256) private _tokenbalances;
    //mapping (address => mapping (address => uint256)) public _allowances; /// 누가 누구에서 얼만큼의 토큰을 허락했는가

    uint256 public _tokenTotalSupply;
    string public _tokenName;
    string public _tokenSymbol;
    uint8 public _tokenDecimals;
    address private tokenOwner;

    constructor() {
        _tokenName = "8BB";
        _tokenSymbol = "8BB";
        _tokenDecimals = 3;
        _tokenTotalSupply = 10000000000;
        _tokenbalances[msg.sender] = _tokenTotalSupply;
        tokenOwner = msg.sender;
    }

    function tokenName() public view returns (string memory) {
        return _tokenName;
    }

    function tokenSymbol() public view returns (string memory) {
        return _tokenSymbol;
    }

    function tokenDecimals() public view returns (uint8) {
        return _tokenDecimals;
    }

    function tokenTotalSupply() external view returns (uint256) {
        return _tokenTotalSupply;
    }

    function tokenBalanceOf(address account) external view returns (uint256) {
        return _tokenbalances[account];
    }

    function erc20transfer(address recipient, uint amount) public {
        require(_tokenbalances[msg.sender] >= amount, "Not enough tokens"); // 토큰이 부족할 시 오류 메세지 전달
        _erc20Transfer(msg.sender, recipient, amount);
        emit erc20Transfer(msg.sender, recipient, amount);
    }

    function erc20transferFromOwner(address recipient, uint amount) internal {
        // 외부에서 해당 함수에 접근하지 못하도록 설정 => internal
        require(_tokenbalances[tokenOwner] >= amount, "Not enough tokens"); // 토큰이 부족할 시 오류 메세지 전달
        _erc20Transfer(tokenOwner, recipient, amount);
        emit erc20Transfer(tokenOwner, recipient, amount);
    }

    // function allowance(address spender) external view returns (uint256) { // 설정된 owner에 의해 작동되도록 수정
    //   return _allowances[owner][spender];
    // }

    // function approve(address spender, uint amount) external virtual override returns (bool) { // 설정된 owner에 의해 작동되도록 수정
    //   uint256 currentAllowance = _allowances[owner][spender];
    //   require(_balances[owner] >= amount,"ERC20: The amount to be transferred exceeds the amount of tokens held by the owner.");
    //   _approve(owner, spender, currentAllowance, amount); /// spender에게 서버로부터 부여된 양만큼 토큰을 인출할 권리 부여
    //   return true;
    // }

    // function transferFrom(address recipient, uint256 amount) external virtual override returns (bool) {
    //   _transfer(owner, recipient, amount);
    //   emit Transfer(owner, recipient, amount);
    //   uint256 currentAllowance = _allowances[sender][msg.sender];
    //   require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
    //   _approve(sender, msg.sender, currentAllowance, currentAllowance - amount);
    //   return true;
    // }

    function _erc20Transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        uint256 senderBalance = _tokenbalances[sender];
        require(
            senderBalance >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        _tokenbalances[sender] = senderBalance.sub(amount);
        _tokenbalances[recipient] = _tokenbalances[recipient].add(amount);
    }

    // function _approve(address owner, address spender, uint256 currentAmount, uint256 amount) internal virtual {
    //   require(owner != address(0), "ERC20: approve from the zero address");
    //   require(spender != address(0), "ERC20: approve to the zero address");
    //   _allowances[owner][spender] = amount;
    //   emit Approval(owner, spender, currentAmount, amount);
    // }
}
