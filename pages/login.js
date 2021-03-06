import { Button, Link, List, ListItem, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import Cookies from "js-cookie";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";

export default function Login() {
   const {handleSubmit, control, formState: {errors}} = useForm()
   const router = useRouter()
   const {redirect} = router.query
   const classes = useStyles()
   const {enqueueSnackbar, closeSnackbar} = useSnackbar()
   const {dispatch, state} = useContext(Store)
   const {userInfo} = state
   useEffect(()=>{
      if(userInfo){
         router.push('/')
      }
   },[])

   const submitHandler = async ({email, password}) =>{
      closeSnackbar()
      try{
         const {data} = await axios.post('/api/users/login', {email, password})
         Cookies.set('userInfo', data)
         dispatch({type: 'USER_LOGIN', payload: data})
         router.push(redirect || '/')

      }catch(err){
         enqueueSnackbar(err.response.data ? err.response.data.message : err.message, {
            variant: 'error'
         })
      }
   }

   return (<Layout title="login">
      <form 
         className={classes.form} 
         onSubmit={handleSubmit(submitHandler)}
      >
         <Typography component={'h1'} variant='h1'>
            Login
         </Typography>
         <List>
            <ListItem>
               <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                     required: true,
                     pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                  }}
                  render={({field})=>(
                     <TextField 
                        variant="outlined" 
                        fullWidth 
                        id="email" 
                        label="Email" 
                        inputProps={{type: 'email'}}
                        error={Boolean(errors.email)}
                        helperText={errors.email ? errors.email.type === 'pattern' ? 'Email is not valid' : 'Email is required' : ''}
                        {...field}
                     >
                        
                     </TextField>
                  )}
               >

               </Controller>
            </ListItem>
            <ListItem>
               <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                     required: true,
                     minLength: 6
                  }}
                  render={({field})=>(
                     <TextField 
                        variant="outlined" 
                        fullWidth 
                        id="password" 
                        label="Password" 
                        inputProps={{type: 'password'}}
                        error={Boolean(errors.password)}
                        helperText={errors.password ? errors.password.type === 'minLength' ? 'Password length has to be more than 5' : 'Password is required' : ''}
                        {...field}
                     >

                     </TextField>
                  )}
               >

               </Controller>
            </ListItem>
            <ListItem>
               <Button variant="contained" type="submit" fullWidth color="primary">
                  Login
               </Button>
            </ListItem>
            <ListItem>
               Don't have an account? {' '} <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
                  <Link>
                     Register
                  </Link>
               </NextLink>
            </ListItem>
         </List>
      </form>
   </Layout>)
}
