const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://rajnigandha-jadhav:yNWRixS07q9jSgmB@cluster0.zp2awfe.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  )
  

  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/", route);


// If .env exists then port will  listen the port no. of .env file otherwise listen on 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("server app listening on port " + (process.env.PORT || 3000));
});