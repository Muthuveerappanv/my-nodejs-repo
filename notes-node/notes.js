const fs = require('fs');

const fileNm = 'notes.json';
var notes = [];
try {
    var notesStr = fs.readFileSync(fileNm);
    notes = JSON.parse(notesStr);
} catch (e) {
    console.log(e);
}

var addAndsaveNotes = (notes, title) => {
    var dupNotes = notes.filter((note) => note.title === title);
    if (dupNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync(fileNm, JSON.stringify(notes));
}

var addNote = (title, body) => {
    console.log('Adding Note ', title, body);
    note = {
        title, body
    };
    return addAndsaveNotes(notes, title);
}

var list = () => {
    console.log('List all notes');
    return notes;
}

var read = (title) => {
    var matchedNotes = notes.filter((note) => note.title === title);
    if(matchedNotes.length > 0){
        return matchedNotes[0];
    }
}

var remove = (title) => {
    console.log(`removing title ${title}`);
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return filteredNotes.length !== notes.length;
}

module.exports = {
    addNote, list, read, remove
};