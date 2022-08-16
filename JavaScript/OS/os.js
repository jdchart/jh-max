// -------------------------------------------------------------------------
//
// OS
//
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// Directory navigation
// -------------------------------------------------------------------------

// Give a patcher object, and retrieve its directory as a string.
exports.get_cwd = function(box){
    f = new File(box.patcher.filepath);
    return f.foldername;
}

// Join a folder directory and a filename together.
exports.join = function(prefix, sufix){
    return prefix + '/' + sufix;
}

// Create relative paths.
// Give the starting path (must be absolute), then a series of '-'s for moving up 
// or 'folder name' for moving into a folder.
exports.get_relative = function(list){

    pathArray = arguments[0].split('/');

    for(i=1;i<arguments.length;i++){
        if(arguments[i] == '-')
            pathArray.pop();
        else
            pathArray.push(arguments[i]);
    }

    path = '';
    for(i=0;i<pathArray.length;i++){
        path = path + pathArray[i];
        if(i != pathArray.length-1)
            path = path + '/'
    }

    return path;
}

// -------------------------------------------------------------------------
// JSON
// -------------------------------------------------------------------------

// Load a json file and return the data.
exports.load_json = function(file){
    f = new File(file, 'read');
    f.open();
    jsonString = '';
    while(f.eof > f.position){
        line = f.readline();
        jsonString = jsonString + line;
    }
    f.close();

    return JSON.parse(jsonString);
}

// Save json data to file.
exports.save_json = function(data, file){
    f              = new File(file, 'write');
    jsonString     = JSON.stringify(data, null, 2);
    jsonStringList = jsonString.split('\n');

    f.open();
    while(f.eof > f.position){
        f.writeline('');
    }
    f.close();

    f.open();
    for(line = 0; line < jsonStringList.length; line++){
        f.writeline(jsonStringList[line]);
    }
    f.close();
}