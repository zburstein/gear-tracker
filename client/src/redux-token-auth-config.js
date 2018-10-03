// redux-token-auth-config.js
import { generateAuthActions } from 'redux-token-auth'

const config = {
  authUrl: "http://localhost:3001/auth",
  userAttributes: {

  },
  userRegistrationAttributes: {

  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}