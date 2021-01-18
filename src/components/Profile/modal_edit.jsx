import React from 'react'
import axios from 'axios'
import Select from 'react-select';
import { validateAll } from 'indicative';

class ModalEdit extends React.Component {
    constructor(props){
        super(props)
        this.state={
            errors: [],
            first_name: '',
            last_name: '',
            phone: '',
            facebook: '',
            twitter: '',
            github: '',
            website: '',
            skill: [],
            skills: [],
            subject : '',
            status: '',
            selectedOption: '',
        }
    }

     options = [
        { label: "Reactjs", value: "1" },
        { label: "PHP", value: "2" },
        { label: "Laravel", value: "3" },
        { label: "web", value: "4" },
        { label: "test", value: "5" },
        { label: "designer", value: "6" },
        { label: "wordpress", value: "7" },
      ];

      onSelect = () =>{
          this.setState({
          })
      }

      handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Selected: ${selectedOption.label}`);
      }

    handleInputChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
          errors: [],
        })
        
    }

    onSelectedOptionsChange= (event) => {
        this.setState({
            skill : event ? event.map(x => x.value) : []
        })
        console.log(this.state.skill)
    }

    rules = {
        first_name:  'required|string',
        last_name:'required|string',
      };
     messages = {
        required: 'The {{ field }} is required.',
      }

      async componentDidMount()  {
        await axios.get("/api/user/profile",{
            headers: {'Authorization' : 'Bearer ' + localStorage.getItem("userToken")}
        }).then(res => {
            console.log(res)
            if(res.status === 200){
                this.setState({
                    first_name: res.data.profile.first_name,
                    last_name: res.data.profile.last_name,
                    phone : res.data.profile.phone,
                    facebook : res.data.profile.facebook,
                    twitter : res.data.profile.twitter,
                    github : res.data.profile.github,
                    website : res.data.profile.website,
                    status : res.data.profile.status,
                    subject : res.data.profile.subject,
                    skills : res.data.skill,
                    action: res.data.action
                })
            }
        }).catch(errors => {
            console.log(errors.response);
            alert(errors.response.data.errors)
            if(errors.response.status === 401) {
                localStorage.removeItem("userToken")
                localStorage.removeItem("userName")
                window.location.replace('/login')
            }
          })
    }


      handleSubmit = (event) => {
        event.preventDefault()
        var skills = []
        
        this.state.skills.forEach(function (item, index, array) {
            skills.push(String(item.id))
        })
        const data = {
            first_name : this.state.first_name,
            last_name : this.state.last_name,
            phone : this.state.phone,
            facebook: this.state.facebook,
            twitter: this.state.twitter,
            github: this.state.github,
            website: this.state.website,
            skill : skills.concat(this.state.skill),
            subject: this.state.subject,
            status : this.state.status,
        };
        validateAll(data,this.rules, this.messages)
        .then(async () => {
          await axios.post('/api/user/profile',data, {
            headers: {'Authorization' : 'Bearer ' + localStorage.getItem("userToken")}
          }).then(response =>  { 
              localStorage.setItem("userName" , data.first_name + ' ' + data.last_name)
              window.location.replace('/user/profile')
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

    render(){
        return (
            <>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Edit Profile
                    </button>
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Your Profile</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <form className="form-type-material" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                            <label for="InputPassword">First Name</label>
                            <input type="text" className="form-control" name="first_name" value={this.state.first_name} placeholder="First name" onChange={this.handleInputChange}/>
                            {
                                this.state.errors['first_name'] &&
                                <small className="text-danger">{this.state.errors['first_name']}</small>

                            }
                            </div>
                            <div className="form-group">
                            <label for="InputPassword">Last Name</label>
                            <input type="text" className="form-control" name="last_name" value={this.state.last_name} placeholder="Last name" onChange={this.handleInputChange}/>
                            {
                                this.state.errors['last_name'] &&
                                <small className="text-danger">{this.state.errors['last_name']}</small>
                            }
                            </div>
                            <div className="form-group">
                            <label for="InputPassword">Phone</label>
                            <input type="text" className="form-control" name="phone" value={this.state.phone} placeholder="Phone " onChange={this.handleInputChange}/>
                            {
                                this.state.errors['phone'] &&
                                <small className="text-danger">{this.state.errors['phone']}</small>
                            }
                            </div>
                            <div className="form-group">
                            <label for="InputPassword">Facebook</label>
                            <input type="text" className="form-control" name="facebook" value={this.state.facebook} placeholder="facebook" onChange={this.handleInputChange}/>
                            {
                                this.state.errors['facebook'] &&
                                <small className="text-danger">{this.state.errors['facebook']}</small>
                            }
                            </div>
                            <div className="form-group">
                            <label for="InputPassword">Twitter</label>
                            <input type="text" className="form-control" name="twitter" value={this.state.twitter} placeholder="twitter" onChange={this.handleInputChange}/>
                            {
                                this.state.errors['twitter'] &&
                                <small className="text-danger">{this.state.errors['twitter']}</small>
                            }
                            </div>
                            <div className="form-group">
                            <label for="InputPassword">Github</label>
                            <input type="text" className="form-control" name="github" value={this.state.github} placeholder="github" onChange={this.handleInputChange}/>
                            {
                                this.state.errors['github'] &&
                                <small className="text-danger">{this.state.errors['github']}</small>
                            }
                            </div>
                            <div className="form-group">
                            <label for="InputPassword">Website</label>
                            <input type="text" className="form-control" name="website" value={this.state.website} placeholder="website" onChange={this.handleInputChange}/>
                            {
                                this.state.errors['website'] &&
                                <small className="text-danger">{this.state.errors['website']}</small>
                            }
                            </div>
                            <div class="form-group">
                            <label for="InputPassword">Subject</label>
                            <select class="form-control" name="subject" id="exampleFormControlSelect1" value={this.state.subject} onChange={this.handleInputChange}>
                                <option value="student">student</option>
                                <option value="develop">develop</option>
                                <option value="tester">tester</option>
                                <option value="devOps">devOps</option>
                                <option value="Other">Other</option>
                            </select>
                            </div>
                            <div className="form-group">
                                <label for="InputPassword">Skills</label>
                                <Select
                                    isMulti
                                    name="skill"
                                    options={this.options}
                                    onChange={this.onSelectedOptionsChange}
                                    className="basic-multi-select"
                                    classNamePrefix="Skills"
                                    placeholder="Skills..."
                                />
                            </div>
                        
                            <div class="form-group">
                            <label for="InputPassword">Status</label>
                            <select class="form-control" name="status" id="exampleFormControlSelect1" value={this.state.status} onChange={this.handleInputChange}>
                                <option value="Public">Public</option>
                                <option value="Private">private</option>
                            </select>
                            </div>
                        </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={this.handleSubmit}>Save changes</button>
                        </div>
                        </div>
                    </div>
                    </div>
            </>
        )
    }
}
export default ModalEdit;