import React from 'react';
import axios from "axios";
import ProductCard from '@/components/ProductCard'

const SearchDetailPage = async ({params}: { params: { query: string } }) => {

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/search/${params.query}`);

  const searchedProducts = res.data;

  return (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Search results for {params.query}</p>
      <div className="flex flex-wrap justify-between gap-16">
        {!searchedProducts || searchedProducts.length === 0 && (
          <p className="text-body-bold my-5">No result found</p>
        )}
        {searchedProducts?.map((product: any) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </div>
  );
};

export default SearchDetailPage;