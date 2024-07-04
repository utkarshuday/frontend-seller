import { useState } from 'react';
import { useUser } from '../context/hooks';
import { ethers } from 'ethers';
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
import contractJson from '../data/App.json';
import axios from 'axios';

export default function CreateSeller() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const { user, setUser } = useUser();
  const { signer } = user;
  const handleForm = async e => {
    e.preventDefault();
    const contract = new ethers.Contract(
      contractAddress,
      contractJson.abi,
      signer
    );
    console.log(user.account);
    const result = await axios.put(
      `http://localhost:8000/v1/sellers/${user.account}`,
      {
        name,
        place: address,
        phoneNumber,
      }
    );
    const data = result.data;
    const tx = await contract.createSeller(data.id);
    await tx.wait();
    setUser(res => ({ ...res, data }));
    console.log('transaction completed');
  };
  return (
    <form onSubmit={handleForm}>
      <input
        type='text'
        placeholder='Seller Name'
        value={name}
        className='border border-black mt-2 ml-2 px-2'
        onChange={e => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Address'
        value={address}
        className='border border-black mt-2 ml-2 px-2'
        onChange={e => setAddress(e.target.value)}
      />
      <input
        type='text'
        placeholder='Phone number'
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        className='border border-black mt-2 ml-2 px-2'
      />
      <button className='border border-black mt-2 ml-2 px-2'>Create</button>
    </form>
  );
}
