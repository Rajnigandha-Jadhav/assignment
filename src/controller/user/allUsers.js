const userModel = require("../../model/userModel");

const { ObjectId } = require("mongoose").Types;

const allUsers = async function (req, res) {
  try {
    const { query } = req;
    const { keyword } = req.query;

    //pagination

    const fetchSize =
      (req.query.fetchSize && parseInt(req.query.fetchSize)) || 10; //default 10 documents

    const startIndex =
      (req.query.startIndex && parseInt(req.query.startIndex)) || 0; // default 0

    //applying filter
    const searchCriteria = {};
    if (req.query.gender) {
      searchCriteria.gender = req.query.gender; // gender => male, female
    }

    //keyword search
    if (req.query.keyword) {
      searchCriteria["$or"] = [
        { name: { $regex: `^${keyword.trim()}`, $options: "i" } },
        { city: { $regex: `^${keyword.trim()}`, $options: "i" } },
        { country: { $regex: `^${keyword.trim()}`, $options: "i" } },
        { email: { $regex: `^${keyword.trim()}`, $options: "i" } },
      ];
    }

    //aggregationS
    const userData = await userModel.aggregate([
      { $match: searchCriteria },
      {
        $sort: {
          createdAt: -1,
        },
      },

      {
        $facet: {
          data: [{ $skip: startIndex }, { $limit: fetchSize }],
          count: [{ $count: "total" }],
        },
      },
    ]);

    if (userData[0]?.data.length) {
      res.status(200).send({
        status: true,
        message: "All users fetch successfully",
        count: userData[0]?.count[0]?.total,
        data: userData[0]?.data,
      });
    } else {
      res.status(404).send({message:"No data found"});
    }
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = allUsers;