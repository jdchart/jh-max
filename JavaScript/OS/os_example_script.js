// -------------------------------------------------------------------------
//
// OS example
//
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// Setup (importing the module).
// -------------------------------------------------------------------------
var ut = require("utilities");
var os = require("os");

// -------------------------------------------------------------------------
// Directory navigation
// -------------------------------------------------------------------------
function get_the_cwd(){
    ut.console_log(os.get_cwd(this));
}

function create_a_path(){
    ut.console_log(os.join(os.get_cwd(this), 'my_new_file.txt'));
}

function where_are_the_utilities(){
    ut.console_log(os.get_relative(os.get_cwd(this), '-', 'Utilities'));
}

// -------------------------------------------------------------------------
// JSON
// -------------------------------------------------------------------------
function retrieve_my_json_data(){
    my_data = os.load_json(os.join(os.get_cwd(this), 'data/test_json_data.json'));
    ut.pretty_print(my_data);
}

function save_my_json_data(){
    to_export = {
        "entry_1" : 0.0045,
        "entry_2" : "Hello world"
    }

    filename = os.join(os.get_cwd(this), 'data/exported_data.json');

    os.save_json(to_export, filename);

    ut.console_log('Data exported to' + filename);
}