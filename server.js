require("dotenv").config();
const express = require("express");
const app = express();
const mainRouter = require("./routers/index");
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./dbLayer/connection");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const allowOrigin = ["*", "http://localhost:3000", "http://192.168.1.8:3000"];
const corsOpts = {
  origin: allowOrigin,
  methods: ["GET, POST, PUT, DELETE, OPTIONS, PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOpts));

//mongodb connection using mongoose
connectDB();
app.get("/", (req, res) => {
  res.send("Welcome to Demo API!");
});
app.use("/api", mainRouter);

/*Listen express server on port*/
app.listen(PORT, () => {
  console.info(`Server is running on port.... ${PORT}`);
});
