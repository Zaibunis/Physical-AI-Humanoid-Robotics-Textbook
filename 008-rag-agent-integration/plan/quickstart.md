# Quickstart Guide: RAG Agent Frontend Integration

## Running the Integrated System

### Prerequisites
- Python 3.8+ for backend
- Node.js 16+ for frontend
- Ensure both backend and frontend dependencies are installed

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies (if not already installed):
   ```bash
   pip install -r requirements.txt
   # or if using poetry
   poetry install
   ```

3. Start the backend API server:
   ```bash
   uvicorn api:app --reload --port 8000
   ```

   The API will be available at http://localhost:8000

### Frontend Setup
1. Navigate to the book (frontend) directory:
   ```bash
   cd book
   ```

2. Install Node.js dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Docusaurus development server:
   ```bash
   npm run start
   ```

   The frontend will be available at http://localhost:3000

### Accessing the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/docs (for API documentation)
- The RAG chat interface will be available on all pages in the bottom-right corner

## Development Workflow

### API Testing
- Use the backend's interactive API documentation at http://localhost:8000/docs
- Test queries directly through the API interface
- Verify response structure matches the expected format

### Frontend Development
- The chat UI component will be automatically available on all pages
- Changes to the chat component will hot-reload during development
- Check browser console for any API communication errors

## Configuration Notes

### CORS Settings
The backend API has CORS enabled for local development (allows requests from any origin). In production, update the CORS settings in `backend/api.py` to only allow your frontend domain.

### Environment Variables
Ensure your `.env` file in the backend directory contains all necessary environment variables for the RAG agent to function properly.

## Troubleshooting

### Common Issues
1. **API Connection Errors**: Verify backend is running on port 8000
2. **CORS Errors**: Check that the backend CORS settings allow requests from localhost:3000
3. **Component Not Appearing**: Ensure the chat component was properly added to the layout

### API Endpoints
- POST `/ask` - Submit queries to the RAG agent
- GET `/health` - Check API health status