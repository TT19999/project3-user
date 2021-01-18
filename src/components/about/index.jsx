import React from 'react'
import Banner from '../Banner'

class About extends React.Component {
    render(){
        return (
            <>
            <Banner 
                backgroundImage="url(assets/img/bg-gift.jpg)"
                title="PNTBLOG"
                subtitle="Login or Register to read content on blog"
            />
            <main className="main-content bg-gray">
                <div className="row">
                    <div className="col-12 col-lg-6 offset-lg-3">
                        <div>
                            <h1>This is a project in CodeStar Academy</h1>
                        </div>
                    </div>
                </div>
            </main>
            </>
            
        )
    }
}

export default About