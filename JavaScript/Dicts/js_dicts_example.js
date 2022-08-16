// -------------------------------------------------------------------------
//
// JS Dicts
//
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// Setup (importing the module and seting-up some test data).
// -------------------------------------------------------------------------
var jsdi = require('js_dicts');
var ut = require('utilities');

test_dict = new Dict();
my_2d_array = [[1, 2, 3], [10, 11, 12], [100, 200, 300]];
my_3d_array = [[[1, 2, 3], [4, 5, 6]], [[10, 11, 12], [13, 14, 15]], [[100, 110, 120], [130, 140, 150]]];

// -------------------------------------------------------------------------
// Binding
// -------------------------------------------------------------------------
function bind_my_dict(dict_name){
    test_dict = jsdi.bind_dict(test_dict, dict_name);
    ut.console_log(test_dict);
}

// -------------------------------------------------------------------------
// Multidimensional arrays
// -------------------------------------------------------------------------
function js_array_to_dict_2d(){
    ut.console_log('Exporting the folloxing array:');
    ut.pretty_print(my_2d_array);
    ut.console_log('........');

    jsdi.export_2d_array_to_dict(test_dict, "exported_2d_array", my_2d_array);
    ut.console_log('Exported!');
}

function js_array_to_dict_3d(){
    ut.console_log('Exporting the folloxing array:');
    ut.pretty_print(my_3d_array);
    ut.console_log('........');

    jsdi.export_3d_array_to_dict(test_dict, "exported_3d_array", my_3d_array);
    ut.console_log('Exported!');
}

function get_2d_array_from_dict(){
    ut.console_log('Exporting the folloxing array:');
    ut.pretty_print(my_2d_array);
    ut.console_log('........');

    jsdi.export_2d_array_to_dict(test_dict, "exported_to_get_back_2d", my_2d_array);
    ut.console_log('Exported!');
    ut.console_log('Now getting it back........');

    my_loaded_array = jsdi.load_2d_array_from_dict(test_dict, "exported_to_get_back_2d");
    ut.pretty_print(my_loaded_array);
}

function get_3d_array_from_dict(){
    ut.console_log('Exporting the folloxing array:');
    ut.pretty_print(my_3d_array);
    ut.console_log('........');

    jsdi.export_3d_array_to_dict(test_dict, "exported_to_get_back_3d", my_3d_array);
    ut.console_log('Exported!');
    ut.console_log('Now getting it back........');

    my_loaded_array = jsdi.load_3d_array_from_dict(test_dict, "exported_to_get_back_3d");
    ut.pretty_print(my_loaded_array);
}