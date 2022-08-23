buffer_name = "#0_recording_buf";
buffer_channels = 8;
out_path = '';

function set_buffer_name(name){
    buffer_name = name;
};

function set_buffer_channels(channels){
    buffer_channels = channels;
};

function set_out_parth(path){
    out_path = path;
    post('Exporting to ' + out_path + '...\n');

    // Delete old buffers
    // Delete old objects:
    to_delete = [];
    obj = this.patcher.firstobject;
    for(i = 0; i < this.patcher.count; i++){
        if(obj.varname.indexOf('export_buffer') > -1 || obj.varname.indexOf('export_router') > -1){
            to_delete.push(obj);
        }

        obj = obj.nextobject;
    };

    for(i = 0; i < to_delete.length; i++){
        this.patcher.remove(to_delete[i]);
    };


    // routing object:
    router_args = [];
    for(i = 0; i < buffer_channels; i++){
        router_args.push(i);
    }
    routing_obj = create_obj(480, 925, 'route', router_args);
    routing_obj.varname = 'export_router'

    router_pass_obj = this.patcher.getnamed('router_pass');
    this.patcher.connect(router_pass_obj, 0, routing_obj, 0);
    

    outlet(0, 'start_export');
}

function exporter(){
    var a = arrayfromargs(messagename,arguments);

    this_index = a[1];

    chans_to_export = [];
	for(i = 2; i < a.length; i++){
        if(a[i] == 1){
            chans_to_export.push(i - 1);
        };
    };

    if(chans_to_export.length > 0){

        post('Creating new buffer...\n')

        var main_buffer = new Buffer(buffer_name);

        new_buf_name = buffer_name + String(Math.random());
        
        buffer_obj = create_obj(480, 950, 'buffer~', [new_buf_name, main_buffer.length(), chans_to_export.length]);
        var new_buffer = new Buffer(new_buf_name);
        buffer_obj.varname = 'export_buffer';

        routing_obj = this.patcher.getnamed('export_router');
        this.patcher.connect(routing_obj, this_index, buffer_obj, 0);

        for(i = 0; i < chans_to_export.length; i++){
            post('Copying channel ' + String(chans_to_export[i]) + '...\n')
            channel_data = main_buffer.peek(chans_to_export[i], 0, main_buffer.framecount());
            new_buffer.poke(i + 1, 0, channel_data);
        };
    };
    
    outlet(0, 'next_buf');
}

function create_obj(x, y, object, args){
    obj = this.patcher.newdefault(x, y, object, args);
    obj.varname = 'jscreated';

    return obj;
}