# jh-max

Like most Max users, I found myself after a couple of years with hundreds of different patchers, many that did similar things, none of them able to interact with each other. This is my attempt at getting them all into one place so that they are maintainable, and useable by others. I am also tyring to make everything well-documented with help files etc.!

## Table of Contents
1. [Requirements and Installation](#requirements-and-installation)
2. [Abstractions](#abstractions)
3. [JavaScript](#javascript)
4. [Projects](#projects)

## Requirements and Installation

To use these, just clone this repo into your `Max/Library` folder. From here, everything should be available.

These all work on Max version 8.3.1. Compatibility previous to this is not assured.

I build upon lots of external libraries. To run many of these things, you will probably need to download the following packages:

- [FluCoMa toolkit](https://www.flucoma.org/).
- [Bach library](https://www.bachproject.net/).
- [jtol](https://www.opasquet.fr/jtol/).

## Abstractions

A collection of abstractions that are designed, hopefully, to work together. They should all have help files explaining how they work. Everything is prefixed bu `jh.`.

### Analysis

- `bufanal`: compute various analyses on a buffer of sound.
- `analselect`: retrieve desired analyses collected by `bufanal` from a buffer.
- `analselectds`: retrieve desired analyses collected by `bufanal` that were pooled into a `fluid.dataset~`.
- `slicelist`: get a list of start end pairs from a FluCoMa slicing process.
- `bufslice`: a variety of methods for slicing audio content in a buffer.

### jtol

Some wrappers around [Olivier Pasquet's](https://www.opasquet.fr/) [jtol](https://www.opasquet.fr/jtol/) objects.

- `jtol.generate`: this is a wrapper around several jtol objects designed to easily generate random tree structures.
- `jtol.player`: this is a wrapper around several jtol objects designed to easily play levels from the generated tree structure.

### FX

- `spectralfreeze`: simple polyphonic spectral freezing with slide implementation.

### Interface

- `popupchoice`: GUI popup window asking the user for a choice.

### MIDI

- `noteout`: a wrapper for noteout and makenote.

## Random

- `randzl`: select random values from a list.
- `randf`: random float generation.
- `randdev`: randomly deviate around a value.
- `prob`: probability-driven random generation.
- `randdict`: get a random entry from a dict.

### Utility

- `bufmstosamps`: convert ms to samples depending on a buffer's sampling rate.
- `bufsampstoms`: convert samples to ms depending on a buffer's sampling rate.
- `tomono`: convert a multichannel buffer into mono.
- `printbuf`: print the contents of a buffer to the Max console.
- `countwrap`: wrapped or limited counting up and down.
- `ctrlval`/`ctrlval~`: wrapper around the line object for quick control values.
- `stereopan`: simple stereo panning from stereo or mono.
- `pantest`: quickly check a stereo setup.
- `bufsamps`: get the number of samples in a buffer.
- `bufdraw`: draw the contents of a buffer by hand.
- `windowbuf`: fill a buffer with a traditional curve for enveloping.
- `recorder`: a multichannel recorder with save explode routing options.
- `simpleclock`: a signal-driven clock.
- `dictbank`: build up a bank of dicts to query.
- `zlpop`: pop a value from a list by index.

## JavaScript

A set of JS files which can be imported as such: `var ut = require('utilities');`. Once this is done, they can be used within you JS or JSUI scripts (see the examples provided for more details). Note that much of the code is very old and hasn't yet been optimised. In the future, I intend to redo much of this in a much more OOP style (notably the JSUI stuff).

### PatchCtrl

- `reset(patcher, term)`: delete any objects in a patch that were created by JS. The `term` corresponds to the script name keyword it will look for, by default this is `'jscreated'`.
- `create_obj(patcher, x, y, object, args, term)`: create and return a Max object in a patcher. The `term` is the scripting name it will be given, by default this is `'jscreated'`.
- `find_obj(patcher, scripting_name)`: find an object in a patcher by it's scripting name.
- `get_box_info(patcher)`: return the dimensions of the JS object `[x, y, w, h]`.

### Utilities

- `console_log(string)`: just because it can become tedious to convert things to a string and add `'\n'` all the time, this does it for you. Prints anything to the Max console.
- `error_log(string)`: does the same as `console_log()` but in an error format.
- `pretty_print(to_print, indent, level)`: pass multidimensional arrays and dictionaries and post them to the console in a readable way.
- `get_args(args)`: when making a function with an unknown number of arguments. Designed to work with `get_kwargs()`, this will ignore any kwarg values given (@kwarg_name kwarg_value). Returns the remaining args in an array.
- `get_kwarg(args, kwarg)`: similar to using args, give a list of arguments, use the @ symbol to give kwargs. Returns the desired kwarg.
- `scaler(val, old_min, old_max, new_min, new_max)`: basic feature scaling.
- `scaler_2d_array(array_2d, old_min, old_max, new_min, new_max)`: feature scaling on a 2d array.
- `scaler_3d_array(array_3d, old_min, old_max, new_min, new_max)`: feature scaling on a 3d array.
- `get_min_max(array)`: given an array, return an array of the following format: `[min, max, min_idx, max_idx]`.
- `get_min_max_2d_array(2d_array)`: given a 2d array, return an array of the following format: `[min, max, [min_idx_x, min_idx_y], [max_idx_x, max_idx_y]]`.
- `get_min_max_3d_array(3d_array)`: given a 3d array, return an array of the following format: `[min, max, [min_idx_x, min_idx_y, min_idx_z], [max_idx_x, max_idx_y, max_idx_z]]`.
- `get_unique_number(number_list, max_range)`: supply an array of numbers, and generate a number that does not exist in it. You can also supply the maximum range for generation.
- `get_unique_key(key_list, max_range)`: The same as `get_unique_number()` but returns the value as a string.
- `get_type(object)`: get the type of an object as a string.
- `includes(array, val)`: return a boolean, true if element is in array, false if not.
- `combine_array(array1, array2)`: return a combination of 1D arrays.
- `offset_array(array_to_offset, offset_amount)`: add a given value to every element in an array.
- `range_array(min, max, step)`: create an incremental array from min to max (not included) with given step (default 1).
- `get_distance(x1, y1, x2, y2)`: get the euclidean distance between two points.

### OS

- `get_cwd(box)`: give a patcher object (ususally `this`), and retrieve its directory as a string.
- `join(prefix, sufix)`: join a folder directory and a filename together.
- `get_relative(list)`: create relative paths. Give the starting path (must be absolute), then a series of `-`s for moving up or `folder name` for moving into a folder.
- `load_json(file)`: load a json file and return the data.
- `save_json(data, file)`: save json data to file.

### JS Dicts

- `export_2d_array_to_dict(dict_obj, key, array_2d)`: export a 2d array from js to a max patcher dict at the given key. The keys will be incremental numbers as strings.
- `export_3d_array_to_dict(dict_obj, key, array_3d)`: export a 3d array from js to a max patcher dict at the given key. The keys will be incremental numbers as strings.
- `load_2d_array_from_dict(dict_obj, key)`: import a 2d array from a max patcher dict at the given key and transform it into an array (without keys).
- `load_3d_array_from_dict(dict_obj, key)`: import a 3d array from a max patcher dict at the given key and transform it into an array (without keys).

## Projects

A collection of ad hoc projects for my own musicking in Max.