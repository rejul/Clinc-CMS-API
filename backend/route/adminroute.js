const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');

// Create staff
router.post('/staff', adminController.createStaff);

// Get all staff
router.get('/staff', adminController.getAllStaff);

// Get staff by ID
router.get('/staff/:id', adminController.getStaffById);

// Update staff by ID
router.put('/staff/:id', adminController.updateStaff);

// Delete staff by ID
router.delete('/staff/:id', adminController.deleteStaff);

// STAFF MANAGEMENT
router.patch('/staff/:staffId/deactivate', adminController.deactivateStaff);

// ROLE MANAGEMENT
router.post('/roles', adminController.createRole);
router.get('/roles', adminController.getAllRoles);
router.get('/roles/:roleId', adminController.getRoleById);
router.put('/roles/:roleId', adminController.updateRole);
router.patch('/roles/:roleId/deactivate', adminController.deactivateRole);

// DOCTOR MANAGEMENT
router.post('/doctors', adminController.createDoctor);
router.get('/doctors', adminController.getAllDoctors);
router.get('/doctors/:doctorId', adminController.getDoctorById);
router.put('/doctors/:doctorId', adminController.updateDoctor);
router.patch('/doctors/:doctorId/deactivate', adminController.deactivateDoctor);

// SPECIALIZATION MANAGEMENT
router.post('/specializations', adminController.createSpecialization);
router.get('/specializations', adminController.getAllSpecializations);
router.get('/specializations/:specializationId', adminController.getSpecializationById);
router.put('/specializations/:specializationId', adminController.updateSpecialization);

// Staff login
router.post('/staff/login', adminController.login);

module.exports = router;
