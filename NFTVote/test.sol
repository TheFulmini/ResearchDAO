pragma solidity ^0.8.10;

contract Test {

address[] public listAdd;

function newAddress () public{
    listAdd.push(msg.sender)
}



}
