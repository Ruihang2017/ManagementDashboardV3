# Employee Dashboard



## Table of Contents

- [Project Description](#project-description)
- [Screenshots](#screenshots)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Description

This project is a collaborative MERN-stack single-page application that addresses real-world problems by providing a user-focused platform for task management and forum discussions. It combines a scalable MongoDB back end, a GraphQL API, and an Express.js and Node.js server with a React front end. User authentication is implemented using JSON Web Tokens (JWT).

The application allows users to create, read, update, and delete tasks, todos within tasks, thoughts in the main forum, and comments within thoughts. Users can also sign in/out and change their avatars and account information. Additionally, the platform provides a statistical analysis board that displays user and team statistics related to tasks, todos, and activities.

## Screenshots
![Platform Screenshot](./client/src/assets/screenshot/Screenshot%202023-10-30%20230326.png)

![Platform Screenshot](./client/src/assets/screenshot/Screenshot%202023-10-30%20230349.png)

![Platform Screenshot](./client/src/assets/screenshot/Screenshot%202023-10-30%20230437.png)

![Platform Screenshot](./client/src/assets/screenshot/Screenshot%202023-10-30%20230129.png)

## Features

- **User Authentication**: Users can sign in/out, and their account information is secured with JWT.

- **Task Management**:
  - Create, Read, Update, Delete (CRUD) tasks.
  - Create, Read, Update, Delete (CRUD) todos within tasks.

- **Forum Discussions**:
  - Create, Read, Update, Delete (CRUD) thoughts in the main forum.
  - Create, Read, Update, Delete (CRUD) comments within thoughts.

- **User Profile**:
  - Change avatars and account information.

- **Statistical Analysis Board**:
  - Display user and team statistics related to tasks, todos, and activities.

- **Responsive and Interactive UI**: The application has a polished, responsive, and interactive user interface.

## Technologies

- **Front End**: React
- **Back End**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **API**: GraphQL
- **User Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Heroku
- **UI Styling**: Chakra UI (or your preferred UI library)

## Getting Started

1. Clone the repository.
2. Install the necessary dependencies using `npm install`.
3. Set up your MongoDB database and configure the connection in your server.
4. Ensure sensitive API keys are protected on the server.
5. Run the development server using `npm start` or your preferred script.

## Usage

- Access the application through the provided URL.
- Sign in or create an account to start using the platform.
- Explore the task management and forum features.
- Update your profile, change your avatar, and customize your account information.
- Use the statistical analysis board to view user and team statistics.
- Enjoy the user-friendly interface for easy navigation.

## Contributing

Contributions to this project are welcome. If you'd like to make improvements or add new features, please follow these steps:

1. Fork the project.
2. Create a new branch for your feature or improvement.
3. Make your changes.
4. Submit a pull request with a clear description of your work.

## License

This project is licensed under the [MIT License](LICENSE), which means you are free to use, modify, and distribute the code as needed.

Feel free to customize this README.md to include specific details about your project, such as installation instructions, testing procedures, or additional information about your team and project goals.
