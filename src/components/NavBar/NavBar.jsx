import { Link } from 'react-router-dom'; /* this 'Link' import allows us to use <Link> that loads the content without reloading the page.  They are viewed as 
<a> in the browser */
import * as usersService from '../../utilities/users-service'

export default function NavBar({user, setUser}){
  function handleLogout(){
    usersService.logOut();
    setUser(null);
  }
  return(
    <nav> {/*this is how we use links:*/}
      <span>Welcome, {user.name}</span>
      &nbsp; | &nbsp;
      <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogout}>Log Out</Link>
    </nav>
  )
}