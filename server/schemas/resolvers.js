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
        me: async (parent, args, context) => {
            console.log("[Query] me");
            if (context.user) {
                return Employee.findOne({ email: context.user.email });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
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
                const token = signToken(newEmployee);

                return { token, newEmployee };
            } catch (error) {
                throw error;
            }
        },
        updateEmployee: async (parent, { employee }) => {
            try {
                // const employeeID = employee.employeeID;
                console.log(1);
                const updatedEmployee = await Employee.findOneAndUpdate(
                    { employeeID: employee.employeeID },
                    { $set: employee },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                console.log(2);
                console.log(updatedEmployee);

                const token = signToken(updatedEmployee);
                console.log(3);

                return { token, updatedEmployee };

                // return updatedEmployee;

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
        createTask: async (parent, { task }) => {
            try {

                const newTask = await Task.create({ ...task });

                console.log(newTask);

                return newTask;
            } catch (error) {
                throw error;
            }
        },
        updateTask: async (parent, { task }) => {
            try {
                // const employeeID = employee.employeeID;
                const updatedTask = await Task.findOneAndUpdate(
                    { taskID: task.taskID },
                    { $set: task },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                return updatedTask;

            } catch (error) {
                throw error;
            }
        },
        deleteTask: async (parent, { taskID }) => {
            try {
                const result = await Task.deleteOne({ taskID: taskID });
                if (result.deletedCount === 1) {
                    return true;
                }
                return false;
            } catch (error) {
                throw error;
            }
        },
        createToDo: async (parent, { taskID, todo }) => {
            try {
                const updatedTask = await Task.findOneAndUpdate(
                    { taskID: taskID },
                    { $addToSet: { todos: todo } },
                    {
                        new: true,
                        runValidators: true,
                    }
                );

                console.log(updatedTask);

                return updatedTask;
            } catch (error) {
                throw error;
            }
        },
        updateToDo: async (parent, { taskID, todo }) => {
            try {
                const currentTask = await Task.findOne({ taskID: taskID });
                let newTask = currentTask;
                newTask.todos = currentTask.todos.map((item) => {
                    if (item.todoID === todo.todoID) {
                        return todo;
                    } else {
                        return item;
                    }
                })
                // console.log(newTask);

                const updatedTask = await Task.findOneAndUpdate(
                    { taskID: taskID },
                    { $set: newTask },
                    {
                        new: true,
                        runValidators: true,
                    }
                );

                return updatedTask;
            } catch (error) {
                throw error;
            }
        },
        deleteToDo: async (parent, { taskID, todoID }) => {
            try {
                const currentTask = await Task.findOne({ taskID: taskID });
                const newTodo = currentTask.todos.filter((todo) => todo.todoID !== todoID);
                let newTask = currentTask;
                newTask.todos = newTodo;

                const updatedTask = await Task.findOneAndUpdate(
                    { taskID: taskID },
                    { $set: newTask },
                    {
                        new: true,
                        runValidators: true,
                    }
                );

                return updatedTask;
            } catch (error) {
                throw error;
            }
        },
    }
}

module.exports = resolvers;