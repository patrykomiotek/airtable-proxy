# Airtable proxy

It's a simple HTTP proxy for communicating with Airtable.

Alternative way is to create own endpoints and use [Airtable.js](https://github.com/airtable/airtable.js/)

## Setup

Create `.env` file with database credentials:

```bash
AIRTABLE_DATABASE_ID="YOUR_DATABASE_ID"
AIRTABLE_API_KEY="YOUR_API_KEY"
```

API key can be generated [here](https://airtable.com/account).

## Run

To launch application type:

```bash
yarn dev
```

or

```bash
npm dev
```

## How proxy works?

Let's assume that you have Airtable account and database. Then all databases and auto-created documentation can be found at https://airtable.com/api

If you have table named `offers` in your database and view named `default` you can fetch records using below request:

```bash
curl "https://api.airtable.com/v0/YOUR_DATABASE_ID/offers?maxRecords=3&view=default" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

This Airtable Proxy app allows you to automatically create url to the database (`https://api.airtable.com/v0/YOUR_DATABASE_ID`) and pass authorization header (`Authorization: Bearer YOUR_API_KEY`) using your credentials specified in `.env` file.

When you have an app running on port 3001, then instead of requesting Airtable explicitly you can pass your requests using `/api` endpoint:

```bash
http://localhost:3001/api/offers?maxRecords=3&view=default
```

which prevents to snoop your database credentials.

## More advanced usage

The main (and only) goal of this app is to get a request and pass to Airtable. In more complex apps you can create your own endpoints to provide validation and use [Airtable.js](https://github.com/airtable/airtable.js/) for manage your data.