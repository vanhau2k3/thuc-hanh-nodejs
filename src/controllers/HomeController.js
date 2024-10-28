import express from "express";
import bcrypt from 'bcryptjs'
import UserModel from "../model/UserModel";

const getHomePage = async (req, res) => {
    let userList = await UserModel.getAllUser();
    return res.render('main', {
        data: {
          title: 'Home Page',
          page: 'home',
          sessionData: req.session.user,
          row: userList
        },
      })
}

const getSignUpPage = async (req, res) => {
    return res.render("main", {data: {title: 'Đăng ký', page: 'signUp'}})
}

const getSignInPage = async (req, res) => {
    return res.render("main", {data: {title: 'Đăng nhập', page: 'signIn'}})
}

const createUser = async (req, res) => {
    const { username, password, fullname, address, email, sex } = req.body
    
    let salt = bcrypt.genSaltSync(10)
    let hashedPassword = bcrypt.hashSync(password, salt)
    let createUser = await UserModel.createUser(  
        username,
        hashedPassword,
        fullname,
        address,
        email,
        sex,
    );
    res.redirect("/");
}

const getUpdateUser = async (req, res) => {
    let detailUser = await UserModel.getDetailUser(req.params.id);
    return res.render("main", {data: {title: 'Cập nhật người dùng', page: 'updateUser', row: detailUser[0]}})
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    let updateUser = await UserModel.updateUser(id,userData);
    res.redirect("/");
}

const detailUser = async (req, res) => {
    let detailUser = await UserModel.getDetailUser(req.params.id);
    return res.render("main", {data: {title: 'Thông tin người dùng', page: 'detailUser', row: detailUser[0]}})
}

const deleteUser = async (req, res,) => {
    const id = req.params.id;
    let deleteUser = await UserModel.deleteUser(id);
    res.redirect("/");
    
}

const signIn = async (req, res) => {
  const { username, password } = req.body

  try {
    const rows = await UserModel.checkUsername(username)

    if (rows.length === 0) {
        return res.status(400).json({
            message: 'Người dùng không tồn tại',
          })
    }
    const user = rows[0]
    const hashedPassword = await bcrypt.compare(password, user.password)

    if (!hashedPassword) {
        if (rows.length === 0) {
            return res.status(400).json({
                message: 'Mật khẩu không chính xác!',
              }).redirect('/login')
        }
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      role: user.role,
      address: user.address,
      sex: user.sex
    }

    return res.redirect('/')
  } catch (err) {
    console.error(err)
  }
}

const logout = (req, res) => {
    req.session.destroy(error => {
      if (error) {
        return res.status(500).json({
          message: 'Có lỗi xảy ra khi đăng xuất.'
        });
      }
      return res.redirect('/sign-in');
    });
  };

export default {getHomePage, createUser, updateUser, deleteUser, detailUser, getUpdateUser, getSignInPage, getSignUpPage, signIn, logout};