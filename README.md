# WorkHousR #
### A quick and dirty Laravel demo app ###

This is just a simple Laravel 10 bundle with a few bells and whistles to make scafolding new apps simpler. I built this mainly for myself as part of applying for a job. I've intentionally kept it generic so I can re-use it in the future.

This project may contain traces of the following allergens:

- Laravel 10 (10.10)
- Laravel Sail 1.23
- Inertia 1.0.9
- Vite 4.4.3
- React 18.2.0
- Tailwind CSS

...and a bunch of miscellaneous tools and packages to make the whole thing play nicely together. I mostly stuck with a stock-standard Laravel install with some minor deviations:

1. I added PhpMyAdmin to `docker-compose.yml` purely out of habit and familiarity.
2. The default `.env.example` file has been updated with a few customisations regarding app names, port numbers, and the database name and user. These are not essential, but they're different from the default so I put them in.
3. I deliberately left Breeze out. That can always be added later, and I want to keep this repo light.

## Installation ##

### Prerequisites ###

This project needs the following tools/software installed:

**Local Install**

- Docker (and Docker Compose)
- Composer
- Node and NPM

**Remote Install**

- A database to connect to (default is MySQL)
- Node and NPM

### Build Process ###

After cloning the repo to wherever we need to store it, the following steps need to be performed:

1. Run `composer update` and `npm install`.
2. Copy the `.env.example` file to `.env` and add a database password and `APP_KEY`. Customise other parts however you like.
3. If you're running this project locally, start Laravel Sail (which fires up the Docker containers that house this app) using `./vendor/bin/sail up`
4. Run all of the Laravel migrations and seeders
5. Run `npm run build` and `npm run dev` to compile all javascript files and start up the Vite dev server.
6. If everything ran correctly, the app should be running on the *Laravel* app host and port (not the *Vite* port)
7. ????
8. Profit (maybe?)

    



