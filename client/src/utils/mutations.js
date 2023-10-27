import { gql } from '@apollo/client';

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
