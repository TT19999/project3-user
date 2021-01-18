import React from 'react';
import Banner from './../Banner';
import axios from 'axios';
import Set from '../Set/Set';

class  Welcome extends React.Component{
  constructor(props){
    super(props)
    this.state={
      sets:[],
    }
  }

  componentDidMount(){
    axios.get("/api/set",{
      headers : {
        'Authorization' : 'Bearer ' + localStorage.getItem("userToken")
      }
    }).then(res =>{
      console.log(res.data.sets)
      this.setState({
        sets: res.data.sets
      })
    }).catch(errors =>{
      alert(errors.response.data.errors)
    })
  }

  render(){
      const RenderPost = this.state.post !== [] ? 
      this.state.sets.map(res => {
        return (
            <>
            <Set sets={res} />
            {/* <Post post={res}/> */}
            </>
        ) 
      })
      : 
      null
    return (
    <div>
      <Banner 
      backgroundImage="url(assets/img/bg-gift.jpg)"
      title="Latest Blog Posts"
      subtitle="Read and get updated on the latest posts"
      />
    <main className="main-content bg-gray">      
          <section class="blog-cards-wrapper">
          {RenderPost}
          </section>
    </main>
    </div>
    )
};
}

export default Welcome;