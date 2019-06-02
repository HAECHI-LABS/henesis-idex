/**
 * Source Code first verified at https://etherscan.io on Wednesday, September 27, 2017
 (UTC) */

pragma solidity ^0.4.16;

contract Exchange {

  event Order(address tokenBuy, uint256 amountBuy, address tokenSell, uint256 amountSell, uint256 expires, uint256 nonce, address user, uint8 v, bytes32 r, bytes32 s);
  event Cancel(address tokenBuy, uint256 amountBuy, address tokenSell, uint256 amountSell, uint256 expires, uint256 nonce, address user, uint8 v, bytes32 r, bytes32 s);
  event Trade(address tokenBuy, uint256 amountBuy, address tokenSell, uint256 amountSell, address get, address give);
  event Deposit(address token, address user, uint256 amount, uint256 balance);
  event Withdraw(address token, address user, uint256 amount, uint256 balance);

  function setInactivityReleasePeriod(uint256 expiry) public returns (bool success);

  function setAdmin(address admin, bool isAdmin) public;

  function depositToken(address token, uint256 amount) public;

  function deposit() public payable;

  function withdraw(address token, uint256 amount) public returns (bool success);

  function adminWithdraw(address token, uint256 amount, address user, uint256 nonce, uint8 v, bytes32 r, bytes32 s, uint256 feeWithdrawal) public returns (bool success);

  function balanceOf(address token, address user) public constant returns (uint256);

  function trade(uint256[8] tradeValues, address[4] tradeAddresses, uint8[2] v, bytes32[4] rs) public returns (bool success);
}
