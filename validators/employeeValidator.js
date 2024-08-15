const Joi = require("joi");
const Responses = require("../helpers/response");

// SEND VIEW EMPLOYEE VALIDATOR
const viewEmployeeValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.headers);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    // const bodySchema = Joi.object({
    //   name: Joi.string().required(),
    // });

    await headerSchema.validateAsync({ headers: req.headers });
    // await bodySchema.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
//CREATE EMPLOYEE VALIDATOR
const createEmployeeValidator = async (req, res, next) => {
  try {
    console.log("Body-->", req.body);
    console.log(req.headers);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
      name: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
      email: Joi.string().email().required(),
     
    });
    console.log("bodySchema--", bodySchema);
    await headerSchema.validateAsync({ headers: req.headers });
    await bodySchema.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};

// EDIT EMPLOYEE VALIDATOR
const editEmployeeValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
      name: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
      email: Joi.string().email(),
     
    });
    console.log("bodySchema--", bodySchema);
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};

//DELETE EMPLOYEE VALIDATOR
const deleteEmployeValidator = async (req, res, next) => {
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });
    await paramsSchema.validateAsync(req.params);
    await headerSchema.validateAsync({ headers: req.headers });
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
//LSIT EMPLOYEE VALIDATOR
const listEmployesValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);

    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
      searchKey: Joi.string()
        .trim()
        .pattern(regularExpression)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),

     // organizationId: Joi.string().trim().alphanum().required(),
    });
    const paramsSchema = Joi.object({
      limit: Joi.number(),
      page: Joi.number(),
      order: Joi.number(),
    });

    await headerSchema.validateAsync({ headers: req.headers });
    await bodySchema.validateAsync(req.body);
    await paramsSchema.validateAsync(req.query);

    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};
//VIEW EMPLOYEE VALIDATOR
const viewSingleEmployeeValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};

//CHECK DUPLICATE VISITOR USER VALIDATOR
const checkDuplicateUser = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.headers);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
    
      email: Joi.string().email().required(),
    });

    await headerSchema.validateAsync({ headers: req.headers });
    await bodySchema.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};

module.exports = {
  viewEmployeeValidator,
  createEmployeeValidator,
  editEmployeeValidator,
  deleteEmployeValidator,
  listEmployesValidator,
  viewSingleEmployeeValidator,
  checkDuplicateUser
};
