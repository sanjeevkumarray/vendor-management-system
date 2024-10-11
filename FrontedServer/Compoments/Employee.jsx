import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import axios from "axios";
import "./CSS/employee.css";

export default function Employee() {
  const [Employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "Vender ID", width: 200 },
    { field: "vendorName", headerName: "Vendor Name", width: 200 },
    { field: "vendorEmail", headerName: "Vendor Email", width: 200 },
    { field: "bankAccountNo", headerName: "Bank Account", width: 200 },
    { field: "bankName", headerName: "Bank Name", width: 150 },
    { field: "salary", headerName: "Salary", width: 150 },
    { field: "addressLine1", headerName: "Address Line 1", width: 200 },
    { field: "addressLine2", headerName: "Address Line 2", width: 200 },
    { field: "city", headerName: "City", width: 120 },
    { field: "country", headerName: "Country", width: 120 },
    { field: "zipCode", headerName: "Zip Code", width: 120 },
    {
      field: "edit",
      headerName: "Edit Data",
      width: 120,
      renderCell: (params) => (
        <Link
          to={`/dashboard/edit_employee/${params.row.id}`}
          className="btn btn-info btn-sm btn-primary me-2"
          onClick={() => handleEdit(params.row.id)}
        >
          Edit
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => (
        <Link
          className="btn btn-warning btn-sm"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Link>
      ),
    },
  ];

  const rows = Employee.map((e) => ({
    id: e._id,
    vendorName: e.vendor_name,
    vendorEmail: e.vendor_email,
    bankAccountNo: e.bank_account_no,
    bankName: e.bank_name,
    salary: `$${e.salary}`,
    addressLine1: e.address_line1,
    addressLine2: e.address_line1,
    city: e.city,
    country: e.country,
    zipCode: e.zip_code,

    actions: (
      <>
        <Link
          to={`/dashboard/edit_employee/${e.id}`}
          className="btn btn-info btn-sm btn-primary me-2"
          onClick={() => handleEdit(e.id)}
        ></Link>
        <Link
          className="btn btn-warning btn-sm"
          onClick={() => handleDelete(e.id)}
        >
          Delete
        </Link>
      </>
    ),
  }));

  useEffect(() => {
    axios.get("https://vendobackend-2.onrender.com/users").then((result) => {
      console.log(result.data);
      setEmployee(result.data);
    });
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`https://vendobackend-2.onrender.com/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Success: Employee deleted");

          setEmployee((prevEmployee) =>
            prevEmployee.filter((e) => e.id !== id)
          );
          window.alert("Employee deleted successfully");
          navigate("/dashboard/employee");
          window.location.reload();
        } else {
          console.log("Error: Unable to delete employee");
        }
      })

      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/edit_employee/${id}`);
  };

  return (
    <div className="">
      <div className=" mt-1 d-flex vendercss  ">
        <h2>Vender Data</h2>
      </div>
      <Link to="/dashboard/add_employee " className="btn btn-success mx-3">
        Add Vender
      </Link>

      <div className="mt-1 d-flex datagriddiv ">
        <DataGrid
          className="mt-1   changecolor  changecolor custom-data-grid"
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 25, 50]}
          checkboxSelection
          stickyHeader // Enable sticky header
          autoHeight // Adjust height automatically based on the content
          disableExtendRowFullWidth
        />
      </div>
    </div>
  );
}
