import React, { useState, useEffect } from "react";
import ProductAPI from "../API/ProductAPI";
import { useParams, useHistory } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    short_desc: "",
    long_desc: "",
    price: "",
    stock: 0,
    images: [],
  });
  const history = useHistory();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductAPI.getDetail(id); // Fetch product details
        setProduct(data); // Populate form fields with fetched data
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      // Append the form fields
      Object.keys(product).forEach((key) => {
        if (key !== "images") formData.append(key, product[key]);
      });
      // Append images
      product.images.forEach((file) => formData.append("images", file));

      await ProductAPI.updateProduct(id, formData); // Call API to update product
      alert("Product updated successfully!");
      history.push("/products"); // Redirect after success
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <form
            style={{ width: "50%", marginLeft: "40px" }}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Product Name"
                name="name"
                value={product.name || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Category"
                name="category"
                value={product.category || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Short Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter Short Description"
                name="short_desc"
                value={product.short_desc || ""}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Long Description</label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Enter Long Description"
                name="long_desc"
                value={product.long_desc || ""}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Price"
                name="price"
                value={product.price || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Stock"
                name="stock"
                value={product.stock || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Upload Images (Current images will be shown below)</label>
              <input
                type="file"
                className="form-control-file"
                multiple
                onChange={handleFileChange}
              />
              {product.images && product.images.length > 0 && (
                <div className="current-images">
                  <h5>Current Images:</h5>
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000/${img.replace(/\\/g, "/")}`}
                      alt={`product-img-${index}`}
                      style={{ width: "100px", margin: "5px" }}
                    />
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
