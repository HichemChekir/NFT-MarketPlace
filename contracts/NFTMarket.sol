// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract NFTMarket is ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemSold;

    address payable owner;
    uint256 listingPrice = 0.025 ether;


    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated (
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold
    );

    function getListingPrice() public view returns(uint256){
        return listingPrice;
    }


    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price) public payable nonReentrant{
            require(price > 0, "Price must be at least 1 wei");
            require(msg.value == listingPrice, "Price must be equal to listing price");
            
            //
            _itemIds.increment();
            //itemId the ID for the marketplace item that is going on sale
            uint256 itemId = _itemIds.current();


            //create the marketitem
            idToMarketItem[itemId] = MarketItem(
                itemId,
                nftContract,
                tokenId,
                payable(msg.sender), // address of the seller available in the transaction
                payable(address(0)), // owner being set to an empty address cuz the nft is not sold yet 
                price,
                false
            );

            //transfer the ownership of the ft to the contract
            //transfer from msg.sender to the contract itself
            IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

            emit MarketItemCreated(
                itemId,
                nftContract,
                tokenId,
                msg.sender,
                address(0),
                price,
                false
            );

        }

    
   
    function createMarketSale(
        address nftContract,
        uint256 itemId
    ) public payable nonReentrant {
        // get the price and tokenId from the mapping
        uint price = idToMarketItem[itemId].price;
        uint tokenId = idToMarketItem[itemId].tokenId;


        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        //transfer the value of the transaction to the seller
        idToMarketItem[itemId].seller.transfer(msg.value);
        //transfer ownership of the token
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        //set the local value of the owner to the msg.sender
        idToMarketItem[itemId].owner = payable(msg.sender);

        _itemSold.increment();

        //pay the owner of the contract
        payable(owner).transfer(listingPrice);
    }

    function fetchMarketItems() public view returns(MarketItem[] memory){
        uint itemCount = _itemIds.current();
        uint unsoldItemCount = _itemIds.current() - _itemSold.current();
        uint currentIndex = 0;

        //create an array with the unsold market items
        MarketItem[] memory items = new MarketItem[](unsoldItemCount);

        for (uint i = 0; i < itemCount; i++){
            if (idToMarketItem[i+1].owner == address(0)){
                uint currentId = idToMarketItem[i+1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
            }
        }
        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++){
            if (idToMarketItem[i+1].owner == msg.sender ){
                itemCount++;
            }
        }

        MarketItem[] memory items = new MarketItem[] (itemCount);
        for (uint i = 0 ; i < totalItemCount; i++) {
            if (idToMarketItem[i+1].owner == msg.sender) {
                uint currentId = idToMarketItem[i+1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex+=1;
            }
        }
        return items;
    }

    function fetchItemsCreated() public view returns(MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0; // this will represent the items that the persion created
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++){
            if (idToMarketItem[i+1].seller == msg.sender ){
                itemCount++;
            }
        }

        MarketItem[] memory items = new MarketItem[] (itemCount);
        for (uint i = 0 ; i < totalItemCount; i++) {
            if (idToMarketItem[i+1].seller == msg.sender) {
                uint currentId = idToMarketItem[i+1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem; // Insert the item into the array
                currentIndex+=1;
            }
        }
        return items;
    }
}