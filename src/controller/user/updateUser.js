const userModel = require("../../model/userModel");
const { ObjectId } = require("mongoose").Types;

const updateUser = async function (req, res) {
  try {
    const { id } = req.params;

    //checking user is exist or not
    const checkUser = await userModel.findOne({ _id: new ObjectId(id) });
    if (!checkUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const {
      name,
      gender,
      city,
      country,
      email,
      phoneNumber,
      secondaryPhoneNumber,
    } = req.body; //destructing the incoming data

//check phone number in valid format
    let mobileValidNumber= /^[6-9]\d{9}$/.test(phoneNumber)
    if (!mobileValidNumber) {
        return res.status(400).send({ status: false, message: `${phoneNumber} is not a valid Mobile Number !!` })
    }

    //check email in valid format
    let emailValidMail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
    if (!emailValidMail) {
        return res.status(400).send({ status: false, message: `${email} is not a valid E-mail !!` })
    }

    //check secondary phone number is in valid 
    if(secondaryPhoneNumber){
        let mobileValidNumbers= /^[6-9]\d{9}$/.test(secondaryPhoneNumber)
        if (!mobileValidNumbers) {
            return res.status(400).send({ status: false, message: `${secondaryPhoneNumber} is not a valid Mobile Number !!` })
        }
    }
    const userData = await userModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        name,
        gender,
        city,
        country,
        email,
        phoneNumber,
        secondaryPhoneNumber,
      },
      { new: true }
    );
    res.send({ message: "User updated successfully ", data: userData });
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateUser;