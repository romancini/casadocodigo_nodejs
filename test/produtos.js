var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function(){

    beforeEach(function (done) {
        var conn = express.infra.connectionFactory();
        conn.query('delete from livros', function(err, results){
            if(!err){
                done();
            }
        });
    })

    it('#listagem json', function(done){
        request.get('/produtos')
        .set('Accept', 'application/json')
        .expect('Content-Type',/json/)
        .expect(200, done);
    });

    it('#cadastro de novo produto com dados invalidos', function(done){
        request.post('/produtos')
        .send({titulo:'', descricao:'outra coisa'})
        .expect(400, done);
    });

    it('#cadastro de novo produto com dados validos', function(done){
        request.post('/produtos')
        .send({titulo:'titulo supertest',descricao:'outra coisa',preco:1.11})
        .expect(302, done);
    });
});