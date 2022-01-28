import { useRouter } from 'next/router';
import React from 'react';
import NextLink from 'next/link'
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { Link, Grid, List, ListItem, Typography, Card, Button } from '@material-ui/core';
import useStyles from '../../utils/styles';
import Image from 'next/image';

const ProductDetail = () => {
   const router = useRouter()
   const {slug} = router.query
   const product = data.products.find(a => a.slug === slug)
   const classes = useStyles()

   if(!product){
      return <div>Product not found</div>
   }

   return (
      <Layout title={product.name} description={product.description}>
         <div className={classes.section}>
            <NextLink href={'/'} passHref>
               <Link>
               </Link>
            </NextLink>
         </div>
         <Grid container spacing={1}>
            <Grid itme md={6} xs={12}> 
               <Image 
                  src={product.image}
                  alt={product.name}
                  width={640}
                  height={640}
                  layout="responsive"
               />
            </Grid>
            <Grid item md={3} xs={12}>
               <List>
                  <ListItem>
                     <Typography component={'h1'} variant="h1">
                        {product.name}
                     </Typography>
                  </ListItem>
                  <ListItem>
                     <Typography>
                        Category: {product.category}
                     </Typography>
                  </ListItem>
                  <ListItem>
                     <Typography>
                        Brand: {product.brand}
                     </Typography>
                  </ListItem>
                  <ListItem>
                     <Typography>
                        Rating: {product.rating} starts ({product.numReviews}) reviews
                     </Typography>
                  </ListItem>
                  <ListItem> 
                     <Typography>
                        Description: {product.description}
                     </Typography>
                  </ListItem>
               </List>
            </Grid>
            <Grid item md={3} xs={12}>
               <Card>
                  <List>
                     <ListItem>
                        <Grid container>
                           <Grid item xs={6}>
                              <Typography>Price</Typography>
                           </Grid>
                           <Grid item xs={6}>
                              <Typography>${product.price}</Typography>
                           </Grid>
                        </Grid>
                     </ListItem>
                     <ListItem>
                        <Grid container>
                           <Grid item xs={6}>
                              <Typography>Status</Typography>
                           </Grid>
                           <Grid item xs={6}>
                              <Typography>${product.countInStock > 0 ? 'In stock' : 'Out of stock'}</Typography>
                           </Grid>
                        </Grid>
                     </ListItem>
                     <ListItem>
                        <Button fullWidth variant="contained" color="primary">
                           Add to Cart
                        </Button>
                     </ListItem>
                  </List>
               </Card>
            </Grid>
         </Grid>
      </Layout>
   )
}

export default ProductDetail