const Staff = require('../model/admin/staff');
const Role = require('../model/admin/role');

// Create a new staff (admin)
exports.createStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().populate({
      path: 'roleId',
      model: 'Role',
      localField: 'roleId',
      foreignField: 'roleId',
      justOne: true
    });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findOne({ staffId: req.params.id }).populate({
      path: 'roleId',
      model: 'Role',
      localField: 'roleId',
      foreignField: 'roleId',
      justOne: true
    });
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update staff by ID
exports.updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findOneAndUpdate(
      { staffId: req.params.id },
      req.body,
      { new: true }
    );
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete staff by ID
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findOneAndDelete({ staffId: req.params.id });
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    res.json({ message: 'Staff deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Staff login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email });
    if (!staff) return res.status(404).json({ error: 'Invalid credentials' });
    const isMatch = await staff.matchPassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- ROLE MANAGEMENT ---
const Specialization = require('../model/admin/specialization');
const Doctor = require('../model/admin/doctor');

// Create Role
exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findOne({ roleId: req.params.roleId });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update role by ID
exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findOneAndUpdate(
      { roleId: req.params.roleId },
      req.body,
      { new: true }
    );
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deactivate role
exports.deactivateRole = async (req, res) => {
  try {
    const role = await Role.findOneAndUpdate(
      { roleId: req.params.roleId },
      { isActive: false },
      { new: true }
    );
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --- DOCTOR MANAGEMENT ---
// Create Doctor
exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ doctorId: req.params.doctorId });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update doctor by ID
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { doctorId: req.params.doctorId },
      req.body,
      { new: true }
    );
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deactivate doctor
exports.deactivateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { doctorId: req.params.doctorId },
      { isActive: false },
      { new: true }
    );
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --- SPECIALIZATION MANAGEMENT ---
// Create Specialization
exports.createSpecialization = async (req, res) => {
  try {
    const specialization = new Specialization(req.body);
    await specialization.save();
    res.status(201).json(specialization);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all specializations
exports.getAllSpecializations = async (req, res) => {
  try {
    const specializations = await Specialization.find();
    res.json(specializations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get specialization by ID
exports.getSpecializationById = async (req, res) => {
  try {
    const specialization = await Specialization.findOne({ specializationId: req.params.specializationId });
    if (!specialization) return res.status(404).json({ error: 'Specialization not found' });
    res.json(specialization);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update specialization by ID
exports.updateSpecialization = async (req, res) => {
  try {
    const specialization = await Specialization.findOneAndUpdate(
      { specializationId: req.params.specializationId },
      { $set: req.body },
      { new: true }
    );
    if (!specialization) return res.status(404).json({ error: 'Specialization not found' });
    res.json(specialization);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --- STAFF DEACTIVATE ---
exports.deactivateStaff = async (req, res) => {
  try {
    const staff = await Staff.findOneAndUpdate(
      { staffId: req.params.staffId },
      { isActive: false },
      { new: true }
    );
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
