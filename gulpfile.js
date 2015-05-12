'use strict';

var gulp = require('gulp'), 
    requireDir = require('require-dir'),
    config = require('./gulp/gulpfile.config');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });
