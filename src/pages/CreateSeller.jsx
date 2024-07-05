import { useState } from 'react';
import { useUser } from '../context/hooks';
import { ethers } from 'ethers';
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
import contractJson from '../data/App.json';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export default function CreateSeller() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const { user, setUser } = useUser();
  const { toast } = useToast();
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
    try {
      const tx = await contract.createSeller(10);
      await tx.wait();
    } catch (err) {
      if (err?.reason)
        toast({ variant: 'destructive', description: `${err.reason}!!` });
    }
    setUser(res => ({ ...res, data }));
    console.log('transaction completed');
  };
  return (
    <>
      <div className='flex justify-center gap-4 bg-slate-900 text-slate-200 py-3 mb-8'>
        <p>Create your account</p>
      </div>
      <div className='max-w-[550px] mx-auto'>
        <form onSubmit={handleForm} className='flex flex-col gap-3'>
          <Label>Seller Name</Label>
          <Input
            type='text'
            placeholder='Seller Name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Label>Seller Address</Label>
          <Input
            type='text'
            placeholder='Address'
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <Label>Phone Number</Label>
          <Input
            type='text'
            placeholder='Phone number'
            value={phoneNumber}
            className='mb-2'
            onChange={e => setPhoneNumber(e.target.value)}
          />
          <Button>Create</Button>
        </form>
      </div>
    </>
  );
}
