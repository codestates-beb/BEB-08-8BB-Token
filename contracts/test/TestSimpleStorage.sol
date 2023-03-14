pragma solidity ^0.8.10;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Sample.sol";

contract TestSimpleStorage {
    function testSimpleStorage() public {
        SimpleStorage ss = new SimpleStorage();

        uint expected = 4;
        ss.set(expected);
        Assert.equal(ss.get(), expected, "value equal test");
    }
}
