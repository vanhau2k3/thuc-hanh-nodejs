const viewEngine = (app) =>{
    app.set("view engine", "ejs")
    app.set("views", "./src/view")
}

export default viewEngine