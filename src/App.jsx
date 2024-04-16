import { Route, Routes } from "react-router-dom"
import AuthProvider from "./components/context/AuthProvider"
import { Header, ProtectedRouted, Dashboard, Login } from "./components/Exports"

function App() {

    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Header />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={
                        <ProtectedRouted>
                            <Dashboard />
                        </ProtectedRouted>}
                    />
                </Routes>
            </AuthProvider>
        </>
    )
}

export default App
