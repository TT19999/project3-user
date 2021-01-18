import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import config from '../config';

class Login extends React.Component {

  constructor(){
        super()
        this.state={
            email: '',
            password:'',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit =this.onSubmit.bind(this)
    }
    onChange(event){
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    onSubmit(event){
        event.preventDefault()
        const user={
            email : this.state.email,
            password: this.state.password
        }
        axios.post('/api/login', user , {
            headers: {'Content-Type' : 'application/json'}
        }).then(res => {
          console.log("abc")
            console.log(res)
            localStorage.setItem('userToken',res.data.token)
            localStorage.setItem('userName',res.data.user.name)
            localStorage.setItem('userId',res.data.user.id)
            localStorage.setItem('avatar',res.data.avatar)
            window.location.replace("/")
            
        }).catch(errors => {
          console.log(errors.response);
          if(errors.response.status === 403){
            config.email = this.state.email
            window.location.replace('/verify?'+this.state.email)
          }
          alert(errors.response.data.errors)
        })
        
    }

  render(){
    return(
      <div className="mh-fullscreen bg-img center-vh p-20" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)`}}> 
    <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
    <h5 className="text-uppercase text-center">Login</h5>
    <br /><br />
    <form onSubmit={this.onSubmit}>
      <div className="form-group">
        <input type="email" onChange={this.onChange} name="email" className="form-control" placeholder="Email" />
      </div>
      <div className="form-group">
        <input type="password" onChange={this.onChange} name="password" className="form-control" placeholder="Password" />
      </div>
      <div className="form-group flexbox py-10">
        <label className="custom-control custom-checkbox">
        </label>
        <a className="text-muted hover-primary fs-13" href="/forgotPassword">Forgot password?</a>
      </div>
      <div className="form-group">
        <button className="btn btn-bold btn-block btn-primary" type="submit" >Login</button>
      </div>
    </form>
    <hr className="w-30" />
    <p className="text-center text-muted fs-13 mt-20">Don't have an account? <Link to="/signup">Sign up</Link></p>
  </div>
</div>
    )
  }
}
export default Login;