import CloseIcon from "../img/close.svg";
import "./Sidebar.css";

function Sidebar(props: any) {
    const { SideBarData } = props;

    return (
        <div className={props.isOpen ? "sidebar" : "sidebar sidebarResponsive"}>
            <ul className="sidebarList">
                <li style={{ textAlign: "center" }}>                   
                    <img src={CloseIcon} onClick={props.setIsOpen} />
                </li>
                {SideBarData.map((item: {
                    title: string,
                    icon: string,
                    link: string
                }, index: number) => {
                    return (
                        <li
                            className="sidebarItem"
                            key={index}
                            id={window.location.pathname === item.link ? "active" : ""}
                            onClick={() => (window.location.pathname = item.link)}
                        >
                            <div className="icon">
                                <img src={item.icon} />
                            </div>
                            <div className="title">{item.title}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;
