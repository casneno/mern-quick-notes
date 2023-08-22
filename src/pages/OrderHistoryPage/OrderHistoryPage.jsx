import { checkToken } from "../../utilities/users-service"

export default function OrderHistoryPage(){

  async function handleCheckToken(res, req){
    const expDate  = await checkToken() //Invoke the checkToken function from the handleCheckToken function. Consume the promise that checkToken will ultimately return using await assigning its resolved value to a variable named expDate.
    console.log(expDate)
  }


  return(
    <>
      <h1>OrderHistoryPage</h1>
      <button onClick={()=>handleCheckToken()}>Check When my Login Expires</button>
    </>
  )
}