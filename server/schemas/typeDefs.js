const typeDefs = `
    type Task {
        _id: ID!
        taskID: String
        taskName: String!
        taskDescription: String!
        todos: [ToDo]
        startingTime: String
        targetTime: String
        completionTime: String
        completed:Boolean
    }

    type ToDo {
        _id: ID!
        todoID: String
        name: String
        description: String
        completed: Boolean
        completionTime: String
        employees: [Employee]
    }

    type Employee {
        _id: ID
        employeeID: String
        firstname: String
        lastname: String
        dob: String
        email: String
        password: String
        role: Role
        thoughts: [Thought]
        tasks: [Task]
        todos: [ToDo]
    }

    type Role {
        _id: ID
        roleID: String
        roleName: String
    }

    type Thought {
        _id: ID
        thoughtID: String
        title: String
        description: String
        comments: [Comment]
        datePosted: String
    }

    type Comment {
        _id: ID
        commentID: String
        commentContent: String
        postedTime: String
    }

    type Query {
        tasks: [Task]
        employees: [Employee]
        roles: [Role]
        thoughts: [Thought]
        task(taskID: String!): Task
        employee(employeeID: String!): Employee
    }
`

module.exports = typeDefs;