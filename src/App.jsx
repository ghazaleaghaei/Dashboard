import { Outlet, Route, Routes } from "react-router-dom"
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
                        >
                            <Route index element={<p>dashboard</p>} />
                            <Route path="user" element={<p>user</p>} />
                            <Route path="store" element={<p>store</p>} />
                            <Route path="price" element={<p>price</p>} />
                            <Route path="vendor" element={<p>vendor</p>} />
                            <Route path="procurement" element={<p>procurement</p>} />
                            <Route path="inventory" element={<p>inventory</p>} />
                            <Route path="pos" element={<p>pos</p>} />
                            <Route path="user/:id" element={<p>title</p>} />
                            <Route path="store/:id" element={<p>title</p>} />
                            <Route path="price/:id" element={<p>title</p>} />
                            <Route path="inventory/:id" element={<p>title</p>} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </Provider>
        </>
    )
}

export default App
