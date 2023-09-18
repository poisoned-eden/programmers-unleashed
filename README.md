# Programmers-Unleashed

## User Story

```md
As a user I want to be able to add one or more medications to the website, inputing the required precription and utilizing the option to add a reminder or not . Once one adds the medication, it should be stored on one's profile and when I click on my profile, I will be able to see all my stored medications. I want to log in to my account and have the website remember my saved medications.
```

## Acceptance Criteria

```md
When I click on the login button
Then I am presented with a page for me to register my login details such as email address and password in order to grant me access to the website
When I log in
Then I am presented with my profile page containing a form to fill in my medication details
When I fill in the form and click the 'Add Medication' button
Then the medication I filled in is saved to the right of the form
When I click on the website logo
Then I am taken to the homepage which displays all the medications which i have saved
When I look at the website from multiple browsers
Then I am presented with a responsive UI that looks good on all devices
```

## Project Product Description

Our medication website, powered by Node.js and Express.js, delivers a seamless experience with cutting-edge technologies.
Our API, built with Node.js and Express.js, utilises GraphQL and ensures efficient data retrieval and seamless addition of new content through queries and Mutations.
Our database, powered by MongoDB and the Mongoose ORM, ensures reliable and scalable storage for music preferences.
We incorporated authentication using express-session and cookies, guaranteeing privacy and prioritizing data protection by safeguarding API keys and sensitive information with environment variables.
With our deployment on Heroku, access to our website is available anytime, anywhere, while enjoying a responsive and polished UI that adapts seamlessly to your device.

## Usage
When the user opens this application, they are first presented with the Sign up page. This contains a navigation bar at the top of the page with links to 'Login' & ‘Signup’ and a Sign Up form for the user to register their desired login details. When the user has finished registering their details and clicks the submit button. The user is redirected to the profile page which contains another form containing details of the medication and the option to input prescription details. 
When the priscription details are added, the medication is then added to the side of the form on the profile page and also beneath the animated logo on main homepage. If the user already has an account, they can login by entering their email address and correct password and select login; if the user enters the wrong username or password, they will be alerted that they have failed to login. When login is successful, then  the user will be redirected to the profile page. 


## Technologies Used

This application is built using the following technologies:

- **Node.js**
- **Express.js**
- **React.js**
- **Mongoose ORM**
- **MongoDB**
- **Heroku**
- **CSS**
- **JavaScript**


## Screenshots
![A screenshot of the homepage]()
![A screenshot of the My Profile page]()
![A screenshot of the login page]()
![A screenshot of the sign up page]()


## Link to webpage

```md
Link to Heroku:

https://medimate-initial-7cd2360e6da5.herokuapp.com/

Link to GitHub repo:

https://github.com/poisoned-eden/programmers-unleashed.git
