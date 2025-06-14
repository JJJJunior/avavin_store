import React from "react";
import { getProducts } from "@/lib/actions";
import { ProductType } from "@/lib/types";
import ProductCard from "./ProductCard";

const Productlist = async () => {
  const products = await getProducts();
  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Products</p>
      {!products || products.length === 0 ? (
        <p className="text-body-bold">No products found</p>
      ) : (
        <div className="flex flex-wrap mx-auto gap-16">
          {products.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Productlist;
