"use client";
import React from "react";
import useCart from "@/lib/hooks/useCart";
import Image from "next/image";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const cart = useCart();
  const user = useUser();
  const total = cart.cartItems.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity, 0);
  // 这里可以加上运费以及税率
  const subtotalRounded = parseFloat(total.toFixed(2));

  console.log(user);

  const customer = {
    clerkId: user.user?.id,
    email: user.user?.emailAddresses[0].emailAddress,
    name: user.user?.fullName,
  };

  //处理付款
  const handlePayment = async () => {
    // const customer = {};
    try {
      if (!user) {
        router.push("/sign-in");
      }
      const payData = JSON.stringify({
        cartItems: cart.cartItems,
        customer,
      });
      // console.log(payData);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, payData);
      const data = await res.data;
      window.location.href = data.url;
    } catch (err) {
      console.log("[checkout_POST]", err);
    }
  };

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />
        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No item in cart</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem, index) => (
              <div
                key={index}
                className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-6 py-5 items-center max-sm:items-start justify-between"
              >
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media.split(",")[0]}
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                    alt="product"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-sm font-semibold w-60 text-wrap">{cartItem.item.title}</p>
                    {cartItem.color && <p className="text-small-medium">{cartItem.color}</p>}
                    {cartItem.size && <p className="text-small-medium">{cartItem.size}</p>}
                    <p className="text-small-bold">${cartItem.item.price}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.decreaseQuantity(cartItem.item.id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item.id)}
                  />
                </div>
                <Trash className="hover:text-red-1 cursor-pointer" onClick={() => cart.removeItem(cartItem.item.id)} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Summary <span>{`(${cart.cartItems.length} ${cart.cartItems.length > 1 ? "items" : "item"})`}</span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Total</span>
          <span>${subtotalRounded}</span>
        </div>
        <button
          onClick={handlePayment}
          className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
