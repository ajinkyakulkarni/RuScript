
var rs = require('..');

exports['empty class'] = function (test) {
    var context = rs.createContext();
    rs.execute("class Dog\n\end", context);
    
    var result = context.getLocalValue("Dog");
    
    test.ok(result);
    test.equal(result.getName(), "Dog");
    test.ok(result.$class);
    test.ok(result.$class.getInstanceMethod("new"));
}

exports['new object from empty class'] = function (test) {
    var context = rs.createContext();
    var result = rs.execute("class Dog\n\end\nDog.new", context);
    
    test.ok(result);
    test.ok(result.$class)
    test.strictEqual(result.$class, context.getValue("Dog"));
}

exports['class with def'] = function (test) {
    var context = rs.createContext();
    rs.execute("class Dog\n\def get_value\n42\end\nend", context);
    
    var result = context.getLocalValue("Dog");
    
    test.ok(result);
    test.equal(result.getName(), "Dog");
    test.ok(result.getInstanceMethod("get_value"));
}

exports['new object from class with def'] = function (test) {
    var context = rs.createContext();
    var result = rs.execute("class Dog\n\def get_value\n42\end\nend\nfido = Dog.new", context);
    
    test.ok(result);
    test.ok(result.$class)
    test.strictEqual(result.$class, context.getValue("Dog"));
    test.ok(result.$class.getInstanceMethod("get_value"));
}

exports['invoke new object method'] = function (test) {
    var context = rs.createContext();
    var result = rs.execute("class Dog\n\def get_value\n42\end\nend\nfido = Dog.new\nfido.get_value", context);
    
    test.ok(result);
    test.equal(result, 42)
}

exports['use instance variable'] = function (test) {
    var context = rs.createContext();
    var result = rs.execute("class Dog\n\def get_value\n@foo\end\ndef set_value(value)\n@foo = value\end\nend\nfido = Dog.new\nfido.set_value 42\nfido.get_value", context);
    
    test.ok(result);
    test.equal(result, 42)
}
