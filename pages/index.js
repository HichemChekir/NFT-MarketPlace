import {ehthers} from 'ethers'
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

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json"


export default function Home() {
  const [nfts, setNfts] = useState([]) 
  const [loadingState, setLoadingState] = useState('not-loaded')

  return (
    <div className={styles.container}>
      <h1>Home</h1>
    </div>
  )
}