/* Service Modules export business/app logic such ass managing tokens, etc.
  Service modules often depend upon API modules for making AJAX requests to the server
  Logic for getting the user data from the token*/

import * as usersAPI from './users-apis' //import everything as usersAPI from './users-apis'

/* --------------------SIGN UP------------------------ */
export async function signUp(userData){
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // Persist the "token". Sending it to the localStorage (to check, go into browser developer tools after signing up to confirm that token was stored: Application->Local Storage)
  localStorage.setItem('token', token);
  // a TODO: return user object from token instead
  return getUser();
}

export function getToken() {
  // getItem will return null if the key does not exist
  const token = localStorage.getItem('token')
  if (!token) return null;
  // check if existing token is expired
  const payload = JSON.parse(atob(token.split('.')[1])) //first we take only the segment of the token that contains our payload (index = [1]), then we transform it into a strinn using atob(), and finally we transform it into an object with the JSON.parse.
  // A JWT's exp is expressed in seconds, not milliseconds
  if (payload.exp * 1000 < Date.now()) {
    // Token has expired
    localStorage.removeItem('token');
    return null;
  } //else, if it is valid:
  return token;
}

export function getUser() {
  const token = getToken();
  // if there is a token, return the user object from the token, else return null

  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

/* ---------------------LOGIN--------------------- */
export async function login(userData) {
  const token = await usersAPI.login(userData);
  localStorage.setItem('token', token);
  return getUser();
}

/* --------------------LOGOUT------------------- */
export function logOut() {
  localStorage.removeItem('token');
}

/* --------------------CHECK TOKEN------------------- */
export function checkToken(){
  // We can't forget how to use .then with promises, so let's use it now:
  return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr))
}