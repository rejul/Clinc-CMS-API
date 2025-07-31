const Billing = require("../../model/receptionist/billing");

// Generate Bill
exports.createBilling = async (req, res) => {
  try {
    const bill = new Billing(req.body);
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Bill
exports.updateBilling = async (req, res) => {
  try {
    const bill = await Billing.findOneAndUpdate(
      { appointmentId: req.params.appointmentId },
      req.body,
      { new: true }
    );
    if (!bill) {
      return res.status(404).json({ error: "Billing record not found" });
    }
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Bill by Appointment
exports.getBillingByAppointment = async (req, res) => {
  try {
    const bill = await Billing.findOne({
      appointmentId: req.params.appointmentId,
    });
    if (!bill) {
      return res.status(404).json({ error: "Billing record not found" });
    }
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List Bills by Date Range
exports.getBillingsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const bills = await Billing.find({
      billingDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
