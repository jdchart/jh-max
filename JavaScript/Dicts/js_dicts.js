// -------------------------------------------------------------------------
//
// JS Dicts
//
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// Binding
// -------------------------------------------------------------------------

// Simply bind a max patcher dict to one created in js.
// Often useful on loadbangs when using unique names (#0).
// Give the js created dict object and the name of the dict in the patcher.
exports.bind_dict = function (dict_obj, name){
    dict = new Dict(name);

    return dict;
}

// -------------------------------------------------------------------------
// Multidimensional arrays
// -------------------------------------------------------------------------

// Export a 2d array from js to a max patcher dict at the given key.
// The keys will be incremental numbers as strings.
exports.export_2d_array_to_dict = function (dict_obj, key, array_2d){

    dict_obj.replace(key + "");

    for(i = 0; i < array_2d.length; i++){
        row_array = [];
        for(j = 0; j < array_2d[i].length; j++){
            this_val = array_2d[i][j];
            row_array.push(this_val);
        }
        dict_obj.replace(key + '::' + String(i), row_array);
    }
}

// Export a 3d array from js to a max patcher dict at the given key.
// The keys will be incremental numbers as strings.
exports.export_3d_array_to_dict = function (dict_obj, key, array_3d){

    dict_obj.replace(key + "");

    for(i = 0; i < array_3d.length; i++){
        row_array = [];
        for(j = 0; j < array_3d[i].length; j++){
            col_array = [];
            for(k = 0; k < array_3d[i][j].length; k++){
                col_array.push(array_3d[i][j][k]);
            }
            dict_obj.replace(key + '::' + String(i) + '::' + String(j), col_array);
        }
    }
}

// Import a 2d array from a max patcher dict at the given key and transform it into an array (without keys).
exports.load_2d_array_from_dict = function (dict_obj, key){

    return_array = [];
    
    keys = dict_obj.get(key).getkeys();

    for(i = 0; i < keys.length; i++){
        row = [];
        this_row = dict_obj.get(key + '::' + keys[i])

        for(j = 0; j < this_row.length; j++){
            this_val = this_row[j];
            row.push(this_val);
        }
        return_array.push(row);
    }

    return return_array;
}

// Import a 3d array from a max patcher dict at the given key and transform it into an array (without keys).
exports.load_3d_array_from_dict = function (dict_obj, key){

    return_array = [];
    
    row_keys = dict_obj.get(key).getkeys();

    for(i = 0; i < row_keys.length; i++){
        row = [];
        column_keys = dict_obj.get(key + '::' + String(row_keys[i])).getkeys();

        for(j = 0; j < column_keys.length; j++){
            this_column = dict_obj.get(key + '::' + String(row_keys[i]) + '::' + String(column_keys[j]));

            row.push(this_column);
        }

        return_array.push(row);
    }

    return return_array;
}