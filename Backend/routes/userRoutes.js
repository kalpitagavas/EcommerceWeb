const express=require("express");
const { login,getAllUser, register, getSingleUser, deleteUser, updateUser } = require("../controller/userController");
const router=express.Router()

router.post("/register",register);
router.post('/login',login);
router.get("/",getAllUser);
router.get("/:id",getSingleUser);
router.delete("/:id",deleteUser);
router.put("/:id",updateUser);

module.exports=router