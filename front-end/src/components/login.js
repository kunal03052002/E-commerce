import {React,useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () =>{
    
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        let auth = localStorage.getItem("user");
        if(auth){
            navigate('/');
        }
    },[])

    const hanldeLogin = async ()=>{
        // console.login("login");
        let result = await fetch("http://localhost:2000/login",{
            method: "post",
            body: JSON.stringify({email,password}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log("llllllllll"+result);
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/");
        }
        else{
            alert("enter valid credentials");
        }
        console.log(result);
    }
    return (
        <div>
            <h1>Login</h1>
            <div><input className = "inputBox" type="text" value={email} onChange={(e) => setEmail(e.target.value)}placeholder='Enter Email'/></div>
            
            <div><input className = "inputBox" type="password" value={password} onChange={(e) => setPassword(e.target.value)}placeholder='Enter Passowrd'/></div>
            <button onClick = {hanldeLogin} class= "appButton">Login</button>
        </div>
    )
}
export default Login;