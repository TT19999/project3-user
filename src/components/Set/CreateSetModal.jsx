import React ,  { useState } from 'react'
import {Button, Modal} from 'react-bootstrap'
import axios from 'axios'

function CreateSetModal() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [intro, setIntro] = useState('');
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave =() =>{
        axios({
            method : "POST",
            url : '/api/set/create',
            data : {
                name : name,
                intro : intro,
                status : 'public'
            },
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem("userToken")
            }
        }).then(res => {
            window.location.replace('/sets/'+res.data.id)
        }).catch(err =>{
            console.log(err.response)
        })
    }

    return (
      <>
        <Button variant="light" onClick={handleShow}>
          Create Set
        </Button>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <input type="text" onChange={(event) => setName(event.target.value)} name="name" className="form-control" placeholder="name" />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={(event) => setIntro(event.target.value)} name="intro" className="form-control" placeholder="intro" />
                    </div>
                </form>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default CreateSetModal