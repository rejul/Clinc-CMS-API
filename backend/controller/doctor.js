const express = require('express');
const consult = require('../model/doctor/consult.js');
const labtestpre=require('../model/doctor/labtestpre.js');
const medicinepre=require('../model/doctor/medicinepre.js');







// Add Consultation Note: POST /api/consultations 

exports.addConsultationNote = async (req, res) => {
    try {
        const consultation = new consult(req.body);
        await consultation.save();
        res.status(201).json({ message: 'Consultation note added successfully', consultation });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }   


}


//Update Consultation Note: PUT /api/consultations/{consultationId} 
exports.updateConsultationNote = async (req, res) => {
    try {
        const  {consultationId } = req.params;
        const updatedConsultation = await consult.findOneAndUpdate({ consultationId: consultationId }, req.body, { new: true });
        if (!updatedConsultation) {
            return res.status(404).json({ message: 'Consultation note not found' });
        }
        res.status(200).json({ message: 'Consultation note updated successfully', updatedConsultation });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};





//  Get Consultation Note by Appointment ID: GET 
exports.getConsultationByAppointmentId = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const consultations = await consult.find({ appointmentId: appointmentId });
        if (consultations.length === 0) {
            return res.status(404).json({ message: 'No consultations found for this appointment' });
        }
        res.status(200).json({ consultations });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


// /api/consultations/appointment/{appointmentId} 
exports.getConsultationWithDetailsByAppointmentId = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const consultations = await consult.find({ appointmentId: appointmentId })
              .populate({
    path: 'appointmentId',
    model: 'Appointment',
    localField: 'appointmentId',
    foreignField: 'appointmentId',
    select: 'patientId date time'
  })
  .populate({
    path: 'doctorId',
    model: 'Doctor',
    localField: 'doctorId',
    foreignField: 'doctorId',
    select: 'qualifications specializationId'
  });
        if (consultations.length === 0) {
            return res.status(404).json({ message: 'No consultations found for this appointment' });
        }
        res.status(200).json({ consultations });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// List Consultation Notes by Doctor: GET /api/consultations/doctor/{doctorId}

exports.getConsultationsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const consultations = await consult.find({ doctorId: doctorId });
        if (consultations.length === 0) {
            return res.status(404).json({ message: 'No consultations found for this doctor' });
        }
        res.status(200).json({ consultations });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

