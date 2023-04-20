import './UnstakedAssets.css'
import React from "react";
import { useState } from "react";
import {
  searchNfts,
  connectWallet,
  searchLockedNfts,
  LockYourNFT,
  UnlockYourNFT
} from "../BLOCKCHAINFUNCTIONS/blockchainActions.js";
import { getToPathname } from '@remix-run/router';

var mode = 0;

function daysToSeconds(days) {
  const secondsInDay = 24 * 60 * 60;
  const seconds = days * secondsInDay;
  return seconds;
}

function daysUntil(timestamp) {
  const now = Math.floor(Date.now() / 1000); // current timestamp in seconds
  const diffSeconds = timestamp - now;
  const diffDays = Math.ceil(diffSeconds / (24 * 60 * 60)); // 24 hours * 60 minutes * 60 seconds
  return diffDays;
}



const UnstakedAssets = () => {
  const [walletAddress, setWallet] = useState("");
  const [nftsOwned, setNftsOwned] = useState([]);
  const [nftsLocked, setNftsLocked] = useState([]);
  const hexToDecimal = hex => parseInt(hex, 16);


  const connectMetamask = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address); 
    mode =1;
    getNfts();
  };

  const getNfts = async() =>{
    try {
      setNftsOwned((await searchNfts(walletAddress)).ownedNfts)
      console.log(nftsOwned)
      console.log("done")
      mode =1;
      
    } catch (error) {
    console.log(error)
    }
    mode=1;
    try {
      setNftsLocked((await searchLockedNfts(walletAddress)))
      console.log(nftsLocked)
      console.log("done")
      mode = 1;
    } catch (error) {
    console.log(error)
    }
  }

  const getNftsLocked = async() =>{
    mode=1;
    try {
      setNftsLocked((await searchLockedNfts(walletAddress)))
      console.log(nftsLocked)
      console.log("done")
      mode = 1;
    } catch (error) {
    console.log(error)
    }
  }

  function unlockNft(tokenId, contractAdd){
    console.log(contractAdd);
    console.log(tokenId);
    // Show the loading modal
    var loadingModal = document.getElementById("loading-modal2");
    loadingModal.style.display = "block";
    // Call the LockYourNFT function
    UnlockYourNFT(tokenId, contractAdd, walletAddress)
        .then(() => {
            // Hide the loading modal when LockYourNFT is finished executing
            loadingModal.style.display = "none";
        })
        .catch((error) => {
            // Handle errors here
            console.error(error);
            // Hide the loading modal when an error occurs
            loadingModal.style.display = "none";
        });
  }

  function stakeNft(nameOfNft,imageSource,contractAdd, tokenId, time){
    console.log(nameOfNft);
    console.log(imageSource)
    console.log(contractAdd);
    console.log(tokenId);
    console.log(time);
     // Show the loading modal
    var loadingModal = document.getElementById("loading-modal");
    loadingModal.style.display = "block";
    closeFullImg();
    // Call the LockYourNFT function
    LockYourNFT(tokenId, time, contractAdd, imageSource)
        .then(() => {
            // Hide the loading modal when LockYourNFT is finished executing
            loadingModal.style.display = "none";
        })
        .catch((error) => {
            // Handle errors here
            console.error(error);
            // Hide the loading modal when an error occurs
            loadingModal.style.display = "none";
        });
  }

  function getImage(nft){
    var image = ""
    if(nft.media[0].raw.substring(0,7) === "ipfs://"){
        image = 'https://gateway.pinata.cloud/ipfs/'.concat(nft.media[0].raw.substring(7))
      } else{
        image = nft.media[0].raw
      }
      return image;
  }

  function getLockedImage(nft){
    return nft.imageLink;
  }

  function getName(nft){
   
      return nft.metadata.name;
  }

  function getDescription(nft) {
    return nft.description;
  }

  function getAddress(nft){
    return nft.contract.address;
  }

  function getTokenId(nft){
    return hexToDecimal(nft.id.tokenId);
  }


var currentIndex;
var prevIndex;
var contractAdd;
var tokenId;
var nameOfNft;
var imageSrc;
var nftdescription;


  function openFullImg(theNFT,index, nftarray) {
    console.log("Opened full image")
    console.log("Current index:",index)
    console.log("NFT:",theNFT)
    var fullImgBox = document.getElementById("fullImgBox")
    var fullImg = document.getElementById("fullImg")
    var name2 = document.getElementById("name2")
    var fullboxdescription = document.getElementById("fullboxdescription")
    var imageSource = getImage(theNFT)
    imageSrc = imageSource
    nameOfNft = getName(theNFT)
    contractAdd = getAddress(theNFT)
    tokenId = getTokenId(theNFT)
    nftdescription = getDescription(theNFT)
    fullImg.src = imageSource
    name2.innerHTML="Name: "+ getName(theNFT);
    fullboxdescription.innerHTML="Description: "+ getDescription(theNFT);
    fullImgBox.style.display = "flex";
    if (prevIndex != null) {
      console.log("Prev Index:", prevIndex)
    }
    currentIndex = index;
    buttonVisibility(currentIndex, nftarray.length)
   
  }

  function closeFullImg() {
    console.log("closed full image");
    var fullImgBox = document.getElementById("fullImgBox")
    fullImgBox.style.display = "none";
    prevIndex = currentIndex;
  }

  function goNextImg(nftarray) {
    console.log("Changed next image")
    console.log("Current index", currentIndex + 1)
    var next = nftarray[currentIndex+1]
    console.log("NFT:",next)
    var fullImg = document.getElementById("fullImg")
    var name2 = document.getElementById("name2")
    var fullboxdescription = document.getElementById("fullboxdescription")
    var imageSource = getImage(next)
    imageSrc = imageSource
    nameOfNft = getName(next)
    nftdescription = getDescription(next)
    fullImg.src = imageSource
    contractAdd = getAddress(next)
    tokenId = getTokenId(next)
    name2.innerHTML="Name: "+ getName(next);
    fullboxdescription.innerHTML="Description: "+ getDescription(next);
   
    console.log(fullImg.src)
    prevIndex = currentIndex
    currentIndex = currentIndex + 1
    console.log("Prev Index:", prevIndex)
    buttonVisibility(currentIndex, nftarray.length)
  }

  function goPrevImg(nftarray) {
    console.log("Changed prev image")
    console.log("Current index", currentIndex - 1)
    var prev = nftarray[currentIndex-1]
    console.log("NFT:",prev)
    var fullImg = document.getElementById("fullImg")
    var name2 = document.getElementById("name2")
    var fullboxdescription = document.getElementById("fullboxdescription")
    var imageSource = getImage(prev)
    imageSrc = imageSource
    nameOfNft = getName(prev);
    nftdescription = getDescription(prev)
    fullImg.src = imageSource
    contractAdd = getAddress(prev)
    tokenId = getTokenId(prev)
    name2.innerHTML="Name: "+ getName(prev);
    fullboxdescription.innerHTML="Description: "+ getDescription(prev);
    
    console.log(fullImg.src)
    prevIndex = currentIndex
    currentIndex = currentIndex - 1
    console.log("Prev Index:", prevIndex)
    buttonVisibility(currentIndex, nftarray.length)
  }

  function buttonVisibility(currIndex, arraylength) {
    var prevButton = document.getElementById("prevImg")
    var nextButton = document.getElementById("nextImg")

    if (currIndex == 0) {
      prevButton.style.display = "none"
      if (prevIndex == (arraylength - 1)) {
        nextButton.style.display = "flex"
      }
    }
    else if (currIndex == (arraylength - 1)) {
      nextButton.style.display = "none"
      if (prevIndex == 0) {
        prevButton.style.display = "flex"
      }
    }
    else {
      prevButton.style.display = "flex"
      nextButton.style.display = "flex"
    }
  }


  
  let unstakedNfts = null;
  let stakedNfts = null;
  if(mode ==1){
  if(nftsOwned.length!=0){
    unstakedNfts = null;
    unstakedNfts=nftsOwned.map((nft, index, element)=>{

    return <div class="asset" key={index}> 

    <div class="img-gallery-pics">
      <img src = {getImage(nft)} onClick ={() => openFullImg(nft,index, element)}  alt=""></img>
    </div>
    
    <div class="full_img" id="fullImgBox">
      <img src={getImage(nft)} id="fullImg" ></img>
      <p class="nftName2" id="name2">{"Name: " + getName(nft)} </p>
      <p id="fullboxdescription"> {"Description:" + getDescription(nft)} </p>
      <p id='instruct'> <b>Enter the number of days you are <br></br>going to lock this NFT for.</b><br></br>If you would like to lock your NFT indefinitly, <br></br>please input 0 below.<br></br>You'll be able to unlock it anytime you want!</p>
      <input id='daysField'  placeholder='Days to Lock' type="number"></input> 
      <button id="lockit" onClick={() => stakeNft(nameOfNft || "",imageSrc || "", contractAdd || "",tokenId || "", daysToSeconds(document.getElementById("daysField").value))}>LOCK IT!</button>
      <span onClick={closeFullImg}>X</span>
      <button onClick={() => goNextImg(element)} id="nextImg">&#62;</button>
      <button onClick={() => goPrevImg(element)} id="prevImg">&#60;</button>
    </div>


    <div >
      <p class='nftName'> {nft.metadata.name}</p>
    </div>
  
    </div>
    
    
    })
    console.log(unstakedNfts[0]);
  }
} 
 if(mode == 1) {
  stakedNfts = null;
  //deal with these NFTs differently based on struct
  if(nftsLocked.length!=0){
  stakedNfts=nftsLocked.map((nft)=>{
    console.log(nft);
    return <div class="asset2" > 


       <div class="locked-gallery">
       
        <img src = {getLockedImage(nft)} alt=""></img>
        
      </div>

     <div >
      {/* <p class='nftName'> {nft.add}</p> */}
      <p class ='nftName3'>Contract Address: {nft.add}</p>
      <p class ='nftName3'>TokenId: {nft.tokenId}</p>
      {/* use days until function from nft. time left  */}
       <p class='nftName3'>Days Left: {daysUntil(nft.withdrawDate)}</p>
       <div class = 'button-container'>
       <button  class="lockit" onClick={() => unlockNft(nft.tokenId || "",nft.add || "")}>Unlock NFT</button>
       </div>
     </div>

   </div>
   

    })
  }

  
}



return (
    <div className="UnstakedAssets">  
      <div id="loading-modal" class="modal">
         <div class="modal-content">
         <p>Please Confirm Transactions In Metamask<br/><br/> 2 Transactions Are Required<br/><br/> Approve & Lock <br/><br/> Loading...</p>
         </div>
      </div>

      <div id="loading-modal2" class="modal">
         <div class="modal-content">
         <p>Please Confirm Transactions In Metamask<br/><br/> 1 Transactions is Required<br/><br/> Unlock <br/><br/> Loading...</p>
         </div>
      </div>

      <button class="button" onClick={getNfts}>LOAD NFTS</button>
      <button class="connectbutton" onClick={connectMetamask}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <div class='container'>
      <div class="img-gallery">{unstakedNfts}</div>
      <div class="locked-gallery">{stakedNfts}</div> 
      </div>
    </div>


    
    
  );
};


export default UnstakedAssets;
