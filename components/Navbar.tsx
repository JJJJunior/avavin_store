"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Menu, CircleUserRound, Search } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import useCart from "@/lib/hooks/useCart";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const { user } = useUser();
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const cart = useCart();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="sticky px-8 py-6 top-0 z-10 gap-2 flex justify-between items-center bg-white max-sm:px-2">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={230} height={200} />
      </Link>

      <div className="flex gap-6 text-base-bold max-lg:hidden">
        <Link href="/" className={`hover:text-red-1 ${pathname === "/" && "text-red-1"}`}>
          Home
        </Link>
        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className={`hover:text-red-1 ${pathname === "/wishlist" && "text-red-1"}`}
        >
          WishList
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className={`hover:text-red-1 ${pathname === "/orders" && "text-red-1"}`}
        >
          Orders
        </Link>
      </div>

      <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
        <input
          className="outline-none max-sm:max-w-[120px]"
          placeholder="Search..."
          onChange={(evt) => setQuery(evt.target.value)}
          value={query}
        />
        <button disabled={query === ""} onClick={() => router.push(`/search/${query}`)}>
          <Search className="cursor-pointer h-4 w-4 hover:text-red-1" />
        </button>
      </div>

      <div className="relative flex gap-3 items-center">
        <Link
          href="/cart"
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
        </Link>
        <Menu className="cursor-pointer lg:hidden" onClick={() => setDropdownMenu(!dropdownMenu)} />

        {dropdownMenu && (
          <div className="absolute top-10 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden">
            <Link href="/" className={`hover:text-red-1 ${pathname === "/" && "text-red-1"}`}>
              Home
            </Link>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className={`hover:text-red-1 ${pathname === "/wishlist" && "text-red-1"}`}
            >
              WishList
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className={`hover:text-red-1 ${pathname === "/orders" && "text-red-1"}`}
            >
              Orders
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
            >
              <ShoppingCart />
              <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
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
