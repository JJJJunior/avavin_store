import React from "react";
import { getProductDetails } from "@/lib/actions";
import Gallery from "@/components/Gallery";
import { ProductType } from "@/lib/types";
import ProductInfo from "@/components/ProductInfo";

interface productDetailsProps {
  params: { productId: string };
}
const ProductDetails: React.FC<productDetailsProps> = async ({ params }) => {
  const productDetails: ProductType = await getProductDetails(params.productId);
  if (!productDetails) {
    return <div>Product not found</div>;
  }
  return (
    <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
      <Gallery productMedia={productDetails.media} />
      <ProductInfo productInfo={productDetails} />
    </div>
  );
};

export default ProductDetails;
