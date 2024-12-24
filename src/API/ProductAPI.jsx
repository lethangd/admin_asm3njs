import axiosClient from "./axiosClient";

const ProductAPI = {
  getAPI: () => {
    const url = "/products";
    return axiosClient.get(url);
  },

  getCategory: (query) => {
    const url = `/products/category${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  getPagination: (query) => {
    const url = `/products${query}`;
    return axiosClient.get(url);
  },
  createProduct: (productData) => {
    const url = "/products/create";
    return axiosClient.post(url, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  },
  updateProduct: (id, productData) => {
    const url = `/products/update/${id}`;
    return axiosClient.put(url, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  },
  delete: (productId) => {
    const url = `/products/delete/${productId}`;
    return axiosClient.delete(url, {
      withCredentials: true,
    });
  },
};

export default ProductAPI;
