import { Link } from "react-router-dom"

function SubMenu({ item, isOpen }) {
    return (
        <div
            class={`flex flex-col text-xs bg-gray-100 rounded-lg gap-3 overflow-hidden ${item.children.length > 0 && isOpen === item.id && "max-h-[100vh] p-3 m-3"} max-h-0 duration-700`}
        >
            {item?.children?.map(sub =>
                <Link key={sub.id} to={`/dashboard${item.link}${sub.link}`}>
                    {sub.title}
                </Link>)
            }
        </div>
    )
}
export default SubMenu
