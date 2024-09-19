import { Navigate, Outlet } from "react-router-dom"

export function ProtectedRoute({children, isAllowed}){
    console.log(isAllowed);
    if (!isAllowed){
        return <Navigate to={"/"}></Navigate>;
    }
    console.log(isAllowed); 
    return children ? children : <Outlet />
    
}