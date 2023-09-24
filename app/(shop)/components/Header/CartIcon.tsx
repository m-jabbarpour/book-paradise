"use client";

import Link from "next/link";

import { useTypedSelector } from "@/redux/store";

import { ShoppingBagIcon } from "@heroicons/react/20/solid";

const CartIcon: React.FC = () => {
  const addedBooks = useTypedSelector((store) => store.cart.addedBooks);
  return (
    <Link href="/cart">
      <div className="cursor-pointer">
        <ShoppingBagIcon className="w-6 relative hover:text-primary" />
        {addedBooks.length > 0 && (
          <div className="absolute top-6 w-4 h-4 flex justify-center items-center rounded-full bg-primary text-white font-bold text-xs z-10">
            <span>{addedBooks.length}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
