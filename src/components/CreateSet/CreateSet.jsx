import React from 'react'
import Banner from '../Banner'
import axios from 'axios'
import { ListGroup } from 'react-bootstrap'
import {
    SoundOutlined,
    LeftOutlined,
    RightOutlined,
    } from '@ant-design/icons'

class CreateSet extends React.Component {
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
        }
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
            }
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
                    
                  })
            }
        })
    }

    onClickAudio=()=>{
        if(this.state.audioSrc){
          let audio = new Audio(this.state.audioSrc)
          audio.play()
        }
      }

    onClickCreateCard = () =>{

    }

    onHandleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        const listlexicalEntries =(this.state.lexicalEntries.map((data) =>{
            return (
                // <p>{data.lexicalCategory.id}</p>
                    <button  type="button" class="btn btn-light" onClick={()=>this.onClickButtonCategory(data.lexicalCategory.id)}>{data.lexicalCategory.id}</button>
            )
        })
        )
        
        return(
            <>
                <Banner
                    backgroundImage="url(assets/img/bg-gift.jpg)"
                    title="Latest Blog Posts"
                    subtitle="Read and get updated on the latest posts"
                />
                <div className="container">
                    <div style={{backgroundColor: 'white'}}>
                        <div style={{lineHeight : '100px'}}>
                        <h1>CREATE NEW STUDY SET</h1>
                        </div>
                        <div style={{width: '60%'}}>
                            <form>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Title</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Input Your Title"/>
                            </div>
                        
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Input your Description</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" placeholder='Input your description' rows="1"></textarea>
                            </div>
                            </form>
                        </div>
                    </div>
                    
                    <hr></hr>
                    <div style={{width: '100%',backgroundColor: 'white'}}>
                        <div>
                            <hr></hr>
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
                                <button type="button" class="btn btn-primary" style={{marginLeft : '10px'}} onClick={this.onClickCreateCard}>Create</button>
                            </>
                            :
                            null
                            }
                            </form>
                            <hr></hr>
                    </div>
                    <p>
                    </p>
                    <p></p>
                </div>
            </>
        )
    }
}

export default CreateSet