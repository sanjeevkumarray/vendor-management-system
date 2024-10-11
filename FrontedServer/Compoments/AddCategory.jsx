import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
export default function AddCategory() {
  const [bankName, setBankName] = useState("");
  const [emergencyContactNo, setEmergencyContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [branchCode, setBranchCode] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(
        "https://vendobackend-2.onrender.com/createBank",
        {
          bankName: bankName,
          emergencyContactNo: emergencyContactNo,
          email: email,
          address: address,
          city: city,
          country: country,
          state: state,
          postalCode: postalCode,
          swiftCode: swiftCode,
          branchCode: branchCode,
        },
        { headers }
      )
      .then(() => {
        console.log("Data added successfully");
        navigate("/dashboard/category");
      })
      .catch((err) => console.error("Error adding data:", err));
  };

  // Sample options for country select (you can expand this with actual data)
  const countryOptions = [
    { value: "USA", label: "USA" },
    { value: "Canada", label: "Canada" },
    { value: "India", label: "India" },
    // Add more countries here
    { value: "Australia", label: "Australia" },
    { value: "Brazil", label: "Brazil" },
    { value: "China", label: "China" },
    { value: "Germany", label: "Germany" },
    { value: "Japan", label: "Japan" },
    { value: "Mexico", label: "Mexico" },
    // Add more countries as needed
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#80bdff" : "#ced4da",
      boxShadow: state.isFocused
        ? "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"
        : null,
      "&:hover": {
        borderColor: state.isFocused ? "#80bdff" : "#ced4da",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#000", // Change text color here
    }),
  };

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.value);
    // Reset city, state, postalCode if needed when country changes
    setCity("");
    setState("");
    setPostalCode("");
  };

  return (
    <div>
      <div>
        <h3>Add Bank</h3>
        <div className="d-flex justify-content-center align-items-center h-75 ">
          <div className="p-3 rounded w-50 border ">
            <h2>Add Bank</h2>

            <form>
              <div className="mb-3">
                <label htmlFor="bankName">
                  <strong>Bank Name</strong>
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={bankName}
                  autoComplete="off"
                  placeholder="Bank Name"
                  className="form-control rounded-0"
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="emergencyContactNo">
                  <strong>Emergency Contact No</strong>
                </label>
                <input
                  type="text"
                  name="emergencyContactNo"
                  value={emergencyContactNo}
                  autoComplete="off"
                  placeholder="Emergency Contact No"
                  className="form-control rounded-0"
                  onChange={(e) => setEmergencyContactNo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  <strong>Email</strong>
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  autoComplete="off"
                  placeholder="Email"
                  className="form-control rounded-0"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address">
                  <strong>Address</strong>
                </label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  autoComplete="off"
                  placeholder="Address"
                  className="form-control rounded-0"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country">
                  <strong>Country</strong>
                </label>
                <Select
                  options={countryOptions}
                  onChange={handleCountryChange}
                  value={countryOptions.find(
                    (option) => option.value === country
                  )}
                  styles={customStyles} // Apply custom styles here
                />
              </div>
              {country === "USA" && (
                <div className="mb-3">
                  <label htmlFor="state">
                    <strong>State</strong>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={state}
                    autoComplete="off"
                    placeholder="State"
                    className="form-control rounded-0"
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="city">
                  <strong>City</strong>
                </label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  autoComplete="off"
                  placeholder="City"
                  className="form-control rounded-0"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postalCode">
                  <strong>Postal Code</strong>
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={postalCode}
                  autoComplete="off"
                  placeholder="Postal Code"
                  className="form-control rounded-0"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="swiftCode">
                  <strong>Swift Code</strong>
                </label>
                <input
                  type="text"
                  name="swiftCode"
                  value={swiftCode}
                  autoComplete="off"
                  placeholder="Swift Code"
                  className="form-control rounded-0"
                  onChange={(e) => setSwiftCode(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="branchCode">
                  <strong>Branch Code</strong>
                </label>
                <input
                  type="text"
                  name="branchCode"
                  value={branchCode}
                  autoComplete="off"
                  placeholder="Branch Code"
                  className="form-control rounded-0"
                  onChange={(e) => setBranchCode(e.target.value)}
                />
              </div>

              <button
                className="btn btn-success w-100 rounded-0 md-2"
                onClick={handleSubmit}
              >
                Add Bank Name
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
