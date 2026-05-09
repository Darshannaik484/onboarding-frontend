# API Contracts

Base URL:
http://localhost:4000

Frontend communicates ONLY through API Gateway.

---

# Authentication

## Login

POST /api/auth/login

Request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
