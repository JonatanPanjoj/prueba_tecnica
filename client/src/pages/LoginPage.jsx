import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const { signin, errors: signinErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate()

    const onSubmit = handleSubmit((data) => {
        signin(data);

    })

    useEffect(() => {
        if (isAuthenticated) navigate("/task")
    }, [isAuthenticated])


    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">

            <div className="bg-dark-card max-w-md w-full p-10 rounded-md ">
                {
                    signinErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white rounded-md' key={i}>
                            {error}
                        </div>
                    )

                    )
                }
                <h1 className="text-2xl font-bold">Login</h1>
                <br />
                <form onSubmit={onSubmit}
                >
                    <input type="text" {...register("usuario", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-3 rounded-md my-2'
                        placeholder='Username'
                    />
                    {
                        errors.usuario && <p className='text-red-500'>Username is required</p>
                    }
                    <input type="password" {...register("password", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-3 rounded-md my-2'
                        placeholder='Password'
                    />

                    {
                        errors.password && <p className='text-red-500'>Password is required</p>
                    }

                    <div className="flex justify-center items-center py-4">
                        <button type="submit" className="bg-dark-primary hover:bg-purple-800 text-white font-bold py-2 px-4 rounded">
                            Login
                        </button>
                    </div>
                </form>
                <div className="flex justify-center items-center py-4">
                    <p className="flex gap-x-2 "> Don't have an account?
                        <Link to="/register" className="text-dark-primary ">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage