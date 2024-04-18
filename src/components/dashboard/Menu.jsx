import { Link } from "react-router-dom"
import { useFetchData, Arrow, SubMenu } from "../Exports"

function Menu({ onShowHandler, isOpen }) {
    const { data, isLoading, error } = useFetchData("http://localhost:5000/sidebar", "")
    if (isLoading) return (<p>loading...</p>)
    if (error) return (<p>{error}</p>)
    return (
        <div class="w-full min-h-[75%] h-fit">
            {data.map(item =>
                <div class="w-full flex flex-col my-4 px-2"
                    key={item.id}
                >
                    <div class="flex text-gray-600 text-sm gap-4 items-center">
                        <div
                            class="[&>svg]:w-6 [&>svg]:fill-gray-600"
                            dangerouslySetInnerHTML={{ __html: item.icon }}
                        />
                        <Link to={`/dashboard${item.link}`}>
                            {item.title}
                        </Link>
                        {item.children.length > 0 &&
                            <button
                                class="ms-auto"
                                onClick={() => onShowHandler(item.id)}
                            >
                                <Arrow class="w-5 aspect-square cursor-pointer" />
                            </button>
                        }
                    </div>
                    <SubMenu
                        item={item}
                        isOpen={isOpen}
                    />
                </div>
            )}
        </div>
    )
}
export default Menu
