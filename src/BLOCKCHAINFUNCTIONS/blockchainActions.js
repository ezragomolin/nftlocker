import React from "react";
import abi from './approveABI.json';
import lockabi from './lockABI.json';
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(
    `https://eth-goerli.g.alchemy.com/v2/58ihUjGTtxntmIDzwJW8pdWOjjus8Umg`,
  );
  
  export const LockYourNFT = async(tokenId, time, contractAddress, imageSource) =>{
    const contract = new web3.eth.Contract(abi, contractAddress);
    //create instance of new contract (replace abi with lockabi, hardcode address)
    const lockcontract = new web3.eth.Contract(lockabi, "0x9D43Ea778D40CdF30EFf1ab5C1d70B2Ca712a55d");
    const owner = await contract.methods.ownerOf(tokenId).call();
    const result = await contract.methods.approve("0x9D43Ea778D40CdF30EFf1ab5C1d70B2Ca712a55d", tokenId).send({ from: owner });
    const txHash = result.transactionHash;
    await web3.eth.getTransactionReceipt(txHash);
    //Replace This With Lock Function (stake721)
    const result2 = await lockcontract.methods.stake721(tokenId, time, contractAddress, imageSource).send({ from: owner });
    const txHash2 = result2.transactionHash;
    await web3.eth.getTransactionReceipt(txHash2);
  }

  //Replace with unlock nft from contract
  export const UnlockYourNFT = async(tokenId, contractAddress, owner) =>{
    //create instance of new contract (replace abi with lockabi, hardcode address)
    const lockcontract = new web3.eth.Contract(lockabi, "0x9D43Ea778D40CdF30EFf1ab5C1d70B2Ca712a55d");
    //Replace This With Lock Function (stake721)
    const result = await lockcontract.methods.withdraw721(tokenId, contractAddress).send({ from: owner });
    const txHash = result.transactionHash;
    await web3.eth.getTransactionReceipt(txHash);
  }

//Uses Alchemy API to GET a users Owned NFTs
export const searchNfts = async(address) => {
    const usersNfts = web3.alchemy.getNfts({
      owner: address
    });
    return usersNfts;
}

//replace this function with reading from our smart contract
export const searchLockedNfts = async(address) =>{
  //create instance of new contract (replace abi with lockabi, hardcode address)
  const lockcontract = new web3.eth.Contract(lockabi, "0x9D43Ea778D40CdF30EFf1ab5C1d70B2Ca712a55d");
  const usersNfts =  await lockcontract.methods.getLockedAssetsForAddress(address).call();
  console.log(usersNfts);
  return usersNfts;

}

//Connect Wallet Function (Our version of signing IN)
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }

};

