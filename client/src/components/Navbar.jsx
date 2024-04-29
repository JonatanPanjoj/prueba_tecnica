import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const { isAuthenticated , logout, user } = useAuth();
    return (
        <div className="bg-dark-primary p-4">
            <nav className="flex justify-between">
                <div>
                    <Link to="/task" className="text-white text-lg font-bold">Pueba Técnica (Tareas)</Link>
                </div>
                <ul className="flex space-x-4">
                    {
                        isAuthenticated ? (
                            <>
                                <li><Link to="/task/new" className="text-white font-bold"> + Agregar Tarea</Link></li>
                                <li><Link to="/login" onClick={ ()=>{
                                    logout()
                                }} className="text-white">Logout</Link></li>
                                <li><b>{user.usuario}</b></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" className="text-white">Login</Link></li>
                                <li><Link to="/register" className="text-white">Register</Link></li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar