"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { ProductType, UserType } from "@/lib/types";
import axios from "axios";
import { getProductDetails } from "@/lib/actions";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";

const WishlistPage = () => {
  const { user } = useUser();
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  const getUser = async () => {
    try {
      const res = await axios.get("/api/users");
      if (res.status === 200) {
        setSignedInUser(res.data);
      }
    } catch (err) {
      console.log("[users_GET]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const getWishlistProducts = async () => {
    setLoading(true);
    if (!signedInUser) return;
    const wishlistProducts = await Promise.all(
      signedInUser.wishlist.split(",").map(async (productId) => {
        const res = await getProductDetails(productId);
        return res;
      })
    );
    setWishlist(wishlistProducts);
    setLoading(false);
  };

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts();
    }
  }, [signedInUser]);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      {wishlist.length === 0 && <p>No items in your wishlist</p>}
      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
