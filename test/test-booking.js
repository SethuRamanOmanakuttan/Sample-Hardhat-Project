const {ethers} = require("hardhat")
const { expect } = require("chai");

describe('Test Web3booking contract', function () {
  let web3BookingArtifact;
  let contractDeploy;
  let owner;
  let addr1;
  //setting the env for the test
  beforeEach(async function () {
      [owner,addr1,addr2] = await ethers.getSigners(); //get a couple of address

       web3BookingArtifact = await ethers.getContractFactory("Web3Booking")
       contractDeploy = await web3BookingArtifact.connect(owner).deploy()
       await contractDeploy.deployed();
  });


  it('Test the addRoomDetails function', async function () {
        await contractDeploy.addRoomDetails(101,2,true,1000);
        expect(await contractDeploy.getRoomList()).to.deep.equal([ethers.BigNumber.from(101)])  
  });


  it('test bookroom function', async function(){
        await contractDeploy.addRoomDetails(101,2,true,1000);
        await contractDeploy.connect(addr1).bookRoom(101)
        expect(await contractDeploy.mapBooking(101)).to.equal(addr1.address)
        expect(await contractDeploy.checkAvailability(101)).to.equal(0)

  })

  it('test checkout function', async function(){

        await contractDeploy.addRoomDetails(101,2,true,1000);
        await contractDeploy.connect(addr1).bookRoom(101)
        await contractDeploy.connect(addr1).checkout(101)
        expect(await contractDeploy.mapBooking(101)).to.equal(ethers.constants.AddressZero) //#0000000000
        expect(await contractDeploy.checkAvailability(101)).to.equal(1)



  })


  
});