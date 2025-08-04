const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

const {
  createStaffValidation,
  updateStaffValidation,
  getStaffByIdValidation,
  deleteStaffValidation,
  deactivateStaffValidation,
  loginValidation,
  createRoleValidation,
  updateRoleValidation,
  getRoleByIdValidation,
  deactivateRoleValidation,
  createDoctorValidation,
  updateDoctorValidation,
  getDoctorByIdValidation,
  deactivateDoctorValidation,
  createSpecializationValidation,
  updateSpecializationValidation,
  getSpecializationByIdValidation
} = require('../validation/adminvalidation');

// JWT middleware is handled by the auth and authorize middleware in server.js


// ==================== AUTHENTICATION (UNPROTECTED) ====================
router.post('/staff/login', loginValidation, adminController.login);


// ==================== STAFF MANAGEMENT ====================
// Create staff
router.post('/staff', createStaffValidation, adminController.createStaff);

// Get all staff
router.get('/staff', adminController.getAllStaff);

// Get staff by ID
router.get('/staff/:id', getStaffByIdValidation, adminController.getStaffById);

// Update staff by ID
router.put('/staff/:id', updateStaffValidation, adminController.updateStaff);

// Delete staff by ID
router.delete('/staff/:id', deleteStaffValidation, adminController.deleteStaff);

// Deactivate staff
router.patch('/staff/:staffId/deactivate', deactivateStaffValidation, adminController.deactivateStaff);

// Get staff by role ID
router.get('/staff/role/:roleId', adminController.getStaffByRole);

// Get staff by role name
router.get('/staff/role-name/:roleName', adminController.getStaffByRoleName);

// ==================== ROLE MANAGEMENT ====================
router.post('/roles', createRoleValidation, adminController.createRole);
router.get('/roles', adminController.getAllRoles);
router.get('/roles/:roleId', getRoleByIdValidation, adminController.getRoleById);
router.put('/roles/:roleId', updateRoleValidation, adminController.updateRole);
router.patch('/roles/:roleId/deactivate', deactivateRoleValidation, adminController.deactivateRole);

// ==================== DOCTOR MANAGEMENT ====================
router.post('/doctors', createDoctorValidation, adminController.createDoctor);
router.get('/doctors', adminController.getAllDoctors);
router.get('/doctors/:doctorId', getDoctorByIdValidation, adminController.getDoctorById);
router.put('/doctors/:doctorId', updateDoctorValidation, adminController.updateDoctor);
router.patch('/doctors/:doctorId/deactivate', deactivateDoctorValidation, adminController.deactivateDoctor);

// ==================== SPECIALIZATION MANAGEMENT ====================
router.post('/specializations', createSpecializationValidation, adminController.createSpecialization);
router.get('/specializations', adminController.getAllSpecializations);
router.get('/specializations/:specializationId', getSpecializationByIdValidation, adminController.getSpecializationById);
router.put('/specializations/:specializationId', updateSpecializationValidation, adminController.updateSpecialization);

// Authentication routes are handled by authRoute.js

module.exports = router;
