const { Task, Employee, Role, Thought } = require('../models');
const { signToken, AuthenticationError, InputError } = require('../utils/auth');

/**
 * GraphQL resolvers for handling queries and mutations.
 */
const resolvers = {
    Query: {
        /**
         * Fetch all tasks.
         * @returns {Promise<Array>} List of tasks.
         */
        tasks: async () => {
            return Task.find({});
        },

        /**
         * Fetch all employees.
         * @returns {Promise<Array>} List of employees.
         */
        employees: async () => {
            return Employee.find({});
        },

        /**
         * Fetch all roles.
         * @returns {Promise<Array>} List of roles.
         */
        roles: async () => {
            return Role.find({});
        },

        /**
         * Fetch all thoughts.
         * @returns {Promise<Array>} List of thoughts.
         */
        thoughts: async () => {
            return Thought.find({});
        },

        /**
         * Fetch a single employee by ID.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {string} args.employeeID - Employee ID.
         * @returns {Promise<Object>} Employee object.
         */
        employee: async (parent, { employeeID }) => {
            return Employee.findOne({ employeeID });
        },

        /**
         * Fetch a single task by ID.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {string} args.taskID - Task ID.
         * @returns {Promise<Object>} Task object.
         */
        task: async (parent, { taskID }) => {
            return Task.findOne({ taskID });
        },

        /**
         * Fetch the current logged-in user.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {Object} context - Context object.
         * @returns {Promise<Object>} Employee object.
         * @throws {AuthenticationError} If user is not logged in.
         */
        me: async (parent, args, context) => {
            console.log("[Query] me");
            if (context.user) {
                return Employee.findOne({ email: context.user.email });
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    },
    Mutation: {
        /**
         * Login an employee.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {string} args.email - Employee email.
         * @param {string} args.password - Employee password.
         * @returns {Promise<Object>} Token and employee object.
         * @throws {AuthenticationError} If email or password is incorrect.
         */
        login: async (parent, { email, password }) => {
            console.log("login");
            const employee = await Employee.findOne({ email });
            console.log(employee);

            if (!employee) {
                throw AuthenticationError;
            }

            const correctPw = await employee.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(employee);

            return { token, employee };
        },

        /**
         * Create a new employee.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {Object} args.employee - Employee data.
         * @returns {Promise<Object>} Token and new employee object.
         * @throws {InputError} If employee ID or email already exists.
         */
        createEmployee: async (parent, { employee }) => {
            const roleID = employee.roleID;
            const employeeID = employee.employeeID;
            const email = employee.email;

            const role = await Role.findOne({ roleID });
            const existEmployeeID = await Employee.findOne({ employeeID });
            const existEmail = await Employee.findOne({ email });

            // if (!role || existEmployeeID || existEmail) {
            //     throw InputError;
            // }

            if (existEmployeeID) {
                console.warn("existEmployeeID");
                throw InputError;
            }

            if (existEmail) {
                console.warn("existEmail");
                throw InputError;
            }

            const newEmployee = await Employee.create({ ...employee });
            const token = signToken(newEmployee);

            return { token, newEmployee };
        },

        /**
         * Update an existing employee.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {Object} args.employee - Employee data.
         * @returns {Promise<Object>} Token and updated employee object.
         */
        updateEmployee: async (parent, { employee }) => {
            // const employeeID = employee.employeeID;
            const updatedEmployee = await Employee.findOneAndUpdate(
                { employeeID: employee.employeeID },
                { $set: employee },
                {
                    new: true,
                    runValidators: true,
                },
            );
            console.log(updatedEmployee);

            const token = signToken(updatedEmployee);

            return { token, updatedEmployee };

            // return updatedEmployee;
        },

        /**
         * Delete an employee by ID.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {string} args.employeeID - Employee ID.
         * @returns {Promise<boolean>} True if deletion was successful, false otherwise.
         */
        deleteEmployee: async (parent, { employeeID }) => {
            // Need to delete the associated thoughts, and remove the employee name from the list
            const result = await Employee.deleteOne({ employeeID });
            if (result.deletedCount === 1) {
                return true;
            }
            return false;
        },

        /**
         * Create a new thought.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {Object} args.thought - Thought data.
         * @returns {Promise<Object>} New thought object.
         */
        createThought: async (parent, { thought }) => {
            const newThought = await Thought.create({ ...thought });
            return newThought;
        },

        /**
         * Delete a thought by ID.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {string} args.thoughtID - Thought ID.
         * @returns {Promise<boolean>} True if deletion was successful, false otherwise.
         */
        deleteThought: async (parent, { thoughtID }) => {
            const result = await Thought.deleteOne({ thoughtID });
            // const updatedEmployee = await Employee.findOneAndUpdate(
            //     { employeeID: employeeID },
            //     { $pull: { thoughts: { thoughtID: thoughtID } } },
            //     { new: true }
            // );
            if (result.deletedCount === 1) {
                return true;
            }
            return false;
        },

        /**
         * Create a new comment on a thought.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {string} args.thoughtID - Thought ID.
         * @param {Object} args.comment - Comment data.
         * @returns {Promise<Object>} Updated thought object.
         */
        createComment: async (parent, { thoughtID, comment }) => {
            const updatedThought = await Thought.findOneAndUpdate(
                { thoughtID: thoughtID },
                { $addToSet: { comments: comment } },
                {
                    new: true,
                    runValidators: true,
                },
            );

            // const token = signToken(user);
            // console.log(updatedThought);
            console.log(updatedThought);

            return updatedThought;
        },

        /**
         * Delete a comment from a thought.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {string} args.thoughtID - Thought ID.
         * @param {string} args.commentID - Comment ID.
         * @returns {Promise<Object>} Updated thought object.
         */
        deleteComment: async (parent, { thoughtID, commentID }) => {
            const updatedThought = await Thought.findOneAndUpdate(
                { thoughtID: thoughtID },
                { $pull: { comments: { commentID: commentID } } },
                {
                    new: true,
                    runValidators: true,
                },
            );
            return updatedThought;
        },

        /**
         * Create a new task.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {Object} args.task - Task data.
         * @returns {Promise<Object>} New task object.
         */
        createTask: async (parent, { task }) => {
            const newTask = await Task.create({ ...task });

            console.log(newTask);

            return newTask;
        },

        /**
         * Update an existing task.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {Object} args.task - Task data.
         * @returns {Promise<Object>} Updated task object.
         */
        updateTask: async (parent, { task }) => {
            const updatedTask = await Task.findOneAndUpdate(
                { taskID: task.taskID },
                { $set: task },
                {
                    new: true,
                    runValidators: true,
                },
            );
            return updatedTask;
        },

        /**
         * Delete a task by ID.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {string} args.taskID - Task ID.
         * @returns {Promise<boolean>} True if deletion was successful, false otherwise.
         */
        deleteTask: async (parent, { taskID }) => {
            const result = await Task.deleteOne({ taskID: taskID });
            if (result.deletedCount === 1) {
                return true;
            }
            return false;
        },

        /**
         * Create a new to-do item for a task.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {string} args.taskID - Task ID.
         * @param {Object} args.todo - To-do data.
         * @returns {Promise<Object>} Updated task object.
         */
        createToDo: async (parent, { taskID, todo }) => {
            const updatedTask = await Task.findOneAndUpdate(
                { taskID: taskID },
                { $addToSet: { todos: todo } },
                {
                    new: true,
                    runValidators: true,
                },
            );

            console.log(updatedTask);

            return updatedTask;
        },

        /**
         * Update an existing to-do item for a task.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {string} args.taskID - Task ID.
         * @param {Object} args.todo - To-do data.
         * @returns {Promise<Object>} Updated task object.
         */
        updateToDo: async (parent, { taskID, todo }) => {
            const currentTask = await Task.findOne({ taskID: taskID });
            let newTask = currentTask;
            newTask.todos = currentTask.todos.map((item) => {
                if (item.todoID === todo.todoID) {
                    return todo;
                } else {
                    return item;
                }
            });
            // console.log(newTask);

            const updatedTask = await Task.findOneAndUpdate(
                { taskID: taskID },
                { $set: newTask },
                {
                    new: true,
                    runValidators: true,
                },
            );

            return updatedTask;
        },

        /**
         * Delete a to-do item from a task.
         * @param {Object} parent - Parent resolver.
         * @param {Object} args - Arguments.
         * @param {string} args.taskID - Task ID.
         * @param {string} args.todoID - To-do ID.
         * @returns {Promise<Object>} Updated task object.
         */
        deleteToDo: async (parent, { taskID, todoID }) => {
            const currentTask = await Task.findOne({ taskID: taskID });
            const newTodo = currentTask.todos.filter(
                (todo) => todo.todoID !== todoID,
            );
            let newTask = currentTask;
            newTask.todos = newTodo;

            const updatedTask = await Task.findOneAndUpdate(
                { taskID: taskID },
                { $set: newTask },
                {
                    new: true,
                    runValidators: true,
                },
            );

            return updatedTask;
        },
    },
};

module.exports = resolvers;