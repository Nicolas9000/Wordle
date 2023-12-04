const express = require("express");
const cors = require("cors");

require("dotenv").config();

const db = require("./models");

const AuthRoute = require("./routes/auth.routes");
const UserRoute = require("./routes/user.routes");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  db.sequelize
    .transaction(async () => {
      next();
    })
    .catch(() => {
      console.log();
      res.status(500);
      return res.json({
        message: "Internal error",
      });
    });
});


app.use("/api", AuthRoute);
app.use("/api", UserRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
