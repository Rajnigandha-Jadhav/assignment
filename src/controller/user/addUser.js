const userModel = require("../../model/userModel");

const addUser = async function (req, res) {
  try {
    const {
      name,
      gender,
      city,
      country,
      email,
      phoneNumber,
      secondaryPhoneNumber,
    } = req.body; // destructure the incoming data

    //check if email is already exist
    const checkMail = await userModel.findOne({ email: email });
    if (checkMail) {
      return res.status(404).send({ message: `${email}  already exists` });
    }


    //check email in valid format
    let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
    if (!emailValid) {
        return res.status(400).send({ status: false, message: `${email} is not a valid E-mail !!` })
    }


    //check if mobile number is already exist
    const checkMobileNumber = await userModel.findOne({
      phoneNumber: phoneNumber,
    });
    if (checkMobileNumber) {
      return res.status(404).send({ message: `${phoneNumber} already exists` });
    }

    //check phone number in valid format
    let mobileValidNumber= /^[6-9]\d{9}$/.test(phoneNumber)
    if (!mobileValidNumber) {
        return res.status(400).send({ status: false, message: `${phoneNumber} is not a valid Mobile Number !!` })
    }

    //check secondary phone number is in valid 
    if(secondaryPhoneNumber){
    let mobileValidNumbers= /^[6-9]\d{9}$/.test(secondaryPhoneNumber)
    if (!mobileValidNumbers) {
        return res.status(400).send({ status: false, message: `${secondaryPhoneNumber} is not a valid Mobile Number !!` })
    }
}


    const userData = await userModel.create({
      name,
      gender,
      city,
      country,
      email,
      phoneNumber,
      secondaryPhoneNumber,
    });

    res.status(201).send({
      message: "user added successfully",
      success: true,
      data: userData,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = addUser;