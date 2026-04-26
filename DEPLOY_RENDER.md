# Deploy Chatbot Backend (Render)

## 1) Push project to GitHub
- Push this project to a GitHub repository.

## 2) Create Render Web Service
- Open [Render Dashboard](https://dashboard.render.com/).
- Click **New +** -> **Web Service**.
- Connect your GitHub repo.
- Render will auto-detect `render.yaml`.

## 3) Set required Environment Variables
- `GEMINI_API_KEY` = your new rotated Gemini key
- `ALLOWED_ORIGINS` = your frontend domains, comma-separated  
  Example: `https://party.example.com,https://www.party.example.com`

## 4) Deploy and copy API URL
- After deploy succeeds, copy service URL.  
  Example: `https://student-party-chatbot-api.onrender.com`

## 5) Point frontend to production API
- In `chatbot.js`, set this before loading chatbot script on your page:

```html
<script>
  window.CHATBOT_API_BASE = "https://student-party-chatbot-api.onrender.com";
</script>
<script src="chatbot.js"></script>
```

## 6) Verify health endpoint
- Open `https://YOUR-RENDER-URL/api/health`
- Should return JSON with `ok: true`

## 7) Rotate old keys
- Revoke old Gemini keys that were ever exposed on frontend.
