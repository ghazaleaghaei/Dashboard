import { useEffect, useState } from "react"
import { Arrow, EditIcon, Plus, Trash, Pagination } from "../Exports"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct, edit, getProducts, getProductsLength, toggleProduct } from "../../features/data/dataSlice"
import { useLocation, useNavigate } from "react-router-dom"

function ProductList() {
    const [id, setId] = useState(0)
    const { products, loading, error, length } = useSelector((state) => state.productsData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const page = useLocation()
    const pageNum = page.search.length == 0 ? 0 : Number(page?.search?.split("=")[1])
    useEffect(() => {
        dispatch(getProducts({ pageNum: pageNum }))
        dispatch(getProductsLength())
    }, [pageNum])
    if (loading) return <p>loading.....</p>
    if (error.length > 0) return <p>{error}</p>
    return (
        <div class="rounded-lg bg-white border shadow-md p-3 m-3 overflow-auto">
            <div class="flex gap-4">
                <button
                    class="bg-teal-50 border border-2 border-teal-500 rounded-md px-2 py-1.5 font-semibold text-sm text-teal-500 duration-300 hover:scale-95 flex items-center gap-1"
                    onClick={() => { navigate("add") }}
                >
                    <Plus class="w-5 aspect-square fill-teal-500" />
                    ADD
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
            <table class="table-auto w-full my-4">
                <thead>
                    <tr class="text-sm text-gray-800 *:font-normal *:bg-gray-100 *:rounded-sm *:px-4 *:py-1 *:font-medium *:border *:border-2 *:border-white *:text-start">
                        <th class="flex gap-2">
                            <input type="checkbox" />
                            Image
                        </th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Permissions</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm">
                    {products?.map(item =>
                        <tr
                            key={item?.id}
                            class={`*:px-4 *:py-2 border-b last:border-b-0 ${item?.id === id && "bg-sky-50"}`}
                        >
                            <td class="flex gap-2">
                                <input
                                    type="checkbox"
                                    checked={item?.id === id}
                                    onChange={() => {
                                        item?.id === id ? setId(0) : setId(item?.id)
                                    }} />
                                <img src={item?.image} alt={item?.name} class="w-10 aspect-[4/5] object-cover ms-5" />
                            </td>
                            <td>{item?.name}</td>
                            <td>{item?.price}&nbsp;Tk</td>
                            <td>
                                <button
                                    disabled={item?.id !== id}
                                    class={`w-7 aspect-[5/3] rounded-lg relative before:absolute before:start-1 before:top-0.5 before:w-1 before:aspect-square before:rounded-full before:bg-gray-600 before:p-1.5 before:duration-300 ${item?.status ? "before:translate-x-full bg-blue-300" : "before:translate-x-0 bg-gray-300"}`}
                                    onClick={() => {
                                        dispatch(toggleProduct({
                                            id,
                                            status: !item?.status
                                        }))
                                    }} />
                            </td>
                            <td>{item?.permissions.map((permission, index) =>
                                <span key={index}
                                    class={`p-1 border rounded-md mx-1 ${permission === "pending" ? "bg-yellow-100 text-yellow-500" : permission === "read" ? "bg-blue-100 text-blue-500" : permission === "active" ? "bg-sky-100 text-sky-500" : permission === "delete" ? "bg-red-100 text-red-500" : permission === "edit" ? "bg-gray-100 text-500" : "bg-green-100 text-green-500"}`}>
                                    {permission}
                                </span>
                            )}
                            </td>
                            <td >
                                <div class="flex gap-2">
                                    <button
                                        class="hover:bg-gray-200 duration-500 rounded-full w-fit aspect-square p-2"
                                        onClick={() => {
                                            navigate(`/dashboard/products/edit/${id}`);
                                            dispatch(edit({ id }))
                                        }}
                                        disabled={item?.id !== id}
                                    >
                                        <EditIcon class="w-5 aspect-square fill-gray-600" />
                                    </button>
                                    <button
                                        class="hover:bg-red-200 duration-500 rounded-full w-fit aspect-square p-2 group"
                                        onClick={() => { dispatch(deleteProduct({ id: id, length: length })) }}
                                        disabled={item?.id !== id}
                                    >
                                        <Trash class="w-5 aspect-square fill-gray-600 group-hover:fill-red-600" />
                                    </button>
                                </div>
                            </td>
                        </tr>)}
                </tbody>
            </table>
            <Pagination
                length={length}
                pageNum={pageNum}
            />
        </div>
    )
}
export default ProductList
