const prisma = require("../Db/db.config");

const userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkDuplicate = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (checkDuplicate) {
      return res.status(400).json({
        success: false,
        message: "already user exist by this email",
      });
    }
    const newUser = await prisma.user.create({
      name,
      email,
      password,
    });
    res.send("new user created", newUser);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: error,
    });
  }
};

//user Login
const userLogin = async (req, res) => {
  try {
  } catch (error) {}
};

//User Update
const userUpdated = async (req,res) =>{
   try {
    const {name,email} =req.body;
    const id = req.params;
    const updated = await prisma.user.update({
        where:{
            id:id
        },
        data:{
            name,email
        }
    })
    res.send("new user created", newUser);
   } catch (error) {
    res.send(error)
   }
}

//userDelete
const userDelete = async (req,res) => {
    try {
        const id = req.params;
        const deleted = await prisma.user.delete({
            where:{
                id:id
            },
        })
        res.send("user deleted", deleted);
       } catch (error) {
        res.send(error)
       }
}

//allUser
const allUser = async (req,res) =>{
    try {
        const alluser = await prisma.user.findMany({
         include : {
          posts:true,
          comment : true
         },
         select:{
          comment:{
            startWith:"hello"
          }
         }
        })
        res.send(allUser)
    } catch (error) {
        
    }
}

module.exports = { userRegistration, userLogin,userUpdated,userDelete,allUser};
