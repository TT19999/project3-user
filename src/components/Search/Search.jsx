import React from 'react' 
import Set from '../Set/Set';
import axios from 'axios'
import Banner from './../Banner';


class Search extends React.Component {
    constructor(props){
        super(props)
        const search =props.location.search;
        const params = new URLSearchParams(search);
        this.state={
            search : params.get('p'),
            sets: []
        }
    }

    componentDidMount (){
        axios({
            method: 'GET',
            url: '/api/search',
            params : {
                key_word : this.state.search
            },
            headers : {
                Authorization: "Bearer" + localStorage.getItem("userToken")
            },
        }).then(res=>{
            this.setState({
                sets : res.data.post
            })
            console.log(res.data)
        }).catch(err =>{
            console.log(err.response)
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
        return(
            <>
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
            </>
        )
    }
}
export default Search