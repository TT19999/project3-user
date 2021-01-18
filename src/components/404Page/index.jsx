import React from 'react'
import './index.css'

class Page404 extends React.Component {
    constructor(){
        super()
    }

    render(){
        return(
            <>
            <body className="page-body" >
                <div class="page-noise"></div>
                <div class="page-overlay"></div>
                <div class="page-terminal">
                <h1>Error <span class="page-errorcode">404</span></h1>
                <p class="page-output">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
                <p class="page-output">Please try to <a href="/">go back</a> or <a href="/">return to the homepage</a>.</p>
                <p class="page-output">Good luck.</p>
            </div>
            </body>
            
            </>
        )
    }
}
export default Page404;