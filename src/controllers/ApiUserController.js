import express from 'express'
import userModel from '../model/UserModel'
import bcrypt from 'bcryptjs'
import JwtMiddleware from '../jsonwebtoken' 

const signIn = async (req, res) => {
  try {
    const { username, pass } = req.body
    if (!username || !pass){
      return res.status(200).json({
        message: 'Vul lòng nhập thông tin',
      })
    }

      const rows = await userModel.checkUsername(username)
      if (rows.length === 0) {
        return res.status(200).json({
            message: 'Người dùng không tồn tại',
          })
    }
    const user = rows[0]
    const hashedPassword = await bcrypt.compare(pass, user.password)

    if (!hashedPassword) {
        if (rows.length > 0) {
            return res.status(200).json({
                message: 'Mật khẩu không chính xác!',
              }).redirect('/login')
        }
    }
    const token = await JwtMiddleware.createJWT(username, user.role, user.id)
    if (token) {
      res.cookie("jwt", token, { path: "/", httpOnly: true })
    }
  

   
    return res.status(200).json({
      message: 'Success',
      username,
      token,
    })
  } catch (error) {
    console.log(error);
  }
}

const getAllUsers = async (req, res) => {
  try {
    let userData = await userModel.getAllUser()
    return res.status(200).json({
      message: 'Success',
      data: userData
    })
  } catch (error) {
    console.log(error);
  }
}

const detailUser = async (req, res) => {
  try {
    const token = req.cookies.jwt
    const user = await JwtMiddleware.verifyToken(token)
    
    let userData = await userModel.getDetailUser(user.id)
    return res.status(200).json({
      message: 'Success',
      data: userData
    })
  } catch (error) {
    console.log(error);
  }
}

const addUser = async (req, res) => {
  const { username, password, fullname, address, email, sex } = req.body
  let salt = bcrypt.genSaltSync(10)
  let hashedPassword = bcrypt.hashSync(password, salt)
  try {
    const createUser = await userModel.createUser(
      username,
      hashedPassword,
      fullname,
      address,
      email,
      sex
    )
    return res.status(201).json({
      message: 'Success',
      user: createUser
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (req, res) => {
  const id = req.params.id
  try {
    const checkUser = await userModel.deleteUser(id)
    if (checkUser.affectedRows === 0) {
      return res.status(404).json({ message: 'Người dùng không tồn tại!' })
    }
    return res.status(200).json({
      message: 'Success',
    })
  } catch (error) {
    console.error(error)
  }
}

const updateUser = async (req, res) => {
  const { username, fullname, address, email, sex } = req.body
  const id = req.params.id
  try {
    const updateUser = await userModel.updateUser(
      id,
      username,
      fullname,
      address,
      email,
      sex
    )
    if (updateUser.affectedRows === 0) {
      return res.status(404).json({ message: 'Người dùng không tồn tại!' })
    }
    return res.status(200).json({
      message: 'Success',
      user: updateUser
    })
  } catch (error) {
    console.error(error)
  }
}

const logout = async (req, res) => {
  res.clearCookie('jwt', { path: '/', httpOnly: true })
 return  res.status(200).json({
  err: 1,
  message: "ok",
  data: {} 
 })
}

export default { signIn, addUser, detailUser, deleteUser, updateUser, getAllUsers, logout }