require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const privateKey = "PRIVATE-KEY"
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "goerli",
  networks:{
    goerli:{
      url: 'NODE-URL',
      accounts:[privateKey]
    }
  }
};
