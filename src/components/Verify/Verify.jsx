import React from 'react'
import { validateAll } from 'indicative';
import axios from 'axios';
import config from '../config';

class Verify extends React.Component {
    constructor(props){
        super(props)
        this.state={
            token: "",
            errors: []
        }
    }

    handleInputChange = event =>{
        this.setState({
            [event.target.name] : event.target.value,
            errors: []
        })
    }

    
      handleSubmit = (event) => {
        event.preventDefault()
        console.log(config.email)
      }
      render() {
        return (
          <div className="mh-fullscreen bg-img center-vh p-20" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)`}}>
        <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
        <h5 className="text-uppercase text-center">Verify Account</h5>
        <br />
        <br />
        <form className="form-type-material" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" name="token" placeholder="Token" onChange={this.handleInputChange}/>
          {
            this.state.errors['token'] &&
            <small className="text-danger">{this.state.errors['token']}</small>
          }
        </div>
        <br />
            <button className="btn btn-bold btn-block btn-primary" type="submit">Verify</button>
        </form>
        <hr className="w-30" />
            <p className="text-center text-muted fs-13 mt-20"><a href="/login">Sign in</a></p>
            <p className="text-center text-muted fs-13 mt-20"><a href="/signup">Sign up</a></p>
        </div>
        </div>
        )
      }
}
export default Verify