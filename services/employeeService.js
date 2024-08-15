const Employee = require("../models/employeeModel");
const ObjectId = require("mongoose").Types.ObjectId;
const commonHelper = require("../helpers/commonHelper");

/**FUNC- CREATE EMPLOYEE */
const createEmployee = async (userId, data, ipAddress = "1000") => {
  console.log("----------------------33333", data);
  const [emailDetails] = await checkDuplicate(
    data.email,
    data.organizationId,
    data.empId
  );

  console.log("emailDetails", emailDetails);
  if (emailDetails) {
    return {
      isDuplicateEmail: true,
    };
  }

  if (!emailDetails) {
    const inputData = {
      name: data.name,
      email: data.email,
      employeeImage:data.employeeImage
    };

    const empData = new Employee(inputData);
    const result = await empData.save();
    return result;
  }

  return false;
};

/**FUNC- TO DELETE AN EMPLOYEE */
const deleteEmploye = async (userId, id, ipAddress = "1000") => {
  console.log("id--->>", id);
  const result = await Employee.findByIdAndUpdate(
    { _id: id },
    { isActive: false },
    { new: true }
  );

  return result;
};

/**FUNC- TO VERIFY DUPLICATE EMPLOYEE */
const checkDuplicate = async (email) => {
  console.log("email---------------", email);
  return await Promise.all([checkDuplicateEmail(email)]);
};

/**FUNC- TO VERIFY DUPLICATE USER */
const checkDuplicateUserEntry = async (data) => {
  console.log("email---------------", data.email);
  return await checkDuplicateEmail(data.email);
};

/**FUNC- TO VERIFY DUPLICATE EMPLOYEE EMAIL */
const checkDuplicateEmail = async (email, organizationId) => {
  console.log("email---------------", email);
  return await Employee.findOne(
    { email, isActive: true },
    { _id: 1, email: 1, name: 1, isActive: 1 }
  );
};

/**FUNC- TO SEE LIST OF EMPLOYEE */
const listEmployee = async (bodyData, queryData) => {
  const { order } = queryData;
  const { searchKey } = bodyData;

  let query = searchKey
    ? {
        $and: [
          {
            $or: [
              { name: { $regex: searchKey, $options: "i" } },
              { email: { $regex: searchKey, $options: "i" } },
            ],
          },
          {
            isActive: true,
          },
        ],
      }
    : {
        isActive: true,
      };

  const limit = queryData.limit ? parseInt(queryData.limit) : 0;
  const skip = queryData.page ? (parseInt(queryData.page) - 1) * limit : 0;

  console.log("EMp data--&**&", employeeData);
  const totalCount = await Employee.countDocuments(query);
  const employeeData = await Employee.find(query)
    .sort({ _id: parseInt(order) })
    .skip(skip)
    .limit(limit);

  return { totalCount, employeeData };
};

/**FUNC- TO SEE SINGLE EMPLOYE DETAILS */
const viewSingleEmployee = async (id) => {
  const singleEmployeDetails = await Employee.findById({
    _id: id,
    isActive: true,
  });
  console.log("single employee", singleEmployeDetails);
  return singleEmployeDetails;
};

/**FUNC- TO VERIFY ACTIVE USER*/
const verifyEmployee = async (empId) => {
  console.log("empId-----------", empId);
  return await Employee.findOne(
    { _id: new ObjectId(empId), isActive: true },
    {
      _id: 1,
      email: 1,
      name: 1,
      isActive: 1,
    }
  );
};


const checkDuplicateEntry = async (email, empId) => {
  const emailDetails = await Employee.findOne({ email });
  return [emailDetails];
};
/**FUNC- EDIT EMPLOYEE */
const editEmployee = async (userId, id, data, ipAddress = "1000") => {
  console.log("Data received for update:", data);
  console.log("Employee ID:", id);
  const currentData = await Employee.findById({
    _id: new ObjectId(id), // Ensure `id` is passed as ObjectId
    isActive: true,
  });

  if (!currentData) {
    return null;
  }

  const updateData = {
    ...data,
    employeeImage:
      data.employeeImage !== undefined
        ? data.employeeImage
        : currentData.employeeImage,
  };
  const [emailDetails, empCodeDetails] = await checkDuplicateEntry(data.email);

  if (emailDetails && emailDetails._id.toString() !== id) {
    return {
      isDuplicateEmail: true,
    };
  }

  const result = await Employee.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });

  return result;
};

module.exports = {
  createEmployee,
  listEmployee,
  verifyEmployee,
  editEmployee,
  deleteEmploye,
  viewSingleEmployee,
  checkDuplicateUserEntry,
};
