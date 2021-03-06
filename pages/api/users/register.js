import bcryptjs from 'bcryptjs'
import nc from 'next-connect'
import User from '../../../models/User'
import { signToken } from '../../../utils/auth'
import db from '../../../utils/db'

const handler = nc()

handler.post(async (req, res)=> {
   await db.connect()
   const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password),
      isAdmin: false
   })
   const user = await newUser.save()
   await db.disconnect()
   const token = signToken(user)
   res.send({
      token,
      _id: user._id, 
      name: user.name, 
      email: users.email, 
      isAdmin: user.isAdmin
   })
})


export default handler