# ITC Micro-blogging Project

This project is a micro-blogging application that allows users to create, view, and interact with tweets. It includes various milestones that add different features and functionalities to the application.

## Demo

A live demo of the micro-blogging application can be accessed at ([https://https://micro-blog-f57a3.web.app/register.com](https://micro-blog-f57a3.web.app/register)).

## General Overview

The micro-blogging application provides the following functionality:

- Main screen with sections for creating a tweet and displaying tweets.
- Validation to block tweet creation if the character limit exceeds 140.
- Local storage to persist tweets across page refreshes.
- Sorting tweets in descending order, with the latest tweet appearing first.
- Hard-coded username for adding it to each created tweet.
- Server connection to fetch and display tweets from a remote server.
- Ability to create new tweets and save them on the server.
- Loading indicators during server requests and displaying server errors if tweet addition fails.
- User page that displays the current user's username and allows changing the username.
- Top navbar with "Home" and "Profile" links for easy navigation.
- Context implementation to manage tweets list and creating new tweets.
- Periodic updates from the server to keep the tweet list up to date.
- Deployment of the application to Firebase for remote server hosting.
- Integration with Firebase Firestore for data storage and retrieval.
- User authentication and authorization using Firebase auth.
- Support for login and signup with Google and custom email/password.
- Profile picture upload using Firebase Cloud Storage.
- Filtering and displaying only the user's own tweets.
- Navbar customization based on user sign-in status.
- Search functionality to search for tweets and users.
- Like button feature to like and unlike tweets.
- Tracking likes using Firebase and displaying liked tweets.
- Clickable usernames in tweets to view other users' profiles.
- Ability for users to edit their own profiles, including photo, name, and password.

## Technologies Used

The micro-blogging application utilizes the following technologies:

- React for building the user interface and managing component-based architecture.
- Axios for handling HTTP requests to the server.
- LocalStorage for storing and retrieving data locally.
- Firebase for server hosting, authentication, database (Firestore), and cloud storage.
- Figma for designing the user interface.
- Firebase Hosting for deploying the application to a remote server.

