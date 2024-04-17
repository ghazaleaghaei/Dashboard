import { Link } from "react-router-dom"

function SubMenu({ item, toggle }) {
    return (
        <div
            class={`flex flex-col m-3 text-xs bg-gray-100 rounded-lg gap-3  overflow-hidden ${item.children.length > 0 && toggle.id == item.id && toggle.open && "max-h-[100vh] p-3"} max-h-0 duration-700`}
        >
            {item?.children?.map(sub =>
                <Link key={sub.id} to={sub.link}>
                    {sub.title}
                </Link>)
            }
        </div>
    )
}
export default SubMenu
