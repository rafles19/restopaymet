import axios from 'axios';

const BASE_URL = 'http://192.168.43.209:3000';

export const createTransaction = async (data: any) => {
  console.log('Data to be sent:', data);
  const response = await axios.post(`${BASE_URL}/api/payments/create`, data);
  console.log('Payment Response:', response.data);
  return response.data;
};
