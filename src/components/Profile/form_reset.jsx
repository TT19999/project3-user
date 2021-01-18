import React from 'react'
import { validateAll } from 'indicative';
import axios from 'axios'

class FormReset extends React.Component{
    constructor(props){
        super(props)
        this.state={
            old_password: '',
            new_password: '',
            new_password_confirmation: '',
            errors: [],
    }
    }   
    rules = {
        old_password: 'required|string|min:6',
        new_password: 'required|string|min:6|confirmed'
    };
    messages = {
        required: 'The {{ field }} is required.',
        min : 'the password need min 6',
        'new_password.confirmed': 'The password confirmation does not match.'
    }
    
    handleInputChange = (event) => {
            this.setState({
              [event.target.name]: event.target.value,
              errors: [],
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        // validating user data
        const data = this.state;
        validateAll(data,this.rules, this.messages)
        .then(async () => {
            //successfull login
            await axios.post('/api/user/resetPassword', {
                old_password: this.state.old_password,
                new_password: this.state.new_password,
                new_password_confirmation: this.state.new_password_confirmation,
            },{
                headers: {'Authorization' : 'Bearer ' + localStorage.getItem("userToken")}
            }).then(response =>  {
                alert(response.data.message)
            }).catch(errors => {
            console.log(errors.response);
            alert(errors.response.data.errors)
            })
        })
        .catch(errors => {
            console.log(errors);
            const formattedErrors = {}
            errors.forEach(error => formattedErrors[error.field] = error.message)
            this.setState({
            errors: formattedErrors
            })
        })
    }
    render(){
        return(
            <>
            <form className="col-md-10" onSubmit={this.handleSubmit}>
                <div class="form-group">
                    <label for="InputPassword">Old password</label>
                    <input type="password" name="old_password" onChange={this.handleInputChange} class="form-control" id="InputPassword"/>
                    {
                        this.state.errors['old_password'] &&
                        <small className="text-danger">{this.state.errors['old_password']}</small>
                    }
                </div>
                <div class="form-group">
                    <label for="InputPassword1">New Password</label>
                    <input type="password" name="new_password" onChange={this.handleInputChange} class="form-control" id="InputPassword1"/>
                    {
                        this.state.errors['new_password'] &&
                        <small className="text-danger">{this.state.errors['new_password']}</small>
                    }
                </div>
                <div class="form-group">
                    <label for="InputPassword2">New Password</label>
                    <input type="password" name="new_password_confirmation" onChange={this.handleInputChange} class="form-control" id="InputPassword2"/>
                </div>
                    <button type="submit" class="btn btn-primary">Save</button>
                </form>
            </>
        )
    }
}
export default FormReset;