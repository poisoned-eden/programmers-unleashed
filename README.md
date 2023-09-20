# Programmers-Unleashed

An easy-to-use progressive web app that allows the user to add different medications, track when they've taken them, and receive reminders when the next dose is due.

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

MediMate is an innovative health management platform designed to empower individuals on their journey to a healthier and happier life. It combines the power of a mobile app and a website to provide a seamless and holistic approach to health and wellness.
MediMate is powered by Node.js and Express.js, delivers a seamless experience with cutting-edge technologies.
It's API is built with Node.js and Express.js, utilises GraphQL and ensures efficient data retrieval and seamless addition of new content through queries and Mutations.
It's database is powered by MongoDB and the Mongoose ORM, ensures reliable and scalable storage for music preferences.
We incorporated authentication using express-session and cookies, guaranteeing privacy and prioritizing data protection by safeguarding API keys and sensitive information with environment variables.
It is deployed on Heroku for easy access and the website is available anytime, anywhere, while enjoying a responsive and polished UI that adapts seamlessly to your device.

## Usage
When the user opens this application, they are first presented with the Sign up page. This contains a navigation bar at the top of the page with links to 'Login' & ‘Signup’ and a Sign Up form for the user to register their desired login details. When the user has finished registering their details and clicks the submit button. The user is redirected to the profile page which contains another form containing details of the medication and the option to input prescription details. 
When the priscription details are added, the medication is then added to the side of the form on the profile page and also beneath the animated logo on main homepage. If the user already has an account, they can login by entering their email address and correct password and select login; if the user enters the wrong username or password, they will be alerted that they have failed to login. When login is successful, then  the user will be redirected to the profile page. 


## Technologies Used

This MERN stack application is built using the following technologies:

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

## Credits

[https://github.com/poisoned-eden](https://github.com/Myra-k)
[https://github.com/Myra-k](https://github.com/Myra-k)
[https://github.com/cckinwest](https://github.com/cckinwest)
[https://github.com/michaelcoder7](https://github.com/michaelcoder7)
[https://github.com/tobzman](https://github.com/tobzman)

## Licence

Copyright (C) 2023,  Lilith Miller-Fermor, Myra Khatoon, Chi kin Chan, Michael Okikiade, Tobenna okafor.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.