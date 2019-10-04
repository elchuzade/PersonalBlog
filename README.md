# Personal Blog Page

A blog page built using MERN stack with options of building up a blog post with multiple images and rich texts in any order, with options to build a blog post but not post it until the right time comes.

## Navigation

Blog - (/blogs) - "All blog posts page".

About Me - (/contacts) - "To show the contact information about you".

Blog Post - (/blog/:id) - "To show the individual blog post by passing the id of the blog".

Register - (/boss/register) - "To register a new user, note: if you are the only user, register yourself then disable the register route from the routes".

Login - (/boss/login) - "To login a user".

Status - (/status) - "To check published and unpublished blog posts and change their status"

## Getting Around

The project is built using MongoDB, Express, ReactJS and NodeJS. The images are hosted in AWS S3 server, the database is hosted in MLab and the server is hosted on Heroku. So you will need to have those three accounts.

## Prerequisites

Required stack of programs to be installed: nodeJS, reactJS.
Required stack of libraries to be installed:

- Server side: aws-sdk, bcryptjs, body-parser, concurrently, express, jsonwebtoken, mongoose, multer, multer-s3, passport, passport-jwt, path, validator.
- Client side: axios, classnames, jwt-decode, moment, path, react, react-dom, react-moment, react-quill, react-redux, react-router-dom, react-scripts, reactstrap, redux, redux-thunk.

## Installing

Download and Install NodeJS

```
https://nodejs.org/en/download/
```

Clone this repository

```
git clone thisRepo
```

Navigate to the folder and install the server side requirements

```
npm install
```

Navigate to the client folder and install the client side requirements

```
cd client
npm install
```

## Setup

Create accounts in mlab, aws, heroku or login if you have one already.
Later I will provide instructions on how to create each one of them separately in their own repositories and videos, until then if you need any help feel free to email me with elchuzade@gmail.com.
For this project to work properly you will need to create a "keys_dev.js" file in the config folder and paste the code below into it

```
module.exports = {
  mongoURI: 'this link is provided by the mlab',
  secretOrKey: 'you type your own phrase as a key to encrypt the passwords',
  accessKeyId: 'this key id is provided by amazon',
  secretAccessKey: 'this key is provided by amazon'
};
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Big Thanks to Brad Traversy for giving very detailed and intuitive courses on web development, most of the knowledge used to build this project was gained by me after completing his courses on Udemy and YouTube.
https://www.traversymedia.com
https://github.com/bradtraversy
