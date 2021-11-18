import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import {StateStore} from 'store'

type PrivateRouterProp = {
    auth?: string | boolean
} & any

const PrivateRouter: React.FC<PrivateRouterProp> = (props) => {
    let { login, role  } = useSelector((store: StateStore) => store.auth)
    // console.log('Role get from login: ', role)
    
    let { auth } = props
    // console.log('AUTH: ', auth)

    if (login && role) {
        if( typeof auth === 'string' ) {
            if (role === auth) {
                return <Route {...props} />
            } else {
                // return <Route path={props.path}><Redirect to="/" /></Route>
                return <Redirect to='/404' />
            }
        }
        return <Route {...props}/>
    }
    return (
        <Redirect to="/"/>
    )
}

export default PrivateRouter
