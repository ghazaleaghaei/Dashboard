import { ListIcon, UserIcon } from "../Exports"
import { useAuth } from "../context/AuthProvider"

function DashboardHeader() {
    const { user } = useAuth()
    return (
        <div class="border bg-white rounded-lg p-3 m-3 shadow-md flex items-center gap-2">
            <span class="bg-gray-100 rounded-full p-1.5">
                <ListIcon class="w-5 aspect-square fill-black" />
            </span>
            <span class="text-gray-700 font-semibold text-sm">Product List</span>
            <span class="ms-auto text-sm text-gray-800">{user.name}</span>
            <span class="rounded-full bg-black p-1">
                <UserIcon class="w-5 aspect-square fill-white" />
            </span>
        </div>
    )
}
export default DashboardHeader
