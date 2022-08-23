var pc = require('patchctrl');

buffer_name = "#0_recording_buf";
buffer_channels = 8;
buffer_size = 600000;

buffer_obj_x = 455;
buffer_obj_y = 527;
recorder_obj_x = 670;
recorder_obj_y = 410;
inlet_y = 345;
mc_obj_x = 461;
mc_obj_y = 96;

function set_buffer_name(name){
    buffer_name = name;

    create_buffer();
};

function set_buffer_channels(channels){
    buffer_channels = channels;

    create_buffer();
};

function set_buffer_size(size){
    buffer_size = size;
}

function create_buffer(){
    // Get pass objects:
    buffer_pass_obj = this.patcher.getnamed('buffer_pass');
    recorder_pass_obj = this.patcher.getnamed('recorder_pass');

    // Delete old objects:
    pc.reset(this);

    // Create buffer object:
    buffer_obj = pc.create_obj(this, buffer_obj_x, buffer_obj_y, 'buffer~', [buffer_name, 1, buffer_channels]);
    this.patcher.connect(buffer_pass_obj, 0, buffer_obj, 0);

    // Create recording object:
    recorder_obj = pc.create_obj(this, recorder_obj_x, recorder_obj_y, 'record~', [buffer_name, buffer_channels]);
    this.patcher.connect(recorder_pass_obj, 0, recorder_obj, 0);


    multichan_inlet = pc.find_obj(this, 'MULTICHANNEL_INLET');
    mc_unpack_obj = pc.create_obj(this, mc_obj_x, mc_obj_y, 'mc.unpack~', [buffer_channels]);
    this.patcher.connect(multichan_inlet, 0, mc_unpack_obj, 0);
    
    // Create recording inlets:
    for(i = 0; i < buffer_channels; i++){
        this.patcher.connect(mc_unpack_obj, i, recorder_obj, i);
    };

    // Attach waveform to new buffer:
    display_waveform_obj = this.patcher.getnamed('display_waveform');
    display_waveform_obj.message('set', buffer_name);

    // Set the length:
    buffer_obj.message('setsize', buffer_size);
};