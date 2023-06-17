const userModel = require("../../model/userModel");
const { ObjectId } = require("mongoose").Types;

const deleteUser = async function (req, res) {
  try {
    const { id } = req.params;

    //checking user is exist or not
    const checkUser = await userModel.findOne({ _id: new ObjectId(id) });
    if (!checkUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const userData = await userModel.findOneAndDelete({
      _id: new ObjectId(id),
    });
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};


module.exports= deleteUser