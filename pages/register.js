import { Button, Link, List, ListItem, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import Cookies from "js-cookie";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";

export default function Register() {
   const {handleSubmit, control, formState: {errors}} = useForm()
   const router = useRouter()
   const {redirect} = router.query
   const classes = useStyles()
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const {dispatch, state} = useContext(Store)
   const {userInfo} = state
   useEffect(()=>{
      if(userInfo){
         router.push('/')
      }
   },[])

   const submitHandler = async e =>{
      e.preventDefault()
      if(password !== confirmPassword){
         alert("Passwords doest match")
         return
      }

      try{
         const {data} = await axios.post('/api/users/register', {
            email, 
            password,
            name
         })
         Cookies.set('userInfo', data)
         dispatch({type: 'USER_LOGIN', payload: data})
         router.push(redirect || '/')

      }catch(err){
         alert(err.message)
      }
   }

   return (<Layout title="login">
      <form className={classes.form} onSubmit={submitHandler}>
         <Typography component={'h1'} variant='h1'>
            Register
         </Typography>
         <List>
            <ListItem>
               <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                     required: true,
                     minLength: 2
                  }}
                  render={({field})=>(
                     <TextField 
                        variant="outlined" 
                        fullWidth 
                        id="name" 
                        label="Name" 
                        inputProps={{type: 'text'}}
                        error={Boolean(errors.name)}
                        helperText={errors.name ? errors.email.type === 'minLength' ? 'Name is to short' : 'Name is required' : ''}
                        {...field}
                     >
                        
                     </TextField>
                  )}
               >

               </Controller>
            </ListItem>
            <ListItem>
               <TextField 
                  variant="outlined" 
                  fullWidth 
                  id="email" 
                  label="Email" 
                  inputProps={{type: 'email'}}
                  onChange={e=>setEmail(e.target.value)}
                  >
                  
               </TextField>
            </ListItem>
            <ListItem>
               <TextField 
                  variant="outlined" 
                  fullWidth 
                  id="password" 
                  label="Password" 
                  inputProps={{type: 'password'}}
                  onChange={e=>setPassword(e.target.value)}
               >

               </TextField>
            </ListItem>
            <ListItem>
               <TextField 
                  variant="outlined" 
                  fullWidth 
                  id="confirmPassword" 
                  label="Confirm Password" 
                  inputProps={{type: 'password'}}
                  onChange={e=>setConfirmPassword(e.target.value)}
               >

               </TextField>
            </ListItem>
            <ListItem>
               <Button variant="contained" type="submit" fullWidth color="primary">
                  Register
               </Button>
            </ListItem>
            <ListItem>
               Already have an account? {' '} <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
                  <Link>
                     Login
                  </Link>
               </NextLink>
            </ListItem>
         </List>
      </form>
   </Layout>)
}
