//http module is required to create a web client
var http = require('http')

//options are to be used by request 
var options = {
   host: 'localhost',
   port: '3000',
   path: '/index.html'  
}


//callback function is used to deal with response
var callback = function(response){
   // Continuously update stream with data
   var body = ''
   response.on('data', function(data) {
      body += data
   });
   response.on('end', function() {
      // Data received completely.
      console.log(body)
   });
}
//make a request to the server
var req = http.request(options, callback)
req.end()