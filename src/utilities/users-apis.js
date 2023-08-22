import sendRequest from './send-request';

/* Logic for sending an AJAX request goes here 
  This is where we make fetch requests */

const BASE_URL = '/api/users'; //a Controller is gonna have a '/api' path as convention and best-practice. This way whoever reads this code, will know that JSON is coming back from the server


export async function signUp(userData){
  return sendRequest(BASE_URL, 'POST', userData)
}

export async function login(credentials){
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
}

export async function checkToken(){
  return sendRequest(`${BASE_URL}/check-token`)
}