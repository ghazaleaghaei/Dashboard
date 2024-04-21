import { Arrow, Trash, useFetchData } from "../Exports"

function ProductList() {
    const { data, isLoading, error } = useFetchData(" http://localhost:5000/products", "_page=2&_limit=2")
    console.log(data)
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
                <select name="resultCount" id="resultCount" class="bg-white border rounded-md px-2 py-0 outline-none text-gray-500 ms-auto">
                    <option value="100">100</option>
                    <option value="150">150</option>
                    <option value="200">200</option>
                </select>
                <input placeholder="Search" type="text" class="outline-none rounded-md placeholder:text-gray-400 px-3 border max-w-48" />
            </div>
            <table class="table-auto w-full">
                <tr class="*:font-normal *:bg-gray-100 *:rounded-md *:px-2 *:border *:text-start">
                    <th class="flex"><input type="checkbox" />Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Permissions</th>
                    <th>Action</th>
                </tr>
                {data.map(item => <tr key={item.id}>
                    <td class="w-5"><input type="checkbox" />Image</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.status}</td>
                    <td>{item.permission}</td>
                    <td>{item.action}</td>
                </tr>)}
            </table>

        </div>
    )
}
export default ProductList
