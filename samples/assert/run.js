
var ruscript = require('../..'),
    fs = require('fs');

var text = fs.readFileSync(process.argv[2]).toString();

var context = ruscript.createContext();

context.setLocalValue('assert', function (test, msg) {
    if (test)
        return;
        
    if (msg)
        throw msg;
        
    throw "assertion failure";
});

ruscript.execute(text, context);

