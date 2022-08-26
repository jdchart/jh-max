function add_dict(index, to_add_name, all_entries_name){
    var to_add_dict = new Dict(to_add_name);
    var all_entries_dict = new Dict(all_entries_name);

    all_entries_dict.replace(String(index), to_add_dict);
};