const { Task, Employee, Role, Thought } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

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
}

module.exports = resolvers;