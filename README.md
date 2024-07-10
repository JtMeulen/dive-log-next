# Dive Log Next

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Local Dev

- Copy the contents of [/.env.example](.env.example) and rename to `.env.local`
  - Run `npx auth secret` to generate secret
- Install Mongodb Community `brew install mongodb-community@7.0`
- Run `brew services start mongodb-community@7.0` to start the local DB
  - Stop the DB with `brew services stop mongodb-community@7.0`
