import React from 'react'
import Banner from '../Banner'
import axios from 'axios'
import { ListGroup } from 'react-bootstrap'
import {
    SoundOutlined,
    LeftOutlined,
    RightOutlined,
    } from '@ant-design/icons'
import Cards from '../Card/Cards'
import Comments from './comments/comments'

class SingleSet extends React.Component {
    constructor(props){
        super(props)
        this.state={
            word:'',
            wordData: [],
            data: [],
            meaning:'',
            phonetic: '',
            lexicalEntries: [],
            lexicalCategory: '',
            audioSrc: '',
            cards : [],
            sets:[],
            image: '',
            is_follow: false,
            owner : [],
            comment : '',
            comments: [],
        }
    }

    componentDidMount() {
         axios({
             method: "GET",
             url: "http://127.0.0.1:8000/api/set/show",
             headers : {
                Authorization: "Bearer" + localStorage.getItem("userToken")
              },
             params :{ 
                 id : this.props.match.params.id
             }
         }).then(res => {
             this.setState({
                cards : res.data.sets.cards,
                sets : res.data.sets,
                owner : res.data.owner,
                comments : res.data.sets.comments,
                is_follow: res.data.is_follower
             })
             console.log(this.state.cards)
         })
    }

    onChangeWord = (event) => {
        event.preventDefault()
        this.setState({
            word: event.target.value
        })
        if(event.target.value !== '') {
             axios({
            method : "GET",
            url: "http://127.0.0.1:8000/api/word/show",
            params: {
                word : event.target.value
            },
            
        }).then(res =>{
            const EntrisWordData = res.data.word
            this.setState({
                wordData : EntrisWordData,
                lexicalEntries: EntrisWordData.results[0].lexicalEntries,
                showListModal: true,
                currentWord: this.state.word,
                phonetic: EntrisWordData.results[0].lexicalEntries[0].entries[0].pronunciations[0].phoneticSpelling,
                audioSrc : EntrisWordData.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile
              })
              console.log(this.state)
        })
        }
        else {
            this.setState({
                word:'',
                wordData: [],
                data: [],
                meaning:'',
                phonetic: '',
                lexicalEntries: [],
                lexicalCategory: '',
                audioSrc: '',
            })
        }
       
    }

    onClickButtonCategory = (lexicalCategory) => {
        this.state.lexicalEntries.map(data => {
            if(data.lexicalCategory.id === lexicalCategory){
                this.setState({
                    data : this.state.data.concat(data),
                    meaning: data.entries[0].senses[0].definitions[0],
                    example: data.entries[0].senses[0].examples ? data.entries[0].senses[0].examples[0].text : null,
                    phonetic: data.entries[0].pronunciations[0].phoneticSpelling,
                    lexicalCategory: lexicalCategory,
                  })
            }
        })
    }

    onCommentChange = event => {
        this.setState({
          comment : event.target.value
        })
      }

      submitComment = event => {
        event.preventDefault()
  
        axios({
          method : "POST",
          url : "/api/set/"+this.state.sets.id+"/comment",
          data : {
            set_id : this.state.sets.id,
            comment : this.state.comment
          },
          headers : {
            Authorization: "Bearer" + localStorage.getItem("userToken")
          },
        }
        ).then(res => {
          console.log(res)
          var data = this.state.comments
          data.unshift({
            id : res.data.comment.id,
            comment: res.data.comment.comment,
            created_at: res.data.comment.created_at,
            set_id: res.data.comment.set_id,
            updated_at: res.data.comment.updated_at,
            user_id: res.data.comment.user_id,
            user : {
              id : localStorage.getItem('userId'),
              name : localStorage.getItem('userName'),
              avatar : localStorage.getItem('avatar')
            }
          })
          this.setState({
            comments : data,
            comment : ''
          })
        })
      }

    onClickAudio=()=>{
        if(this.state.audioSrc){
          let audio = new Audio(this.state.audioSrc)
          audio.play()
        }
      }

    onClickCreateCard = (event) =>{
        event.preventDefault()
        axios({
            method: "POST",
            url: "http://127.0.0.1:8000/api/card/create",
            data : {
                "set_id" : this.state.sets.id,
                "word" : this.state.word,
                "lexical":this.state.lexicalCategory,
                "example":this.state.example,
                "image" : this.state.image,
                "meaning": this.state.meaning,
                "phonetic" : this.state.phonetic,
                "audioSrc" : this.state.audioSrc,
            },
            headers : {
                Authorization: "Bearer" + localStorage.getItem("userToken")
            },
        }).then(res => {
            console.log(res)
        })
    }

    onHandleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onAvatarChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            var data = new FormData()
            data.append("image", img)
            axios.post('/api/image/create',data, {
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem("userToken")
                }
            }).then(res => {
                console.log(res)
                this.setState({
                    image : res.data.path
                })
                alert(res.data.message)
            }).catch(errors => {
                console.log(errors.response);
                alert(errors.response.data.errors)
            })
          }
        
    }

    onDeleteComment = ( event,id) => {
        event.preventDefault()
        axios({
              method: "DELETE",
              url: "/api/comment/delete",
              data : {
                  id : id,
              },
              headers : {
                  Authorization: "Bearer" + localStorage.getItem("userToken")
              },
          }).then(res => {
              console.log(res)
              this.setState({ 
                comments: this.state.comments.filter(res => res.id !== id ) 
                });
                // window.location.reload()
          })
      }

      onEditComment = (event,id,new_comment) => {
        event.preventDefault()
        axios({
          method : "POST",
          url: "/api/comment/edit",
          headers : {
            Authorization: "Bearer" + localStorage.getItem("userToken")
          },
          data : {
            "id" : id,
            "comment" : new_comment
          }
        }).then(res=>{
          this.setState(prevState => ({
            comments: prevState.comments.map(
              old_comment => old_comment.id === id ? { ...old_comment, comment: res.data.comment.comment } : old_comment
            )
          }))
          window.location.reload()
        })
      }

      onClickFollow=(event)=>{
        event.preventDefault()
        var method_=''
        this.state.is_follow == true ? method_="DELETE" : method_="POST" 
        axios({
          url:'/api/follow',
          method: method_,
          headers : {
            Authorization: "Bearer" + localStorage.getItem("userToken")
          },
          data : {
            "id" : this.state.owner.id,
          }
        }).then(res=>{
          this.setState({
            is_follow: ! this.state.is_follow
          })
          console.log(res)
        }).catch(err => {
          console.log(err.response)
          
        })
      }

    render(){
        const comments = this.state.comments ? this.state.comments.map( res => {
            return <Comments data={res} delete={this.onDeleteComment} edit ={this.onEditComment}/>
          }) : <></>
        const listlexicalEntries =(this.state.lexicalEntries.map((data) =>{
            return (
                // <p>{data.lexicalCategory.id}</p>
                    <button  type="button" class="btn btn-light" onClick={()=>this.onClickButtonCategory(data.lexicalCategory.id)}>{data.lexicalCategory.id}</button>
            )
        })
        )

        const renderCard=(this.state.cards !== [] ? this.state.cards.map((data)=>{
            return (
                <Cards cards={data} user_id={this.state.sets.user_id}/>
            )
        })
        :
        null
        )
        
        return(
            <>
                <Banner
                    backgroundImage="url(https://kaopiz-final.s3-ap-southeast-1.amazonaws.com/cover/bg-girl.jpg)"
                    title={this.state.sets.name}
                    subtitle={this.state.sets.intro}
                />
                <div className="container" >
                    <div className="row">
                        <div class="col-md-3" style={{height: '800px', backgroundColor:'white'}}>
                        <h3> Set </h3>
                             <div className="bt-1 bg-grey" style={{paddingTop:"10px"}}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <p>Số lượng thẻ : {this.state.sets.cards_count}</p>
                                        <p>Số bình luận : {this.state.sets.comments_count}</p>
                                        <p>Số lượng view : {this.state.sets.views} </p>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <h3> User </h3>
                            <div className="bt-1 bg-grey" style={{paddingTop:"10px"}}>
                            <div className="container">
                                <div className="row">
                                <div className="col-12 col-xl-8">
                                        <h4><a href={"/user/profile/"+ this.state.owner.id }> {this.state.owner.name} </a></h4>
                                        <p>{this.state.owner.email} </p>
                                        <p>tham gia từ : <date>{new Date(Date.parse(this.state.owner.created_at)).toLocaleDateString()}</date></p>
                                        <p>số lượng Set : {this.state.owner.sets_count}</p>
                                        <p>số lượng follow: {this.state.owner.follower_count}</p>
                                    {/* {this.state.is_follow == false ? 
                                    <>
                                        <button type="button" className="btn btn-primary" onClick={this.onClickFollow}>
                                        Follow
                                        </button>
                                    </>
                                    :
                                    <>
                                    <button type="button" className="btn btn-primary" onClick={this.onClickFollow}>
                                        UnFollow
                                    </button>
                                    </>
                                    } */}
                                     {this.state.is_follow == false ? 
                                                <>
                                                    {this.state.owner.id == localStorage.getItem('userId') ? 
                                                    <a href={'/post/'+this.state.sets.id+'/edit'}>
                                                    <button type="button" className="btn btn-primary" >
                                                    Edit
                                                    </button> 
                                                    </a> :
                                                    <button type="button" className="btn btn-primary" onClick={this.onClickFollow}>
                                                    Follow
                                                    </button>
                                                    }
                                                </>
                                                :
                                                <>
                                                <button type="button" className="btn btn-primary" onClick={this.onClickFollow}>
                                                    UnFollow
                                                </button>
                                                </>
                                                }
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    <div class="col-md-6">
                        <div style={{width:'100%',backgroundColor:'white'}}>
                            
                            {renderCard}
                            <hr>
                            </hr>
                        </div>
                        <div style={{width: '100%',backgroundColor: 'white'}}>
                        <div>
                            <h4>Create New Card</h4>
                        </div>
                            <form>
                            <div className="row">
                                <div class="col">
                                <label for="card_word">Word</label>
                                <input type="text" id="card_word" class="form-control" placeholder="Input your Word" value={this.state.word} name='word' onChange={this.onChangeWord} />
                                </div>
                                <div class="col">
                                    <label for="card_phonetic">Phonetic</label>
                                <input type="text" id="card_phonetic" class="form-control" placeholder="Input your Word" value={this.state.phonetic} name='phonetic' readOnly/>
                                    {this.state.audioSrc ? <SoundOutlined onClick={this.onClickAudio} style={{float : 'right'}}/> : null }
                                </div>
                            </div>

                            {this.state.lexicalEntries !== [] ? listlexicalEntries : null}
                            {this.state.meaning ? 
                            <>
                                <div class="form-group">
                                    <label for="meaning_card">
                                        Meaning
                                    </label>
                                    <textarea className="form-control" id="meaning_card" value={this.state.meaning} name="meaning" onChange={this.onHandleChange} placeholder='Input your description' rows="1"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="example_card">Example</label>
                                    <textarea className="form-control" id="example_card" value={this.state.example} name="example" onChange={this.onHandleChange} placeholder='Input your description' rows="1"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlFile1">Example file input</label>
                                <input type="file" class="form-control-file" id="exampleFormControlFile1" name="avatar" onChange={this.onAvatarChange}/>
                                </div>
                                <button type="button" class="btn btn-primary" style={{marginLeft : '10px'}} onClick={this.onClickCreateCard}>Create</button>
                            </>
                            :
                            null
                            }
                            </form>
                            <hr></hr>
                        </div>
                    </div>
                    
                    <div class="col-md-3">
                        <h3>Bình luận </h3>
                        <div className="bt-1 bg-grey" style={{paddingTop:"10px"}}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                    
                                    <div className="card card-white post bg-grey">
                                        <div className="post-heading">
                                            <div className="float-left image">
                                                <img src={localStorage.getItem("avatar")} className="img-circle avatar" alt=""/>
                                            </div>
                                            <div className="float-left meta">
                                                <div className="title h5">
                                                    <p>{localStorage.getItem("userName")}</p>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                        <p></p>
                                    <form onSubmit={this.submitComment}>
                                        <div class="form-group">
                                        
                                        <textarea name="comment" name="comment" value={this.state.comment} onChange={this.onCommentChange} class="form-control" rows="2"></textarea>
                                        </div>
                                        <button type="submit" class="btn btn-primary" >Send</button>
                                    </form>
                                    <p></p>
                                    {comments}
                                </div>
                                </div>
                            </div>
                            </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

export default SingleSet