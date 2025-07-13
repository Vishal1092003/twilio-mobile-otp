# Mobile OTP Generator via Twilio

A minimal Node.js/Express service to send one-time passwords (OTPs) or any SMS message using the Twilio API.

---

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [Project Structure](#project-structure)
7. [Extending & Customization](#extending--customization)
8. [Troubleshooting](#troubleshooting)
9. [License](#license)

---

## Features

* Lightweight Express server
* Send SMS/OTP via Twilio
* Hot-reload in development with Nodemon

---

## Prerequisites

* **Node.js** (v14 or later)
* **npm** (comes with Node.js)
* **Twilio account** (trial or paid)
* A **Twilio phone number** enabled for SMS

> **Note for Trial Accounts:**
> You can only send SMS to **verified** phone numbers. Verify your recipient numbers in the Twilio Console under **Verified Caller IDs** before sending.

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/mobile-otp-generator.git
   cd mobile-otp-generator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

---

## Configuration

Create a `.env` file in the project root (or export environment variables) with the following keys:

```dotenv
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_NUMBER=+15183270051
PORT=8080
```

* `TWILIO_ACCOUNT_SID` & `TWILIO_AUTH_TOKEN` come from your Twilio Console (Dashboard → Project Info).
* `TWILIO_NUMBER` is your Twilio-provisioned SMS-capable phone number.
* `PORT` is optional; defaults to `8080` if omitted.

> Alternatively, you can hard-code these values directly in `index.js`, but using `.env` is more secure.

---

## Usage

### 1. Start the server

* **Run normally**

  ```bash
  npm start
  ```
* **Run with auto-restart** (for development)

  ```bash
  npx nodemon index.js
  ```

You should see:

```
server running at 8080
```

### 2. Send an SMS / OTP

In `index.js`, locate the Twilio send call:

```js
client.messages
  .create({
    body: 'Your OTP is: 123456',    // Customize your message here
    to: '+91xxxxxxxxxx',            // Replace with recipient’s number
    from: process.env.TWILIO_NUMBER // Or your hard-coded Twilio number
  })
  .then(message => console.log('Message sent, SID:', message.sid))
  .catch(err => console.error('Twilio Error:', err));
```

* Edit the `body` to include your OTP or message template.
* Change `to` to the destination number (ensure it’s verified if on a trial account).
* `from` must match your Twilio SMS-enabled number.

Save your changes and re-run the server to send the SMS.

---

## Project Structure

```
.
├── index.js         # Main Express server & Twilio logic
├── package.json     # npm manifest
├── package-lock.json
└── README.md        # This documentation
```

---

## Extending & Customization

* **HTTP API**: Expose a POST endpoint (e.g. `/send-otp`) that accepts JSON payloads (phone number, OTP).
* **OTP Generation**: Integrate a secure OTP generator (random code + expiration).
* **Persistence**: Store OTPs in Redis or a database to verify user input.
* **Security**: Add rate limiting, request validation (Joi/Express Validator), CORS rules.
* **Templates**: Use a templating engine or variables to personalize SMS content.

---

## Troubleshooting

* **Error 21608 (“unverified number”)**
  Trial accounts require verifying the `to` number in Twilio Console → **Verified Caller IDs** before you can send SMS.

* **Authentication errors**
  Double-check `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` for typos.

* **Port is already in use**
  Change `PORT` in `.env` or pass a different port when you start:

  ```bash
  PORT=3000 npm start
  ```

* **Network / Firewall issues**
  Ensure your server can reach Twilio API endpoints (`api.twilio.com`).

---

## License

ISC
