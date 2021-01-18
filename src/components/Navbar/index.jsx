import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Pusher from 'pusher-js'
import axios from 'axios'

class Navbar extends React.Component {
  constructor(props){
    super(props)
    this.onClick=this.onClick.bind(this)
    this.state={
      notifications: [],
      unread : '',
    }
  }

  componentDidMount(){
    console.log('helo nav')
    axios({
      method : 'GET',
      url : '/api/notifications',
      headers : {
        Authorization: "Bearer" + localStorage.getItem("userToken")
      },
    }).then(res => {
      console.log('helo nav')
      this.setState({
        notifications : res.data.notifications,
        unread : res.data.unread
      });
      console.log(this.state.notifications)
    })

    var pusher = new Pusher('713d7bdf9e0f17458630', {
      cluster: 'ap1'
    });
    
    var channel = pusher.subscribe('NotificationEvent');
    channel.bind('send-message/'+localStorage.getItem('userId'), (data) => {
      console.log(data)
      this.setState(prevState => ({
        notifications: [data, ...prevState.notifications]
      }))
      this.setState({
        unread : this.state.unread + 1
      })
    });
  }

  onClick(e){
    localStorage.removeItem('userToken')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    window.location.reload("/")
  }

  handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      event.preventDefault();
      window.location.replace('/search?p='+event.target.value)
    }
  }

  onClickLink =(link , object_id , notification_id) => {
    axios({
      method : 'POST',
      url : '/api/notifications/update',
      data : {
        id : notification_id,
      },
      headers : {
        Authorization: "Bearer" + localStorage.getItem("userToken")
      },
    }).then(res => {
      this.setState({
        unread : this.state.unread-1
      })
    })
    window.location.replace(link+object_id)
  }

  onClickReadAll = () =>{
    axios({
      method : 'POST',
      url : '/api/notifications/update/all',
      headers : {
        Authorization: "Bearer" + localStorage.getItem("userToken")
      },
    }).then(res => {
      this.setState({
        unread : 0
      })
    })
  }

  render(){
    const notifications = this.state.notifications[0] ? this.state.notifications.map(res => {
      if(res.type == 'new_post'){
        return <>
            <a className="content" onClick={()=>this.onClickLink('/post/', res.post_id, res.id,)} >
              <div className="notification-item">
                <small style={{lineHeight: '20px', float : 'right', paddingRight: '10px'}}> 1 day ago</small>
                <img src={res.avatar}/>
                <h4 className="item-title">{res.author} <small>vừa thêm bài viết mới</small></h4>
                <p className="item-info" style={{lineHeight:'40px'}}>{res.title}</p>
              </div>
            </a> 
        </>

      }
      if(res.type == 'new_follower'){
        return <>
            <a className="content" onClick={()=>this.onClickLink('/user/profile/', res.owner_id, res.id,)}>
              <div class="notification-item">
                <small style={{lineHeight: '20px', float : 'right', paddingRight: '10px'}}> 1 day ago</small>
                <img src={res.avatar}/>
                <h4 className="item-title">{res.name} <small>Đã follow bạn</small></h4>
                <p className="item-info" style={{lineHeight:'40px'}}>
                  xem trang cá nhân
                </p>
              </div>
            </a> 
            </>
      }
  }) : 
        <>
         <div className="content">
              <div class="notification-item">
                <h4 className="text-center">Bạn chưa có thông báo nào</h4>
              </div>
        </div> 
      </>
  return (
  <nav className="topbar topbar-inverse topbar-expand-md topbar-sticky">
        <div className="container">
          <div className="topbar-left">
            <button className="topbar-toggler">☰</button>
            <Link className="topbar-brand" to="/">
              <img className="logo-default" src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="logo" />
              <img className="logo-inverse" src={`${process.env.PUBLIC_URL}/assets/img/logo-light.png`} alt="logo" />
            </Link>
            <div class="search__container">
                <input class="search__input" type="text" placeholder="Search"  onKeyPress={this.handleKeyDown}/>
            </div>
          </div>
          <div className="topbar-right">
            <ul className="topbar-nav nav">
              {localStorage.getItem("userToken") != null ? 
              <>
              <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/post/create">Create</Link>
              </li>
              {/* <li className="nav-item">
                <div className="icon dropdown" id="bell"> 
                <a className="nav-link" href="#" id="box" data-toggle="dropdown">
                  <img src="https://i.imgur.com/AC7dgLA.png" alt=""/>
                </a>
                  <div class="dropdown-menu" aria-labelledby="dropdownNotification" style={{backgroundColor: 'black'}}>
                    {notifications}
                  </div>
                 </div>
                <div className="notifications" id="box">
                    <div className="notifications-item"> <img src="https://i.imgur.com/uIgDDDd.jpg" alt="img"/>
                        <div className="text">
                            <h4>Samso aliao</h4>
                            <p>Samso Nagaro Like your home work</p>
                        </div>
                    </div>
                    <div className="notifications-item"> <img src="https://img.icons8.com/flat_round/64/000000/vote-badge.png" alt="img"/>
                        <div className="text">
                            <h4>John Silvester</h4>
                            <p>+20 vista badge earned</p>
                        </div>
                    </div>
                </div>
              </li> */}

            <li className="nav-item">
            <div class="dropdown nav-button notifications-button hidden-sm-down">

              <a class="dropdown-toggle" href="#" id="notifications-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i id="notificationsIcon" class="fa fa-bell-o" aria-hidden="true"></i>
                    <span id="notificationsBadge" class="badge badge-danger">{this.state.unread}</span>
                  </a>

            <ul class="dropdown-menu notifications" role="menu" aria-labelledby="notifications-dropdown">
            
            <div class="notification-heading"><h4 class="menu-title">Notifications</h4><h4 class="menu-title pull-right" ><i class="glyphicon glyphicon-circle-arrow-right"></i></h4>
            </div> 
            <div class="notifications-wrapper"> 
              {notifications}
            </div> 
            <div className="notification-footer">
              <div claclassNames="notification-item">
                  <h4 className="item-title text-center">
                    <button className="btn btn-primary" onClick={this.onClickReadAll}>
                        Đánh dấu tất cả là đã đọc
                    </button>
                  </h4>
              </div>
            </div>
          </ul>
          </div>
          </li>

              

              {/* <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown button
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </div> */}

              <li className="nav-item">
                <a className="nav-link">{localStorage.getItem("userName")}
                  <i className="fa fa-caret-down" />
                </a>
                <div className="nav-submenu">
                  <a className="nav-link" href="/user/profile">My Profile</a>
                  <a className="nav-link" href="/user/post">My Blog</a>
                  <a className="nav-link" onClick={this.onClick} href="/">Logout</a>
                </div>
              </li>
              </>
              : 
              <>
                <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signup">Signup</a>
              </li>
              </>
              
              }
              
            </ul>
          </div>
        </div>
      </nav>
  );
  }
}

export default Navbar;