const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database.js");
const Pergunta = require("./database/Pergunta.js");
const Resposta = require("./database/Resposta.js")

// teste de conexao c/ o banco
connection.authenticate().then( () => {
    console.log("conexao feita com sucesso!");
}).catch( (msgErro) => {
    console.log(msgErro);
});

// ejs como view egine
app.set("view engine", "ejs");
app.use(express.static("public"));

// body parsebr
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// rotas
app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order:[['id', 'DESC']] }).then( perguntas => { res.render("index", { perguntas: perguntas });});
});

app.get("/perguntas/:cond?", (req, res) => {
    var cond = req.params.cond;
    if (cond == "recentes") {
        Pergunta.findAll({ raw: true, order:[['id', 'DESC']] }).then( perguntas => { res.render("index", { perguntas: perguntas }); });
    } else if (cond == "antigas"){
        Pergunta.findAll({ raw: true, order:[['id', 'ASC']] }).then( perguntas => { res.render("index", { perguntas: perguntas }); });
    } else {
        res.redirect("/");
    }
});

app.get("/pergunta/:id/", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({ where: { id: id } }).then( pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: { pergunta_id: pergunta.id },
                order: [['id', 'DESC']]
            }).then( respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
        } else {
            res.redirect("/");
        }
    })
});

app.get("/pergunta/:id/:cond?", (req, res) => {
    var id = req.params.id;
    var cond = req.params.cond;

    if (cond == "antigas") {
        Pergunta.findOne({ where: { id: id } }).then( pergunta => {
            if (pergunta != undefined) {
                Resposta.findAll({
                    where: { pergunta_id: pergunta.id },
                    order: [['createdAt', 'ASC']]
                }).then( respostas => {
                    res.render("pergunta", {
                        pergunta: pergunta,
                        respostas: respostas
                    });
                })
            } else {
                res.redirect("/");
            }
        })
    } else {
        Pergunta.findOne({ where: { id: id } }).then( pergunta => {
            if (pergunta != undefined) {
                Resposta.findAll({
                    where: { pergunta_id: pergunta.id },
                    order: [['createdAt', 'DESC']]
                }).then( respostas => {
                    res.render("pergunta", {
                        pergunta: pergunta,
                        respostas: respostas
                    });
                })
            } else {
                res.redirect("/");
            }
        })
    }

});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then( () => {
        res.redirect("./");
    });
});

app.post("/salvarresposta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var pergunta_id = req.body.pergunta_id;
    console.log(titulo, descricao, pergunta_id);
    Resposta.create({
        titulo: titulo,
        descricao: descricao,
        pergunta_id: pergunta_id
    }).then( () => {
        res.redirect("/pergunta/"+pergunta_id);
    })
})

app.listen(8080, () => {
    console.log("app rodando...");
});


