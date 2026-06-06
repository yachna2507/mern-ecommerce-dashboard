import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [ email , setEmail] = useState("");

    const [password, setPassword] = useState("");
    const handleLogin = async(e) => {

        e.preventDefault();
        try {
            const response = await
            api.post("/auth/login",
                {
                    email,
                    password
                }
            );
            console.log(response.data);

            localStorage.setItem("token", 
                response.data.token
            );

            alert("Login success");
            navigate("/dashboard");
        } catch (error) {
            console.log(error.response?.data || error.message);
            alert("Login Failed");
        }
        
    };
return (
    <div className="container">
        <p>
                Don't have an account?
                <a href="/register">Register</a>
            </p>
        <h1>Login</h1>
        <form
        onSubmit={handleLogin}>
            <input type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => 
                setEmail(e.target.value)
            }
            />
            <br />
            <br />
            <input type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
                setPassword(e.target.value)
            }
            />
            <br />
            <br />
            <button type="submit">Login</button>

            
        </form>
    </div>
);
}
export default Login;
