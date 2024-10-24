import express from "express";
import UserModel from "../model/UserModel.js";

const getHomePage = async (req, res) => {
    let userList = await UserModel.getAllUser();
    return res.render("main", {data: {title: 'home', page: 'home', row: userList}})
}

export default getHomePage;