import React, { useEffect, useState } from "react";
import HistoryAPI from "../API/HistoryAPI";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

Home.propTypes = {};

function Home(props) {
  const [history, setHistory] = useState([]);
  const [clientsCount, setClientsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [earningsOfMonth, setEarningsOfMonth] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await HistoryAPI.getAll();
        setHistory(response);

        // Tính toán số liệu từ dữ liệu trả về
        calculateMetrics(response);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, []);

  // Hàm tính toán các số liệu dựa trên orders
  const calculateMetrics = (orders) => {
    // 1. Đếm khách hàng duy nhất
    const uniqueClients = new Set(orders.map((order) => order.user._id));
    setClientsCount(uniqueClients.size);

    // 2. Đếm số lượng đơn hàng
    setOrdersCount(orders.length);

    // 3. Tính tổng Earnings của tháng hiện tại
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const totalEarnings = orders
      .filter((order) => {
        const orderDate = new Date(order.orderDate);
        return (
          orderDate.getMonth() === currentMonth &&
          orderDate.getFullYear() === currentYear
        );
      })
      .reduce((total, order) => total + order.totalAmount, 0);

    setEarningsOfMonth(totalEarnings);
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            {/* <h3 className='page-title text-truncate text-dark font-weight-medium mb-1'>
							Good Morning Jason!
						</h3> */}
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="card-group">
          <div className="card border-right">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <div className="d-inline-flex align-items-center">
                    <h2 className="text-dark mb-1 font-weight-medium">
                      {clientsCount}
                    </h2>
                  </div>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                    Clients
                  </h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="user-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-right">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">
                    <sup className="set-doller">VND</sup>
                    {new Intl.NumberFormat().format(earningsOfMonth)}
                  </h2>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                    Earnings of Month
                  </h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="dollar-sign"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-right">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <div className="d-inline-flex align-items-center">
                    <h2 className="text-dark mb-1 font-weight-medium">
                      {ordersCount}
                    </h2>
                  </div>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                    New Order
                  </h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="file-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">History</h4>
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Recipient Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Total Amount</th>
                        <th>Order Date</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.recipientName}</td>
                          <td>{order.recipientPhone}</td>
                          <td>{order.recipientAddress}</td>
                          <td>
                            {new Intl.NumberFormat().format(order.totalAmount)}{" "}
                            VND
                          </td>
                          <td>
                            {new Date(order.orderDate).toLocaleDateString(
                              "vi-VN"
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() =>
                                alert(`View details for ${order._id}`)
                              }
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default Home;
