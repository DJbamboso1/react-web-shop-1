import { Link } from "react-router-dom"


interface BreadcrumbsProps {
    list: {
        title?: string,
        link: string,
        onClick?: React.MouseEventHandler<HTMLAnchorElement>,
    }[]
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ list }) => {

    let lastItem = list[list.length - 1]
    
    // console.log('LIST HERE: ', list)
    return (
        <nav className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Breadcrumb */}
                        <ol className="breadcrumb mb-0 font-size-xs text-gray-400">
                            {
                                list.slice(0, list.length - 1).map(e => <li  className="breadcrumb-item"><Link className="text-gray-400" to={e.link} onClick={e.onClick}>{e.title}</Link></li>)
                            }
                            <li className="breadcrumb-item active">
                                {lastItem.title}
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </nav>
    )
}