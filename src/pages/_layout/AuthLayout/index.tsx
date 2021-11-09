import { useSelector } from "react-redux"
import { Redirect } from "react-router"
import { StateStore } from "store"


const AuthLayout: React.FC = ({ children }) => {
    // let { login } = useSelector((store: StateStore) => store.auth)
    // if (login) {
    //     return <Redirect to="/product" />
    // } 

    return (
        <section className="py-0">
            <div>
                {children}
            </div>
        </section>
    )
}

export default AuthLayout