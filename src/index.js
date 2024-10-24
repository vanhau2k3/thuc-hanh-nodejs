import http from 'http'
import date from "./date"
import getURL from "./getURL"
import dotenv from "dotenv"
http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type':
        'text/html;charset=utf-8'    });
    res.write(date() + "<br>");
    res.write(getURL.getPath(req) + "<br>");
    res.write(getURL.getParamsURL(req) + "<br>");
    res.write('Hello KTPM0121, chúc bạn thành công với nodejs');
    res.end();
}).listen(8080);