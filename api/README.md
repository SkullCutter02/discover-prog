## Commands

Start dev server: `yarn start:dev`

Start scraping: `yarn start:repl`, then `get(ScraperService).scrapeArtists()`

Seed database: `yarn seed:dev`

Run migration: `prisma migrate dev --name <name>`

## Required ENV variables

`JWT_ACCESS_TOKEN_SECRET`: Secret of access token, can be anything

`JWT_ACCESS_TOKEN_EXPIRATION_TIME`: Expiration time of access token in seconds (e.g 900 = 15 min)


`JWT_REFRESH_TOKEN_SECRET`: Secret of refresh token, can be anything

`JWT_REFRESH_TOKEN_EXPIRATION_TIME`: Expiration time of refresh token in seconds (e.g 1209600 = 14 days)

`SENDGRID_API_KEY`: API key from sendgrid, login to sendgrid and retrieve the key

`FRONTEND_URL`: What the frontend URL will be

`RESET_PASSWORD_REDIRECT_URL`: Where the reset password URL from the frontend be

`REDIS_HOST`: Redis host (like localhost)

`REDIS_PORT`: Port (most likely 6379)

`DATABASE_URL`: In the format of a pg connection string
