import React from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'

export default class Comments extends React.Component {
    constructor(props){
        super(props)
        this.state={
            comment: '',
            show: false,
        }
    }

    onClickDelete= event =>{       
        event.preventDefault()
        this.props.delete(event, this.props.data.id)
    }

    handleClose(){
        this.setState({
            show : false,
        })
    }
    onClickEdit = event => {
        this.setState({show : true})
        
    }

    onClickSave = event => {
        event.preventDefault()
        this.props.edit(event, this.props.data.id, this.state.comment ? this.state.comment : this.props.data.comment)
        this.handleClose()
    }

    onCommentEdit = event => {
        this.setState({
          comment : event.target.value
        })
      }

    render(){
        return (
            <>
                <div className="container">
            
                    
                    <div className="row">
                                <div className="float-right meta">
                                        <div class="dropdown">
                                            <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                {this.props.data.user_id == localStorage.getItem("userId") ? 
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
                        <div className="col-12">
                            <div className="card card-white post bg-grey">
                            
                                <div className="post-heading">
                                    <div className="float-left image">
                                        <img src={this.props.data.user.avatar} className="img-circle avatar" />
                                </div>
                                 
                                        <div className="title h5">
                                            <a href={"/user/"+this.props.data.user_id}><b>{this.props.data.user.name}</b></a>
                                        </div>
                                
                                   
                                </div> 
                                <div className="post-description"> 
                                    <p>{this.props.data.comment}</p>
                                </div>
                                <hr/>
                            </div>
                        </div>
                        {/* <div className="col-1">
                            <div class="dropdown">
                                <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="float-right">
                                        ...
                                    </span>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    {this.props.data.user_id == localStorage.getItem("userId") ? 
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
                        </div> */}
                    </div>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                        <textarea name="comment" name="comment" placeholder={this.props.data.comment} onChange={this.onCommentEdit} class="form-control" rows="3"></textarea>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" id="close-button" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.onClickSave}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}