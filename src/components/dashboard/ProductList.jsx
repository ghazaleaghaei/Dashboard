import { Arrow, Trash } from "../Exports"

function ProductList() {
    return (
        <div class="rounded-lg bg-white border shadow-md p-3 m-3">
            <div class="flex gap-4">
                <button
                    class="bg-teal-50 border border-2 border-teal-500 rounded-md px-2 py-1.5 font-semibold text-sm text-teal-500 duration-300 hover:scale-95"
                >
                    &#43; &nbsp;ADD
                </button>
                <button class="bg-rose-50 border border-2 border-rose-400 rounded-md px-2 py-1.5 font-semibold text-sm text-rose-500 flex items-center gap-1 duration-300 hover:scale-95">
                    <Trash class="w-5 aspect-square fill-rose-500" />
                    Delete
                </button>
                <button
                    class="bg-sky-50 border border-2 border-sky-400 rounded-md px-2 py-1.5 font-semibold text-sm text-sky-500 flex items-center gap-1 duration-300 hover:scale-95">
                    Action
                    <Arrow class="w-5 aspect-square fill-sky-500" />
                </button>
                <input />
                <input />
            </div>

        </div>
    )
}
export default ProductList
