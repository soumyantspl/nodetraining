const employeeService = require("../services/employeeService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

/**FUNC- TO CREATE EMPLOYEE**/
const createEmployee = async (req, res) => {
  try {

    console.log("In request body--", req.body);
    const data = {
      name: req.body.name,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
    };
    if (req.files && req.files["employeeImage"]) {
      data.employeeImage = req.files["employeeImage"][0].path;
    }
   
    console.log("Files in controller", req.files);


    const result = await employeeService.createEmployee(
      req.userId,
      data,
      req.ip
    );
    console.log(result);
    if (result?.isDuplicateEmail) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.duplicateEmail,
        200
      );
    }

    return Responses.successResponse(
      req,
      res,
      result.data,
      messages.createdSuccess,
      201
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO EDIT EMPLOYEE **/
const editEmployee = async (req, res) => {
  try {




    console.log("In request body--", req.body);
    const data = {
      name: req.body.name,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
    };
    if (req.files && req.files["employeeImage"]) {
      data.employeeImage = req.files["employeeImage"][0].path;
    }
   
    console.log("Files in controller", req.files);




    
    const result = await employeeService.editEmployee(
      req.userId,
      req.params.id,
     data,
      req.ip
    );
    console.log(result);
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.updateFailedRecordNotFound,
        200
      );
    }

    if (result?.isDuplicateEmail) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.duplicateEmail,
        200
      );
    }

    return Responses.successResponse(
      req,
      res,
      result,
      messages.updateSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    console.log(req.params);
    const result = await employeeService.deleteEmploye(
      req.userId,
      req.params.id,
      req.ip
    );
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.deleteFailedRecordNotFound,
        200
      );
    }
    return Responses.successResponse(
      req,
      res,
      null,
      messages.deleteSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
const listEmployee = async (req, res) => {
  try {
    const result = await employeeService.listEmployee(req.body, req.query);
    console.log(result);
    if (result.totalCount == 0) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.recordsNotFound,
        200
      );
    }
    return Responses.successResponse(
      req,
      res,
      result,
      messages.recordsFound,
      200
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

const viewSingleEmployee = async (req, res) => {
  try {
    const result = await employeeService.viewSingleEmployee(req.params.id);
    console.log("viewSingleEmploye result", result);
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.recordsNotFound,
        200
      );
    }
    return Responses.successResponse(
      req,
      res,
      result,
      messages.recordsFound,
      200
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};


const checkDuplicateUser = async (req, res) => {
  try {
    const result = await employeeService.checkDuplicateUserEntry(req.body);
    console.log("result----->>>", result);
    const resultObject = {
      isDuplicateUser: true,
    };
    if (!result) {
      resultObject.isDuplicateUser = false;
      return Responses.failResponse(
        req,
        res,
        resultObject,
        messages.recordsNotFound,
        200
      );
    }

    return Responses.successResponse(
      req,
      res,
      resultObject,
      messages.duplicateEmail,
      200
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
const listOnlyEmployee = async (req, res) => {
  try {
    const result = await employeeService.listOnlyEmployee(
      req.params.organizationId
    );
    console.log(result);
    if (result.length == 0) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.recordsNotFound,
        200
      );
    }
    return Responses.successResponse(
      req,
      res,
      result,
      messages.recordsFound,
      200
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
module.exports = {
  createEmployee,
  editEmployee,
  deleteEmployee,
  listEmployee,
  viewSingleEmployee,
  checkDuplicateUser,
  listOnlyEmployee,
};
