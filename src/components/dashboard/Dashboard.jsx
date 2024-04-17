import { SideBar } from "../Exports"

function Dashboard() {
    return (
        <section class="bg-gray-100 grid grid-cols-[25%_minmax(auto,_1fr)]">
            <SideBar />
            <div>main</div>
        </section>
    )
}
export default Dashboard
