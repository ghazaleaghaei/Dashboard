import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addProduct } from "../../features/data/dataSlice"
import { useLocation, useNavigate } from "react-router-dom"
import { useFetchData } from "../Exports"

function NewProduct() {
    const location = useLocation()
    const edit = location.pathname.split("/")[2] === "edit" ? true : false
    const id = edit && Number(location.pathname.split("/")[3])
    const { data, isLoading, error: Error } = edit && useFetchData("http://localhost:5000/products", id)
    const [name, setName] = useState("")
    console.log(name)
    const [image, setImage] = useState("")
    const [price, setPrice] = useState(0)
    const [status, setStatus] = useState(false)
    const [permission, setPermission] = useState({
        pending: false,
        active: false,
        inActive: false,
        create: false,
        read: false,
        edit: false,
        delete: false
    })
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setName(data.name),
            setImage(data.image),
            setPrice(data.price),
            setStatus(data.status)

    }, [data])

    const handelChange = (e) => {
        const { name } = e.target;
        setPermission(prevState => ({
            ...prevState,
            [name]: !permission.name
        }))
    }

    const handelImageChange = (e) => {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (!name || !image || price < 0) return (null, setError("wrong name or image or price"))
        const permissions = [];
        Object.entries(permission).forEach(([key, value]) => {
            value && permissions.push(key)
        });
        dispatch(addProduct({
            image: image,
            name: name,
            price: Number(price),
            status: status,
            permissions: permissions
        }))
        navigate("/dashboard", { replace: true })
    }

    return (
        <section class="bg-fuchsia-100 w-full min-h-screen p-8">
            <form
                onSubmit={submitHandler}
                class="w-11/12 sm:w-2/3 lg:w-2/5 aspect-[3/2] mx-auto my-auto bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 flex flex-col rounded-lg p-8 gap-2">
                <strong class="text-center text-3xl text-slate-900">
                    {edit ? "Edit" : "Add New Product"}
                </strong>
                <span class="text-red-600 text-center">{error}</span>
                <label class="text-violet-950">
                    Image
                </label>
                <input
                    type="file"
                    onChange={handelImageChange}
                    class="outline-none border rounded-lg p-2 shadow-md mb-3 text-slate-900" />
                <img src={image} />
                <label class="text-violet-950">
                    Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    class="outline-none border rounded-lg p-2 shadow-md mb-3 text-slate-900" />
                <label class="text-violet-950">
                    Price
                </label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="1"
                    class="outline-none border rounded-lg p-2 shadow-md mb-3 text-slate-900"
                />
                <label class="text-violet-950 flex gap-2">
                    <input
                        type="checkbox"
                        value={status}
                        onChange={() => setStatus(!status)}
                    />
                    Status
                </label>
                <div class="flex gap-2 text-violet-950 *:flex *:gap-2 flex-wrap mt-2">
                    <span class="w-full my-2">
                        Permissions
                    </span>
                    <label>
                        <input
                            type="checkbox"
                            value={permission.pending}
                            name="pending"
                            onChange={handelChange}
                        />
                        pending
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value={permission.active}
                            name="active"
                            onChange={handelChange}
                        />
                        active
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value={permission.inActive}
                            name="inActive"
                            onChange={handelChange}
                        />
                        inActive
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value={permission.create}
                            name="create"
                            onChange={handelChange}
                        />
                        create
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value={permission.read}
                            name="read"
                            onChange={handelChange}
                        />
                        read
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value={permission.edit}
                            name="edit"
                            onChange={handelChange}
                        />
                        edit
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value={permission.delete}
                            name="delete"
                            onChange={handelChange}
                        />
                        delete
                    </label>
                </div>
                <button class="border border-2 border-fuchsia-900 text-fuchsia-900 w-fit self-center px-2 py-1 rounded-lg hover:bg-fuchsia-800 duration-300 hover:border-fuchsia-300 hover:text-fuchsia-100">
                    {edit ? "Edit" : "submit"}
                </button>
            </form>
        </section>
    )
}
export default NewProduct
