/**
 * GraphQL type definitions for the schema.
 */
const typeDefs = `
    """
    Represents a task in the system.
    """
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

    """
    Input type for creating or updating a task.
    """
    input TaskInput {
        taskID: String
        taskName: String!
        taskDescription: String!
        todos: [ToDoInput]
        startingTime: String
        targetTime: String
        completionTime: String
        completed:Boolean
        EmployeeIDs:[String]
    }

    """
    Represents a to-do item within a task.
    """
    type ToDo {
        _id: ID!
        todoID: String
        name: String
        description: String
        completed: Boolean
        completionTime: String
        EmployeeIDs:[String]
    }

    """
    Input type for creating or updating a to-do item.
    """
    input ToDoInput {
        todoID: String
        name: String
        description: String
        completed: Boolean
        completionTime: String
        EmployeeIDs:[String]
    }

    """
    Represents an employee in the system.
    """
    type Employee {
        _id: ID
        employeeID: String
        firstname: String
        lastname: String
        email: String
        password: String
        roleID: String
        avatarURI: String
    }

    """
    Input type for creating or updating an employee.
    """
    input EmployeeInput {
        _id: ID
        employeeID: String
        firstname: String
        lastname: String
        email: String
        password: String
        roleID: String
        avatarURI: String
    }

    """
    Represents a role in the system.
    """
    type Role {
        _id: ID
        roleID: String
        roleName: String
    }

    """
    Represents a thought in the system.
    """
    type Thought {
        _id: ID
        thoughtID: String
        title: String
        description: String
        comments: [Comment]
        datePosted: String
        EmployeeID:String
    }

    """
    Input type for creating or updating a thought.
    """
    input ThoughtInput {
        thoughtID: String
        title: String
        description: String
        EmployeeID:String
    }

    """
    Represents a comment on a thought.
    """
    type Comment {
        _id: ID
        commentID: String
        commentContent: String
        postedTime: String
        EmployeeID:String
    }

    """
    Input type for creating or updating a comment.
    """
    input CommentInput {
        commentID: String
        commentContent: String
        EmployeeID:String
    }

    """
    Root Query type.
    """
    type Query {
        tasks: [Task]
        employees: [Employee]
        roles: [Role]
        thoughts: [Thought]
        task(taskID: String!): Task
        employee(employeeID: String!): Employee
        me: Employee
    }

    """
    Root Mutation type.
    """
    type Mutation {
        login(email: String!, password: String!): Auth

        createEmployee(employee: EmployeeInput!): Auth
        updateEmployee(employee: EmployeeInput!): Auth
        deleteEmployee(employeeID: String!): Boolean

        createThought(thought: ThoughtInput!): Thought
        deleteThought(thoughtID: String!): Boolean

        createComment(thoughtID: String!, comment:CommentInput! ): Thought
        deleteComment(thoughtID: String!, commentID: String!): Thought

        createTask(task: TaskInput!): Task
        updateTask(task: TaskInput!): Task
        deleteTask(taskID: String!): Boolean

        createToDo(taskID: String! , todo: ToDoInput!): Task
        updateToDo(taskID: String! , todo: ToDoInput!): Task
        deleteToDo(taskID: String!, todoID: String!): Task
    }

    """
    Represents authentication information.
    """
    type Auth {
        token: ID!
        Employee: Employee
    }
`;

module.exports = typeDefs;
