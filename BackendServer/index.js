const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/user");
const BankModel = require("./models/BankModel");
const Admin = require("./models/admin");

const app = express();

app.use(cors());
app.use(express.json());

// Updated MongoDB connection string
mongoose
  .connect(
    "mongodb+srv://sandyankurkumar:1234@cluster0.wxxaqai.mongodb.net/vendor",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// POST endpoint for creating a new user
app.post("/createUser", (req, res) => {
  userModel
    .create(req.body)
    .then((user) => {
      console.log(
        `User ${user.vendor_name}email : ${user.vendor_email}inserted successfully`
      );
      res.json(user);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch a specific user by ID
app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a user by ID
app.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (updatedUser) {
      console.log(`User ${userId} updated successfully`);
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await userModel.findByIdAndDelete(userId);
    if (deletedUser) {
      console.log(`User ${userId} deleted successfully`);
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/total-salary", async (req, res) => {
  try {
    const totalSalary = await getTotalSalary();
    res.json({ totalSalary });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the total salary." });
  }
});

//******************************Bank   BankAPI code******************************

// POST endpoint for creating a new bank entry
app.post("/createBank", async (req, res) => {
  try {
    const bank = await BankModel.create(req.body);
    console.log(`Bank entry with ID ${bank.bankID} created successfully`);
    res.json(bank);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET endpoint to fetch all bank entries
app.get("/getAllBanks", async (req, res) => {
  try {
    const banks = await BankModel.find();
    res.json(banks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET endpoint to fetch a specific bank entry by bankID
app.get("/getBank/:bankID", async (req, res) => {
  const { bankID } = req.params;
  try {
    const bank = await BankModel.findOne({ bankID: bankID });
    if (!bank) {
      return res.status(404).json({ error: "Bank entry not found" });
    }
    res.json(bank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT endpoint to update a specific bank entry by bankID
app.put("/updateBank/:bankID", async (req, res) => {
  const { bankID } = req.params;
  try {
    const updatedBank = await BankModel.findOneAndUpdate(
      { bankID: bankID },
      req.body,
      { new: true }
    );
    if (!updatedBank) {
      return res.status(404).json({ error: "Bank entry not found" });
    }
    console.log(
      `Bank entry with ID ${updatedBank.bankID} updated successfully`
    );
    res.json(updatedBank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE endpoint to delete a specific bank entry by bankID
app.delete("/deleteBank/:bankID", async (req, res) => {
  const { bankID } = req.params;
  try {
    const deletedBank = await BankModel.findOneAndDelete({ bankID: bankID });
    if (!deletedBank) {
      return res.status(404).json({ error: "Bank entry not found" });
    }
    console.log(
      `Bank entry with ID ${deletedBank.bankID} deleted successfully`
    );
    res.json(deletedBank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//admin************************************************

// Default route
app.get("/admin", (req, res) => {
  res.send("Hello");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
