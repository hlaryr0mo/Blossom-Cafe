import React, { useState, useContext } from 'react';
import { Grid,Paper,Avatar,TextField,Button,Typography, Link as Nv} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios' 
import '../../css/login.css'
import { AuthContext } from '../Auth/AuthContext';
import coffeebg from '../../assets/coffeebg.jpg';

const Signin = () => {
    let navigate = useNavigate();

    const paperStyle={padding:20,height:'70vh',width:280,margin:"80px auto"}
    const avatarStyle={backgroundColor:'#ba808b', align: "center"}
    const btnstyle={margin:'8px 0', backgroundColor:'#ba808b'}
    
    const [msg, setMsg] = useState('')
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')

    const[errors,setErrors] = useState({
        fname:'',
        email:'',
        password:'',
        successMsg:''
    });

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const {email,password} = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value});
    };

    const signIn = () => {
        const users = { username }; //To store email in localstore and send to another page

        if(user.email === ''){
            alert('Email field is empty')
        } else if(user.password === ''){
            alert('Pass field is empty')
        }

        axios.post('http://localhost/BlossomCafeFINAL/public/api/login',user)
        .then((response) => {
            let tokenForm = response.data.token;
            let userName = response.data.name;
            localStorage.setItem("users",userName);
            localStorage.setItem('token', tokenForm);

            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/jason;charset=UTF-8',
                    'Accept':'application/json',
                    'Authorization': `Bearer ${tokenForm}`
                }
            };
        })
        .catch((err) => {
            setMsg('Error in the code');
        })
        navigate("/BlossomCafeFINAL/public/dashboard");
    }

    //Importante ponerle Key unico, en los botones y ciclos... key='key-1' o key='{id}'
    return (
        <div>
        <Grid>
        <Paper elevation={20} style={paperStyle}>
            <Grid>
                <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>Sign In</h2>
                <h3 style={{color:"green"}}>{errors.fname}</h3>
            </Grid>

            <TextField label='Email' name='email' value={email} onChange={e => onInputChange(e)} placeholder='Enter your email' required fullWidth id="email" autoFocus />
            <TextField label='Password' name='password' value={password} onChange={e => onInputChange(e)} placeholder='Enter your password' required fullWidth type="password" id="password"/>

            <Button type='submit' onClick={signIn} color='primary' variant="contained" style={btnstyle} fullWidth className='custom__button'>Sign In</Button>

            <p>Or <Link to={`/BlossomCafeFINAL/public/signup`}>Register</Link></p>
        </Paper>
    </Grid>
    </div>
    );
}

export default Signin