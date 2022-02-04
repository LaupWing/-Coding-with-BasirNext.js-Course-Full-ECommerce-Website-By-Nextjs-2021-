import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import Layout from '../components/Layout'
import Product from '../models/Product'
import data from '../utils/data'
import db from '../utils/db'

export default function Home() {
   return (
      <Layout>
         <div>
            <h1>Products</h1>
            <Grid container spacing={3}>
               {data.products.map((product)=>(
                  <Grid
                     item
                     md={4}
                     key={product.name}
                  >
                     <Card>
                        <NextLink href={`/products/${product.slug}`} passHref>
                           <CardActionArea>
                              <CardMedia 
                                 component="img"
                                 image={product.image}
                                 title={product.name}
                              >

                              </CardMedia>
                              <CardContent>
                                 <Typography>
                                    {product.name}
                                 </Typography>
                              </CardContent>
                           </CardActionArea>
                        </NextLink>
                        <CardActions>
                           <Typography>
                              ${product.price}
                           </Typography>
                           <Button size="small" color="primary">
                              Add to cart
                           </Button>
                        </CardActions>
                     </Card>
                  </Grid>
               ))}
            </Grid>
         </div>
      </Layout>
   )
}


export async function getServerSideProps(){
   await db.connect()
   const products = await Product.find({})
   await db.disconnect()

   return {
      props:{
         products
      }
   }
}