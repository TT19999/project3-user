import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp/index';
import * as serviceWorker from './serviceWorker';
import Profile from './components/Profile/profile';
import "./index.css";
import "./components/CreateSet/CreateSet.css"
import Form from './components/Profile/form';
import axios from 'axios';
import About from './components/about';
import ForgotPassword from './components/Forgot';
import Page404 from './components/404Page';
// import SinglePost from './components/SinglePost/SinglePost';
// import Createpost from './components/Createpost/CreatePost';
// import UserBlog from './components/UserBlog/UserBlog';
import Verify from './components/Verify/Verify';
import MyComponent from './components/Welcome/test';
import SingleSet from './components/SingleSet/SingleSet';
import CreateSet from './components/CreateSet/CreateSet';
import './components/Card/SingleCard.css';
// import EditPost from './components/Edit/EditPost';


const Main = withRouter(({ location }) => {
  // const checkLogin= () => {
  //     axios.get("/api/user/profile",{
  //           headers: {'Authorization' : 'Bearer ' + localStorage.getItem("userToken")}
  //       }).then(res => {
  //           console.log(res)
  //           if(res.status == 200){
  //               this.setState({
  //                   user:res.data.user,
  //                   profile: res.data.profile,
  //                   skill : res.data.skill,
  //                   action: res.data.action
  //               })
  //               console.log(this.state.user.name)
  //           }
  //       }).catch(errors => {
  //           console.log(errors.response);
  //           alert(errors.response.data.errors)
  //           if(errors.response.status == 401) {
  //               localStorage.removeItem("userToken")
  //               localStorage.removeItem("userName")
  //               window.location.replace('/login')
  //           }
  //     })
  // }
return (
<div>
  {
    location.pathname !== '/login' 
    && location.pathname !== '/signup' 
    && location.pathname !== '/forgotPassword' 
    && location.pathname !== '/verify'
    && <Navbar/>
  }
    <Switch>
      <Route exact path="/" component={localStorage.getItem("userToken") == null ? About : Welcome}/>   
      <Route  exact path="/user/profile" component={Profile}/>
      {/* <Route exact path="/post/create" component={Createpost}/> */}
      {/* <Route exact path="/user/post" component={UserBlog} />
      <Route exact path="/post/:id" component={SinglePost} /> */}
      <Route exact path="/sets/create" component={CreateSet} />
      <Route exact path ="/sets/:id" component={SingleSet} />
      <Route exact path="/user/profile/:id" component={Form} />
      <Route exact path="/test" component={MyComponent} /> 
      {/* <Route exact path="/post/:id/edit" component={EditPost} /> */}
      
      <Route exact path="/login" >
        {localStorage.getItem("userToken") ? 
        <>
        <Redirect to="/"/>
        </>
        : <Login></Login>}
      </Route>
      <Route exact path="/verify" >
        {localStorage.getItem("userToken") ? 
        <>
        <Redirect to="/"/>
        </>
        : <Verify></Verify>}
      </Route>
      <Route exact path="/signup" >
        {localStorage.getItem("userToken") ? 
        <>
        <Redirect to="/"/>
        </>
        : <SignUp></SignUp>}
      </Route>
      <Route exact path="/forgotPassword" >
        {localStorage.getItem("userToken") ? 
        <>
        <Redirect to="/"/>
        </>
        : <ForgotPassword></ForgotPassword>}
      </Route>
      <Route>
        <Page404 />
      </Route>
    </Switch>
    
    
    {
    location.pathname !== '/login' 
    && location.pathname !== '/signup' 
    && location.pathname !== '/forgotPassword'
    && location.pathname !== '/verify'
    && <Footer />
    }
  </div>
);
});

ReactDOM.render(
  <BrowserRouter>
  <Main />
  </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
//https://designrevision.com/downloads/shards-dashboard-lite-react/
