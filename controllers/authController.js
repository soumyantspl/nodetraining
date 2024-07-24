const authService = require("../services/authService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

/**FUNC- TO SET PASSWORD FOR SIGN IN*/
const setPassword = async (req, res) => {
  try {
    const result = await authService.setPassword(req.body);

    if (!result) {
      return Responses.failResponse(req, res, null, messages.userNotFound, 200);
    }
    if (result?.isInValidOtp) {
      return Responses.failResponse(req, res, null, messages.invalidOtp, 200);
    }

    return Responses.successResponse(
      req,
      res,
      null,
      messages.passwordResetSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- FOR SIGN IN BY PASSWORD**/
const signInByPassword = async (req, res) => {
  try {
    const result = await authService.signInByPassword(req.body);
    console.log("eeeeeeeeee",result);
    if (!result) {
      return Responses.failResponse(req, res, null, messages.userNotFound, 200);
    }
    if (result?.incorrectPassword) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.incorrectPassword,
        200
      );
    }

    if (result?.isUserDeactivated) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.invalidUser,
        200
      );
    }

    return Responses.successResponse(
      req,
      res,
      result,
      messages.signInSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  setPassword,
  signInByPassword,
};
