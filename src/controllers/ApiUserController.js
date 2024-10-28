import express from 'express'
import userModel from '../model/UserModel'
import bcrypt from 'bcryptjs'

const signIn = (req, res) => {
  try {
    const { username, password } = req.body
    return res.status(200).json({
      message: 'Success',
      data: req.body
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
    const id = req.params.id;
    let userData = await userModel.getDetailUser(id)
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
  try {
    req.session.destroy(error => {
      if (error) {
        return res.status(500).json({
          message: 'Có lỗi xảy ra khi đăng xuất.'
        });
      }
      return res.status(200).json({
        message: 'Success',
      })
    });
  } catch (error) {
    console.error(error)
  }
}

export default { signIn, addUser, detailUser, deleteUser, updateUser, getAllUsers, logout }