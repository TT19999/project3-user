import React from 'react';
import { validateAll } from 'indicative';
import axios from 'axios';
import config from '../config/index';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      subject: 'student',
      errors: [],
    };
   

  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      errors: [],
    })
    
  }
   rules = {
    first_name:  'required|string',
    last_name:'required|string',
    email: 'required|email',
    password: 'required|string|min:6|confirmed'
  };
   messages = {
    required: 'The {{ field }} is required.',
    min : 'the password need min 6',
    'password.confirmed': 'The password confirmation does not match.'
  }
  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state)
    // validating user data
    const data = this.state;

    
    validateAll(data,this.rules, this.messages)
    .then(async () => {
      //successfull login
      await axios.post('/api/register', {
        first_name: this.state.first_name,
        last_name:this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        subject : this.state.subject,
      }).then(response =>  {
        console.log('b')
        if(response.status === 201) {
          window.location.replace('/login')
        }
        
      }).catch(errors => {
        console.log(errors.response);
        alert(errors.response.data.errors)
      })
    })
    .catch(errors => {
      console.log('a')
      console.log(errors);
      const formattedErrors = {}
      errors.forEach(error => formattedErrors[error.field] = error.message)
      this.setState({
        errors: formattedErrors
      })
    })
  }
  render() {
    return (
      <div className="mh-fullscreen bg-img center-vh p-20" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)`}}>
    <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
    <h5 className="text-uppercase text-center">Register</h5>
    <br />
    <br />
    <form className="form-type-material" onSubmit={this.handleSubmit}>
    <div className="form-group">
      <input type="text" className="form-control" name="first_name" placeholder="First name" onChange={this.handleInputChange}/>
      {
        this.state.errors['first_name'] &&
        <small className="text-danger">{this.state.errors['first_name']}</small>

      }
    </div>
    <div className="form-group">
      <input type="text" className="form-control" name="last_name" placeholder="Last name" onChange={this.handleInputChange}/>
      {
        this.state.errors['last_name'] &&
        <small className="text-danger">{this.state.errors['last_name']}</small>
      }
    </div>
    <div className="form-group">
      <input type="text" className="form-control" name="email" placeholder="Email address" onChange={this.handleInputChange}/>
      {
        this.state.errors['email'] &&
        <small className="text-danger">{this.state.errors['email']}</small>
      }
    </div>
    <div className="form-group">
      <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleInputChange}/>
      {
        this.state.errors['password'] &&
        <small className="text-danger">{this.state.errors['password']}</small>
      }
    </div>
    <div className="form-group">
      <input type="password" className="form-control" name="password_confirmation" placeholder="Password (confirm)" onChange={this.handleInputChange}/>
    </div>
    <div class="form-group">
      <select class="form-control" name="subject" id="exampleFormControlSelect1" onChange={this.handleInputChange}>
        <option value="student">student</option>
        <option value="develop">develop</option>
        <option value="tester">tester</option>
        <option value="devOps">devOps</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <br />
    <button className="btn btn-bold btn-block btn-primary" type="submit">Register</button>
    </form>
    <hr className="w-30" />
    <p className="text-center text-muted fs-13 mt-20">Already have an account?
    <a href="/login">Sign in</a>
    </p>
    </div>
</div>
    )
  }
}

export default SignUp;