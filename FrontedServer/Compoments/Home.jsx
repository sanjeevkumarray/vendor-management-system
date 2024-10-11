import React, { useState, useEffect } from "react";
import "./CSS/Home.css";
import Main from "./pointGraph/Main";

export default function Home() {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [displayAdminTotal, setDisplayAdminTotal] = useState(0);
  const [displayEmployeeTotal, setDisplayEmployeeTotal] = useState(0);
  const [displaySalaryTotal, setDisplaySalaryTotal] = useState(0);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, []);

  useEffect(() => {
    if (adminTotal > 0) countUp(setDisplayAdminTotal, adminTotal);
    if (employeeTotal > 0) countUp(setDisplayEmployeeTotal, employeeTotal);
    if (salaryTotal > 0) countUp(setDisplaySalaryTotal, salaryTotal);
  }, [adminTotal, employeeTotal, salaryTotal]);

  const countUp = (setFunction, target) => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.ceil(target / 50); // Adjust the divisor to control speed
      if (count >= target) {
        setFunction(target);
        clearInterval(interval);
      } else {
        setFunction(count);
      }
    }, 2); // Adjust the interval duration to control speed
  };

  const AdminRecords = () => {
    // Fetch admin records here if needed
    setAdmins([
      { id: 1, email: "ankur@gmal.com" },
      { id: 2, email: "aman@gmal.com" },
    ]);
  };

  const adminCount = () => {
    // Simulate fetching data from the backend
    setAdminTotal(2);
  };

  const employeeCount = () => {
    fetch("https://vendobackend-2.onrender.com/users")
      .then((response) => response.json())
      .then((data) => setEmployeeTotal(data.length))
      .catch((error) => console.error("Error fetching employee data:", error));
  };

  const salaryCount = () => {
    fetch("https://vendobackend-2.onrender.com/api/total-salary")
      .then((response) => response.json())
      .then((data) => setSalaryTotal(data.totalSalary))
      .catch((error) => console.error("Error fetching total salary:", error));
  };

  return (
    <>
      <div>
        <div className="p-3 d-flex justify-content-around mt-3">
          <div className="px-3 pt-2 pb-3 border shadow-sm w-25 adminbox">
            <div className="text-center pb-1">
              <h4>Admin</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
              <h5>{displayAdminTotal}</h5>
            </div>
          </div>
          <div className="px-3 pt-2 pb-3 border shadow-sm w-25 vendorbox">
            <div className="text-center pb-1">
              <h4>Vendor</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
              <h5>{displayEmployeeTotal}</h5>
            </div>
          </div>
          <div className="px-3 pt-2 pb-3 border shadow-sm w-25 accountbox">
            <div className="text-center pb-1">
              <h4>Account</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
              <h5>${displaySalaryTotal}</h5>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <Main />
        </div>
      </div>
    </>
  );
}
