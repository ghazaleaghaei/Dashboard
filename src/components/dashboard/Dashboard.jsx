import { Outlet } from "react-router-dom"
import { SideBar } from "../Exports"
import { useState } from "react"

function Dashboard() {
    const [open, setOpen] = useState(true)
    const onOpenHandler = (e) => {
        setOpen(e)
    }
    return (
        <section class={`bg-gray-100 grid duration-300 overflow-hidden ${open ? "grid-cols-[300px_minmax(auto,_1fr)]" : "grid-cols-[80px_minmax(auto,_1fr)]"}`}>
            <SideBar
                onOpenHandler={onOpenHandler}
                open={open}
            />
            <Outlet />
        </section>
    )
}
export default Dashboard
