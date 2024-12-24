import axiosClient from "./axiosClient";

const HistoryAPI = {
  // Lấy danh sách lịch sử đơn hàng, có thể truyền query (param) nếu cần
  getHistoryAPI: (query) => {
    const url = `/orders`;
    return axiosClient.get(url, {
      params: query, // Thêm query vào params nếu có
      withCredentials: true,
    });
  },

  // Lấy chi tiết đơn hàng theo id
  getDetail: (id) => {
    const url = `/orders/${id}`;
    return axiosClient.get(url, {
      withCredentials: true,
    });
  },

  // Lấy tất cả các đơn hàng (có thể sử dụng khi không cần query)
  getAll: () => {
    const url = `/orders`;
    return axiosClient.get(url, {
      withCredentials: true,
    });
  },
};

export default HistoryAPI;
