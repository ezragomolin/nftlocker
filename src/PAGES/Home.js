import './Home.css'
import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  
  var numLockedNft = 1450;
  
  const navigate = useNavigate();

  const navigateToUnstakedAssets = () => {
  
  navigate('/unstakedassets');
};

return (
  <div className="home">\
   
    <link href="https://fonts.cdnfonts.com/css/poppins" rel="stylesheet"/>
  
                
    
      <p id='secure'>Secure Your NFTs with</p>
      <p id='nftlocker'> NFT LOCKER</p>
      <p id='m'> Connect through your MetaMask wallet View your NFT's, lock your assets</p>
      <p id='nnfftt'> Our goal is to allow people to have security while owning their assets, which can potentially be very valuable</p>
    

    <div class="float-container">

      <div class="home-img">
      </div>
      
      <p id="lock-purp">Lock</p>
      <p id="rest">your NFTs for a period of time. </p>
      <p id="rest-or"> Or lock them indefinitely only to be unlocked whenever you choose.</p>

      <div class="indicator">

      </div>

      <p id="num-locked"> {numLockedNft} NFTs locked.</p>

  </div>
      
  <button onClick={navigateToUnstakedAssets} class="buttonOne"> <span class = "launch">Launch App</span></button> 
  </div>
    
  );
};


export default Home; 
