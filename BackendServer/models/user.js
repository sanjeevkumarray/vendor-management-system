const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  vendor_name: String,
  vendor_email: { type: String, unique: true },
  bank_account_no: String,
  bank_name: String,
  salary: Number,
  address_line1: String,
  address_line2: String,
  city: String,
  country: String,
  zip_code: { type: String },
  phone_no: { type: String, unique: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
const userModel = mongoose.model("vendor", UserSchema);
module.exports = userModel;
