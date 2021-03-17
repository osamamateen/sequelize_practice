const { sequelize, User, Post } = require("./models")
const express = require("express")

const app = express()
app.use(express.json())

app.post('/users',async(req,res)=>{
    const { name, email, role } = req.body

    try{
      const user = await User.create({ name, email, role})
      return res.status(200).json(user)
    }
    catch(err){
        return res.status(500).json(err)
    }
 })

app.get('/users', async (req,res)=>{
    try{
        const users = await User.findAll()
        return res.status(200).json(users)
    }catch(err){
        return res.status(500).json(err)
    }
})

app.get('/users/:uuid', async (req,res)=>{
    const { uuid } = req.params
    try{
        const user = await User.findOne({
            where: { uuid }
        })
        return res.status(200).json(user)
    }catch(err){
        return res.status(500).json(err)
    }
})

app.post('/posts', async (req,res)=>{
    const { userUuid , body } = req.body

    try{
        const user = await User.findOne({
            where : {uuid : userUuid}
        })
        
        const post = await Post.create({
            body : body, 
            userId: user.id
        })

        return res.status(200).json(post)
    }
    catch(err){
        return res.status(500).json(err)
    }
})


app.listen(5000 , async () => {
    console.log("Server started on port 5000")
    await sequelize.authenticate()
    console.log("Database connected")
})
