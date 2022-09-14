## Splash Pro Server Api

Splash Pro Server Api is an open source backend that can be deployed to any infrastructure that can run Node.js. Parse Server works with the Express web application framework.

# Table OF content

- Description
- Usage
- Instruction
- Requirement
- Poject tree

# Description

Splash Pro Server Api is an open source backend that can be deployed to any infrastructure that can run Node.js. Parse Server works with the Express web application framework.

# Usage

It is use for the following

- Google Oauth2 Authentication
- Creating and Fetching of Shortlet or Apartments
- Booking and Process of Payment through paystack

# Instruction

Before you start make sure you have installed:

NodeJS that includes npm

### `Download the project to Your Pc`

having the project in ur local environment

```

git clone <Repository Url>

# or

git pull  <Repository Url>


```

### `Installing npm package`

installing all the requires npm packages

```

npm install

# or

yarn install

```

### `Environment variable`

```

check the sample.env to get the list of the variable in  .env file
requires for this server to run successfully

```

### `Start the Server`

Runninh the server on your local environment

```
npm run start

# or

yarn run start

```

# Description

The following are the requirement for the project

- Node install in the Pc
-Obtain all variables in the sample.env file and create a .env file
for the project

# Project tree

```

├── app.js
├── bin
│   ├── cert.csr
│   ├── certificate.pem
│   ├── private.key
│   └── www
├── config
│   ├── db.js
│   └── paystack.js
├── controllers
│   ├── authController.js
│   ├── bookPaymentController.js
│   ├── googleLoginController.js
│   ├── shortletController.js
│   └── verifyPaymentController.js
├── models
│   ├── shortlet.js
│   └── user.js
├── package-lock.json
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
├── routes
│   ├── auth.js
│   ├── bookPayment.js
│   ├── googleLogin.js
│   ├── index.js
│   ├── shortlets.js
│   ├── users.js
│   └── verifyPayment.js
├── sample.env
├── utils
│   ├── cloudinary.js
│   ├── dbHelper.js
│   ├── getGoogleOauthToken.js
│   ├── googleOauth.js
│   ├── multer.js
│   ├── paginationMiddleware.js
│   └── verifyTokenMiddleWare.js
└── views
    ├── error.jade
    ├── googleLogin.jade
    ├── index.jade
    ├── layout.jade
    └── paginateshortletTable.pug



```
