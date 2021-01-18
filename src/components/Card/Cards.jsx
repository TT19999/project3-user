import React from 'react'
import {
    SoundOutlined,
    LeftOutlined,
    RightOutlined,
    } from '@ant-design/icons'
    import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'

class Cards extends React.Component {
    constructor(props){
        super(props)
        this.state={
            "set_id" : this.props.cards.id,
            "word" : this.props.cards.word,
            "lexical":this.props.cards.lexical,
            "example":this.props.cards.example,
            "image" : this.props.cards.image,
            "meaning": this.props.cards.meaning,
            "phonetic" : this.props.cards.phonetic,
            "audioSrc" : this.props.cards.audioSrc,
        }
        // console.log(this.state)
    }

    handleClose = event =>{
        this.setState({
            show : false
        })
    }

    onClickSave = event => {
        event.preventDefault()
        this.props.edit(event, this.props.data.id, this.state.comment ? this.state.comment : this.props.data.comment)
        this.handleClose()
    }

    onClickAudio=()=>{
        if(this.props.cards.audioSrc){
          let audio = new Audio(this.props.cards.audioSrc)
          audio.play()
        }
      }

      onClickEdit = event => {
        this.setState({show : true})
        
    }

    onCommentEdit = event => {
        this.setState({
          comment : event.target.value
        })
      }

      onHandleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    onClickEditCard = (event) =>{
        event.preventDefault()
        axios({
            method: "POST",
            url: "http://127.0.0.1:8000/api/card/edit",
            data : {
                "set_id" : this.props.cards.set_id,
                "card_id" : this.props.cards.id,
                "example":this.state.example ,
                "image" : this.state.image,
                "meaning": this.state.meaning,
            },
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem("userToken")
            },
        }).then(res => {
            window.location.reload()
        })
        console.log(this.state)
    }

      onClickDelete = (event) => {
        event.preventDefault()
        axios({
            method : 'DELETE',
            url : '/api/card/delete',
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem("userToken")
            },
            data: {
                set_id : this.props.cards.set_id,
                card_id : this.props.cards.id,
            }
        }).then(res=>{
            console.log(res)
            window.location.reload()
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

    render(){
        return (
            <>
                <p></p>
                <SoundOutlined onClick={this.onClickAudio} style={{float : 'left', width:'10px'}}/>
                <div class="carousel">
                <input type="checkbox" class="faux-ui-facia"/> 
                <div class="slide" slide="5" annot="Image">
                    <img src={this.props.cards.image} />
                </div>
                
                
                <input type="checkbox" class="faux-ui-facia"/> 
                <div class="slide" slide="4" annot="Example">
                    <div className="sigle-card ">
                        <div className="single-card-center">
                            <h3>{this.props.cards.example}</h3>
                        </div>
                    </div>

                </div>

                <input type="checkbox" class="faux-ui-facia"/> 
                <div class="slide" slide="3" annot="Meaning">
                    <div className="sigle-card ">
                        <div className="single-card-center">
                            <h3>{this.props.cards.meaning}</h3>
                        </div>
                    </div>
                </div>

                <input type="checkbox" class="faux-ui-facia"/>
                <div class="slide" slide="2" annot="Phonetic">
                    <div className="sigle-card ">
                        <div className="single-card-center">
                            <h1>{this.props.cards.phonetic}</h1>
                           
                        </div>
                    </div>
                </div>

                <input type="checkbox" class="faux-ui-facia"/>

                <div class="slide" slide="1" annot="WORD">
                    <div className="sigle-card ">
                        <div className="single-card-center">
                            <h1>{this.props.cards.word}</h1>
                        </div>
                    </div>
                </div>
                </div>
                <div className="float-right meta">
                        <div class="dropdown">
                            <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                {this.props.user_id == localStorage.getItem("userId") ? 
                                <>
                                    <button class="dropdown-item" type="button"  data-toggle="modal" data-target="#exampleModal" onClick={this.onClickEdit}>Sửa</button>
                                    <button class="dropdown-item" type="button" onClick={this.onClickDelete}>xóa</button>
                                </>
                                :
                                    <>
                                    <button class="dropdown-item" type="button">Báo cáo</button>
                                    </>
                                }
                            </div>
                        </div>  
                    </div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                    <form>
                            <div className="row">
                                <div class="col">
                                <label for="card_word">Word</label>
                                <input type="text" id="card_word" class="form-control" placeholder="Input your Word" value={this.props.cards.word} name='word' readOnly />
                                </div>
                                <div class="col">
                                    <label for="card_phonetic">Phonetic</label>
                                <input type="text" id="card_phonetic" class="form-control" placeholder="Input your Word" value={this.props.cards.phonetic} name='phonetic' readOnly/>
                                    {this.state.audioSrc ? <SoundOutlined onClick={this.onClickAudio} style={{float : 'right'}}/> : null }
                                </div>
                            </div>
                            
                            <div class="form-group">
                                    <label for="meaning_card">
                                        Meaning
                                    </label>
                                    <textarea className="form-control" id="meaning_card" value={this.state.meaning} placeholder={this.props.cards.meaning} name="meaning" onChange={this.onHandleChange}  rows="1"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="example_card">Example</label>
                                    <textarea className="form-control" id="example_card" value={this.state.example} placeholder={this.props.cards.example} name="example" onChange={this.onHandleChange}  rows="1"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlFile1">file input</label>
                                <input type="file" class="form-control-file" id="exampleFormControlFile1" name="avatar" onChange={this.onAvatarChange}/>
                                </div>
                                <button type="button" class="btn btn-primary" style={{marginLeft : '10px'}} onClick={this.onClickEditCard}>Save</button>
                                </form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Cards