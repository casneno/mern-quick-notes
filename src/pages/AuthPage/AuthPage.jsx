import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useState } from "react";
import './AuthPage.css';

export default function AuthPage({setUser}){
  const [toggleSignIn, setToggleSignIn] = useState(true)

  return(
    <main>
      <h1>AuthPage</h1>
      {toggleSignIn ?
      <LoginForm setUser={setUser}/>
      :
      <SignUpForm setUser={setUser}/>
      }
      <h3><button className="switch-sign" onClick={()=>setToggleSignIn(!toggleSignIn)}>{toggleSignIn ? 'Sign-up here' : 'Go to Log In'}</button></h3>
    </main>
  )
}