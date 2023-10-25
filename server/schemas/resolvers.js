const { Task, Employee, Role, Thought } = require('../models');
const { signToken, AuthenticationError, InputError } = require('../utils/auth');

const resolvers = {
    Query: {
        tasks: async () => {
            return Task.find({});
        },
        employees: async () => {
            return Employee.find({});
        },
        roles: async () => {
            return Role.find({});
        },
        thoughts: async () => {
            return Thought.find({});
        },

        employee: async (parent, { employeeID }) => {
            return Employee.findOne({ employeeID });
        },
        task: async (parent, { taskID }) => {
            return Task.findOne({ taskID });
        },
    },
    Mutation: {
        createEmployee: async (parent, { employee }) => {
            try {
                const roleID = employee.roleID;
                const employeeID = employee.employeeID;
                const email = employee.email;

                const role = await Role.findOne({ roleID });
                const existEmployeeID = await Employee.findOne({ employeeID });
                const existEmail = await Employee.findOne({ email });

                if (!role || existEmployeeID || existEmail) {
                    throw InputError;
                }

                const newEmployee = await Employee.create({ ...employee });
                // // const token = signToken(user);
                // // return { token, user };
                console.log(newEmployee);

                return newEmployee;
            } catch (error) {
                throw error;
            }
        },
        updateEmployee: async (parent, { employee }) => {
            try {
                // const employeeID = employee.employeeID;
                const updatedEmployee = await Employee.findOneAndUpdate(
                    { employeeID: employee.employeeID },
                    { $set: employee },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                return updatedEmployee;

            } catch (error) {
                throw error;
            }
        },
        deleteEmployee: async (parent, { employeeID }) => {
            try {
                const result = await Employee.deleteOne({ employeeID, employeeID });
                if (result.deletedCount === 1) {
                    return true;
                }
                return false;
            } catch (error) {
                throw error;
            }
        },
        createThought: async (parent, { thought }) => {
            try {

                const newThought = await Thought.create({ ...thought });
                // const updatedEmployee = await Employee.findOneAndUpdate(
                //     { employeeID: employeeID },
                //     { $addToSet: { thoughts: thought } },
                //     {
                //         new: true,
                //         runValidators: true,
                //     }
                // );
                // const token = signToken(user);
                // console.log(newThought);
                // console.log(updatedEmployee);

                return newThought;
            } catch (error) {
                throw error;
            }
        },
        deleteThought: async (parent, { thoughtID }) => {
            try {
                const result = await Thought.deleteOne({ thoughtID, thoughtID });
                // const updatedEmployee = await Employee.findOneAndUpdate(
                //     { employeeID: employeeID },
                //     { $pull: { thoughts: { thoughtID: thoughtID } } },
                //     { new: true }
                // );
                if (result.deletedCount === 1) {
                    return true;
                }
                return false;
            } catch (error) {
                throw error;
            }
        },
        createComment: async (parent, { thoughtID, comment }) => {
            try {

                const updatedThought = await Thought.findOneAndUpdate(
                    { thoughtID: thoughtID },
                    { $addToSet: { comments: comment } },
                    {
                        new: true,
                        runValidators: true,
                    }
                );

                // const token = signToken(user);
                // console.log(updatedThought);
                console.log(updatedThought);

                return updatedThought;
            } catch (error) {
                throw error;
            }
        },
        deleteComment: async (parent, { thoughtID, commentID }) => {
            try {
                const updatedThought = await Thought.findOneAndUpdate(
                    { thoughtID: thoughtID },
                    { $pull: { comments: { commentID: commentID } } },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                return updatedThought;
            } catch (error) {
                throw error;
            }
        },
    }
}

module.exports = resolvers;