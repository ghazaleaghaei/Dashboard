import { useEffect } from "react"
import { useAuth } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom"

function ProtectedRouted({ children }) {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) navigate("/login", { replace: true })
    }, [isAuthenticated, navigate])
    return isAuthenticated ? children : null

}
export default ProtectedRouted
