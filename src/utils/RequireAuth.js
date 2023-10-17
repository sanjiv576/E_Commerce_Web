import { Navigate } from "react-router-dom"
import { useAuth } from "./authContext"

export const RequireAuth = ({ children }) => {
    const auth = useAuth()
    if (!auth.email) {
        return <Navigate to={'/login'} />
    }

    return children
}