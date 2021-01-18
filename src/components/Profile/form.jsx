    import React from 'react'
  import axios from "axios"
  import Banner from '../Banner'
  import { Link } from 'react-router-dom'
  import FormReset from './form_reset'
  
  class Form extends React.Component {
      constructor(props)
      {
          super(props)
          this.state={
              first_name:"",
              lats_name:"",
              email:"",
              avatar:"",
              phone:"",
              user: [],
              profile:[],
              action:"",
              skill:[],
          }
      }
  
      async componentDidMount()  {
          axios({
                method:'GET',
                url: '/api/user/profile/show',
                headers : {
                    Authorization: "Bearer" + localStorage.getItem("userToken")
                },
                params: {
                    user_id : this.props.match.params.id
                },
          }).then(res => {
              console.log(res.data)
              if(res.status === 200){
                  this.setState({
                      user:res.data.user,
                      profile: res.data.profile,
                      skill : res.data.skill,
                      action: res.data.action
                  })
                  console.log(this.state.user.name)
              }
          }).catch(errors => {
            console.log(errors.response);
            alert(errors.response.data.errors)
          })
      }
      render(){
          const Skill = this.state.skill != null ? 
                  this.state.skill.map(res => {
                     return (
                         <>
                         <a className="badge badge-pill badge-default" href={"/article/"+res.name}>{res.name}</a> <br/>
                         </>
                     ) 
                  })
                  : 
                  null
          return (
              <div>
                  <Banner 
                  backgroundImage="url(assets/img/bg-gift.jpg)"
                  />
                  <main className="main-content bg-gray">
                                  <div class="container emp-profile">
                          <form method="post">
                              <div class="row">
                                  <div class="col-md-4">
                                      <div class="profile-img">
                                          <img src={this.state.profile.avatar} alt="" />
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="profile-head">
                                          <h5>
                                              {this.state.user.name}
                                          </h5>
                                          <h6>
                                              {this.state.profile.subject}
                                          </h6>
                                          <ul class="nav nav-tabs" id="myTab" role="tablist">
                                              <li class="nav-item">
                                                  <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                              </li>
                                          </ul>
                                      </div>

                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-md-4">
                                      <div class="profile-work">
                                          <p>WORK LINK</p>
                                              <a href={this.state.profile.facebook}>facebook : <a>{this.state.profile.facebook}</a> </a><br/>
                                              <a href={this.state.profile.twitter}>twitter : <a>{this.state.profile.twitter}</a> </a><br/>
                                              <a href={this.state.profile.github}>github : <a>{this.state.profile.github}</a> </a><br/>
                                              <a href={this.state.profile.website}>website : <a>{this.state.profile.website}</a> </a><br/>
                                          <p>SKILLS</p>
                                          {Skill}
                                      </div>
                                  </div>
                                  <div class="col-md-8">
                                      <div class="tab-content profile-tab" id="myTabContent">
                                          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                              <div class="row">
                                                  <div class="col-md-6">
                                                      <label>First Name</label>
                                                  </div>
                                                  <div class="col-md-6">
                                                      <p>{this.state.profile.first_name}</p>
                                                  </div>
                                              </div>
                                              <div class="row">
                                                  <div class="col-md-6">
                                                      <label>Last Name</label>
                                                  </div>
                                                  <div class="col-md-6">
                                                      <p>{this.state.profile.last_name}</p>
                                                  </div>
                                              </div>
                                              <div class="row">
                                                  <div class="col-md-6">
                                                      <label>Email</label>
                                                  </div>
                                                  <div class="col-md-6">
                                                      <p>{this.state.user.email}</p>
                                                  </div>
                                              </div>
                                              <div class="row">
                                                  <div class="col-md-6">
                                                      <label>Phone</label>
                                                  </div>
                                                  <div class="col-md-6">
                                                      <p>{this.state.profile.phone}</p>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </main>
              </div>
          )
      }
  }
  
  export default Form