# YoloGroup

This repository is an admin dashboard for a gaming platform.
The design was made using material design and is available on Figma.

Design URL: [https://tinyurl.com/rbeaujon].

It allows managing a games and users list, giving to the admin the possibility to filter the displayed data in the tables sorting by range, date, categories, etc.

Additionally, the admin has the ability to delete, edit or create a new user or game.

The 'Add' functionality is easily accessible from the top right corner of the tables with a '+' icon. Users can quickly add new items to their tables without the need to navigate to a separate page. In addition, the 'Edit' and 'Delete' actions are available for each item in the 'Action' column. Users can easily edit or delete an item by clicking the corresponding button in the 'Action' column. These features help streamline the user experience and allow for more efficient management of data.

This project includes a feature to change between night and light mode. This feature allows users to customize the appearance of the application based on their preferences and environment. To use this feature, simply click on the moon and sun toggle button located at the top right corner of the screen.

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

##### Dark Mode 

<img src="/assets/images/games-desktop-dark.png" width="60%">
<img src="/assets/images/users-desktop-dark.png" width="60%">

#### Error views

<img src="/assets/images/gamesError.png" width="60%">
<img src="/assets/images/usersError.png" width="60%">

##### Dark Mode 

<img src="/assets/images/gamesError-dark.png" width="60%">
<img src="/assets/images/usersError-dark.png" width="60%">

#### Loading

<img src="/assets/images/loading.png" width="60%">



### How to run the application?

The project was hosted on my server for easy access and evaluation.

link [http://yologroup.rbeaujon.com/]

however, if you need to install it locally, you can follow the instructions below:


##### Clone the project
1.- Open your terminal/command prompt and navigate to the directory where you want to clone the repository.

2.- Run the command git clone https://github.com/rbeaujon/yolo.git. This will create a new directory called "yolo" in your current directory and clone the repository into it.

3.- Once the cloning process is complete, navigate to the "yolo" directory by running the command cd yolo.

##### Install the project's dependencies

4.- Make sure that you have Node.js and npm (Node Package Manager) installed on your system. You can check the version of npm by running the command npm -v. [https://nodejs.org/en].

5.- Run the command 'npm install' to install all the required dependencies for the project.

##### Run the app

6.- After all the dependencies have been installed, run the command npm run start.
This should start the development server and open up a new tab in your default web browser displaying the yolo app.


### npm run + (Node Package Manager Commands)

    Runs in your command line and inside the project folder the following commands to:

    start: Run this script to execute the development server available for your React application.
    test:  To run the testing mode, using react-scripts: 5.0.1 and jest-dom 5.16.5
    build: This sets and creates a build directory with a production build of your app

Example: npm run start.


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