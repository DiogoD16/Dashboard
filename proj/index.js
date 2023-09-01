const sql = require('mssql');
var express = require('express');
const { table } = require('console');
var app = express();


app.use(express.static(__dirname + '/public'));

//import do file dbconfig.json onde serão introduzidos os dados para a ligação à base de dados e a porta do servidor
const dbconfig = require('./dbconfig.json');
const sqlConfig = dbconfig.sqlConfig;
const port = dbconfig.port;
  
//envia uma mensagem com o valor da porta escolhida
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


//processo para fazer ping aos IPs e retornar Ping OK e Ping NOK de acordo com o resultado do ping
app.get('/ping/:ip', function (req, res) {

    var ip = req.params.ip;

    var result = false;

    var exec = require('child_process').exec;

    console.log("ping " + ip);

    exec("ping " + ip, function (err, stdout, stderr) {

        if(stdout.includes("Reply from")) result = true;

        res.send(result ? "Ping OK" : "Ping NOK");

    });

});

//processo para fazer a ligação à base de dados e obter a data que desejamos de acordo com os parametros
app.get('/table', function (req, res) {
    var a = async () => {
        try {
            const pool = await sql.connect(sqlConfig);
            const result = await sql.query('SELECT TOP 50 * FROM ErplnReports ORDER BY ErplnReportID DESC');
            res.send(result.recordset);
            
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    }
    a();
});
app.get('/', function(req, res){
    
    res.sendFile(__dirname + '/test.html');
     
});


