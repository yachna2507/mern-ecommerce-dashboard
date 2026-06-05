import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async(e) => {
        e.preventDefault();

        try {
            const res = await axios.post("https://mern-ecommerce-dashboard-1.onrender.com/auth/register",
                {
                    email,
                    password,
                }
            );
            console.log(res.data);

            alert("Registered successful");
            navigate("/login");
        } catch (error) {
            console.log(error.response?.data || error.message);
            alert("Register failed");
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>

            <form onSubmit={handleRegister}>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>

                <p>Already have an account?
                    <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );

};
export default Register;