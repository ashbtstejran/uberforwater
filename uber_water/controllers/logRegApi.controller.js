const LogReg = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
class LogRegController {

    /**
      * 
      * @Method userAuth
      * @Description User Authentication
    */

    async userAuth(req, res, next) {
        try {
            if(req.user) {
                // console.log("hiiiiiiiiiiiiiiiiiiii", req.user);
                next();
            }else {
                // console.log(req.user);
                return res.status(400).json({
                    message: 'Not A Valid User!'
                })
            }
        }catch(err) {
            throw err;
        }
    }

    /**
     * @Method showMessage
     * @Description To Show A Welcome Message
    */

    async showMessage(req, res) {
        try {
            return res.status(200).json({
                message: 'Welcome Message From Ash'
            })
        }catch(err) {
            throw err;
        }
    }

    /**
     * @Method register
     * @Description To Register A User
    */

    async register(req, res) {
        try {
            req.body.name = req.body.name.trim();
            req.body.email = req.body.email.trim();
            req.body.password = req.body.password.trim();
            req.body.address = req.body.address;
            req.body.phn = req.body.phn;
            req.body.pincode = req.body.pincode;
            req.body.Timeofavl = req.body.Timeofavl;
            // req.body.status = req.body.status.trim();
             req.body.role = req.body.role.trim();
            if(!(req.body.name && req.body.email && req.body.password && req.body.address && req.body.phn && req.body.pincode && req.body.Timeofavl && req.body.role)) {
                return res.status(400).json({
                    message: 'Field Should Not Be Empty!'
                })
            }else {
                let isEmailExists = await LogReg.findOne({
                    email: req.body.email
                });
                if(!isEmailExists) {
                    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                    let saveData =  await LogReg.create(req.body);


                    if(saveData && saveData._id) {
                        //create token
                        let token = jwt.sign({
                            _id: saveData._id,
                            email: saveData.email
                        }, 'M3S3CR3TKY3', {
                            expiresIn: '5m'
                        })
                        saveData = saveData.toObject()

                        saveData.token= token;
                        return res.status(200).json({
                            message: 'Registration Successfully Done!!!',
                            data: saveData
                        })
                    }else {
                        return res.status(400).json({
                            message: 'Registration Not Successfully Done!!!',
                            data: saveData
                        })
                    }
                }else {
                    return res.status(400).json({
                        message: 'Email Is Already Exists!'
                    })
                }
            }
        }catch(err) {
            throw err;
        }
    }

    /**
     * @Method login
     * @Description Login
    */

    async login(req, res) {
        try {
            req.body.email = req.body.email.trim();
            req.body.password = req.body.password.trim();
            if(!(req.body.email && req.body.password)) {
                return res.status(400).json({
                    message: 'Field Should Not Be Empty!'
                })
            }else {
                let isUserExists = await LogReg.findOne({
                    email: req.body.email,
                    //role:role
                })
                if(isUserExists) {
                    
                    let hashPassword = isUserExists.password;
                    if(bcrypt.compareSync(req.body.password, hashPassword)) {
                        const token = jwt.sign({
                            id: isUserExists._id,
                            email: isUserExists.email,
                            name: isUserExists.name
                        }, 'M3S3CR3TKY3', {expiresIn: '5h'});
                        isUserExists = isUserExists.toObject();
                        isUserExists.token = token;
                        return res.status(200).json({
                            message: 'Logged In Successfully!',
                            data: isUserExists
                        })
                    }else {
                        return res.status(400).json({
                            message: 'Password Not Matched!'
                        })
                    }
                }else {
                    return res.status(400).json({
                        message: 'User Not Exists!'
                    })
                }
            }
        }catch(err) {
            throw err;
        }
    }

    /**
     * @Method dashboard
     * @Description To Enter In Dahboard - The Secure Page
    */

    async dashboard(req, res) {
        try {
            return res.status(200).json({
                message: 'Successfully Entered!!!'
            })
        }catch(err) {
            throw err;
        }
    }

    /**
     * @Method welcome
     * @Description To Show A Secure Welcome Message
    */
    async welcome(req, res) {
            try {
                return res.status(200).json({
                    message: "Hey... I'm A Secret Welcome Message!!!"
                })
            }catch(err) {
                throw err;
            }
    }
}

module.exports = new LogRegController();