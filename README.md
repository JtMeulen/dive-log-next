# Dive Log Next

Dive Log Next is a web application for logging and managing scuba diving activities.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Local Development](#local-development)
- [Technologies Used](#technologies-used)

## Introduction

Dive Log Next allows users to log their scuba dives, track their progress, and share their experiences with others. The application is built using modern web technologies and provides a seamless user experience.

The overall theme of the app is based around nudibranches (cute tiny sea creatures) which are a delight to spot on every dive! So the name of the app is ScubiBranches, and it can be used at [https://dive-log-next.vercel.app/](https://dive-log-next.vercel.app/)

## Features

- Log scuba dives with details such as location, depth, and duration.
- Track progress over time with statistics.
- Secure user authentication and data storage.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/JtMeulen/dive-log-next
   cd dive-log-next
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Local Development

To set up the project for local development, follow these steps:

1. Copy the contents of `.env.example` to a new file named `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Generate a secret for authentication:

   ```bash
   npx auth secret
   ```

3. Install MongoDB Community Edition:

   ```bash
   brew install mongodb-community@7.0
   ```

4. Start the MongoDB service:
   ```bash
   brew services start mongodb-community@7.0
   ```
   And to stop the MongoDB service:
   ```bash
   brew services stop mongodb-community@7.0
   ```

## Technologies Used

- **FE/BE:** Next.js
- **Database:** MongoDB
- **Authentication:** NextAuth with Auth0 and credentials providers
- **File Storage:** Cloudinary
- **PWA:** Basic PWA functionality through `ducanh2912/next-pwa`
- **Hosting:** Vercel
