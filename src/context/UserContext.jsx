import { useEffect, useState } from 'react';
import { UserContext } from './contexts';
import { connectWallet } from '../lib/wallet';
import { ethers } from 'ethers';
import { getSeller } from '../requests';

function UserProvider({ children }) {
  const [user, setUser] = useState({});
  // const navigate = useNavigate();

  const connectToMetaMask = async () => {
    try {
      const res = await connectWallet();
      setUser(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    connectToMetaMask();
  }, []);

  async function changeWallet(accounts) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log('Account changed');
    // const message = `Login with address: ${accounts[0]}`;
    // try {
    //   const signature = await signer.signMessage(message);
    // const res = await axios.post('http://localhost:8000/v1/sellers/login', {
    //   address: accounts[0],
    // });
    //   localStorage.setItem('token', res.data.token);
    // } catch (err) {
    //   console.log('You rejected');
    // }
    const data = await getSeller(accounts[0]);
    setUser({ account: accounts[0], provider, signer, data });
  }
  useEffect(() => {
    const ethereum = window.ethereum;
    if (typeof ethereum === 'undefined') {
      console.error(
        'MetaMask not found. Please install MetaMask to use this application.'
      );
      return;
    }
    ethereum.on('accountsChanged', changeWallet);

    return () => {
      ethereum.removeListener('accountsChanged', changeWallet);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;
