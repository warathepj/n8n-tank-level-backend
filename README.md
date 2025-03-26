# Liquid Level Simulation System

A real-time tank monitoring simulation system built with React, TypeScript, and modern web technologies. This project demonstrates a storage tank monitoring system with IoT sensor simulation and real-time notifications.

## Features

- Interactive tank level visualization
- Real-time level monitoring simulation
- Automated notifications for high/low levels
- Responsive design with smooth animations
- MQTT integration for status updates
- Automated notifications via n8n webhook to Telegram

## Tech Stack

- **Frontend**

  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - shadcn/ui components
  - React Query
  - React Router

- **Backend**
  - Node.js
  - Express
  - MQTT
  - WebSocket
  - n8n (for workflow automation)
  - Telegram Bot API (for notifications)

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- n8n instance
- Telegram Bot Token

### Installation

1. Clone the repository:

```bash
# Backend
git clone https://github.com/warathepj/n8n-tank-level-backend.git
cd n8n-tank-level-backend
# Frontend
git clone https://github.com/warathepj/liquid-level-simulate.git
cd liquid-level-simulate
```

2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
npm install
```

### Configuration

1. Set up n8n webhook:

   - Create a new workflow in n8n
   - Add a Webhook node as trigger
   - Configure Telegram node with your bot token
   - Deploy the workflow and copy the webhook URL

2. Configure webhook URL:
   - Open `backend/subscriber.js`
   - Replace `your-webhook-url` with the n8n webhook URL

### Development

1. Start the frontend development server:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

2. Start the backend server (from the backend directory):

```bash
node publisher.js
node subscriber.js
```

## Project Structure

```
liquid-level-simulate/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Route pages
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Utility functions
├── backend/           # Backend server
│   ├── subscriber.js  # MQTT subscriber with webhook integration
│   └── publisher.js   # MQTT publisher
```

## Notification Flow

1. Tank level changes trigger MQTT messages
2. Subscriber receives MQTT messages
3. Webhook sends data to n8n workflow
4. n8n processes the data and sends to Telegram
5. Users receive notifications in Telegram

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Workflow automation by [n8n](https://n8n.io)
