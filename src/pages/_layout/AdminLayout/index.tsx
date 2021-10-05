
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "store";
import { fetchAccountsAction, getAccountsAction } from "store/actions/accountAction";
import { fetchAccount } from "store/sagas.ts/account";
import Header from "./components/Header"
import Sidebar from "./components/SideBar";
import { SidebarDataAdmin } from "./components/SidebarDataAdmin";
import './Dashboard.css'


const AdminLayout: React.FC = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch()

    useEffect(() => {

        try {
            dispatch(fetchAccountsAction())
        } catch (err) { }
    }, [])

    let accounts = useSelector((state: StateStore) => state.account)

    const showMenu = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    }
    return (
        <div className="containerDashboard">
            <Header setIsOpen={showMenu} />

            <div className="mainContainer">
                {
                    accounts.acc?.data?.map((data: any) => {
                        return (
                            <div>
                                <p>{data.id}</p>
                            </div>
                        )
                    })
                }
            </div>

            <Sidebar
                className="menu"
                SideBarData={SidebarDataAdmin}
                isOpen={isOpen}
                setIsOpen={showMenu}
            />
        </div>
    )
}

export default AdminLayout