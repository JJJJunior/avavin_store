"use client";
import { ProductType } from "@/lib/types";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeartFavorite from "./HeartFavorite";
import { UserType } from "@/lib/types";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updateUser: UserType) => void;
}
const ProductCard: React.FC<ProductCardProps> = ({ product, updateSignedInUser }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="w-[220px] flex flex-col gap-6 cursor-pointer hover:border border-gray-300 rounded-lg hover:shadow-lg p-2 transition transform duration-300 ease-in-out hover:scale-105"
    >
      <Image
        src={product.media.split(",")[0]}
        alt={"product"}
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover"
      />
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body-bold">${product.price}</p>
        <HeartFavorite productInfo={product} updateSignedInUser={updateSignedInUser} />
      </div>
    </div>
  );
};

export default ProductCard;
