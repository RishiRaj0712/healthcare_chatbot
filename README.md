# Healthcare Chatbot

A healthcare chatbot that provides medical diagnosis and recommendations based on user input symptoms using a fine-tuned model deployed on Hugging Face.

Check out the deployed [Model ](https://api-inference.huggingface.co/models/utkarshiitr/medicalchatbot3) on Hugging Face.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
- [License](#license)

## Overview
This project involves a chatbot that accepts symptoms from the user and returns possible medical conditions and recommendations. It leverages a fine-tuned BERT model deployed on Hugging Face for the predictions.

## Features
- Chat interface for entering symptoms.
- Real-time medical diagnosis and recommendations.
- Typing effect for bot responses.

## Technologies Used
### Frontend
- React
- Axios
- Typing Effect Hook
- CSS

### Backend
- Node.js
- Express.js
- Axios
- Hugging Face API

## Setup and Installation

### Prerequisites
- Node.js and npm installed on your machine.

### Installation Steps

1. **Clone the repository:**
   ```sh
   git clone https://github.com/RishiRaj0712/healthcare_chatbot.git
   cd healthcare_chatbot 
   ```   

2. **Install frontend dependencies:**
   ```sh
   cd diagnosis-chatbot
   npm install
   ```

3. **Install backend dependencies:**
   ```sh
   cd ../diagnosis-chatbot-backend
   npm install
   ```

### Environment Variables
   Create a .env file in the diagnosis-chatbot-backend directory and add your Hugging Face API token:

   ```makefile
   HUGGING_FACE_API_TOKEN=your_hugging_face_api_token
   ```

### Running the Project

1. **Navigate to the backend directory:**
   ```sh
   cd diagnosis-chatbot-backend
   ````

2. **Start the backend server:**
   ```sh
   node index.js
   ```

### Running the Frontend

1. **Open a new terminal and navigate to the frontend directory:**
   ```sh
   cd diagnosis-chatbot
   ```

2. **Start the frontend development server:**
   ```sh
   npm run dev
   ```

3. Open your browser and navigate to http://localhost:5173 to interact with the chatbot.


### License
This project is licensed under the MIT License.





