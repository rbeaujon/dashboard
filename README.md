# YoloGroup

This repository is an admin dashboard for a gaming platform.
The design was made using material design and is available on Figma.
Figma design URL: [https://tinyurl.com/rbeaujon].
It allows managing a games list and users, giving to the admin the possibility to filter the displayed data in the tables sorting by range, date, categories, etc.
Additionally, the admin has the ability to delete, edit or create a new user or game.

The app includes error handling and load indicators to improve the UX.

This is an assignment for Front-End Developer, however, I preferred to create my own backend using NodeJS with MySQL.
This one also handles the errors, validations, and reports by console and JSON for all the status codes or information available in the request.  
Additionally, a CORS control was added because it is required by the hosting server for this app.

Unit tests were covered also in the games and users modules.

## Technical details

The Front-End was developed using REACTJS, JEST and SASS.
The Back-End was made on NodeJS using ExpressJS and MySQL.

The Back-End and Front-End have their own dependencies package and runners under NPM.

## Views

#### Mobile views

<img src="/assets/images/games-mobile.png" width="40%">
<img src="/assets/images/users-mobile.png" width="40%">

#### Table views

<img src="/assets/images/games-table.png" width="50%">
<img src="/assets/images/users-table.png" width="50%">

#### Desktop views

<img src="/assets/images/games-desktop.png" width="60%">
<img src="/assets/images/users-desktop.png" width="60%">

#### Error views

<img src="/assets/images/gamesError.png" width="60%">
<img src="/assets/images/usersError.png" width="60%">

#### Loading

<img src="/assets/images/loading.png" width="60%">


### npm run +

    Runs in your command line and inside the project folder the following commands to:

    start: Run this script to execute the development server available for your React application.
    test:  To run the testing mode, using react-scripts: 5.0.1 and jest-dom 5.16.5
    build: This sets and creates a build directory with a production build of your app

```Example: npm run start.
```

### Browser View

#### Hosted Version
You can see the currently hosted version by following this link: http://yologroup.rbeaujon.com/

#### Development Version
To see the development version, follow the instructions below:

##### Front-End
Open the following link in your browser: http://localhost:3000

##### Back-End API
To access the API, use the following URL: http://localhost:3001

##### API Endpoints
Below are the available endpoints in the API:

Server URL: http://localhost:3001

Games Endpoint: /games
Users Endpoint: /users


## Out-of-scope
  
* Create conceptual and communication diagrams to understand visually the application flow.
* Display the selected image info in the Games module.