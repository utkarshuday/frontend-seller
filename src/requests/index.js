import axios from 'axios';

const URL = 'http://localhost:8000/v1';

export async function getSeller(address) {
  const res = await axios.get(`${URL}/sellers/${address}`);
  return res.data;
}

export async function createProduct(product) {
  const res = await axios.post(`${URL}/sellers/products`, product);
  return res.data;
}

export async function getProduct(id) {
  const res = await axios.get(`${URL}/consumers/${id}`);
  return res.data;
}
