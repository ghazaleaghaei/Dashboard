import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProduct, editProduct } from "../../features/data/dataSlice"
import { useLocation, useNavigate } from "react-router-dom"

function NewProduct() {
    const location = useLocation()
    const edit = location.pathname.split("/")[3] === "edit" ? true : false
    const id = edit && Number(location.pathname.split("/")[4])
    const { loading, editedProduct, length } = useSelector((state) => state.productsData)
    const [name, setName] = useState("")
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

    edit && useEffect(() => {
        setName(editedProduct[0].name),
            setImage(editedProduct[0].image),
            setPrice(editedProduct[0].price),
            setStatus(editedProduct[0].status),
            editedProduct[0]?.permissions?.map(item => {
                setPermission(prevState => ({
                    ...prevState,
                    [item]: true
                }))
            })

    }, [editedProduct[0]])

    const handelChange = (e) => {
        const { name } = e.target;
        setPermission({
            ...permission,
            [name]: !permission[name]
        })
    }

    const handelImageChange = (e) => {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (!name || !image || price < 0) return (null, setError("wrong name or image or price"));
        const permissions = [];
        Object.entries(permission).forEach(([key, value]) => {
            value && permissions.push(key)
        });
        dispatch(edit ? editProduct({
            id: id,
            image: image,
            name: name,
            price: Number(price),
            status: status,
            permissions: permissions
        }) : addProduct({
            image: image,
            name: name,
            price: Number(price),
            status: status,
            permissions: permissions,
            length: length,
        }))
        edit ? navigate(-1) : navigate(`/dashboard/products?_page=${Math.ceil(length / 6)}`, { replace: true })
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
                        checked={status}
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
                            name="pending"
                            onChange={handelChange}
                            checked={permission.pending}
                        />
                        pending
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="active"
                            onChange={handelChange}
                            checked={permission.active}
                        />
                        active
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="inActive"
                            onChange={handelChange}
                            checked={permission.inActive}
                        />
                        inActive
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="create"
                            onChange={handelChange}
                            checked={permission.create}
                        />
                        create
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="read"
                            onChange={handelChange}
                            checked={permission.read}
                        />
                        read
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="edit"
                            onChange={handelChange}
                            checked={permission.edit}
                        />
                        edit
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="delete"
                            onChange={handelChange}
                            checked={permission.delete}
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
