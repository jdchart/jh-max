// -------------------------------------------------------------------------
//
// Various JS utilities
//
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// Console printing
// -------------------------------------------------------------------------

// Post a message to the max console without having to add a bloody \n!
// Will automatically convert the argument to a string.
exports.console_log = function (msg){
    post(String(msg) + '\n');
}

// The same as console_log but as an error.
exports.error_log = function (msg){
    error(String(msg) + '\n');
}

// With pretty print, you can pass multidimensional arrays and dictionaries
// and post them to the console in a readable way.
exports.pretty_print = function (to_print, indent, level){

    indent = typeof indent !== 'undefined' ? indent : 5;
    level = typeof level !== 'undefined' ? level : 0;

    obj_type = this.get_type(to_print);

    if(obj_type == 'dict'){
        key_array = Object.keys(to_print);

        for(var i = 0, key_array_len = key_array.length; i < key_array_len; i++){

            indent_string = '';
            for(j = 0; j < indent * level; j ++){
                indent_string = indent_string + ' ';
            }

            this_key = Object.keys(to_print)[i];
            this_val = to_print[this_key];
            val_type = this.get_type(this_val);
            
            if(val_type == 'dict' || val_type == 'array'){
                this.console_log(indent_string + String(this_key) + ': ');
                this.pretty_print(this_val, indent, level + 1);
            } else{
                this.console_log(indent_string + String(this_key) + ': ' + String(this_val));
            }
        }

    } else if(obj_type == 'array'){

        for(var i = 0, array_len = to_print.length; i < array_len; i++){

            indent_string = '';
            for(j = 0; j < indent * level; j ++){
                indent_string = indent_string + ' ';
            }

            this_val = to_print[i];
            val_type = this.get_type(this_val);
            
            if(val_type == 'dict' || val_type == 'array'){
                this.console_log(indent_string + String(i) + ': ');
                this.pretty_print(this_val, indent, level + 1);
            } else{
                this.console_log(indent_string + String(i) + ': ' + String(this_val));
            }
        }

    } else{
        this.console_log(indent_string + String(to_print));
    } 
}

// -------------------------------------------------------------------------
// Args and kwargs
// -------------------------------------------------------------------------

// When making a function with an unknown number of arguments.
// Designed to work with get_kwargs, this will ignore any kwarg values given (@kwarg_name kwarg_value).
// Returns the remaining args in an array.
exports.get_args = function (args){
    final_args = [];
    
    for(i = 1; i < args.length; i++){
        if(args[i][0] != '@' && args[i - 1][0]!= '@'){
            final_args.push(args[i]);
        }
    }

    return final_args;
}

// Similar to using args, give a list of arguments, use the @ symbol to give kwargs.
// Returns the desired kwarg.
exports.get_kwarg = function (args, kwarg){
    found_kwarg = false;
    
    for(i = 1; i < args.length; i++){
        if(args[i] == '@' + String(kwarg)){
            return args[i + 1];
            found_kwarg = true;
        }
    }
    if(found_kwarg == false){
        this.error_log("Couldn't find kwarg '" + String(kwarg) + "'");
        return null;
    }
}

// -------------------------------------------------------------------------
// Feature scaling
// -------------------------------------------------------------------------

// Simple feature scaling (like the scale max object).
exports.scaler = function (val, old_min, old_max, new_min, new_max){
    return new_min + (((val - old_min) * (new_max - new_min)) / (old_max - old_min));
}

// Simple feature scaling (like the scale max object) for a 2d array.
// Will return a 2d array.
exports.scaler_2d_array = function (array_2d, old_min, old_max, new_min, new_max){
    return_array = [];

    for(i = 0; i < array_2d.length; i++){
        row_array = [];
        for(j = 0; j < array_2d[i].length; j++){
            this_val = array_2d[i][j];
            
            scaled_val = this.scaler(this_val, old_min, old_max, new_min, new_max);

            row_array.push(scaled_val);
        }
        return_array.push(row_array);
    }

    return return_array;
}

// Simple feature scaling (like the scale max object) for a 3d array.
// Will return a 3d array.
exports.scaler_3d_array = function (array_3d, old_min, old_max, new_min, new_max){
    return_array = [];

    for(i = 0; i < array_3d.length; i++){
        row_array = [];
        for(j = 0; j < array_3d[i].length; j++){
            column_array = [];
            for(k = 0; k < array_3d[i][j].length; k++){
                this_val = array_3d[i][j][k];
                scaled_val = this.scaler(this_val, old_min, old_max, new_min, new_max);
                column_array.push(scaled_val);
            }
            row_array.push(column_array);
        }
        return_array.push(row_array);
    }

    return return_array;
}

// -------------------------------------------------------------------------
// Min-maxing
// -------------------------------------------------------------------------

// Give an array and return the following array:
// [min, max, min_idx, max_idx].
exports.get_min_max = function (array){
    min_max = [];
    min_max.push(array[0]);
    min_max.push(array[0]);
    min_max.push(0);
    min_max.push(0);

    for(i = 0; i < array.length; i++){
        this_val = array[i];
        if(this_val <= min_max[0]){
            min_max[0] = this_val;
            min_max[2] = i;
        }
        if(this_val >= min_max[1]){
            min_max[1] = this_val;
            min_max[3] = i;
        }
    }

    return min_max;
}

// Give a 2d array and return the following array:
// [min, max, [min_idx_x, min_idx_y], [max_idx_x, max_idx_y]].
exports.get_min_max_2d_array = function (array_2d){
    min_max = [];
    min_max.push(array_2d[0][0]);
    min_max.push(array_2d[0][0]);
    min_max.push([0, 0]);
    min_max.push([0, 0]);

    for(i = 0; i < array_2d.length; i++){
        for(j = 0; j < array_2d[i].length; j++){
            this_val = array_2d[i][j];
            if(this_val <= min_max[0]){
                min_max[0] = this_val;
                min_max[2][0] = i;
                min_max[2][1] = j;
            }
            if(this_val >= min_max[1]){
                min_max[1] = this_val;
                min_max[3][0] = i;
                min_max[3][1] = j;
            }
        }
    }

    return min_max;
}

// Give a 3d array and return the following array:
// [min, max, [min_idx_x, min_idx_y, min_idx_z], [max_idx_x, max_idx_y, max_idx_z]].
exports.get_min_max_3d_array = function (array_2d){
    min_max = [];
    min_max.push(array_2d[0][0][0]);
    min_max.push(array_2d[0][0][0]);
    min_max.push([0, 0, 0]);
    min_max.push([0, 0, 0]);

    for(i = 0; i < array_2d.length; i++){
        for(j = 0; j < array_2d[i].length; j++){
            for(k = 0; k < array_2d[i][j].length; k++){
                this_val = array_2d[i][j][k];
                if(this_val <= min_max[0]){
                    min_max[0] = this_val;
                    min_max[2][0] = i;
                    min_max[2][1] = j;
                    min_max[2][2] = k;
                }
                if(this_val >= min_max[1]){
                    min_max[1] = this_val;
                    min_max[3][0] = i;
                    min_max[3][1] = j;
                    min_max[3][2] = k;
                }
            }  
        }
    }

    return min_max;
}

// -------------------------------------------------------------------------
// Unique generation
// -------------------------------------------------------------------------

// Supply an array of numbers, and generate a number that does not exist in it.
// You can also supply the maximum range for generation.
exports.get_unique_number = function(number_list, max_range){

    max_range = typeof max_range !== 'undefined' ? max_range : 10000;
    
    got_key = false;

    while(got_key == false){
        rand_number = Math.floor(Math.random() * max_range);
        if(number_list.indexOf(rand_number) == -1){
            got_key = true;
        }
    }

    return rand_number;
}

// The same as get_unique_number but returns the value as a string.
exports.get_unique_key = function(key_list, max_range){

    max_range = typeof max_range !== 'undefined' ? max_range : 10000;
    
    got_key = false;

    while(got_key == false){
        rand_key = String(Math.floor(Math.random() * max_range));
        if(key_list.indexOf(rand_key) == -1){
            got_key = true;
        }
    }

    return rand_key;
}

// -------------------------------------------------------------------------
// Misc
// -------------------------------------------------------------------------

// Get the type of an object as a string.
exports.get_type = function (obj){
    the_type = null;

    if(typeof obj == 'object'){
        if(Array.isArray(obj)){
            the_type = 'array';
        } else{
            the_type = 'dict';
        }
    } else{
        the_type = typeof obj;
    }

    return the_type;
}

// Return a boolean, true if element is in array, false if not.
exports.includes = function(array, val){
    if(array.indexOf(val) == -1){
        return false;
    } else{
        return true;
    }
}

// Get the euclidean distance between two points.
exports.get_distance = function (x1, y1, x2, y2){
    return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
}