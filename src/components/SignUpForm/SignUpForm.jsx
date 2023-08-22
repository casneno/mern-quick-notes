import { Component } from 'react';
import { signUp } from '../../utilities/users-service'


/* Example of a Class Component */

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt)=>{
    evt.preventDefault();
    try {
      // We need to create a new object with only the data that we want (name, email and password) to pass it to teh global state. Can be done in 2 ways:
      // (1) Destructure the 'state' object and assign a new object with the variables that we want
      const {name, email, password} = this.state
      const formData = {name, email, password}
      // (2) Create a Copy of the 'state' and delete the properties we don't want
      // const formData = {...this.state}
      // delete formData.confirm
      // delete formData.error
      //-----
      /*The promise returned by the signUp service method will resolve to the
      user object included in the payload of the JSON Web Token (JWT)*/
      const user = await signUp(formData)
      console.log('User:',user)
      this.props.setUser(user); //«««« in Class-based components, this is how we destructure, using the 'this.props'
    } catch {
      //An error ocurred
      //Probably due to a dupliate email
      this.setState({ error: 'Sign Up Failed: Try Again' })
    }
  }

  /*Overide the built-in render() method from the built-in Component class*/
  render() {
    const disable = this.state.password !== this.state.confirm; /* the 'disable' variable is being used as a validation to check if passward and confirmation are the same*/
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}