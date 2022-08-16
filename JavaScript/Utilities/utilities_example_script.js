// -------------------------------------------------------------------------
//
// General utilities example
//
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// Setup (importing the module and seting-up some test data).
// -------------------------------------------------------------------------
var ut = require('utilities');

test_obj = {
    "a_string" : "I am a string.",
    "a_list" : [5, 4, 3, 2, 1],
    "a_number" : 10,
    "another_obj" : {
        "val_1" : "Hello world!",
        "val_2" : 17,
        "yet_another_dict" : {
            "key_1" : [5, 6, 7, 8],
            "key_2" : "foo",
            "key_3" : 6
        },
        "a_string" : "This string is nested within another_obj..."
    },
    "another_string" : "I am another string",
    "a_2d_array" : [[1, 2, 3], [4, 5, 6], [10, 11, 12, 13]],
    "a_3d_array" : [[[1, 2, 3], [4, 5, 6]], [[20, 21, 22], [23, 24, 25]]]
}

// -------------------------------------------------------------------------
// Console printing
// -------------------------------------------------------------------------
function print_a_message(){
    ut.console_log('Hello world!');
}

function print_an_error(){
    ut.error_log('This is an error!');
}

function print_a_dict(){
    ut.pretty_print(test_obj);
}

// -------------------------------------------------------------------------
// Args and kwargs
// -------------------------------------------------------------------------
function getting_args(){
    args = ut.get_args(arrayfromargs(messagename,arguments));
    
    ut.console_log('Found ' + String(args.length) + ' arguments:');
    ut.console_log(args);
}

function getting_kwargs(){
    val_1 = ut.get_kwarg(arrayfromargs(messagename,arguments), 'val_1');
    val_2 = ut.get_kwarg(arrayfromargs(messagename,arguments), 'val_2');
    unknown_val = ut.get_kwarg(arrayfromargs(messagename,arguments), 'unknown_kwarg');

    ut.console_log(val_1);
    ut.console_log(val_2);
    ut.console_log(unknown_val);
}

// -------------------------------------------------------------------------
// Feature scaling
// -------------------------------------------------------------------------

function scaling(val, old_min, old_max, new_min, new_max){
    new_value = ut.scaler(val, old_min, old_max, new_min, new_max);
    ut.console_log(new_value);
}

function scaling_2d(){
    ut.console_log('ORIGINAL ARRAY:');
    ut.pretty_print(test_obj['a_2d_array']);
    
    scaled_array = ut.scaler_2d_array(test_obj['a_2d_array'], 0, 100, 0, 1);

    ut.console_log('SCALED ARRAY:');
    ut.pretty_print(scaled_array);
}

function scaling_3d(){
    ut.console_log('ORIGINAL ARRAY:');
    ut.pretty_print(test_obj['a_3d_array']);

    scaled_array = ut.scaler_3d_array(test_obj['a_3d_array'], 0, 100, 0, 1);

    ut.console_log('SCALED ARRAY:');
    ut.pretty_print(scaled_array);
}

// -------------------------------------------------------------------------
// Min-maxing
// -------------------------------------------------------------------------
function find_the_min_max(){
    ut.console_log('The array:');
    ut.console_log(test_obj["a_list"]);

    min_max = ut.get_min_max(test_obj["a_list"]);

    ut.console_log('Min: ' + String(min_max[0]));
    ut.console_log('Min index: ' + String(min_max[2]));
    ut.console_log('Max: ' + String(min_max[1]));
    ut.console_log('Max index: ' + String(min_max[3]));
}

function find_the_min_max_2d(){
    ut.console_log('The array:');
    ut.pretty_print(test_obj["a_2d_array"]);

    min_max = ut.get_min_max_2d_array(test_obj["a_2d_array"]);

    ut.console_log('Min: ' + String(min_max[0]));
    ut.console_log('Min index: ' + String(min_max[2]));
    ut.console_log('Max: ' + String(min_max[1]));
    ut.console_log('Max index: ' + String(min_max[3]));
}

function find_the_min_max_3d(){
    ut.console_log('The array:');
    ut.pretty_print(test_obj["a_3d_array"]);

    min_max = ut.get_min_max_3d_array(test_obj["a_3d_array"]);

    ut.console_log('Min: ' + String(min_max[0]));
    ut.console_log('Min index: ' + String(min_max[2]));
    ut.console_log('Max: ' + String(min_max[1]));
    ut.console_log('Max index: ' + String(min_max[3]));
}

// -------------------------------------------------------------------------
// Unique generation
// -------------------------------------------------------------------------

function unique_number(){
    number_list = [9, 6, 4, 0, 3];
    the_number = ut.get_unique_number(number_list, 10);
    
    ut.console_log('Number list:');
    ut.console_log(number_list);
    ut.console_log('Unique number:');
    ut.console_log(the_number);
}

function unique_key(){
    key_list = ["9", "6", "4", "0", "3"];
    the_key = ut.get_unique_number(key_list);
    
    ut.console_log('Number list:');
    ut.console_log(key_list);
    ut.console_log('Unique key:');
    ut.console_log(the_key);
}
// -------------------------------------------------------------------------
// Misc
// -------------------------------------------------------------------------
function get_a_type(){
    ut.console_log('test_obj is a: ' + ut.get_type(test_obj));
    ut.console_log('test_obj["a_list"] is a: ' + ut.get_type(test_obj["a_list"]));
    ut.console_log('4 is a: ' + ut.get_type(4));
    ut.console_log('"hello world" is a: ' + ut.get_type("hello world"));
}

function is_it_in_an_array(){
    the_array = [1, 4, 5, 6, 7];
    ut.console_log('The array:');
    ut.console_log(the_array);

    ut.console_log('Testing the value 4: ' + String(ut.includes(the_array, 4)));
    ut.console_log('Testing the value 10: ' + String(ut.includes(the_array, 10)));
}

function distance_between_points(x1, y1, x2, y2){
    ut.console_log('Distance between ' + String(x1) + ', ' + String(y1) + ' and ' + String(x2) + ', ' + String(y2) + ':');

    ut.console_log(ut.get_distance(x1, y1, x2, y2));
}