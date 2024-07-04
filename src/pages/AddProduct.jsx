import { useState } from 'react';
import Input from '../components/Input';
import { useUser } from '../context/hooks';
import { createProduct } from '../requests';
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
import contractJson from '../data/App.json';
import { ethers } from 'ethers';
import QRGenerator from '../components/QRGenerator';
export default function AddProduct() {
  const { user } = useUser();
  const { signer } = user;
  const [productName, setProductName] = useState('');
  // const [manufactureDate, setManufactureDate] = useState('');
  const [productType, setProductType] = useState('');
  const [brandName, setBrandName] = useState('');
  const [productId, setProductId] = useState('');
  const handleForm = async e => {
    e.preventDefault();
    // add product in db
    const data = await createProduct({
      name: productName,
      type: productType,
      brand: brandName,
    });
    const contract = new ethers.Contract(
      contractAddress,
      contractJson.abi,
      signer
    );
    // add product on blockchain
    const tx = await contract.createProduct(data.id);
    await tx.wait();
    setProductId(data.id);
    setProductName('');
    setProductType('');
    setBrandName('');
  };
  return (
    <div>
      Product
      <form onSubmit={handleForm}>
        <Input
          type='text'
          placeholder='Product Name'
          value={productName}
          onChange={e => setProductName(e.target.value)}
        />
        <Input
          type='text'
          placeholder='Product Type'
          value={productType}
          onChange={e => setProductType(e.target.value)}
        />
        <Input
          type='text'
          placeholder='Brand Name'
          value={brandName}
          onChange={e => setBrandName(e.target.value)}
        />
        <button>Add</button>
      </form>
      {productId && <QRGenerator value={productId} />}
    </div>
  );
}
