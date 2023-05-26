const ambulance = require('../models/AmbulanceModel');
const controller = require('../models/ControllerModel')
const bcrypt = require('bcryptjs');
const hospital = require('../models/HospitalModel');

const adminaddController = async(req,res) => {
    try {
        const existingController = await controller.findOne({ email: req.body.email });
        if (existingController) {
            return res.status(200).send({
                message:'Controller Already Exists',success:false
            })
        }
        const password = req.body.password;
        console.log(password);
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        req.body.password = hashedPassword;
        const newController = new controller(req.body);
        await newController.save();
        newController.password = undefined
        res.status(201).send({message:'Controller Add Successfully',success:true, data: newController})
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:`Add Controller ${error.message}`,
        })
    }
}

const adminaddambulanceController = async(req,res) => {
    try {
        const newUserAddAmbulance = await ambulance({...req.body});
        await newUserAddAmbulance.save();
        res.status(201).send({
            success:true,
            message:'Ambulance Applied Successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error While Applying For Ambulance'
        })
    }
}

const adminaddhospitalController = async(req,res) => {
    try {
        const newAddHospital = await hospital({...req.body});
        await newAddHospital.save();
        res.status(201).send({
            success:true,
            message:'Hospital Added Successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error While Applying For Doctors'
        })
    }
}

const admingetallController = async(req,res) => {
    try {
        const fetchController = await controller.find({},{password:0})
        res.status(200).send({
            success:true,
            message:'Controller List',
            data:fetchController
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error While Fetching Controller',
        })
    }
}

const admingethospitalController = async(req,res) => {
    try {
        const fetchHospital = await hospital.find({})
        res.status(200).send({
            success:true,
            message:'Hospital List',
            data:fetchHospital
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error While Fetching Hospitals',
        })
    }
}

const admingetambulanceController = async(req,res) => {
    try {
        const fetchAmbulance = await ambulance.find({})
        res.status(200).send({
            success:true,
            message:'Ambulance List',
            data:fetchAmbulance
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error While Fetching Ambulance'
        })
    }
}



module.exports = {
    adminaddController,
    adminaddambulanceController,
    adminaddhospitalController,
    admingetallController,
    admingethospitalController,
    admingetambulanceController
}