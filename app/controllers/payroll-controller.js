// /**
//  * importing the database structure or model
//  */
// const Employee = require('../models/employee-details');

// /**
//  * creates an employee object with the request of a client
//  * @param {*} req (express property)
//  * @param {*} res (express property)
//  * @returns promise
//  */
// exports.create = (req, res) => {
//   if (!req.body.first_name || !req.body.last_name) {
//     return res.status(400).send({
//       message: 'first name and last name of the employee is required!',
//     });
//   }

//   /**
//    * Creating a new employee object
//    * to store the data given by the client
//    */
//   const employee = new Employee({
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     department: req.body.department || 'Management',
//     salary: req.body.salary || 'Rs.30,000.00/-',
//     company: req.body.company || 'ProMax',
//   });

//   /**
//    * saving the data to the database:
//    * If the data saved successfully, it will return the status 200.
//    * Also sends a message.
//    * If the data failed to save, it will return an error or a message
//    */
//   employee
//     .save()
//     .then((data) => {
//       res.status(200).send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || 'some error occurred while saving the data!🤷🏻‍♂️',
//       });
//     });
// };

// /**
//  * Get all the data
//  * @param {*} req (express property)
//  * @param {*} res (express property)
//  */
// exports.getAll = (req, res) => {
//   Employee.find()
//     .then((data) => {
//       res.status(200).send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'some error occurred while fetching the data!🤷🏻‍♂️',
//       });
//     });
// };

// /**
//  * Get employee data by id
//  * @param {*} req (express property)
//  * @param {*} res (express property)
//  */
// exports.getOne = (req, res) => {
//   Employee.findById(req.params.empId)
//     .then((employee) => {
//       if (!employee) {
//         return res.status(404).send({
//           message: `employee with id : ${req.params.empId} not found!`,
//         });
//       }
//       res.status(200).send(employee);
//     })
//     .catch((err) => {
//       return res.status(500).send({
//         message:
//           err.message || 'Some error occurred while fetching the data!🤷🏻‍♂️',
//       });
//     });
// };

// /**
//  * Update employee details
//  * @param {*} req (express property)
//  * @param {*} res (express property)
//  */
// exports.update = (req, res) => {
//   Employee.findByIdAndUpdate(
//     req.params.empId,
//     {
//       first_name: req.body.first_name, //<------ what if not required to update? (how to preserve the old data?)
//       last_name: req.body.last_name,
//       department: req.body.department,
//       salary: req.body.salary,
//       company: req.body.company,
//     },
//     { new: true }
//   )
//     .then((employee) => {
//       if (!employee) {
//         return res.status(404).send({
//           message: `Employee with the id: ${req.params.empId} not found`,
//         });
//       }
//       res
//         .status(200)
//         .send({ message: 'Employee details updated successfully!' });
//     })
//     .catch((err) => {
//       if (err.kind === 'ObjectId') {
//         return res
//           .status(404)
//           .send({ message: `Employee with id: ${req.params.empId} not found` });
//       }
//       return res.status(500).send({
//         message:
//           err.message ||
//           `Some error occurred while updating employee with id: ${req.params.empId}!`,
//       });
//     });
// };

// /**
//  * Deleting employee
//  * @param {*} req (Express property)
//  * @param {*} res (Express property)
//  */
// exports.remove = (req, res) => {
//   Employee.findByIdAndRemove(req.params.empId)
//     .then((employee) => {
//       if (!employee) {
//         return res.status(404).send({
//           message: `Employee with id: ${req.params.empId} not found!`,
//         });
//       }
//       return res.status(200).send({
//         message: `Employee with id: ${req.prams.empId} is deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           `Some error occurred while attending to delete employee with id: ${req.params.empId}.`,
//       });
//     });
// };

const service = require('../services/service.js');

exports.addEmployee = (req,res) => service.create(req,res);
exports.getAllEmployees = (req,res) => service.getAll(req,res);
exports.getOneEmployee = (req,res) => service.getOne(req,res);
exports.updateEmployee = (req,res) => service.update(req,res);
exports.removeEmployee = (req,res) => service.remove(req,res);