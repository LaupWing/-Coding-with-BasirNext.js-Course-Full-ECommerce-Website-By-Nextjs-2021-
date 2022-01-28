import { AppBar, Container, Toolbar, Typography, Link } from '@material-ui/core';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';
import useStyles from '../utils/styles';

const Layout = ({children}) => {
   const classes = useStyles()

   return (
      <div>
         <Head>
            <title>Next Amazona</title>
         </Head>
         <AppBar className={classes.navbar} position='static'>
            <Toolbar>
               <NextLink href={'/'} passHref>
                  <Link>
                     <Typography className={classes.brand}>
                        amazona
                     </Typography>
                  </Link>
               </NextLink>
               <div className={classes.grow}></div>
               <div>
                  <NextLink href={'/cart'} passHref>
                     <Link>Cart</Link>
                  </NextLink>
                  <NextLink href={'/login'} passHref>
                     <Link>Login</Link>
                  </NextLink>
               </div>
            </Toolbar>
         </AppBar>
         <Container className={classes.main}>
            {children}
         </Container>
         <footer className={classes.footer}>
            <Typography>
               All rights resevered. Next Amazona
            </Typography>
         </footer>
      </div>
   )
};

export default Layout;
