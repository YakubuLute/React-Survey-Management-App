import React from 'react'
import { Link } from 'react-router-dom'
function Page404() {
    return (
        <div className='page404'>
            <div >

                <Link to="/" ><span className='material-icons icon-bl'>home</span>  Home </Link>
            </div>
            <h1 className="title">
                Page 404 | Page Not Found
            </h1>
        </div>
    )
}

export default Page404