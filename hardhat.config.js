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

    },
    mumbai: {
      url: "https://rinkeby.infura.io/v3/8ed7da6d4abe472a9668f831032ca04d",
      accounts: [privateKey]
    },
*/
  
    solidity: {
      version: "0.8.4",
      settings: {
        optomizer: {
          enable: true,
          runs: 200,
        }
      }
    }
  };
