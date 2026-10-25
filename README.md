# Meticuly Assignment

**Production Management** — Monitor production, orders, and resource utilization.

## How to Run Locally

### 1. Start the Backend Service

Make sure the backend service is running before starting the frontend.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables (Optional)

If you need to change the API endpoint, copy the example environment file:

```bash
cp .env.example .env
```

Then update `VITE_CORE_API_BASE_URL` in `.env` to your desired backend endpoint.

### 4. Start the Development Server

```bash
npm run dev
```
By default, the application will be available at http://localhost:3000/