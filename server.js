const http = require("http");
const fs = require("fs");
const {MongoClient} = require('mongodb');
const MongoDBclient = new MongoClient('mongodb://Admin:Garazhi2019@127.0.0.1:21017/?authMechanism=DEFAULT')

const connect = async () =>{
    try {
        await MongoDBclient.connect()
        console.log("Подключиение к базе данных установленно")
        await MongoDBclient.close()
        console.log("Подключиение к базе данных закрыто")
    } catch (e) {
        console.log(e)
    }
}


  
http.createServer(function(request, response){
    console.log(`Запрошенный адрес: ${request.url}`);
    // получаем путь после слеша
    const filePath = request.url.substr(1);
    // смотрим, есть ли такой файл
    fs.access(filePath, fs.constants.R_OK, err => {
        // если произошла ошибка - отправляем статусный код 404
        if(err){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
        else{
            fs.createReadStream(filePath).pipe(response);
            console.log(filePath);
        }
    });
}).listen(3000, function(){
    console.log("Server started at 3000");
    connect()
});

