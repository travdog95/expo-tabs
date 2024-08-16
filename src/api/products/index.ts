import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

// This is a custom hook that fetches a list of products from the database.
export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

// This is a custom hook that fetches a single product from the database.
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
