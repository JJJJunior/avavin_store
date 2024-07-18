import React from "react";
import { getProductDetails } from "@/lib/actions";
import Gallery from "@/components/Gallery";
import { ProductType } from "@/lib/types";
import ProductInfo from "@/components/ProductInfo";
import { getRelatedProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";

interface productDetailsProps {
  params: { productId: string };
}
const ProductDetails: React.FC<productDetailsProps> = async ({ params }) => {
  const productDetails: ProductType = await getProductDetails(params.productId);
  const relatedProducts = await getRelatedProducts(params.productId);
  if (!productDetails) {
    return <div>Product not found</div>;
  }
  return (
    <>
      <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <Gallery productMedia={productDetails.media} />
        <ProductInfo productInfo={productDetails} />
      </div>
      <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
        <p className="text-heading3-bold">Related Products</p>
        <div className="flex flex-wrap px-6 gap-16 max-auto mt-8">
          {relatedProducts?.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
