"use client";

import { Cart, CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { Plus, Minus, Loader } from "lucide-react";
import { useTransition } from "react";

const AddToCart = ({ cart, item }: { item: CartItem; cart?: Cart }) => {
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (res && !res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
    });
  };

  // Handle remove item from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      if (res && !res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
    });
  };

  // Check if item is in the cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
     {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )} Add To Cart
    </Button>
  );
};

export default AddToCart;
