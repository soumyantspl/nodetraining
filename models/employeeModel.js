const mongoose = require("mongoose");
const validator = require("validator");
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
      },
      default: null,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    designationId: {
      type: mongoose.Schema.ObjectId,
      //   required: true,
      default: null,
    },

    organizationId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      index: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("employees", employeeSchema);

module.exports = Employee;
