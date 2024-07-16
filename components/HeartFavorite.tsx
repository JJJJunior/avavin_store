"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ProductType, UserType } from "@/lib/types";
import { Heart } from "lucide-react";

interface HeartProps {
  productInfo: ProductType;
}

const HeartFavorite: React.FC<HeartProps> = ({ productInfo }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [singedInUser, setSingedInUser] = useState<UserType | null>(null);
  const [isLinked, setIsLinked] = useState<boolean>(false);
  const router = useRouter();
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users");
      const data = res.data;
      setSingedInUser(data);
      setIsLinked(data.wishlist.split(",").includes(productInfo.id));
    } catch (err) {
      console.error("[users_GET]:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLike = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.stopPropagation();
    evt.preventDefault();
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        const res = await axios.post("/api/users/wishlist", { productId: productInfo.id });
        const updateUser = res.data;
        setSingedInUser(updateUser);
        setIsLinked(updateUser.wishlist.split(",").includes(productInfo.id));
      }
    } catch (err) {
      console.error("[wishlist_POST]:", err);
    } finally {
      setLoading(false);
      getUser();
    }
  };

  return (
    <button onClick={handleLike}>
      <Heart fill={`${isLinked ? "red" : "white"}`} />
    </button>
  );
};

export default HeartFavorite;
