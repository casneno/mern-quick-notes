/* CREATE A DEFAULT REQUEST TO BE REUSED IN TEH users-apis.  We set the method to GET and payload to null by default*/
import { getToken } from "./users-service";

export default async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a pyload, set headers, specify the method, etc.
  const options = { method };

  if (payload){
    options.headers = { 'Content-Type': 'application/json'};
    options.body = JSON.stringify(payload);
  }
  const token = getToken();

  if (token) {
    //Need to add an Authorization header.  Use teh Logical OR Assignment Operator
    options.headers ||= {};
    //options.headers = options.headers || {}; ««« older approach
    options.headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(url, options)
  
  //if res.ok is false then something went wrong
  if (res.ok) return res.json(); //« this returns a Promise
  throw new Error('Bad Request');
}