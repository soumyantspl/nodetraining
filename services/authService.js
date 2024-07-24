const Employee = require("../models/employeeModel");
const commonHelper = require("../helpers/commonHelper");
const authMiddleware = require("../middlewares/authMiddleware");
const ObjectId = require("mongoose").Types.ObjectId;
/**FUNC- TO VERIFY VALID EMAIL USER */
const verifyEmail = async (email) => {
  console.log("----------------------33333", email);
  return await Employee.findOne(
    { email, isActive: true },
    { _id: 1, email: 1, organizationId: 1, name: 1 }
  );
};

/**FUNC- TO SET PASSWORD   */
const setPassword = async (data) => {
  const userData = await verifyEmail(data.email);
  console.log("userData-------------", userData);
  if (userData) {
      const hashedPassword = await commonHelper.generetHashPassword(
        data.password
      );
      return await Employee.updateOne(
        { email: data.email },
        { password: hashedPassword }
      );
    } else {
      return {
        isInValidUser: true,
      };
    }
  
  return false;
};

/**FUNC- FOR SIGN IN BY PASSWORD   */
const signInByPassword = async (data) => {
  const userData = await Employee.findOne(
    { email: data.email },
    {
      _id: 1,
      email: 1,
      isActive: 1,
     
    }
  );
  console.log("userData----------", userData);
  if (!userData) {
    return false;
  }
  // Based on user Status
  if (!userData.isActive) {
    return {
      isUserDeactivated: true,
    };
  }
  const passwordIsValid = await commonHelper.verifyPassword(
    data.password,
    userData.password
  );
  console.log(passwordIsValid);
  // Check correct password
  if (!passwordIsValid) {
    return {
      incorrectPassword: true,
    };
  }

  const token = await authMiddleware.generateUserToken({
    userId: userData._id,
    name: userData.name,
  });
  console.log(token);
  delete userData.password;
  return {
    token,
    userData: {
      _id: userData._id,
      name: userData.name,
      email: userData.email
    },
  };
};

module.exports = {
  verifyEmail,
  setPassword,
  signInByPassword,
};
