"use client";
import React from "react";
import Link from "next/link";
import useCart from "@/lib/hooks/useCart";
import { useEffect } from "react";
const SuccessPayment = () => {
  const cart = useCart();

  useEffect(() => {
    // Clear the cart after successful payment
    cart.clearCart();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <p className="text-heading4-bold text-red-1">Successful Payment</p>
      <p>Thank your for you puchase</p>
      <Link href="/" className="p-4 text-base-bold hover:bg-black hover:text-white">
        CONTINUE TO SHOPPING
      </Link>
    </div>
  );
};

export default SuccessPayment;
