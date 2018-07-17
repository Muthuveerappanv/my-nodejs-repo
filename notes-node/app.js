console.log('Starting');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions = {
    describe: 'Title of Note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of Note',
    alias: 'b'
};

var noteOptions = { title: titleOptions, body: bodyOptions };

const argv = yargs
    .command('add', 'add a new note', noteOptions)
    .command('list', 'list notes')
    .command('read', 'Read Note', {title: titleOptions})
    .command('remove', 'Removes Note', {title: titleOptions})
    .help().argv;

var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note Created!');
    } else {
        console.log('Note Already Exists!!!');
    }
} else if (command === 'list') {
    var listedNotes = notes.list();
    listedNotes.forEach((note) => console.log(JSON.stringify(note)));
} else if (command === 'read') {
    var matchedNote = notes.read(argv.title);
    if (matchedNote) {
        console.log(JSON.stringify(matchedNote));
    } else {
        console.log('Note with title doesn\'t exist');
    }
} else if (command === 'remove') {
    var removedNote = notes.remove(argv.title);
    var message = removedNote ? 'Noted Removed!' : 'No Such Note Exists!!!';
    console.log(message);
}
else {
    console.log('command not recognized');
}