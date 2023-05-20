require("express-async-errors");
require("dotenv/config");

const express = require("express");
const database = require("./database/sqlite");
const routes = require("./routes");
const uploadConfig = require("./configs/upload");
const AppError = require("./utils/AppError");

const cors = require("cors");

database();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "Error",
      message: err.message
    });
  } else {
    console.error(err);
    res.status(500).json({
      status: "Error",
      message: "Internal server error"
    });
  }
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
