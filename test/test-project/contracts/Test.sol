pragma solidity ^0.5.0;
import "./ERC20.sol";

contract Test {
  uint256 public value;
  ERC20 public token;
  address public tokenAddress;

  constructor(uint256 supply) public {
    value = supply;
  }

  function setValue(uint256 _value) public {
    value = _value + 2;
  }

  function getToken() public view returns(ERC20) {
    return token;
  }
}
