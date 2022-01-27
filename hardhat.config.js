require("@nomiclabs/hardhat-waffle");

const fs = require('fs')
const privateKey = fs.readFileSync(".secret").toString().trim() || "01234567890123456789"

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,

    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey]
    },


    solidity: {
      version: "0.8.4",
      settings: {
        optomizer: {
          enable: true,
          runs: 200,
        }
      }
    }
  },
};
