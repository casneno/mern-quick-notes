import { getUser } from '../../utilities/users-service'
import './App.css';
import { useEffect, useState } from "react"
import AuthPage from "../AuthPage/AuthPage"
import NewOrderPage from "../NewOrderPage/NewOrderPage"
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage"
import NavBar from "../../components/NavBar/NavBar";
import Notes from "../../pages/Notes/Notes"

import { Routes, Route } from 'react-router-dom';

export default function App() {
  const [user, setUser] = useState(getUser()); //initialize the user state to the getUser function in the user-service.js. it returns the user object

  
  return (
    <main>
      {/*if the user is logged in, show order apge, else show the authentication*/}
      {user ?
        <>
          <NavBar user={user} setUser={setUser}/>
          <Notes user={user} />
          <Routes>
            {/*Route components in here*/}
            <Route path='/orders/new' element={<NewOrderPage />} />
            <Route path='/orders' element={<OrderHistoryPage />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}
