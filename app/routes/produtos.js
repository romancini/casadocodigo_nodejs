module.exports = function(app){
    app.get('/produtos', function(req, res, next) {    
        var connection = app.infra.connectionFactory(); 
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        
        produtosDAO.lista(function (err, results) {
            if(err){
                return next(err);
            }
            res.format({
                html: function(){
                    res.render('produtos/lista', {lista:results});
                },
                json: function(){
                    res.json(results);
                }
            });            
        });

        connection.end();
    });

    app.get('/produtos/form', function (req, res){
        res.render('produtos/form', {erros:{}, produto:{}});
    });

    app.post('/produtos', function(req, res){

        var produto = req.body;

        req.assert('titulo', 'Titulo é obrigatório').notEmpty();
        req.assert('preco','Formato inválido').isFloat();
        req.assert('descricao','Descricao obrigatória').notEmpty();
        var validatorErros = req.validationErrors();
        if (validatorErros){
            res.format({
                html: function(){
                    res.status(400).render('produtos/form', {erros: validatorErros, produto:produto});
                },
                json: function(){
                    res.status(400).json(validatorErros);
                }
            });
            return;
        }
        
        var connection = app.infra.connectionFactory(); 
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto, function(err, results){
            if(err){
                return next(err);
            }
            res.redirect('/produtos');
        });
    });
}

