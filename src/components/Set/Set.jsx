import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class Set extends React.Component {
    constructor(props){
        super(props)
    }

    onClickDelete = (event) =>{
      event.preventDefault()
      axios({
        method: "DELETE",
        url: "/api/set/delete",
        headers : {
            Authorization: "Bearer" + localStorage.getItem("userToken")
        },
        data : {
          id : this.props.sets.id
        }
      }).then(res => {
        window.location.reload()
    })
    }

    render(){
      const category = this.props.sets.categories ? this.props.sets.categories.map(res => {
        return <div className="tag">{res.name + "  " + res.sets_count}</div>
          }) : <></>
        return (
          <div className="blog-card-grid-space">
          <a className="blogg-card" href={"/sets/" + this.props.sets.id}>
            <div>
              <h1>{this.props.sets.name}</h1>
              <p>{this.props.sets.intro}</p>
              <p>By {this.props.sets.user.name}</p>
              <div className="date">{new Date(Date.parse(this.props.sets.created_at)).toLocaleDateString()}</div>
              <div className="more">
                <div class="dropdown">
                  <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  </button>
                  <div class="dropdown-menu">
                      {this.props.sets.user_id == localStorage.getItem("userId") ? 
                        <>
                          <a href={'/sets/'+this.props.sets.id+'/edit'}>
                          <button class="dropdown-item" type="button"  data-toggle="modal" data-target="#exampleModal">
                            Sửa
                          </button>
                          </a>
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
              <div className="tags">
                {category} 
              </div>
            </div>
          </a>
        </div>
  );
    }
}
  

export default Set;