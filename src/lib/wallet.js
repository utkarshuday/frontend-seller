import { ethers } from 'ethers';
import { getSeller } from '../requests';
import axios from 'axios';

export async function connectWallet() {
  try {
    const ethereum = window.ethereum;
    if (typeof ethereum === 'undefined') {
      console.error(
        'MetaMask not found. Please install MetaMask to use this application.'
      );
      return;
    }
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    console.log('Connected to MetaMask!', accounts);
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    // const message = `Login with address: ${accounts[0]}`;
    // if (!localStorage.getItem('token')) {
    //   const signature = await signer.signMessage(message);
    const res = await axios.post('http://localhost:8000/v1/sellers/login', {
      address: accounts[0],
    });
    //   console.log(res);
    //   localStorage.setItem('token', res.data.token);
    // }
    const data = await getSeller(accounts[0]);

    return { account: accounts[0], provider, signer, data };
  } catch (error) {
    console.error(error);
  }
}

export function checkConnection() {}

export async function changeWallet(accounts) {
  try {
    const ethereum = window.ethereum;
    if (typeof ethereum === 'undefined') {
      console.error(
        'MetaMask not found. Please install MetaMask to use this application.'
      );
      return;
    }
    // const accounts: string[] = await ethereum.request({
    //   method: 'eth_requestAccounts',
    // });
    console.log('Connected to MetaMask!', accounts);
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const data = await getSeller(accounts[0]);
    return { account: accounts[0], provider, signer, data };
  } catch (error) {
    console.error(error);
  }
}

// const message = `Login with address: ${accounts[0]}`;
// const signature = await signer.signMessage(message);
// const res = await axios.post('http://localhost:8000/v1/sellers/login', {
//   address: accounts[0],
//   signature,
// });
