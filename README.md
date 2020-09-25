## Note Keeper App

A CRUD application for note keeping with basic account creation to store personal notes, built with ExpressJS, React, PassportJS, Axios, and MongoDB Atlas.

## Project Screen Shots


![Image of Login Page](https://github.com/ericngoo/MERN---Note-Keeper-App/blob/master/LoginPage.jpg)

![Image of Main Page](https://github.com/ericngoo/MERN---Note-Keeper-App/blob/master/MainPage.jpg)

## Installation and Setup Instructions

Clone the repository. (You will need `node` and `npm` installed globally on your machine.)  

Installation:

Navigate to the root of the project and run the following commands: 

```sh
   npm install
   ```
   
 ```sh
   npm run client-install
   ```   

To Start Server:

 ```sh
   npm run dev
   ``` 

To visit deployed App:

https://notekeepingappforfunz.herokuapp.com/ 

## Reflection

This was a 3 week side project that I implemented for fun! This was mainly a learning opportunity for me to understand how the front and backend interact with each other in a full stack application, with simple CRUD operations.

Starting this summer I didn't have much knowledge of full stack development so I started by getting familiar with vanilla Javascript, HTML, and CSS. After getting comfrotable, I started learning React and Express because of their popularity as frontend and backend frameworks.

One of my main challenges I ran into was connecting the frontend to the backend since the React App runs on a different server than the Express server, but I was able to overcome this by manually running both servers locally and then calling my Express server via Axios calls in the React Frontend. And eventually, I learned how to make my life easier by setting up a proxy to the Express server and creating an npm script to run both servers concurrently.

This was my first React/Express application so I used `create-react-app` boilerplate to handle the initial setup for me. But the final list of technologies used in my project are: React, Axios, Body-Parser, Concurrently, Express, Express-Session, Mongoose, Passport, and Passport-Local-Mongoose. (Hosted on Heroku 😎)


