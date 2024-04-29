import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext()

const initialState = {
    user: null,
    isAuthenticated: false
}
const fakeUser = [
    {
        name: "ghazale",
        email: "ghazale@gmail.com",
        password: "123456"
    },
    {
        name: "ghazal",
        email: "ghazal@gmail.com",
        password: "1234"
    }
]

function authReducer(state, action) {
    switch (action.type) {
        case "login": return {
            user: action.payload,
            isAuthenticated: true
        }
        case "logout": return {
            user: null,
            isAuthenticated: false
        }
        default: throw new Error("unknown action")
    }
}

export default function AuthProvider({ children }) {

    const [{ user, isAuthenticated }, dispatch] = useReducer(authReducer, initialState)

    function login(email, password) {
        fakeUser.map((item, index) => item.email === email && item.password === password ? dispatch({ type: "login", payload: fakeUser[index] }) : "")
    }

    function logout() {
        dispatch({ type: "logout" })
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    return useContext(AuthContext)
}
