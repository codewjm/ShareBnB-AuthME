# SharesBnB - A Clone of AirBnB

SharesBnB is a reduced clone of the [AirBnB](https://www.airbnb.com/) web application. This clone allows users to browse and create hosted listings, as well as browse and create reviews for listings.

SharesBnB Live Link: [SharesBnB](https://sharesbnb.herokuapp.com/)

## Site Resources: 

* [API Documentation](https://github.com/codewjm/SharesBnB/wiki/API-Documentation)
* [Database Schema](https://github.com/codewjm/SharesBnB/wiki/Database-Schema)
* [Feature List](https://github.com/codewjm/SharesBnB/wiki/Feature-List)
* [Redux State Shape](https://github.com/codewjm/SharesBnB/wiki/Redux-State-Shape)

## Tech Stack: Frameworks, Platforms, and Libraries

Frontend:

![image](https://user-images.githubusercontent.com/20654267/192156837-122333b5-1337-4630-abcd-e48f538c141d.png)
![image](https://user-images.githubusercontent.com/20654267/192156876-64b1afdd-e93f-4f6b-a0ff-2d7e9b75258a.png)
![image](https://user-images.githubusercontent.com/20654267/192156881-268b4f35-02b2-4113-861b-c2ea54b6ff87.png)
![image](https://user-images.githubusercontent.com/20654267/192156890-ca8a0612-9350-4d10-88f7-cc09dd740865.png)
![image](https://user-images.githubusercontent.com/20654267/192156892-eddb0af2-29cc-46bf-9d6d-fc0ead32005b.png)


Backend:

![image](https://user-images.githubusercontent.com/20654267/192156854-da992c42-d7fc-468a-ad02-65316be0d9c2.png)
![image](https://user-images.githubusercontent.com/20654267/192156896-44718733-3b28-4f64-934a-78522df3a444.png)

Database: 

![image](https://user-images.githubusercontent.com/20654267/192156956-e6ef56f2-5645-406a-8778-83baf75489a1.png)

Hosted On:

![image](https://user-images.githubusercontent.com/20654267/192156972-28d4bd6a-7012-4d73-8bbd-105cfba12108.png)

## Build Steps:

### Installing Locally: 
1. Clone the SharesBnB repository from GitHub into a file via your terminal: https://github.com/codewjm/SharesBnB.git
2. Run `npm install` and `npm -D` in both your backend and frontend folders individually

### Database Setup:
1. Create a new .env file in the backend folder. 
2. Within you .env file, copy and paste the following:
```
PORT=8000
DB_FILE=db/dev.db
JWT_SECRET=«generate_strong_secret_here»
JWT_EXPIRES_IN=604800
 ```
 3. Run `npx dotenv sequelize db:migrate` in the backend folder 
 4. Run `npx dotenv sequelize db:seed:all` in the backend folder 

### Starting the SharesBnB Application

1. Run `npm start` in the backend folder (NOTE: you must run this command before running the same in the frontend folder)
2. Run `npm start` in the front end folder 
3. Navigate to your local host to see the site.


## SharesBnB API Preview:

## Splash Page 

![SharesBnB-homepage](https://user-images.githubusercontent.com/95896008/192286349-bf6f9a7c-1d89-430f-b16a-1f22c865024b.png)

## Selected Spot Detail Page

![SharesBnB-spotpage](https://user-images.githubusercontent.com/95896008/192286432-1bb1403f-c4e8-403c-a0ed-fee2b4c7af21.png)

## Road Map: Future Features

Future Features Include:
* A profile page for the user to view their account information. 
* A page for the current user to view all of their current hosted spot listings.
* A page for the current user to view all of their exisitng reviews for spots they previouly visited.
* Functionality for a user to book a spot from a selected spot's detail page.
* A page for the current user to view their spot bookings.
