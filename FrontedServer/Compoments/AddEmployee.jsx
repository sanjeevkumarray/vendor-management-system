import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddEmployee() {
  const [vendorName, setVendorName] = useState();
  const [bankAccountNo, setBankAccountNo] = useState();
  const [bankEmail, setbankEmail] = useState();
  const [bankName, setBankName] = useState();
  const [salary, setsalary] = useState();
  const [addressLine1, setAddressLine1] = useState();
  const [addressLine2, setAddressLine2] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [zipCode, setZipCode] = useState();

  const [category, setcategory] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://vendobackend-2.onrender.com/getAllBanks")
      .then((result) => {
        console.log(result.data);
        setcategory(result.data);
      });
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(
        "https://vendobackend-2.onrender.com/createUser",
        {
          vendor_name: vendorName,
          bank_account_no: bankAccountNo,
          bank_name: bankName,
          vendor_email: bankEmail,
          salary: salary,
          address_line1: addressLine1,
          address_line2: addressLine2,
          city: city,
          country: country,
          zip_code: zipCode,
        },
        { headers }
      )
      .then(() => {
        console.log(zipCode);
        console.log("Success"); // Logging success message
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err); // Logging error for debugging
      });
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Employee</h2>
      <form class="row g-3 w-50">
        <div class="col-12">
          <label for="inputName" class="form-label">
            Vender Name
          </label>
          <input
            type="text"
            value={vendorName}
            class="form-control"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => setVendorName(e.target.value)}
          />
        </div>
        <div class="col-12">
          <label for="inputName" class="form-label">
            Vender Name
          </label>
          <input
            type="email"
            value={bankEmail}
            class="form-control"
            id="inputName"
            placeholder="abc@gmail"
            autoComplete="off"
            onChange={(e) => setbankEmail(e.target.value)}
          />
        </div>
        <div class="col-12">
          <label for="inputEmail4" class="form-label">
            Bank Account No
          </label>
          <input
            type="text"
            value={bankAccountNo}
            class="form-control"
            id="inputEmail4"
            placeholder="20331111111"
            autoComplete="off"
            onChange={(e) => setBankAccountNo(e.target.value)}
          />
        </div>
        <div class="col-12">
          <label for="category" className="form-lable  mb-3">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            onChange={(e) => setBankName(e.target.value)}
          >
            {category.map((c) => {
              return (
                <option key={c.bank_Name} value={c.bankName}>
                  {c.bankName}
                </option>
              );
            })}
          </select>
        </div>
        <div class="col-12">
          <label for="inputPassword4" class="form-label">
            Salary
          </label>
          <input
            type="number"
            value={salary}
            class="form-control"
            id="salary"
            placeholder="salary"
            onChange={(e) => setsalary(e.target.value)}
          />
        </div>
        <div class="col-12">
          <label for="inputPassword4" class="form-label">
            Address 1
          </label>
          <input
            type="text"
            value={addressLine1}
            class="form-control"
            id="inputAddress4"
            placeholder="Address"
            onChange={(e) => setAddressLine1(e.target.value)}
          />
        </div>
        <div class="col-12">
          <label for="inputPassword4" class="form-label">
            Address 2
          </label>
          <input
            type="text"
            value={addressLine2}
            class="form-control"
            id="inputAddress4"
            placeholder="Address"
            onChange={(e) => setAddressLine2(e.target.value)}
          />
        </div>

        <div class="col-12  mb-3">
          <label for="inputAddress" class="form-label">
            City
          </label>
          <input
            type="text"
            value={city}
            class="form-control"
            id="inputAddress"
            placeholder="city"
            autoComplete="off"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div class="col-12  mb-3">
          <label for="inputAddress" class="form-label">
            Country
          </label>
          <input
            type="text"
            value={country}
            class="form-control"
            id="inputAddress"
            placeholder="Country"
            autoComplete="off"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div class="col-12  mb-3">
          <label for="inputAddress" class="form-label">
            ZipCode
          </label>
          <input
            type="text"
            value={zipCode}
            class="form-control"
            id="inputAddress"
            placeholder="zipcode"
            autoComplete="off"
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>

        <div class="col-12">
          <button type="submit" class="btn btn-primary" onClick={handlesubmit}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
