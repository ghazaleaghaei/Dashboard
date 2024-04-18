import { useNavigate } from "react-router-dom"
import { HomeIcon, LogoutIcon, Menu } from "../Exports"
import { useAuth } from "../context/AuthProvider"
import { useState } from "react"

function SideBar({ onOpenHandler, open }) {
    const [isOpen, setIsOpen] = useState(0)
    const onShowHandler = (id) => {
        isOpen === id ? setIsOpen(0) : setIsOpen(id)
    }
    const { logout } = useAuth()
    const navigate = useNavigate()
    const logoutHandler = () => {
        logout()
        navigate("/", { replace: false })
    }
    return (
        <aside class="bg-white rounded-lg px-4 m-3 border shadow-md min-h-screen overflow-hidden">
            <button
                onClick={() => {
                    onOpenHandler(!open),
                        setIsOpen(0)
                }}
                class="flex items-center gap-4 mt-5 mb-8"
            >
                <HomeIcon class="w-8 aspect-square fill-black" />
                AMSol
            </button>
            <Menu
                onShowHandler={onShowHandler}
                isOpen={isOpen}
            />
            <button
                onClick={logoutHandler}
                class="text-red-700 my-5 flex gap-6 md:gap-4 items-center font-bold"
            >
                <LogoutIcon class="w-6 aspect-square fill-red-700" />
                Logout
            </button>
        </aside>
    )
}
export default SideBar
