
import { useState } from "react";
import Header from "./components/Header"
import Sidebar from "./components/SideBar";
import { SidebarDataAdmin } from "./components/SidebarDataAdmin";
import './Dashboard.css'


const AdminLayout: React.FC = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const showMenu = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    }
    return (
        <div className="containerDashboard">
            <Header setIsOpen={showMenu} />
            <main>
                <div className="mainContainer">
                    {/* {children} */}
                </div>
            </main>
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