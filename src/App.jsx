import { Route, Routes } from "react-router-dom"
import AuthProvider from "./components/context/AuthProvider"
import { Header, ProtectedRouted, Dashboard, Login } from "./components/Exports"
import { Provider } from "react-redux"
import { store } from "./features/store"

function App() {

    return (
        <>
            <Provider store={store}>
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
            </Provider>
        </>
    )
}

export default App
