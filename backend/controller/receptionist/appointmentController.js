const Appointment = require("../../model/receptionist/appointment");

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
