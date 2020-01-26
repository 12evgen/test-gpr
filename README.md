## Start

1.  Make sure that you have Node.js v12.13.0 and npm v6.21.1 or above installed.
2.  Clone this repo using `git clone --depth=1 https://github.com/12evgen/pokemon-app.git <YOUR_PROJECT_NAME>`
3.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.<br />
4.  Run `npm install` in order to install dependencies and clean the git repo.<br />
    _At this point you can run `npm run start` to see the example app at `https://localhost:8443`._


## Deployment

1. Run `npm run build`
2. Run `docker build -t <name_image> .`
3. Check prod version `docker-compose up -d`. _Open app `http://localhost:3091`_
4. Run `heroku container:login`
5. Run `heroku container:push web -a <heroku_rep_name>`
6. Run `heroku container:release web -a <heroku_rep_name>`
