const jwt = require('express-jwt');
require('dotenv').config();

// This file does the heavy lifting for our backend route protection
const getTokenFromHeaders = (req) => {
    
    // Get authorization token from the header of the request
    const { headers: { authorization } } = req;

    // Returns the authorizatino token if it exists
    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

// We will use either auth.required or auth.optional as middleware in every backend route, jwt() checks the token against the secret
const auth = {
    required: jwt({
        secret: process.env.SECRET,
        userProperty: 'payload',
        getToken: getTokenFromHeaders
    }),
    optional: jwt({
        secret: process.env.SECRET,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
};

module.exports = auth;