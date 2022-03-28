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