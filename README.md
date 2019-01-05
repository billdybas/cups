# Cups ☕️

> How many cups of coffee has Bill drunk this year?

## Why?

I am quite the coffee lover. I drink it almost every day. This project aims to satisfy my curiosity, showing me how many cups I drink in a year.

Since this idea is quite simple, it has also given me a way to learn some new tools.

## Development

This project is a Node server using [After.js](https://github.com/jaredpalmer/after.js) to statically render its React app. To keep things simple and on one server, it also runs a small API that uses [Knex](https://knexjs.org/) to query a Postgres database.

To run migrations, run `yarn migrate`.
To start the server, run `yarn start`.

## Deployment

This project is currently setup to be deployed to Heroku.

## Roadmap

- [ ] Accept new drink/cup records from a Telegram bot
- [ ] Use websockets to update the count in real-time
- [ ] Use a charting library to graph a histogram of the number of cups over time, perhaps by week
  - [ ] Break down each bar by drink type
  - [ ] Benchmark the past 2-3 years on the same chart

## License

See `LICENSE.md`
