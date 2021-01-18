import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Banner from "../Banner";

export default class MyComponent  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      editorHtml : ""
    }
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'align': []}],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'align',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  handleChange = html => {
    this.setState({editorHtml : html})
    console.log(this.state.editorHtml)
    
  }

  buttonClick = (event) =>{
    this.setState({
      editorHtml: this.state.editorHtml + "<p>AAAA</p>"
    })
    console.log(this.state.editorHtml)
  } 


  delta = {
    ops: [{
      insert: 'Hello'
    }, {
      insert: 'World',
      attributes: { bold: true }
    }, {
      insert: {
      image: 'https://kaopiz-final.s3-ap-southeast-1.amazonaws.com/post/1608732438_eEfXqPwoys'
      },
      attributes: { width: 'auto', textAlign : 'center' }
    }]
  };
  render() {
    return (
      <>
      <Banner 
      backgroundImage="url(assets/img/bg-gift.jpg)"
      title="Latest Blog Posts"
      subtitle="Read and get updated on the latest posts"
      />
      <div className="row" style={{height: "1000px", padding: "10px"}}>
        <div className="col-6">
          <div className="text-editor" >
            <ReactQuill 
                theme="snow"
                modules={this.modules}
                formats={this.formats}
                defaultValue={this.delta}
                value={this.state.editorHtml}
                style={{height: '45rem'}}
                onChange={this.handleChange}
            >
            </ReactQuill>
          </div>
        </div>
        <div className="col-6 " >
          <div className="container" style={{height: "46px"}}>
            Bài viết
          </div>
            <div className="ql-editor">
              <div dangerouslySetInnerHTML={{ __html : this.state.editorHtml} } />
            </div>
        </div>
      </div>
      
      <button onClick={this.buttonClick}>
        click me
      </button>
      </>
    );
  }
  
}




