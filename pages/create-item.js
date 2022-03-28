import {useState} from 'react'
import {ethers} from 'ethers'
// a way to interact with ipfs
import {create as ipfsHttpClient } from 'ipfs-http-client'
// allow to route to different routes 
import {useRouter} from 'next/router'
import Web3Modal from 'web3modal'



coonst client = ipfsHttpClient('')