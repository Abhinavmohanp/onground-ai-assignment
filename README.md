# On-Ground.ai – Call Centre Management Dashboard

A React-based call centre management application designed to help sales and support teams manage leads, organise callbacks, track call outcomes, monitor performance, and communicate with team members.
<br>

## Live Demo

**Live Application:** [https://abhinavmohanp.github.io/onground-ai-assignment/](https://abhinavmohanp.github.io/onground-ai-assignment/)

**GitHub Repository:** [https://github.com/Abhinavmohanp/onground-ai-assignment](https://github.com/Abhinavmohanp/onground-ai-assignment)
<br>

## Features

### 1\. Dashboard

- View key performance indicators, including OG Score, average handle time, CSAT, and queue count.
- Monitor daily progress and earnings.
- View waiting leads and pending tasks.

### 2\. Lead Management

- View leads and their details.
- Navigate between leads using Previous and Next controls.
- View customer information, lead scores, phone numbers, and priority levels.
- Navigate leads using pagination.

### 3\. Calling and Call Management

- Open the device phone dialer using a `tel:` link.
- Record call outcomes:
  <br>

      * Interested
      * Not Interested
      * No Answer
      * Call Back Later

- View recorded call outcomes in the Recent section.
- Access callback options for incoming missed calls.

**Calling implementation:** The application uses device dialer integration through `tel:` links. Call outcomes are recorded within the application. It does not currently use a telephony backend to automatically track live call status or call duration.
<br>

### 4\. Plan

The Plan section provides separate views for:
<br>

- Calls to make
- Incoming calls
- Recent calls

### 5\. Incoming Calls

- View missed calls ranked by expected lead value.
- Initiate callbacks through the device dialer.

### 6\. Recent Calls

- Review recorded call outcomes.
- View call history and lead information.

### 7\. Practise a Call

- Access a practice calling scenario.
- Practise handling a customer conversation.

### 8\. Calendar

- View scheduled callback activities.
- Add callback entries.

### 9\. Pulse

- View team and performance updates.
- Respond to team requests under Needs Your Input.
- Send messages through the team chat interface.

## Technology Stack

- **Frontend:** React.js
- **Programming Language:** JavaScript
- **Styling:** CSS
- **Build Tool:** Vite
- **Version Control:** Git and GitHub
- **Deployment:** GitHub Pages

## Getting Started

Follow these instructions to run the project locally.
<br>

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

```
git clone https://github.com/Abhinavmohanp/onground-ai-assignment.git
```

2. Navigate to the project directory:

```
cd onground-ai-assignment
```

3. Install dependencies:

```
npm install
```

4. Start the development server:

```
npm run dev
```

5. Open the local URL displayed in your terminal, usually:

```
http://localhost:5173
```

### Production Build

To create a production build:
<br>

```
npm run build
```

## Deployment

The application is deployed using GitHub Pages.

Deployment command:
<br>

```
npm run deploy
```

**Live URL:** [https://abhinavmohanp.github.io/onground-ai-assignment/](https://abhinavmohanp.github.io/onground-ai-assignment/)
<br>

## Project Structure

```
onground-ai-assignment/
├── dist/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## Implementation Notes

- Application interactions and call outcome records are managed on the frontend.
- Sample lead and call information is used for demonstration.
- The `tel:` integration opens the device's supported phone application.
- Automatic call tracking and telephony backend integration are not implemented.

## Future Improvements

- Integrate a telephony provider such as Twilio or Exotel.
- Add backend APIs and database storage.
- Implement user authentication and role-based access.
- Store call history and lead information persistently.
- Add real-time team communication.
- Add advanced analytics and reporting.

## Author

**Abhinav Mohan P**

GitHub: [https://github.com/Abhinavmohanp](https://github.com/Abhinavmohanp)
