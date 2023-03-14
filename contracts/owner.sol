// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Owner{
    address public immutable OWNER_ADDRESS;
    
    constructor(){
        OWNER_ADDRESS = msg.sender;
    }

    modifier isOwner(){
        require(msg.sender == OWNER_ADDRESS,"Only owner can invoke the function");
        _;
    }

}