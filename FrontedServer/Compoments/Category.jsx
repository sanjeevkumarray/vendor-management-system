import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import "./CSS/category.css";

export default function Category() {
  const [bankData, setBankData] = useState([]);

  useEffect(() => {
    axios
      .get("https://vendobackend-2.onrender.com/getAllBanks")
      .then((result) => {
        console.log(result);
        setBankData(result.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = [
    {
      field: "bankID",
      headerName: "ID",
      width: 100,
      headerClassName: "header-bold",
    },
    {
      field: "bankName",
      headerName: "Name of Bank",
      width: 200,
      headerClassName: "header-bold",
    },
    {
      field: "emergencyContactNo",
      headerName: "Emergency Contact No",
      width: 200,
      headerClassName: "header-bold",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      headerClassName: "header-bold",
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
      headerClassName: "header-bold",
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
      headerClassName: "header-bold",
    },
    {
      field: "country",
      headerName: "Country",
      width: 150,
      headerClassName: "header-bold",
    },
    {
      field: "postalCode",
      headerName: "Postal Code",
      width: 150,
      headerClassName: "header-bold",
    },
    {
      field: "swiftCode",
      headerName: "Swift Code",
      width: 150,
      headerClassName: "header-bold",
    },
    {
      field: "branchCode",
      headerName: "Branch Code",
      width: 150,
      headerClassName: "header-bold",
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      headerClassName: "header-bold",
    },
  ];

  const rows = bankData.map((bank) => ({
    id: bank.bankID,
    bankID: bank.bankID,
    bankName: bank.bankName,
    emergencyContactNo: bank.emergencyContactNo,
    email: bank.email,
    address: bank.address,
    city: bank.city,
    country: bank.country,
    postalCode: bank.postalCode,
    swiftCode: bank.swiftCode,
    branchCode: bank.branchCode,
    createdAt: new Date(bank.createdAt).toLocaleString(),
  }));

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center ">
        <h2>Bank Name</h2>
      </div>
      <Link to="/dashboard/add_category" className="btn btn-success">
        Add Bank
      </Link>
      <div className="mt-3">
        {Array.isArray(bankData) && bankData.length > 0 ? (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              className="custom-data-grid"
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
          </div>
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
}
