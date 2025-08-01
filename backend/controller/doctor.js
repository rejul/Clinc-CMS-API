const consult = require('../model/doctor/consult.js');
const medicinepre = require('../model/doctor/medicinepre.js');
const labtestpre = require('../model/doctor/labtest.js');

//*Consultation Notes*

// Add Consultation Note: POST /api/consultations 
exports.addConsultationNote = async (req, res) => {
    try {
        const consultation = new consult(req.body);
        await consultation.save();
        res.status(201).json({ message: 'Consultation note added successfully', consultation });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Consultation Note: PUT /api/consultations/{consultationId} 
exports.updateConsultationNote = async (req, res) => {
    try {
        const { consultationId } = req.params;
        const updatedConsultation = await consult.findOneAndUpdate({ consultationId: consultationId }, req.body, { new: true });
        if (!updatedConsultation) {
            return res.status(404).json({ message: 'Consultation note not found' });
        }
        res.status(200).json({ message: 'Consultation note updated successfully', updatedConsultation });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Consultation Note by Appointment ID: GET /api/consultations/appointment/{appointmentId}
exports.getConsultationByAppointmentId = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const consultations = await consult.find({ appointmentId: appointmentId })
            .populate({
            path: 'appointmentId',
            model: 'Appointment',
            select: 'patientId date time',
            localField: 'appointmentId',
            foreignField: 'appointmentId'
            })
            .populate({
            path: 'doctorId',
            model: 'Doctor',
            select: 'qualifications specializationId',
            localField: 'doctorId',
            foreignField: 'doctorId'
            })
            .populate({
            path: 'patientId',
            model: 'Patient',
            select: 'name gender dob',
            localField: 'patientId',
            foreignField: 'patientId'
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
        const consultations = await consult.find({ doctorId: doctorId })
            .populate({
                path: 'patientId',
                model: 'Patient',
                select: 'name gender dob',
                localField: 'patientId',
                foreignField: 'patientId'
            })
            .populate({
                path: 'appointmentId',
                model: 'Appointment',
                select: 'date time',
                localField: 'appointmentId',
                foreignField: 'appointmentId'
            })
            .populate({
                path: 'doctorId',
                model: 'Doctor',
                select: 'name specializationId',
                localField: 'doctorId',
                foreignField: 'doctorId'
            });

        if (consultations.length === 0) {
            return res.status(404).json({ message: 'No consultations found for this doctor' });
        }
        res.status(200).json({ consultations });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//*Medicine Prescription *

// Update Medicine Prescription: PUT /api/prescriptions/medicine/{prescriptionId}
exports.updateMedicinePrescription = async (req, res) => {
    try {
        const { prescriptionId } = req.params;
        const updatedPrescription = await medicinepre.findOneAndUpdate({ prescriptionId: prescriptionId }, req.body, { new: true });
        if (!updatedPrescription) {
            return res.status(404).json({ message: 'Medicine prescription not found' });
        }
        res.status(200).json({ message: 'Medicine prescription updated successfully', updatedPrescription });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// List Prescriptions by Appointment: GET /api/prescriptions/medicine/appointment/{appointmentId}
exports.getMedicinePrescriptionByAppointmentId = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const prescriptions = await medicinepre.find({ appointmentId: appointmentId });
        if (prescriptions.length === 0) {
            return res.status(404).json({ message: 'No medicine prescriptions found for this appointment' });
        }
        res.status(200).json({ prescriptions });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// List Medicine Prescription History by Patient: GET /api/prescriptions/medicine/history/patient/{patientId}
exports.getMedicinePrescriptionHistoryByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const prescriptions = await medicinepre.find({ patientId: patientId })
            .populate({ path: 'prescriptionId', model: 'MedicinePrescription', select: 'medicines dosage frequency' });
        if (prescriptions.length === 0) {
            return res.status(404).json({ message: 'No medicine prescriptions found for this patient' });
        }   
        res.status(200).json({ prescriptions });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};  

// List Medicine Prescription History by Doctor: GET /api/prescriptions/medicine/history/doctor/{doctorId}
exports.getMedicinePrescriptionHistoryByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params; // doctorId is the customId
        const prescriptions = await medicinepre.find({ doctorId: doctorId })
            .populate({
                path: 'patientId',
                model: 'Patient',
                select: 'name gender dob',
                localField: 'patientId', // Local field in the prescription
                foreignField: 'customId' // Foreign field in the Patient model
            })
            .populate({
                path: 'appointmentId',
                model: 'Appointment',
                select: 'date time',
                localField: 'appointmentId', // Local field in the prescription
                foreignField: 'customId' // Foreign field in the Appointment model
            });
        if (prescriptions.length === 0) {
            return res.status(404).json({ message: 'No medicine prescriptions found for this doctor' });
        }
        res.status(200).json({ prescriptions });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



//*Lab Test Prescription *

// Create Lab Test Prescription: POST /api/prescriptions/labtest 
exports.createLabTestPrescription = async (req, res) => {
    try {
        const labTestPrescription = new labtestpre(req.body);
        await labTestPrescription.save();
        res.status(201).json({ message: 'Lab test prescription created successfully', labTestPrescription });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Lab Test Prescription: PUT /api/prescriptions/labtest/{prescriptionId} 
exports.updateLabTestPrescription = async (req, res) => {
    try {
        const { prescriptionId } = req.params;
        const updatedPrescription = await labtestpre.findOneAndUpdate({ prescriptionId: prescriptionId }, req.body, { new: true });
        if (!updatedPrescription) {
            return res.status(404).json({ message: 'Lab test prescription not found' });
        }
        res.status(200).json({ message: 'Lab test prescription updated successfully', updatedPrescription });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Lab Test Prescription by Appointment ID: GET /api/prescriptions/labtest/appointment/{appointmentId} 
exports.getLabTestPrescriptionByAppointmentId = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const prescriptions = await labtestpre.find({ appointmentId: appointmentId });
        if (prescriptions.length === 0) {
            return res.status(404).json({ message: 'No lab test prescriptions found for this appointment' });
        }
        res.status(200).json({ prescriptions });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// List Lab Test Prescriptions by Patient: GET /api/prescriptions/labtest/patient/{patientId}
exports.getLabTestPrescriptionsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const prescriptions = await labtestpre.find({ patientId: patientId });
        if (prescriptions.length === 0) {
            return res.status(404).json({ message: 'No lab test prescriptions found for this patient' });
        }
        res.status(200).json({ prescriptions });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};





//*Consultation History* 

// List Consultation History by Patient: GET /api/consultations/patient/{patientId} 
exports.getConsultationsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const consultations = await consult.find({ patientId: patientId })
            .populate({
                path: 'doctorId',
                model: 'Doctor',
                select: 'name specializationId',
                localField: 'doctorId',
                foreignField: 'doctorId'
            })
            .populate({
                path: 'appointmentId',
                model: 'Appointment',
                select: 'date time',
                localField: 'appointmentId',
                foreignField: 'appointmentId'
            });
        if (consultations.length === 0) {
            return res.status(404).json({ message: 'No consultations found for this patient' });
        }
        res.status(200).json({ consultations });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// List Consultation History by Doctor: GET /api/consultations/history/doctor/{doctorId}
exports.getConsultationHistoryByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const consultations = await consult.find({ doctorId: doctorId })
            .populate({
                path: 'patientId',
                model: 'Patient',
                select: 'name gender dob',
                localField: 'patientId',
                foreignField: 'patientId'
            })
            .populate({
                path: 'appointmentId',
                model: 'Appointment',
                select: 'date time',
                localField: 'appointmentId',
                foreignField: 'appointmentId'
            });
        if (consultations.length === 0) {
            return res.status(404).json({ message: 'No consultation history found for this doctor' });
        }
        res.status(200).json({ consultations });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Consultation History by Appointment ID: GET /api/consultations/history/appointment/{appointmentId}
exports.getConsultationHistoryByAppointmentId = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const consultation = await consult.findOne({ appointmentId: appointmentId })
            .populate({
                path: 'patientId',
                model: 'Patient',
                select: 'name age dob',
                localField: 'patientId',
                foreignField: 'patientId'
            })
            .populate({
                path: 'doctorId',
                model: 'Doctor',
                select: 'name specializationId',
                localField: 'doctorId',
                foreignField: 'doctorId'
            });

        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found for this appointment' });
        }
        res.status(200).json({ consultation });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


//Medicine Prescription History//


// List Medicine Prescription History by Patient //GET /api/prescriptions/medicine/history/patient/{patientId}
    exports.getMedicinePrescriptionHistoryByPatient = async (req, res) => {
        try {
            const { patientId } = req.params;
            const prescriptions = await medicinepre.find({ patientId: patientId })
            .populate({
                path: 'doctorId',
                model: 'Doctor',
                select: 'name specializationId',
                localField: 'doctorId',
                foreignField: 'doctorId'
            })
            .populate({
                path: 'appointmentId',
                model: 'Appointment',
                select: 'date time',
                localField: 'appointmentId',
                foreignField: 'appointmentId'
            });
        if (prescriptions.length === 0) {
            return res.status(404).json({ message: 'No medicine prescription history found for this patient' });
        }
        res.status(200).json({ prescriptions });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Get Medicine Prescription History by Appointment ID: GET /api/prescriptions/medicine/history/appointment/{appointmentId}
exports.getMedicinePrescriptionHistoryByAppointmentId = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const prescriptions = await medicinepre.find({ appointmentId: appointmentId });
        if (prescriptions.length === 0) {
            return res.status(404).json({ message: 'No medicine prescriptions found for this appointment' });
        }
        res.status(200).json({ prescriptions });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// List Medicine Prescription History by Doctor: GET /api/prescriptions/medicine/history/doctor/{doctorId}
exports.getMedicinePrescriptionHistoryByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params; // doctorId is the customId
        const prescriptions = await medicinepre.find({ doctorId: doctorId })
            .populate({
                path: 'patientId',
                model: 'Patient',
                select: 'name gender dob',
                localField: 'patientId', // Local field in the prescription
                foreignField: 'customId' // Foreign field in the Patient model
            })
            .populate({
                path: 'appointmentId',
                model: 'Appointment',
                select: 'date time',
                localField: 'appointmentId', // Local field in the prescription
                foreignField: 'customId' // Foreign field in the Appointment model
            });
        if (prescriptions.length === 0) {
            return res.status(404).json({ message: 'No medicine prescriptions found for this doctor' });
        }
        res.status(200).json({ prescriptions });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//lab test

// Add New Lab Test: POST /api/labtests 
exports.addLabTest = async (req, res) => {
    try {
        const labTest = new labtestpre(req.body); // Assuming req.body contains customId and other fields
        await labTest.save();
        res.status(201).json({ message: 'Lab test added successfully', labTest });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Lab Test Details: PUT /api/labtests/{labTestId} 
exports.updateLabTest = async (req, res) => {
    try {
        const { labTestId } = req.params; // labTestId is the customId
        const updatedLabTest = await labtestpre.findOneAndUpdate({ customId: labTestId }, req.body, { new: true });
        if (!updatedLabTest) {
            return res.status(404).json({ message: 'Lab test not found' });
        }
        res.status(200).json({ message: 'Lab test updated successfully', updatedLabTest });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Lab Test by ID: GET /api/labtests/{labTestId} 
exports.getLabTestById = async (req, res) => {
    try {
        const { labTestId } = req.params; // labTestId is the customId
        const labTest = await labtestpre.findOne({ customId: labTestId });
        if (!labTest) {
            return res.status(404).json({ message: 'Lab test not found' });
        }
        res.status(200).json({ labTest });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// List All Lab Tests: GET /api/labtests 
exports.listAllLabTests = async (req, res) => {
    try {
        const labTests = await labtestpre.find();
        res.status(200).json({ labTests });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Deactivate Lab Test: PATCH /api/labtests/{labTestId}/deactivate
exports.deactivateLabTest = async (req, res) => {
    try {
        const { labTestId } = req.params; // labTestId is the customId
        const updatedLabTest = await labtestpre.findOneAndUpdate({ customId: labTestId }, { isActive: false }, { new: true });
        if (!updatedLabTest) {
            return res.status(404).json({ message: 'Lab test not found' });
        }
        res.status(200).json({ message: 'Lab test deactivated successfully', updatedLabTest });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

