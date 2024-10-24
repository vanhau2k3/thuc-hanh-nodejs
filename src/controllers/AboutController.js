import express from "express"
const aboutPage = (req, res) => {
    return res.render("main", {data: {title: 'about', content:'about'}})
}
export default aboutPage
