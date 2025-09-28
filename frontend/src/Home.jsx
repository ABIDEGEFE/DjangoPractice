import React from "react";
import { useNavigate } from 'react-router-dom'


export const Home = () => {
    const navigate = useNavigate()
    // const [route, setRoute ] = useState('')
    const handleNavigate = (path) => {
        navigate(path)
    }
    return (
        <div>
            <p>this is home page</p>
            <button onClick={() => handleNavigate('/deleteUser')}>Delete user</button>

        </div>
    )
}