import { gql } from '@apollo/client';


export const CREATE_EMPLOYEE = gql`
    mutation CreateEmployee($employee: EmployeeInput!) {
        createEmployee(employee: $employee) {
            Employee {
                _id
                employeeID
                firstname
                lastname
                email
                password
                roleID
                avatarURI
            }
            token
        }
    }
`;

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            Employee {
                _id
                employeeID
                firstname
                lastname
                email
                password
                roleID
                avatarURI
            }
        }
    }
`;


export const UPDATE_EMPLOYEE = gql`
    mutation UpdateEmployee($employee: EmployeeInput!) {
        updateEmployee(employee: $employee) {
            _id
            employeeID
            firstname
            lastname
            email
            password
            roleID
            avatarURI
        }
    }
`;


export const DELETE_EMPLOYEE = gql`
    mutation DeleteEmployee($employeeId: String!) {
        deleteEmployee(employeeID: $employeeId)
    }
`;


export const CREATE_THOUGHT = gql`
    mutation CreateThought($thought: ThoughtInput!) {
        createThought(thought: $thought) {
            _id
            thoughtID
            title
            description
            comments {
                _id
                commentID
                commentContent
                postedTime
                EmployeeID
            }
            datePosted
            EmployeeID
        }
    }
`;


export const DELETE_THOUGHT = gql`
    mutation DeleteThought($thoughtId: String!) {
        deleteThought(thoughtID: $thoughtId)
    }
`;


export const CREATE_COMMENT = gql`
    mutation CreateComment($thoughtId: String!, $comment: CommentInput!) {
        createComment(thoughtID: $thoughtId, comment: $comment) {
            _id
            thoughtID
            title
            description
            comments {
                _id
                commentID
                commentContent
                postedTime
                EmployeeID
            }
            datePosted
            EmployeeID
        }
    }
`;

export const DELELTE_COMMENT = gql`
    mutation DeleteComment($thoughtId: String!, $commentId: String!) {
        deleteComment(thoughtID: $thoughtId, commentID: $commentId) {
            _id
            thoughtID
            title
            description
            comments {
                _id
                commentID
                commentContent
                postedTime
                EmployeeID
            }
            datePosted
            EmployeeID
        }
    }
`;

export const CREATE_TASK = gql`
    mutation CreateTask($task: TaskInput!) {
        createTask(task: $task) {
            _id
            taskID
            taskName
            taskDescription
            todos {
                _id
                todoID
                name
                description
                completed
                completionTime
                EmployeeIDs
            }
            startingTime
            targetTime
            completionTime
            completed
            EmployeeIDs
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation UpdateTask($task: TaskInput!) {
        updateTask(task: $task) {
            _id
            taskID
            taskName
            taskDescription
            todos {
                _id
                todoID
                name
                description
                completed
                completionTime
                EmployeeIDs
            }
            startingTime
            targetTime
            completionTime
            completed
            EmployeeIDs
        }
    }
`;

export const DELETE_TASK = gql`
    mutation Mutation($taskId: String!) {
    deleteTask(taskID: $taskId)
    }
`;

export const CREATE_TODO = gql`
    mutation CreateToDo($taskId: String!, $todo: ToDoInput!) {
        createToDo(taskID: $taskId, todo: $todo) {
            _id
            taskID
            taskName
            taskDescription
            todos {
                _id
                todoID
                name
                description
                completed
                completionTime
                EmployeeIDs
            }
            startingTime
            targetTime
            completionTime
            completed
            EmployeeIDs
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation UpdateToDo($taskId: String!, $todo: ToDoInput!) {
        updateToDo(taskID: $taskId, todo: $todo) {
            _id
            taskID
            taskName
            taskDescription
            todos {
                _id
                todoID
                name
                description
                completed
                completionTime
                EmployeeIDs
            }
            startingTime
            targetTime
            completionTime
            completed
            EmployeeIDs
        }
    }
`;

export const DELETE_TODO = gql`
    mutation DeleteToDo($taskId: String!, $todoId: String!) {
        deleteToDo(taskID: $taskId, todoID: $todoId) {
            _id
            taskID
            taskName
            taskDescription
            todos {
                _id
                todoID
                name
                description
                completed
                completionTime
                EmployeeIDs
            }
            startingTime
            targetTime
            completionTime
            completed
            EmployeeIDs
        }
    }
`;






export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                email
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation SaveBook($book: BookInput!) {
        saveBook(book: $book) {
            _id
            username
            email
            password
            savedBooks {
                _id
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                email
                username
            }
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation DeleteBook($bookId: ID!) {
        deleteBook(bookId: $bookId) {
            _id
            username
            savedBooks {
                _id
                authors
                description
                bookId
                image
                link
                title
            }
            email
        }
    }
`;
