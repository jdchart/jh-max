exports.reset = function(pat, term){
    // Delete any objects in a patch that were created by JS
    
    // Optional args:
    term = term || 'jscreated';

    to_delete = [];
    obj = pat.patcher.firstobject;

    for(i = 0; i < pat.patcher.count; i++){
        if(obj.varname.indexOf(term) > -1){
            to_delete.push(obj);
        };

        obj = obj.nextobject;
    };

    for(i = 0; i < to_delete.length; i++){
        pat.patcher.remove(to_delete[i]);
    };
};

exports.create_obj = function(pat, x, y, object, args, term){
    // Create and return a Max object in a patcher:
    
    // Optional args:
    term = term || 'jscreated';

    obj = pat.patcher.newdefault(x, y, object, args);
    obj.varname = term;

    return obj;
};

exports.find_obj = function(pat, scripting_name){
    // Find an object in a patcher by it's scripting name:

    obj = pat.patcher.firstobject;

    for(i = 0; i < pat.patcher.count; i++){
        if(obj.varname == scripting_name){
            return obj;
        };

        obj = obj.nextobject;
    };
};

exports.get_box_info = function(obj){
    // Return the dimensions of the JS object:
    
    x = obj.box.rect[0];
    y = obj.box.rect[1];
    w = obj.box.rect[2] - obj.box.rect[0];
    h = obj.box.rect[3] - obj.box.rect[1];

    return [x, y, w, h];
};