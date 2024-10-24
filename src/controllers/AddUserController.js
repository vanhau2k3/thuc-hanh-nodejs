import express from "express";
import UserModel from "../model/UserModel";
import { render } from "ejs";

const getAddUserPage = async (req, res) => {
    return res.render("main", {data: {title: 'add', page: 'addUser'}})
}

const createUser = async (req, res) => {
    const userData = req.body;
    let createUser = await UserModel.createUser(userData);
    res.redirect("/");
}
const detailUser = async (req, res) =>{
    if (isAuthentication(req, res) == true){
        let user = req.params.username
        let dataUser = await UserModel.detailUser(user)
        res.render("main", {data: {title: 'Detail User', page: 'detailUser', rows: dataUser}})
    }
}
// const editUser = async (req, res) =>{
//     let user = req.params.username
//     let dataUser = await UserModel.eidtUser(user)
//     res.render("main", {data: {title: 'Edit User', page: 'editlUser', rows: dataUser}})

// }
// const updateUser = async (req, res) =>{
//     console.log(req.body)
//     let 
//     let user = req.params.username
//     let dataUser = await UserModel.eidtUser(user)

// }
export default {getAddUserPage, createUser, detailUser, editUser};