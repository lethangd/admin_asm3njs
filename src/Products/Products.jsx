import React, { useEffect, useState } from "react";
import queryString from "query-string";
import ProductAPI from "../API/ProductAPI";
import Pagination from "./Component/Pagination";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: "1",
    count: "8",
    search: "",
    category: "all",
  });
  const [totalPage, setTotalPage] = useState(1);
  const [file, setFile] = useState(null);

  const history = useHistory();

  // Hàm xử lý thay đổi input search
  const onChangeText = (e) => {
    const value = e.target.value;
    setPagination({
      ...pagination,
      search: value,
    });
  };

  // Hàm chuyển trang
  const handlerChangePage = (value) => {
    setPagination({
      ...pagination,
      page: value,
    });
  };

  // Lấy dữ liệu sản phẩm từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          page: pagination.page,
          count: pagination.count,
          search: pagination.search,
          category: pagination.category,
        };
        const query = queryString.stringify(params);
        const response = await ProductAPI.getPagination(`?${query}`);

        // Cập nhật dữ liệu sản phẩm và tổng trang
        setProducts(response);
        setTotalPage(Math.ceil(response.length / parseInt(pagination.count)));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [pagination]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await ProductAPI.delete(id);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Products List
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-muted">
                      Home
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Table
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Products</h4>

                <input
                  className="form-control mb-3"
                  onChange={onChangeText}
                  type="text"
                  placeholder="Search Products"
                />
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map((product) => (
                          <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>
                              {parseInt(product.price).toLocaleString()} VND
                            </td>
                            <td>
                              <img
                                src={
                                  product.images[0].startsWith("images")
                                    ? `http://localhost:5000/${product.images[0].replace(
                                        /\\/g,
                                        "/"
                                      )}`
                                    : product.images[0]
                                }
                                alt={product.name}
                                style={{ height: "60px", width: "60px" }}
                              />
                            </td>
                            <td>{product.category}</td>
                            <td>
                              <button
                                className="btn btn-success mr-2"
                                onClick={() =>
                                  history.push(`/products/edit/${product._id}`)
                                }
                              >
                                Update
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(product._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <Pagination
                    pagination={pagination}
                    handlerChangePage={handlerChangePage}
                    totalPage={totalPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted"></footer>
    </div>
  );
}

export default Products;
