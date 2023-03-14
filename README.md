# Sample-Hardhat-project

## Introduction
This is a sample project that demonstrates how to use Hardhat, an Ethereum development environment, to build and test smart contracts. The project includes smart contract for managing a hotel booking system on the Ethereum blockchain. It allows the hotel owner to add room details, check room availability, and book and checkout rooms.

## Installation
To get started, you'll need to install Hardhat and its dependencies:
```
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-waffle
```
## Usage
To compile the smart contracts:
```
npx hardhat compile

```

To run the tests:

```
npx hardhat test

```
## Deployment
To deploy the smart contracts to the Goerli testnet, you'll need to add the Goerli network to the hardhat.config.js file. Here are the steps to do that:
1. Open the hardhat.config.js file in your text editor.
2. Find the networks object and add the following code:
```
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
```
3. Save the hardhat.config.js file.
To deploy the smart contracts to the Goerli network, run the following command:
```
npx hardhat run --network goerli scripts/deploy.js

```
