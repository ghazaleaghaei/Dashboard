import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState("ghazale@gmail.com")
    const [password, setPassword] = useState("123456")
    const [error, setError] = useState("")
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        if (email && password) login(email, password)
        !isAuthenticated && setError("wrong email or password")
    }
    useEffect(() => {
        if (isAuthenticated) navigate("/dashboard/products", { replace: true })
    }, [isAuthenticated, navigate])
    return (
        <section class="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 h-screen flex items-center">
            <form
                onSubmit={submitHandler}
                class="w-11/12 sm:w-2/3 lg:w-2/5 aspect-[3/2] mx-auto my-auto bg-gradient-to-r from-blue-300 via-cyan-200 to-sky-300 flex flex-col rounded-lg p-8 gap-2">
                <strong class="text-center text-3xl text-slate-900">
                    login
                </strong>
                <span class="text-red-600 text-center">{error}</span>
                <label class="text-gray-700">
                    email
                </label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    class="outline-none border rounded-lg p-2 shadow-md mb-3 text-slate-900" />
                <label class="text-gray-700">
                    password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    class="outline-none border rounded-lg p-2 shadow-md mb-3 text-slate-900" />
                <button class="border border-2 border-fuchsia-900 text-fuchsia-900 w-fit self-center px-2 py-1 rounded-lg hover:bg-fuchsia-800 duration-300 hover:border-fuchsia-300 hover:text-fuchsia-100">
                    submit
                </button>
            </form>
        </section>
    )
}
export default Login
