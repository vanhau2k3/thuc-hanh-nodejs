import express from "express"
const aboutPage = (req, res) => {
    return res.render("home", {data: {title: 'About page', content:'about'}})
}
export default aboutPage