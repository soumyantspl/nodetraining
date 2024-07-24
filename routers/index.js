const express = require("express");
const app = express();
const BASE_PATH = "V1";
const authRouter = require("./authRouter");
const employeeRouter = require("./employeeRouter");


app.use(`/${BASE_PATH}/auth`, authRouter);
app.use(`/${BASE_PATH}/employee`, employeeRouter);

module.exports = app;
