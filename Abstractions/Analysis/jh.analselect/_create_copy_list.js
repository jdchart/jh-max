outlets = 2;
inlets = 1;

setinletassist(0, 'Ctrl In');
setoutletassist(0, 'Samples to Copy');
setoutletassist(1, 'Selection Indexes');

var ut = require('utilities');

this.feat_list = [
    'mfcc',
    'centroid',
    'spread',
    'skewness',
    'kurtosis',
    'rolloff',
    'flatness',
    'crest',
    'pitch',
    'pitch_confidence',
    'loudness',
    'true_peak',
    'length_samps',
    'length_ms',
    'melbands',
    'chroma',
    'transients',
    'onsets',
    'novelties_spectrum',
    'novelties_mfcc',
    'novelties_chroma',
    'novelties_pitch',
    'novelties_loudness',
    'mfcc_512',
    'centroid_512',
    'spread_512',
    'skewness_512',
    'kurtosis_512',
    'rolloff_512',
    'flatness_512',
    'crest_512',
    'pitch_512',
    'pitch_confidence_512',
    'melbands_512',
    'chroma_512',
    'onsets_512',
    'novelties_spectrum_512',
    'novelties_mfcc_512',
    'novelties_chroma_512',
    'novelties_pitch_512',
    'novelties_loudness_512',
    'mfcc_4096',
    'centroid_4096',
    'spread_4096',
    'skewness_4096',
    'kurtosis_4096',
    'rolloff_4096',
    'flatness_4096',
    'crest_4096',
    'pitch_4096',
    'pitch_confidence_4096',
    'melbands_4096',
    'chroma_4096',
    'onsets_4096',
    'novelties_spectrum_4096',
    'novelties_mfcc_4096',
    'novelties_chroma_4096',
    'novelties_pitch_4096',
    'novelties_loudness_4096'
];

this.stat_list = [
    'mean',
    'std',
    'skew',
    'kurt',
    'low',
    'mid',
    'high',
    'mean_der',
    'std_der',
    'skew_der',
    'kurt_der',
    'low_der',
    'mid_der',
    'high_der'
];

this.ranged_processes = [
    'mfcc',
    'mfcc_512',
    'mfcc_4096',
    'melbands',
    'melbands_512',
    'melbands_4096',
    'chroma',
    'chroma_512',
    'chroma_4096',
];

this.single_processes = [
    'length_samps',
    'length_ms',
    'transients',
    'onsets',
    'novelties_spectrum',
    'novelties_mfcc',
    'novelties_chroma',
    'novelties_pitch',
    'novelties_loudness',
    'onsets_512',
    'novelties_spectrum_512',
    'novelties_mfcc_512',
    'novelties_chroma_512',
    'novelties_pitch_512',
    'novelties_loudness_512',
    'onsets_4096',
    'novelties_spectrum_4096',
    'novelties_mfcc_4096',
    'novelties_chroma_4096',
    'novelties_pitch_4096',
    'novelties_loudness_4096'
];

this.start_map = {
    'mfcc' : [0, 13],
    'centroid': [182, 0, 7],
    'spread': [182, 1, 7],
    'skewness': [182, 2, 7],
    'kurtosis': [182, 3, 7],
    'rolloff': [182, 4, 7],
    'flatness': [182, 5, 7],
    'crest': [182, 6, 7],
    'pitch': [280, 0, 2],
    'pitch_confidence': [280, 1, 2],
    'loudness': [308, 0, 2],
    'true_peak': [308, 1, 2],
    'length_samps': 336,
    'length_ms': 337,
    'melbands': [338, 40],
    'chroma': [898, 12],
    'transients': 1066,
    'onsets': 1067,
    'novelties_spectrum': 1068,
    'novelties_mfcc': 1069,
    'novelties_chroma': 1070,
    'novelties_pitch': 1071,
    'novelties_loudness': 1072,
    'mfcc_512': [1073, 13],
    'centroid_512': [1255, 0, 7],
    'spread_512': [1255, 1, 7],
    'skewness_512': [1255, 2, 7],
    'kurtosis_512': [1255, 3, 7],
    'rolloff_512': [1255, 4, 7],
    'flatness_512': [1255, 5, 7],
    'crest_512': [1255, 6, 7],
    'pitch_512': [1353, 0, 2],
    'pitch_confidence_512': [1353, 0, 2],
    'melbands_512': [1381, 40],
    'chroma_512': [1941, 12],
    'onsets_512': 2109,
    'novelties_spectrum_512': 2110,
    'novelties_mfcc_512': 2111,
    'novelties_chroma_512': 2112,
    'novelties_pitch_512': 2113,
    'novelties_loudness_512': 2114,
    'mfcc_4096': [2115, 13],
    'centroid_4096': [2297, 0, 7],
    'spread_4096': [2297, 1, 7],
    'skewness_4096': [2297, 2, 7],
    'kurtosis_4096': [2297, 3, 7],
    'rolloff_4096': [2297, 4, 7],
    'flatness_4096': [2297, 5, 7],
    'crest_4096': [2297, 6, 7],
    'pitch_4096': [2395, 0, 2],
    'pitch_confidence_4096': [2395, 1, 2],
    'melbands_4096': [2423, 40],
    'chroma_4096': [2983, 12],
    'onsets_4096': 3151,
    'novelties_spectrum_4096': 3152,
    'novelties_mfcc_4096': 3153,
    'novelties_chroma_4096': 3154,
    'novelties_pitch_4096': 3155,
    'novelties_loudness_4096': 3156
};

this.stat_map = {
    'mean' : 0,
    'std' : 1,
    'skew' : 2,
    'kurt' : 3,
    'low' : 4,
    'mid' : 5,
    'high' : 6,
    'mean_der' : 7,
    'std_der' : 8,
    'skew_der' : 9,
    'kurt_der' : 10,
    'low_der' : 11,
    'mid_der' : 12,
    'high_der' : 13,
};

function parse_selection(){
    copy_indexes = [];
    selection_indexes = [];

    // Decode selection input to a list of dicts:
    decoded_args = decode_args(ut.get_args(arrayfromargs(messagename,arguments)));

    offset_amount = 0;
    for(i = 0; i < decoded_args.length; i++){
        this_entry = process_entry(decoded_args[i]);

        copy_indexes = ut.combine_array(copy_indexes, this_entry[0]);
        selection_indexes = ut.combine_array(selection_indexes, ut.offset_array(this_entry[1], offset_amount));

        offset_amount = offset_amount + this_entry[2];
    };

    outlet(1, selection_indexes);
    outlet(0, copy_indexes);
};

function process_entry(entry){
    // Return [ [this entry copy indexes], [this entry selection indexes (starting from 0)] ]:
    this_indexes = [];
    this_selection_indexes = [];

    num_entries = 0;
    if (ut.includes(this.ranged_processes, entry['descriptor'])){
        // Ranged processes (mfcc, melbands, chroma):
        base_idx = this.start_map[entry['descriptor']][0];
        range_amount = this.start_map[entry['descriptor']][1];

        for(stat = 0; stat < entry['stats'].length; stat++){
            stat_idx = this.stat_map[entry['stats'][stat]];
            
            this_start = base_idx + (stat_idx * range_amount);
            this_end = this_start + range_amount;
            this_indexes = ut.combine_array(this_indexes, ut.range_array(this_start, this_end));

            this_selection_indexes.push(num_entries)

            num_entries = num_entries + range_amount;
        };
    }
    else if (ut.includes(this.single_processes, entry['descriptor'])){
        // Single processes (slices, lengths):
        base_idx = this.start_map[entry['descriptor']];
        this_indexes.push(base_idx);
        this_selection_indexes.push(0);
        num_entries = 1;
    }
    else{
        // Other descriptors:
        base_idx = this.start_map[entry['descriptor']][0];
        offset_idx = this.start_map[entry['descriptor']][1];
        num_desc = this.start_map[entry['descriptor']][2];

        for(stat = 0; stat < entry['stats'].length; stat++){
            stat_idx = this.stat_map[entry['stats'][stat]];
            
            this_indexes.push(base_idx + offset_idx + (stat_idx * num_desc));
            this_selection_indexes.push(num_entries);
            num_entries++;
        };
    };

    return [this_indexes, this_selection_indexes, num_entries];
};

function decode_args(args){
    final_list = [];
    current_entry = {};
    creating_entry = false;
    for(i = 0; i < args.length; i++){
        if(ut.includes(this.feat_list, args[i])){
            if(creating_entry){
                final_list.push(current_entry);
            };
            current_entry = {};
            current_entry['descriptor'] = args[i];
            current_entry['stats'] = [];
            creating_entry = true;
        }
        else if (ut.includes(this.stat_list, args[i])){
            current_entry['stats'].push(args[i]);
        }
        else{
            ut.error_log('Unknown selection keyword: ' + String(args[i]));
        };
    };
    final_list.push(current_entry);

    return final_list;
};