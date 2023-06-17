const express = require("express");
const router = express.Router();

const addUser = require("../controller/user/addUser");
const allUsers = require("../controller/user/allUsers");
const deleteUser = require("../controller/user/deleteUser");
const singleUser = require("../controller/user/singleUser");
const updateUser = require("../controller/user/updateUser");

//API's
router.post("/user", addUser);
router.get("/user", allUsers);
router.get("/user/:id", singleUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// If endpoint is incorrectS
router.all("*", function (req, res) {
  res.status(404).send({
    status: false,
    message: "Page not found !!!",
  });
});

module.exports = router;