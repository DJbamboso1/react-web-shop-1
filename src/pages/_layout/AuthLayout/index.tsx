import { useSelector } from "react-redux"
import { Redirect } from "react-router"
import { StateStore } from "store"


const AuthLayout: React.FC = ({ children }) => {
    let { login, role } = useSelector((store: StateStore) => store.auth)

    if (login) {
        if (role === '0da11b44-e78d-4466-86b4-b62984b8549e') {
            return  <Redirect to="/account/info" />
        }
        if (role === 'a4acf3a7-031c-4a26-9948-d9dd98c93571') {
            console.log("Distributor")
        }
        
    }

    return (
        <section className="py-12">
            <div className="container">
                {children}
            </div>
        </section>
    )
}

export default AuthLayout