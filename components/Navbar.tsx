"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Menu, CircleUserRound } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import useCart from "@/lib/hooks/useCart";

const Navbar = () => {
  const { user } = useUser();
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const cart = useCart();

  return (
    <div className="sticky px-8 py-6 top-0 z-10  flex justify-between items-center bg-white">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={230} height={200} />
      </Link>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div className="relative flex gap-3 items-center">
        <Link
          href="/cart"
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
        </Link>
        {user && <Menu className="cursor-pointer" onClick={() => setDropdownMenu(!dropdownMenu)} />}

        {user && dropdownMenu && (
          <div className="absolute flex flex-col gap-2 rounded-lg border bg-white text-base-bold">
            <Link href="/wishlist" className="hover:text-red-1">
              Wishlist
            </Link>
            <Link href="/orders" className="hover:text-red-1">
              Orders
            </Link>
          </div>
        )}

        {user ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
