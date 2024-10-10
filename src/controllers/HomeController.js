import express from "express"
const getHomePage = (req, res) => {
    return res.render("home", {data: {title: 'Home page', content:'main'}})
}
export default getHomePage