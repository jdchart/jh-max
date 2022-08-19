inlets = 1;
outlets = 1;
setinletassist(0, 'Ctrl In');
setoutletassist(0, 'Ctrl Out');

function create_ui(){
    //Retrieve arguments.
    var a = arrayfromargs(messagename,arguments);
    display_message = a[2];
    window_width = a[3];
    choice_array = [];
    for(i = 4; i < a.length; i = i + 2){
        choice_array.push([a[i], a[i + 1]]);
    };
    button_width = Math.floor(window_width / choice_array.length) - 1;
    window_pos_x = 200;
    window_pos_y = 200;
    object_array = [];

    //Delete old objects.
    reset();

    //Get first outlet.
    outlet_list = get_outlet_order();

    //Create comment object.
    comment_object = create_obj(1, 1, 'comment', []);
    comment_object.message('hidden', 1);
    comment_object.message('presentation', 1);
    comment_object.message('presentation_rect', [1., 1., window_width, 20.]);
    comment_object.message('patching_rect', [1., 1., window_width, 20.]);
    comment_object.message('set', display_message);
    object_array.push(comment_object);

    button_y_offset = comment_object.rect[3] + 1;
    window_y_offset = 0;
    
    //Create buttons and messages.
    for(i = 0; i < choice_array.length; i++){
        x_pos = (i * button_width) + 1 + (1 * i);
        choice_button = create_obj(x_pos, button_y_offset, 'textbutton', []);
        choice_button.message('hidden', 1);
        choice_button.message('presentation', 1)
        choice_button.message('text', choice_array[i][0]);
        choice_button.message('textoncolor', [1., 1., 1., 1.]);
        choice_button.message('presentation_rect', [x_pos, button_y_offset, button_width, 20.]);
        choice_button.message('patching_rect', [x_pos, button_y_offset, button_width, 20.]);
        object_array.push(choice_button)

        trigger = create_obj(x_pos, button_y_offset + 30, 't', ['b', 'close']);

        choice_message = create_obj(x_pos, button_y_offset + 60, 'message', []);
        choice_message.message('set', choice_array[i][1]);

        this.patcher.connect(choice_button, 0, trigger, 0);
        this.patcher.connect(trigger, 0, choice_message, 0);
        this.patcher.connect(trigger, 1, outlet_list[1], 0);
        this.patcher.connect(choice_message, 0, outlet_list[0], 0);

        window_y_offset = choice_button.rect[3];
    };

    for(i = 0; i < object_array.length; i++){
        object_array[i].message('hidden', 0);
    }

    //Set window size.
    outlet(0, 'window_size ' + String(window_pos_x) + ' ' + String(window_pos_y) + ' ' + String(window_width + 2 + window_pos_x) + ' ' + String(window_y_offset + 1 + window_pos_y));
};

function get_outlet_order(){
    //Returns a list of the outlet objects ordered by their position.
    obj = this.patcher.firstobject;
    outlet_list = [];
    for(i = 0; i < this.patcher.count; i++){
        if(obj.maxclass == 'outlet'){
            outlet_list.push(obj);
        }
        obj = obj.nextobject;
    };

    if(outlet_list.length == 0){
        return null;
    }
    else if(outlet_list.length == 0){
        return outlet_list;
    }
    else{
        outlet_list.sort(function (x, y) {
            return x.rect[0] - y.rect[0];
        });
        return outlet_list;
    };
}

function reset(){
    //Delete all objects with the varname 'jscreated'.
    to_delete = [];
    obj = this.patcher.firstobject;

    for(i = 0; i < this.patcher.count; i++){
        if(obj.varname.indexOf('jscreated') > -1){
            to_delete.push(obj);
        }

        obj = obj.nextobject;
    }

    for(i = 0; i < to_delete.length; i++){
        this.patcher.remove(to_delete[i]);
    }
};

function create_obj(x, y, object, args){
    //Create a Max object on the current patcher and return the object.
    obj = this.patcher.newdefault(x, y, object, args);
    obj.varname = 'jscreated';

    return obj;
};