const {ethers} = require("hardhat")

const contractAddress = ""

var web3BookingArtifact;
var contract;

async function attachContract(){
	 web3BookingArtifact = await ethers.getContractFactory("Web3Booking")
	 contract = await web3BookingArtifact.attach(contractAddress)
}

async function addRoomDetails(_roomNumber,_beds,_ac,_price) {
	await attachContract()
	var txn = await contract.addRoomDetails(_roomNumber,_beds,_ac,_price);
	await txn.wait()
	console.log(`Transaction Receipt : ${JSON.stringify(txn)}`)
	return txn;
	// body...
}

async function getRoomDetails(_roomNumber){
	await attachContract()
	const roomDetails = await contract.viewRoomDetails(_roomNumber)
	console.log(`Room Details : ${roomDetails}`);
	return roomDetails;
}


async function bookRoom(_roomNumber){
	await attachContract()
	var txn = await contract.bookRoom(_roomNumber);
	await txn.wait()
	console.log(`Transaction Receipt : ${JSON.stringify(txn)}`)
	return txn;	
}

async function checkAvailability(_roomNumber){
	await attachContract()
	const status = {
		0:"Occupied",
		1:"Vacant"
	}
	const roomstatus = await contract.checkAvailability(_roomNumber);
	console.log(`Room Valiability : ${status[roomstatus]}`)
	return status[roomstatus]
}

async function checkout(_roomNumber){
	await attachContract()
	var txn = await contract.checkout(_roomNumber);
	await txn.wait()
	console.log(`Transaction Receipt : ${JSON.stringify(txn)}`)
	return txn;	
}


module.exports={
	bookRoom,
	checkout,
	checkAvailability,
	getRoomDetails
}