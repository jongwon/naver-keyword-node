var http = require('http');

// http://openapi.naver.com/search?key=501765b8609584482226894c539fdaf7&target=rank&query=nexearch
var options = {
	host: 'openapi.naver.com',
	port: 80,
	path: '/search?key=501765b8609584482226894c539fdaf7&target=rank&query=nexearch'
};

http.createServer(function(req, res){
	
	http.get(options, function(response){
		var body = "";
		response.addListener('data', function(chunk){
			body += chunk;
		});
		response.addListener('end', function(){
			var keywords = [];
			var matches = body.match(/<K>(.*?)<\/K>/g);
            for(var a in matches){
	            var v = matches[a];
	            keywords.push({K:v.substring(3, v.length-4)});
            }
            
			res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
			res.end('Ext.data.JsonP.callback2'+"("+JSON.stringify(keywords)+")");
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});

}).listen(9018, function(){
	console.log('Server Running at http://soreply.com:9018/')
});
