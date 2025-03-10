# Fashion Assistant Backend

This is the backend server for the Stylo fashion assistant app. It provides a Flask-based API that handles chat interactions and product recommendations.

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Setup

1. Clone this repository or create a new directory for the backend server.

2. Create a virtual environment (recommended):

   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:

   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install the required dependencies:

   ```bash
   pip install flask flask-cors langchain-chroma langchain-openai langchain-core python-dotenv
   ```

5. Create a `.env` file in the root directory with your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

6. Create a directory for the Chroma database:

   ```bash
   mkdir chroma_fashion
   ```

7. Prepare your product data and import it into the Chroma database (this step depends on your specific data format).

## Running the Server

1. Make sure your virtual environment is activated.

2. Start the Flask server:

   ```bash
   python app.py
   ```

   The server will start on `http://localhost:8000`.

## API Endpoints

### Chat Endpoint

- **URL**: `/api/chat`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "query": "I need a casual outfit for summer",
    "session_id": "optional-session-id-for-continuing-conversation"
  }
  ```
- **Response**:
  ```json
  {
    "response": "Assistant's response text",
    "product_links": ["link1", "link2", ...],
    "session_id": "session-id-for-continuing-conversation"
  }
  ```

### Reset Session Endpoint

- **URL**: `/api/reset`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "session_id": "session-id-to-reset"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "session_id": "session-id-that-was-reset"
  }
  ```

### Health Check Endpoint

- **URL**: `/api/health`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "ok"
  }
  ```

## Integration with the Mobile App

The mobile app connects to this backend server using the URL specified in the app's `.env` file. Make sure the backend server is running before starting the mobile app.

## Troubleshooting

- If you encounter CORS issues, make sure the Flask-CORS extension is properly configured.
- If the server fails to start, check that all dependencies are installed and the `.env` file is properly set up.
- If the OpenAI API calls fail, verify that your API key is valid and has sufficient credits.
