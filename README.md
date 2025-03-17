# Stylo AI - Intelligent Fashion Recommendation System

## 🚀 Project Overview

Stylo AI is a cutting-edge fashion recommendation system that leverages **LangChain**, **vector embeddings**, and **AI-powered search** to provide personalized clothing recommendations. It consists of:

- A **backend** that utilizes Python, LangChain, and a vector database to store and process fashion-related embeddings.
- A **frontend** that delivers a seamless user experience to explore AI-driven recommendations.

## 🎯 Key Features

✅ **AI-Powered Fashion Insights** – Uses **LangChain retrievers** to fetch the most relevant clothing items. ✅ **Vector-Based Similarity Search** – Compares fashion items using embeddings for better recommendations. ✅ **Flask-Driven API** – Provides seamless access to recommendations and queries. ✅ **Scalable & Modular** – Built with a flexible architecture for future enhancements. ✅ **User-Friendly UI** – React-based frontend for an interactive experience.

---

## 🏗 Project Structure

### 📌 **Backend (**``**)**

| File | Description |
| --- | --- |
| `api_server.py` | Flask server to handle requests and LangChain-powered queries. |
| `compare_embeddings.py` | Compares vector embeddings for similarity checks. |
| `create_database.py` | Initializes and stores vectorized fashion data using LangChain. |
| `query_data.py` | Queries stored embeddings and returns results. |
| `requirements.txt` | Lists all dependencies needed to run the backend. |

### 🎨 **Frontend (**``**)**

| File/Folder | Description |
| --- | --- |
| `app/` | Main frontend application files. |
| `components/` | UI components for fashion recommendation display. |
| `assets/` | Stores images and static assets. |
| `package.json` | Defines frontend dependencies. |

---

## 🛠 Installation & Setup

### 🔹 **Backend Setup**

1. Navigate to the backend directory:
    
    ```
    cd stylo-backend-main
    
    ```
    
2. Create a virtual environment:
    
    ```
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    
    ```
    
3. Install dependencies:
    
    ```
    pip install -r requirements.txt
    
    ```
    
4. Run the API server:
    
    ```
    python api_server.py
    
    ```
    

### 🔹 **Frontend Setup**

1. Navigate to the frontend directory:
    
    ```
    cd stylo-main
    
    ```
    
2. Install dependencies:
    
    ```
    npm install
    
    ```
    
3. Start the development server:
    
    ```
    npm run dev
    
    ```
    

---

## 📡 API Endpoints

### **1️⃣ Get Fashion Recommendations**

- **Endpoint:** `/recommend`
- **Method:** `POST`
- **Description:** Returns AI-powered fashion suggestions based on input criteria.

### **2️⃣ Compare Fashion Items**

- **Endpoint:** `/compare`
- **Method:** `POST`
- **Description:** Uses LangChain embeddings to compare similarity between clothing items.

### **3️⃣ Query Fashion Data**

- **Endpoint:** `/query`
- **Method:** `GET`
- **Description:** Retrieves relevant fashion-related data from the vector database.

---

## 🧠 How LangChain is Used

Stylo AI heavily integrates **LangChain** for vector search and AI-powered retrieval. Here’s how:

🔹 `– Uses LangChain retrievers to process and serve API requests. 🔹` – Leverages LangChain’s embedding models for similarity comparisons. 🔹 `– Converts clothing descriptions into **vector embeddings** for efficient storage. 🔹` – Searches for the most relevant clothing items using **LangChain-powered** vector search.

---

## 🔮 Future Enhancements

🔹 **Image-Based Search** – Allow users to upload images for AI-powered outfit suggestions. 🔹 **Personalized Recommendations** – Tailor fashion choices based on user preferences and history. 🔹 **Expanded Dataset** – Integrate more brands, styles, and seasonal trends.

### 🎉 Enjoy AI-driven styling with Stylo AI! 🚀
