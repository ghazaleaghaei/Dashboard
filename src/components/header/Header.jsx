import { NavLink } from "react-router-dom"
import { DashboardIcon } from "../Exports"

function Header() {
    return (
        <header class="flex gap-3 justify-between bg-fuchsia-200 w-11/12 mx-auto my-5 rounded-lg p-5 text-teal-900 sm:text-xl shadow-lg items-center overflow-x-auto">
            <NavLink
                className="flex gap-2"
                to="/dashboard"
            >
                Dashboard
                <DashboardIcon class="w-8 aspect-square fill-fuchsia-800" />
            </NavLink>
            <div>logo</div>
            <input
                class="outline-none p-2 rounded-lg max-w-32 sm:max-w-56"
                placeholder="search..." />
        </header>
    )
}
export default Header
