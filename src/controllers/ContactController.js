import express from "express";

const getHomePage = (req, res) => {
    return res.render("main", {data: {title: 'contact', page: 'contact'}})
}

export default getHomePage;