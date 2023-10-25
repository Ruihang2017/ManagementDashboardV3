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
        EmployeeIDs:[String]
    }

    type ToDo {
        _id: ID!
        todoID: String
        name: String
        description: String
        completed: Boolean
        completionTime: String
        EmployeeIDs:[String]
    }

    type Employee {
        _id: ID
        employeeID: String
        firstname: String
        lastname: String
        email: String
        password: String
        roleID: String
    }

    input EmployeeInput {
        _id: ID
        employeeID: String
        firstname: String
        lastname: String
        email: String
        password: String
        roleID: String
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
        EmployeeID:String
    }

    input ThoughtInput {
        _id: ID
        thoughtID: String
        title: String
        description: String
        EmployeeID:String
    }

    type Comment {
        _id: ID
        commentID: String
        commentContent: String
        postedTime: String
        EmployeeID:String
    }

    input CommentInput {
        _id: ID
        commentID: String
        commentContent: String
        EmployeeID:String
    }

    type Query {
        tasks: [Task]
        employees: [Employee]
        roles: [Role]
        thoughts: [Thought]
        task(taskID: String!): Task
        employee(employeeID: String!): Employee
    }

    type Mutation {
        createEmployee(employee: EmployeeInput!): Employee
        updateEmployee(employee: EmployeeInput!): Employee
        deleteEmployee(employeeID: String!): Boolean

        createThought(thought: ThoughtInput!): Thought
        deleteThought(thoughtID: String!): Boolean

        createComment(thoughtID: String!, comment:CommentInput! ): Thought
        deleteComment(thoughtID: String!, commentID: String!): Thought
    }
`

// createComment(thoughtID: String!, comment:CommentInput! ): Thought
// deleteComment(commentID: String!): Thought

// createTask(task: TaskInput!): Task
// updateTask(task: TaskInput!): Task
// deleteTask(taskID: String!): Boolean

// createToDo(todo: ToDoInput!): Task
// updateToDo(todo: ToDoInput!): Task
// deleteToDo(todoID: String!): Task

module.exports = typeDefs;