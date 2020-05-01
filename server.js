const restify = require('restify');
const errs = require('restify-errors');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

const knex = require('knex')({
  client: 'pg',
  version: '9.3',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'DDdd123',
    database : 'NODE_TESTE'
  }
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

server.get('/', function (req, res, next) {
	
	knex('rest').then((dados)=>{
		res.send(dados);
	}, next);
	
  return next();
});

server.post('/create', function(req, res, next){
	knex('rest')
		.insert(req.body)
		.then((dados)=>{
			res.send(dados);
		}, next);
});

server.get('/show/:id', function (req, res, next) {
	
	const {id} = req.params;
	
	knex('rest')
	.where('id', id)
	.first()
	.then((dados)=>{
		
		if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
		
		res.send(dados);
	}, next);
	
});