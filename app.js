const { sequelize, User } = require("./models")
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

app.listen(5000 , async () => {
    console.log("Server started on port 5000")
    await sequelize.authenticate()
    console.log("Database connected")
})
