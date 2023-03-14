// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;
import "./owner.sol"; //import contract
contract Web3Booking is Owner{
    enum roomStatus{   //enum 
        OCCUPIED, //0
        VACANT //1
    }
    //defines the properties of the room
    struct Rooms{
        uint beds;
        bool airCondition;
        uint price;
    }
    uint[] roomList;//list of room 
    mapping(uint => Rooms) roomNumber; //roomnumber => rooms struct
    mapping(uint => roomStatus) statusOfRoom; //room is vacant or not
    mapping(uint => address) public mapBooking; // roomNumber => address

    //hotel to add new room details
    function addRoomDetails(uint _roomNumber,uint _beds,bool _airCondition,uint _price) public isOwner{
        roomNumber[_roomNumber] = Rooms(_beds,_airCondition,_price);
        statusOfRoom[_roomNumber] = roomStatus.VACANT;
        roomList.push(_roomNumber);
    }

    //gets the list of room numbers
    function getRoomList() public view returns(uint[] memory){
        return roomList;
    }

    //get the details of the room
    function viewRoomDetails(uint _roomNumber) public view returns(Rooms memory){
        return roomNumber[_roomNumber];
    }

    //see if room is vacant or not
    function checkAvailability(uint _roomNumber) public view returns(roomStatus){
        return statusOfRoom[_roomNumber];
    }

    //book a room
    function bookRoom(uint _roomNumber) public isVacant(_roomNumber){
        mapBooking[_roomNumber] = msg.sender;
        statusOfRoom[_roomNumber] = roomStatus.OCCUPIED;
    }

    function checkout(uint _roomNumber) public isRoomOwner(_roomNumber){
        delete mapBooking[_roomNumber];
        statusOfRoom[_roomNumber] = roomStatus.VACANT;
    }
    modifier isVacant(uint _roomNumber){
        require(statusOfRoom[_roomNumber] == roomStatus.VACANT,"Cannot book room as it is occupied");
        _;
    }

    modifier isRoomOwner(uint _roomNumber){
        require(mapBooking[_roomNumber] == msg.sender,"Cannot checkout, not the owner");
        _;
    }
}