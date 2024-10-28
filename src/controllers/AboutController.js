import express from "express";

const getAboutPage = (req, res) => {
    return res.render("main", {data: {title: 'about', page: 'about'}});
}

export default getAboutPage;