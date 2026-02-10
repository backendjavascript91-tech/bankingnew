const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Transaction = require("../models/Transaction");

// تنفيذ عملية التحويل
router.post("/bank-transfer", async (req, res) => {
  try {
    const { userId, bank, beneficiaryName, beneficiaryAccount, amount } = req.body;

    if (!userId || !bank || !beneficiaryName || !beneficiaryAccount || !amount)
      return res.status(400).json({ message: "Missing data" });

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.balance < amount)
      return res.status(400).json({ message: "Not enough balance" });

    // خصم الرصيد
    user.balance -= amount;
    await user.save();

    // إنشاء المعاملة
    const transaction = new Transaction({
      userId,
      bank,
      beneficiaryName,
      beneficiaryAccount,
      amount
    });

    await transaction.save();

    res.json({ message: "Transfer successful", transaction });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

const bcrypt = require("bcrypt");

// تأكيد الباسورد قبل التحويل
router.post("/check-password", async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password)
      return res.status(400).json({ message: "Missing data" });

    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(401).json({ message: "Wrong password" });

    res.json({ message: "Password correct" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

