# Sublease Surfer

UCLA CS 35L Project, Winter 2023, under the supervision of Professor Paul Eggert and our lovely TAs.
This web application was developed to facilitate the apartment subleasing/subletting process for college students


### Authors:
* Aaron Lee
* Kenzie MacDougal
* Michael Jiang
* Ethan INSERT LAST NAME
* Jason INSERT LAST NAME


## About
<!-- With the proliferation of big companies and corporate chains, it can be difficult for local farmers, hobbyists, bakers, etc. to have a reliable way to reach an audience of consumers interested in purchasing their homemade or home-grown goods. This project, a novel web application built using the [MERN Stack](https://bootcamp.berkeley.edu/resources/coding/learn-node-js/node-js-understanding-mern-stack/#:~:text=The%20MERN%20stack%20is%20comprised%20of%20four%20powerful,tandem.%20They%20are%3A%20MongoDB%3A%20An%20open-source%2C%20document-based%20database.), aims to alleviate this issue. We aim to connect these local producers with everyday members of the community around them, so that customers can buy locally and support small/home businesses instead of relying on big corporations. -->

## Screenshots
<!-- The Home Page:
![Home Page](./assets/homepage.png)
A individual post's page:
![Individual Posting](./assets/individual_post.png)
The submission page to create a posting:
![Submission Page](./assets/submission_page.png)
The page aggregating all posts, so that you can see which listings are closest to you.
![Aggregate Post Map](./assets/aggregate_map.png) -->

## Quick-start
<!-- 1. Clone this repo by running `git clone https://github.com/ViciousCupcake/CS35L-Project.git`
2. Create the `.env` file with all of our secrets, and place it into `./backend/`. You may have to source the .env file with `. .env`.
    * For more info on creating the environment file, see the [Environment Variables](#environment-variables) section
3. Install dependencies for the backend: `cd backend; npm install`
4. Install dependencies for the frontend: `cd frontend; npm install`
5. If installing fails due to dependency conflicts, pass `--force`.
6. Start the backend: `cd ../backend; npm start`
7. Start the frontend: `cd ../frontend; npm start`
8. Insert Google Maps API key in GoogleMapsLinker.js
9. Visit the website at [localhost:3000](localhost:3000) -->


#### Misc Info:
<!-- * Backend by default is hosted at [localhost:8000](http://localhost:8000)
* Frontend by default is hosted at [localhost:3000](http://localhost:3000) -->

## Environment Variables
<!-- The environment variables should be stored into `./backend/.env`. This file should contain 8 entries:
| Environment Variable Name | Example                    | Description                                          | Where you can generate the key                                                          |
|---------------------------|----------------------------|------------------------------------------------------|-----------------------------------------------------------------------------------------|
| `USERNAME`                  | `MongoUser1`                 | The Username used by the backend to log into MongoDB | Follow the instructions at [https://docs.mongodb.com/guides/cloud/account/](https://docs.mongodb.com/guides/cloud/account/)                                                                 |
| `PASSWORD`                  | `MongoPswd1`                 | The Password used by the backend to log into MongoDB | Follow the instructions at [https://docs.mongodb.com/guides/cloud/account/](https://docs.mongodb.com/guides/cloud/account/)                                                                 |
| `DB_LOCATION`               | `cluster5.abcde.mongodb.net` | The address that your database is hosted at          |                Follow the instructions at [https://docs.mongodb.com/guides/cloud/account/](https://docs.mongodb.com/guides/cloud/account/)                                                                         |
| `API_PORT`                  | `8000`                       | The port that the backend will be hosted on          | Choose a port number that doesn't conflict with an pre-existing process on your machine |
| `GOOGLE_MAPS_API_KEY`       | `aBcDeFgH12345`              | The API Key used for Google Maps                     | Follow the instructions at https://developers.google.com/maps/documentation/javascript/get-api-key                 |
| `GOOGLE_CLIENT_ID`          | `asdfq273450652393adf;lfasdfkwer.apps.googleusercontent.com`          | App identifier used in OAuth flow             | Set up OAuth in a Google Cloud project                                                                      |
| `GOOGLE_CLIENT_SECRET`      | `LasdouHgsfgTasdf`          | Identifier used in OAuth flow to make sure app isn't being impersonated                                    | Set up OAuth in a Google Cloud project                                                                       |
| `COOKIE_KEY`                | `asdfgkjhsdlkgf;sd`          | The cookie sent back on requests                     | Type anything you want                                                                       |


Put these 8 entries into `./backend/.env` in the format `ENVIRONMENT_VARIABLE=ENVIRONMENT_KEY`

For example,
```
USERNAME=MongoUser1
PASSWORD=MongoPswd1
DB_LOCATION=cluster5.abcde.mongodb.net
API_PORT=8000
GOOGLE_MAPS_API_KEY=aBcDeFgH12345
GOOGLE_CLIENT_ID=asdfq273450652393adf;lfasdfkwer.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=LasdouHgsfgTasdf
COOKIE_KEY=asdfgkjhsdlkgf;sd
``` -->



## Git How-to Guide:
#### Cloning A Repo:
<!-- 1. `cd` into the folder you want to clone (aka download) this repo to
2. Run the command `git clone https://github.com/ViciousCupcake/CS35L-Project.git` (Note that you will need git installed on your machine) -->

#### Adding Contributions:
<!-- 1. Make a branch. To make a branch, run `git branch [NAME OF THE BRANCH]`
2. Type your code/contributions
3. Once your done, you want to `stage` your changes, by running `git add [FILES THAT YOU WANT TO ADD]`
4. Make a commit: `git commit -m [DESCRIPTION OF YOUR CHANGES]`
5. Push these changes to the server: `git push origin HEAD`
6. Go to [GitHub](https://github.com/ViciousCupcake/CS35L-Project) and open a Pull Request.
7. Wait for a code review, and if everything looks good, we'll see your contributions onto the main branch!

Thanks for the help! -->

#### Useful commands
<!-- * Add every file: `git add -A`
* Switch between branches: `git checkout [NAME OF THE BRANCH]`
* Get updates from the server: `git pull`
* List branches: `git branch`
* [For other commands, reference here](https://git-scm.com/doc) -->

## Special Thanks
<!-- * Nur Islam's [The MERN stack: A complete tutorial](https://blog.logrocket.com/mern-stack-tutorial/) (2020) is a well-written tutorial about getting started with the MERN Stack.
* Google's [Analytics Platform](https://analytics.google.com) provides useful tools on collecting real-time analytical data from your users.
* Google's [Maps Embed API Documentation](https://developers.google.com/maps/documentation/embed/get-started) provides guidence on how to efficiently get started with the Google Maps API.
* Jan Bodnar's [dotenv Tutorial](https://zetcode.com/javascript/dotenv/) (2020) is a brief tutorial going over what [dotenv](https://www.npmjs.com/package/dotenv) does and how you can use it in your own applications
* The OpenJS Foundation's [Node](https://nodejs.org/en/) is a useful JavaScript runtime that powers both the frontend and the backend of this project.
* Rachael Njeri's [How to Integrate the Google Maps API into React Applications](https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications) (2020) is a tutorial going over the basics of using the Google Maps React API.
* Stephen Grider's [Node with React: Fullstack Web Development](https://www.udemy.com/course/node-with-react-fullstack-web-development/) (2021) goes over how to use Passport.js to integrate OAuth login.
* The Mongoose [Docs](https://mongoosejs.com/docs/guides.html) is an essential tool that we used, when trying to tie our backend to communicate to MongoDB.
 -->

