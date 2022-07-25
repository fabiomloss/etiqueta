const express = require("express") 
const handlebars = require("express-handlebars") 
const port = process.env.PORT || 3000
const url = 'https://www.jadlog.com.br/embarcador/api/pedido/incluir'
const axios = require('axios');
const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOjEwMTI4NSwiZHQiOiIyMDIxMDgyNiJ9.iz3wx0P7e5tw2zpvCVlfNkcKAZZTZxmGF-aqKCNwaVA'
var n = 1
//Conf Express
const app = express();

//Conf Handlebars
app.engine('handlebars', handlebars.engine({defaultlayout: 'main'}))
app.set('view engine','handlebars')
app.use('/css',express.static('css'));
//app.use('/js',express.static('js'));
//app.use('/img',express.static('img'));

//Conf BodyParser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/', (request, response) => {
    response.send('a pagina esta funcionando')
})

app.get('/inserir', (request, response) => {
    response.render('forminserir')
})

app.post('/add', (req, res) => {

    let body = 
    {
       conteudo:        "PRODUTOS",
       pedido:          [req.body.notafiscal],
       totPeso:         req.body.peso,
       totValor:        req.body.valor,
       obs:             "INTEGRACAO API ITAMARATI",
       modalidade:      3,
       contaCorrente:   "",//"101285",
       tpColeta:        "K",
       tipoFrete:       0,
       cdUnidadeOri:    "1596",
       cdUnidadeDes:    "",
       cdPickupOri:     "",
       cdPickupDes:     "",
       nrContrato:      null,
       servico:         1,
       shipmentId:      null,
       vlColeta:        null,
       rem:{
       nome:            "ITAMARATI ONLINE",
       cnpjCpf:         "22336512001219",
       ie:              null,
       endereco:        "Rod. Governador Mario Covas",
       numero:          "2500",
       compl:           null,
       bairro:          "Jardim Limoeiro",
       cidade:          "SERRA",
       uf:              "ES",
       cep:             "29164038",
       fone:            "27 30775555",
       cel:             "27 999999999",
       email:           "ecommerce@grupoitamarati.com.br",
       contato:         "JOSE ROBERTO"
       },
       des:{
       nome:        req.body.nome,
       cnpjCpf:     req.body.cpf,
       ie:          req.body.ie,
       endereco:    req.body.rua,
       numero:      req.body.numero,
       compl:       req.body.complemento,
       bairro:      req.body.bairro,
       cidade:      req.body.cidade,
       uf:          req.body.estado,
       cep:         req.body.cep,
       fone:        req.body.fone,
       cel:         req.body.fone,
       email:       req.body.email,
       contato:     req.body.nome
       },
       dfe:[{
       cfop:        "6108",
       danfeCte:    req.body.chave,
       nrDoc:       req.body.notafiscal,
       serie:       req.body.serie,
       tpDocumento: 2,
       valor:       req.body.valor
       }],
       
       volume:Array.from(Array(Number(req.body.volumes)).keys()).map(item => ({
      
        altura:         12,
        comprimento:    58,
        identificador:  "0001",	
        largura:        18,
        peso:           req.body.peso/req.body.volumes
      
        }))
     
    }
    
    axios.post(url,body,{headers: {'Authorization': token}})
    .then(function(response){
        console.log(response.data)
        res.send(response.data)
    })
    .catch(function(error){
        if(error.response)
        {
            let {status,statusText} = error.response;
            console.log(status,statusText)
        }
        })
      
})
      
app.listen(port, () =>{
    console.log('Servidor Executando na porta '+ port)
})

