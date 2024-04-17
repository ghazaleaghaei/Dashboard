import { Link } from "react-router-dom"
import { useFetchData, Arrow, SubMenu } from "../Exports"
import { useState } from "react"

function SideBar() {
    const { data, isLoading, error } = useFetchData("http://localhost:5000/sidebar", "")
    const [toggle, setToggle] = useState({ open: false, id: 0 })
    return (
        <aside class="bg-white rounded-lg p-4 m-3 border shadow-md overflow-x-auto">
            {data.map(item =>
                <div class="w-full flex flex-col"
                    key={item.id}
                    onClick={() => setToggle({ open: !toggle.open, id: item.id })}
                >
                    <div class="flex text-gray-600 text-sm gap-4 items-center">
                        <div
                            class="[&>svg]:w-6 [&>svg]:fill-gray-600"
                            dangerouslySetInnerHTML={{ __html: item.icon }}
                        />
                        <Link to={item.link}>
                            {item.title}
                        </Link>
                        {item.children.length > 0 &&
                            <Arrow class="ms-auto w-5 aspect-square cursor-pointer" />
                        }
                    </div>
                    <SubMenu item={item} toggle={toggle} />
                </div>
            )}
        </aside>
    )
}
export default SideBar
