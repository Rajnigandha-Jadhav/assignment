const userModel = require("../../model/userModel");
const { ObjectId } = require("mongoose").Types;

const singleUser = async function (req, res) {
  try {
    const { id } = req.params;

    //checking user is exist or not
    const checkUser = await userModel.findOne({ _id: new ObjectId(id) });
    if (!checkUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const userData = await userModel.findOne({ _id: new ObjectId(id) });
    res
      .status(200)
      .send({ message: "User detail fetch successfully", data: userData });
  } catch (error) {
    console.log(error);
  }
};

module.exports = singleUser;