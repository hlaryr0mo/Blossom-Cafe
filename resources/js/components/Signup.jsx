import React from 'react'
import { Grid,Paper,Avatar,TextField,Button,Typography} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios' 

const Signup = () => {
    const paperStyle={padding:20,height:'70vh',width:280,margin:"80px auto"}
    const avatarStyle={backgroundColor:'#ba808b', align: "center"}
    const btnstyle={margin:'8px 0', backgroundColor:'#ba808b'}

    let navigate = useNavigate();

    const[errors,setErrors] = useState({
        name:'',
        email:'',
        password:'',
        successMsg:''
    });

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const {name,email,password} = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value});
    };

    async function signup(){
        await axios.post("http://localhost/BlossomCafeFINAL/public/api/register",user)
        .then(function (response){
            setErrors({});
        })
        .catch(function (err){
            alert(err.response.data.error.name)
            console.log(err.response.data);
            setErrors({name:err.response.data.error.name});
        });

        navigate("/BlossomCafeFINAL/public/signin");
    }

  return (
    <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid>
                <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>Sign Up</h2>
                <h3 style={{color:"red"}}>{errors.fname}</h3>
            </Grid>

            <TextField label='Name' name='name' value={name} onChange={e => onInputChange(e)} placeholder='Enter your name' required fullWidth id="name" autoFocus/>
            <TextField label='Email' name='email' value={email} onChange={e => onInputChange(e)} placeholder='Enter your email' required fullWidth id="email" />
            <TextField label='Password' name='password' value={password} onChange={e => onInputChange(e)} placeholder='Enter your password' required fullWidth type="password" id="password"/>

            <Button type='submit' onClick={signup} color='primary' variant="contained" style={btnstyle} fullWidth>Sign Up</Button>

            <p>Or go back to<Link to={`/BlossomCafeFINAL/public/signin`}> Login</Link></p>
        </Paper>
    </Grid>
  )
}

export default Signup