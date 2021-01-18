import React from 'react'

class Form extends React.Component {
    constructor(props)
    {
        super(props)
        this.props
    }

    render(){
        return(
            <main className="main-content bg-gray">
                                <div class="container emp-profile">
                        <form method="post">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="profile-img">
                                        <img src={this.props.profile.avatar} alt=""/>
                                        <div class="file btn btn-lg btn-primary">
                                            Change Photo
                                            <input type="file" name="file"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="profile-head">
                                        <h5>
                                            {this.props.user.name}
                                        </h5>
                                        <h6>
                                            {this.props.profile.subject}
                                        </h6>
                                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="profile-work">
                                        <p>WORK LINK</p>
                                        <a href="">Website Link</a><br/>
                                        <a href="">Bootsnipp Profile</a><br/>
                                        <a href="">Bootply Profile</a>
                                        <p>SKILLS</p>
                                        <a href="">Web Designer</a><br/>
                                        <a href="">Web Developer</a><br/>
                                        <a href="">WordPress</a><br/>
                                        <a href="">WooCommerce</a><br/>
                                        <a href="">PHP, .Net</a><br/>
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
                                                    <p>{this.props.profile.first_name}</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Last Name</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <p>{this.props.profile.last_name}</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Email</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <p>{this.props.user.email}</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Phone</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <p>{this.props.profile.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
        )
    }
}