import React from 'react'
import { validateAll } from 'indicative';
import axios from 'axios';

class ForgotPassword extends React.Component {
    constructor(){
        super()
        this.state={
            email: "",
            errors: []
        }
    }

    handleInputChange = event =>{
        this.setState({
            [event.target.name] : event.target.value,
            errors: []
        })
    }

    rules = {
        email: 'required|email',
      };
       messages = {
        required: 'The {{ field }} is required.',
      }
      handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        // validating user data
        const data = this.state;
        validateAll(data,this.rules, this.messages)
        .then(async () => {
          await axios.post('http://127.0.0.1:8000/api/forgotEmail', data).then(response =>  {
            alert(response.data.message)
              window.location.replace('/login')
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
        <h5 className="text-uppercase text-center">Forgot Password</h5>
        <br />
        <br />
        <form className="form-type-material" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" name="email" placeholder="Email address" onChange={this.handleInputChange}/>
          {
            this.state.errors['email'] &&
            <small className="text-danger">{this.state.errors['email']}</small>
          }
        </div>
        <br />
            <button className="btn btn-bold btn-block btn-primary" type="submit">Gửi request</button>
        </form>
        <hr className="w-30" />
            <p className="text-center text-muted fs-13 mt-20">Back To Sign in: 
            <a href="/login">Sign in</a>
            </p>
        </div>
        </div>
        )
      }
}
export default ForgotPassword