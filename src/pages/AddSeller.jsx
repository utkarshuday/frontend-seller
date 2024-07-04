import { useState } from 'react';
import { QRReader } from '../components/QRReader';
import QrScanner from 'qr-scanner';
import { getSeller } from '../requests';
import { useUser } from '../context/hooks';
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
import contractJson from '../data/App.json';
import { ethers } from 'ethers';
export default function AddSeller() {
  const [showReader, setShowReader] = useState(false);
  const [qrResult, setQrResult] = useState(null);
  const [sellerWalletAddress, setSellerWalletAddress] = useState('');
  const { user } = useUser();
  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const result = await QrScanner.scanImage(file);
      console.log(result);
      setQrResult(result);
    } catch (err) {
      setQrResult(null);
    }
  };
  async function handleForm(e) {
    e.preventDefault();
    const data = await getSeller(sellerWalletAddress);
    console.log(qrResult);
    console.log(data.id);
    if (!data) return;
    const contract = new ethers.Contract(
      contractAddress,
      contractJson.abi,
      user.signer
    );
    const tx = await contract.addSeller(qrResult, data.id);
    await tx.wait();
  }
  return (
    <div>
      Seller
      <button onClick={() => setShowReader(res => !res)}>Show Scanner</button>
      <button>
        <input type='file' accept='image/*' onChange={handleFileChange} />
      </button>
      <form onSubmit={handleForm}>
        <input
          type='text'
          value={sellerWalletAddress}
          onChange={e => setSellerWalletAddress(e.target.value)}
          placeholder='Wallet Address'
        />
        <button>Add Seller</button>
      </form>
      {showReader && <QRReader setQrResult={setQrResult} />}
      {qrResult}
    </div>
  );
}
