# Peace - Mental Health Counseling App

Welcome to Peace, a mental health counseling app designed to provide support and assistance to users in need of mental health services. This project utilizes React.js with Material UI for the frontend, Express.js for the backend, and MySQL as the database. Additionally, Peace incorporates machine learning algorithms, specifically Random Forest, to classify mental health issues by analyzing user responses to a set of questions.

## Features

- **User Interface**: Peace offers a user-friendly interface designed to facilitate easy navigation and accessibility for users seeking mental health support.
  
- **Counselor Interface**: The app provides a dedicated interface for counselors to manage their profiles, schedule appointments, and communicate with users.

- **Mental Health Assessment**: Peace utilizes machine learning algorithms, such as Random Forest, to classify mental health issues. Users are presented with a set of questions aimed at understanding their mental state, and the app analyzes their responses to provide insights and potential diagnoses.

## Technologies Used

- **Frontend**: React.js with Material UI for building a responsive and intuitive user interface.
  
- **Backend**: Express.js for handling server-side logic and API endpoints, facilitating communication between the frontend and the database.

- **Database**: MySQL is used as the database management system to store user data, counselor profiles, appointment schedules, and other relevant information.

- **Machine Learning**: Random Forest algorithm is employed to analyze user responses and classify mental health issues, providing personalized insights and recommendations.

## Screenshots
![image](https://github.com/harshnaikwade/Peace/assets/97459506/5030e018-e770-499f-86ca-9a5130ed9f0a)


![image](https://github.com/harshnaikwade/Peace/assets/97459506/f4b4b7d0-f151-4b28-a700-fae9209da3a6)


## Installation

To run Peace locally on your machine, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/harshnaikwade/Peace.git
    ```

2. Navigate to the project directory:

    ```bash
    cd peace
    ```

3. Install dependencies for both frontend and backend:

    ```bash
    # Install frontend dependencies
    cd frontend
    npm install
    
    # Install backend dependencies
    cd ../backend
    npm install
    ```

4. Set up the database:
   
   - Create a MySQL database and configure the connection details in the backend's `.env` file.

5. Start the backend server:

    ```bash
    # Inside the backend directory
    npm start
    ```

6. Start the frontend server:

    ```bash
    # Inside the frontend directory
    npm start
    ```

7. Access Peace in your browser at `http://localhost:3000`.

## Usage

- **Users**: Users can sign up or log in to access mental health assessments, schedule appointments with counselors, and receive personalized support and recommendations based on their mental health needs.

- **Counselors**: Counselors can create profiles, manage their availability, communicate with users, and provide counseling services through the app's dedicated interface.

## Contributing

We welcome contributions from the community to enhance Peace and make it even more effective in supporting mental health. Feel free to submit bug reports, feature requests, or pull requests to help improve the app.

## License

This project is licensed under the [MIT License](LICENSE).

---

We hope that Peace serves as a valuable tool in promoting mental well-being and providing support to those in need. If you have any questions or feedback, please don't hesitate to reach out. Thank you for using Peace!
