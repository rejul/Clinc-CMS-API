const Patient = require("../../model/receptionist/patient");
const Billing = require("../../model/receptionist/billing");
const Appointment = require("../../model/receptionist/appointment");

// ==================== PATIENT MANAGEMENT ====================

// Register Patient
exports.createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Patient Info
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { patientId: req.params.patientId },
      req.body,
      { new: true }
    );
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({ patientId: req.params.patientId });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List All Patients
exports.listPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deactivate Patient
exports.deactivatePatient = async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { patientId: req.params.patientId },
      { isActive: false },
      { new: true }
    );
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== APPOINTMENT MANAGEMENT ====================

// Schedule Appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Appointment
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId: req.params.appointmentId },
      req.body,
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      appointmentId: req.params.appointmentId,
    })
      .populate({
        path: "patientId",
        model: "Patient",
        localField: "patientId",
        foreignField: "patientId",
        justOne: true,
      })
      .populate({
        path: "doctorId",
        model: "Doctor",
        localField: "doctorId",
        foreignField: "doctorId",
        justOne: true,
      });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List Appointments by Date
exports.getAppointmentsByDate = async (req, res) => {
  try {
    const date = req.query.date;
    const appointments = await Appointment.find({ date })
      .populate({
        path: "patientId",
        model: "Patient",
        localField: "patientId",
        foreignField: "patientId",
        justOne: true,
      })
      .populate({
        path: "doctorId",
        model: "Doctor",
        localField: "doctorId",
        foreignField: "doctorId",
        justOne: true,
      });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel Appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId: req.params.appointmentId },
      { status: "Cancelled" },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List Appointments by Patient
exports.getAppointmentsByPatient = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.params.patientId,
    })
      .populate({
        path: "patientId",
        model: "Patient",
        localField: "patientId",
        foreignField: "patientId",
        justOne: true,
      })
      .populate({
        path: "doctorId",
        model: "Doctor",
        localField: "doctorId",
        foreignField: "doctorId",
        justOne: true,
      });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List Appointments by Doctor
exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.params.doctorId,
    })
      .populate({
        path: "patientId",
        model: "Patient",
        localField: "patientId",
        foreignField: "patientId",
        justOne: true,
      })
      .populate({
        path: "doctorId",
        model: "Doctor",
        localField: "doctorId",
        foreignField: "doctorId",
        justOne: true,
      });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Appointments with Status
exports.getAppointmentsByStatus = async (req, res) => {
  try {
    const status = req.query.status;
    const appointments = await Appointment.find({ status })
      .populate({
        path: "patientId",
        model: "Patient",
        localField: "patientId",
        foreignField: "patientId",
        justOne: true,
      })
      .populate({
        path: "doctorId",
        model: "Doctor",
        localField: "doctorId",
        foreignField: "doctorId",
        justOne: true,
      });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== BILLING MANAGEMENT ====================

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
    }).populate({
      path: "appointmentId",
      model: "Appointment",
      localField: "appointmentId",
      foreignField: "appointmentId",
      justOne: true,
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
    }).populate({
      path: "appointmentId",
      model: "Appointment",
      localField: "appointmentId",
      foreignField: "appointmentId",
      justOne: true,
    });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
