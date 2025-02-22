import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (product) => {
    if (!product.name || !product.price || !product.image) {
      return { success: false, message: "Please provide all field values" };
    }
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    set((state) => ({
      products: [...state.products, data?.data],
    }));

    return { success: true, message: "Product created" };
  },
  fetchProducts: async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    set({ products: data.products });
  },
  deleteProduct: async (productId) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!data.success) return { success: false, message: data?.message };

    set((state) => ({
      products: state.products.filter((item) => item._id !== productId),
    }));
    return { success: true, message: "Product deleted" };
  },
  updateProduct: async (productId, updatedProduct) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await response.json();
    if (!data.success) return { success: false, message: data?.message };

    set((state) => ({
      products: state.products.map((product) => {
        return product?._id === productId ? data?.data : product;
      }),
    }));
  },
}));
