require("@nomiclabs/hardhat-waffle");

const fs = require('fs')
const privateKey = fs.readFileSync(".secret").toString().trim() || "01234567890123456789"

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {/*
  defaultNetwork: "matic",
  networks: {
    hardhat: {
      chainId: 1337,

    },*/
    mumbai: {
      url: "https://ropsten.infura.io/v3/8ed7da6d4abe472a9668f831032ca04d",
      accounts: "1db2332a12a558f9380f232f8548abfc5f2b982a5cd0bb57b293843c8224344f"
    },

  
    solidity: {
      version: "0.8.3",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        }
      }
    }
  };
