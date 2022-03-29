import { ethers } from 'ethers'
//const ethers = require('ethers')
// These are hooks: useState allows you to keep up with local state
// useEffect is a hook that allows you to invoke a function when a component loads
import { useEffect, useState} from 'react' 
//axios is a data fetching library
import axios from 'axios'
// web3modal allows you to connect to crypto walllets$
import Web3Modal from 'web3modal'



//we need a reference to our nft address and market address
import {
  nftaddress, nftmarketaddress
} from '../config.js'

// ABIs are essentially a json representation of our smart contrat
//it allows us to interact with it from a client side app

import NFT from '../artifacts/contracts/NFT.sol/NFT.json' assert {type:"json"}
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json" assert {type:"json"}



export default function Home() {
  const [nfts, setNfts] = useState([]) 
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(() => {
    loadNFTs()
  }, [] )


  async function loadNFTs () {
    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()

    //itemm array
    const items = await Promise.all(data.map(async i=> {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')

      let item = {
        price, 
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }

      return item
    }))

    setNfts(items)
    setLoadingState('loaded')

  }

  async function buyNft(nft) {
    // this is used to connect to the web3 wallet
    const web3Modal = new web3Modal()
    const connection = await wab3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    // we need tehe user to sign the transaction 
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')

    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
  

/*
  if (loadingState === 'loaded' && !nfts.length){
     return (
     <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
  }
  else {
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">{nft.price} ETH</p>
                  <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )}
*/
}


