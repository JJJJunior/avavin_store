import axios from "axios";
export const getCollections = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
  return await res.data;
};

export const getProducts = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  return await res.data;
};

export const getProductDetails = async (productId: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
  return await res.data;
};
