# Management Dashboard

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![GitHub issues](https://img.shields.io/github/issues/Ruihang2017/ManagementDashboardV3)
![GitHub stars](https://img.shields.io/github/stars/Ruihang2017/ManagementDashboardV3)
![GitHub forks](https://img.shields.io/github/forks/Ruihang2017/ManagementDashboardV3)

**Available at**
https://management-dashboard-3-10095453001b.herokuapp.com/

## Table of Contents

- [Project Description](#project-description)
- [Screenshots](#screenshots)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Description

The Management Dashboard is a collaborative MERN-stack single-page application designed to address real-world problems by providing a user-focused platform for task management and forum discussions. It integrates a scalable MongoDB back end, a GraphQL API, and an Express.js and Node.js server with a React front end. User authentication is implemented using JSON Web Tokens (JWT). The application allows users to create, read, update, and delete tasks, todos within tasks, thoughts in the main forum, and comments within thoughts. Users can also sign in/out and change their avatars and account information. Additionally, the platform provides a statistical analysis board that displays user and team statistics related to tasks, todos, and activities.

The Management Dashboard leverages the MERN stack (MongoDB, Express.js, React, Node.js) to provide a robust and scalable solution for task management and forum discussions. The back end is powered by MongoDB, a NoSQL database that ensures scalability and flexibility. The GraphQL API facilitates efficient data querying and manipulation, while Express.js and Node.js handle server-side operations. The application follows a single-page application (SPA) architecture, ensuring a seamless user experience. The front end, built with React, offers a responsive and interactive UI, styled with Chakra UI. The back end, powered by Node.js and Express.js, provides a robust server environment. MongoDB, coupled with Mongoose ODM, ensures efficient data management. User authentication is secured with JSON Web Tokens (JWT), and the application is deployed on Heroku for easy accessibility.

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
- **UI Styling**: Chakra UI

## Getting Started

1. Clone the repository.
2. Install the necessary dependencies using `npm install`.
3. Set up your MongoDB database and configure the connection in your server.
4. Ensure sensitive API keys are protected on the server.
5. Run the development server using `npm start` or your preferred script.

## Installation

To install the project, follow these steps:

```sh
git clone https://github.com/Ruihang2017/ManagementDashboardV3.git
cd ManagementDashboardV3
npm install
```

## Usage

1. Access the application through the provided URL.
2. Sign in or create an account to start using the platform.
3. Explore the task management and forum features.
4. Update your profile, change your avatar, and customize your account information.
5. Use the statistical analysis board to view user and team statistics.
6. Enjoy the user-friendly interface for easy navigation.

## Contributing

Contributions to this project are welcome. If you'd like to make improvements or add new features, please follow these steps:

1. Fork the project.
2. Create a new branch for your feature or improvement.
3. Make your changes.
4. Submit a pull request with a clear description of your work.

## License

This project is licensed under the MIT License, which means you are free to use, modify, and distribute the code as needed.
