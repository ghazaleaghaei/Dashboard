import { useState } from "react"

function NewProduct() {
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
        deleted: false
    })
    const [error, setError] = useState("")
    const handelChange = (e) => {
        const { name } = e.target;
        setPermission(prevState => ({
            ...prevState,
            [name]: !permission.name
        }))
        console.log(permission)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if (name.length < 0 && price < 0) setError("wrong name or price")
    }

    return (
        <form
            onSubmit={submitHandler}
            class="w-11/12 sm:w-2/3 lg:w-2/5 aspect-[3/2] mx-auto my-auto bg-gradient-to-r from-blue-300 via-cyan-200 to-sky-300 flex flex-col rounded-lg p-8 gap-2">
            <strong class="text-center text-3xl text-slate-900">
                Add New Product
            </strong>
            <span class="text-red-600 text-center">{error}</span>
            <label class="text-gray-700">
                Image
            </label>
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                class="outline-none border rounded-lg p-2 shadow-md mb-3 text-slate-900" />
            <label class="text-gray-700">
                Name
            </label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                class="outline-none border rounded-lg p-2 shadow-md mb-3 text-slate-900" />
            <label class="text-gray-700">
                Price
            </label>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                class="outline-none border rounded-lg p-2 shadow-md mb-3 text-slate-900"
            />
            <label class="text-gray-700 flex gap-2">
                <input
                    type="checkbox"
                    value={status}
                    onChange={() => setStatus(!status)}
                />
                Status
            </label>
            <div class="flex gap-2 text-gray-700 *:flex *:gap-2 flex-wrap">
                <span class="w-full">
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
                        value={permission.deleted}
                        name="deleted"
                        onChange={handelChange}
                    />
                    delete
                </label>
            </div>
            <button class="border border-2 border-fuchsia-900 text-fuchsia-900 w-fit self-center px-2 py-1 rounded-lg hover:bg-fuchsia-800 duration-300 hover:border-fuchsia-300 hover:text-fuchsia-100">
                submit
            </button>
        </form>
    )
}
export default NewProduct
