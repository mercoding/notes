let titles = [];
let notes = [];
let trashTitles = [];
let trashNotes = [];
let notesHeight = [];
let trashNotesHeight = [];
let currentHeight = '150px';
let openedSidebar = false;
let burgerButtonWasClicked = false;
let contentIsEditable = false;
let trashView = false;


function render(type) {
    document.getElementById('content').innerHTML = '';
    let content = document.getElementById('content');
    content.innerHTML = '';
    loadNotes();
    loadTrashNotes();
    addNotes(type);
}


function addInputNoteForm(type, title, note, index) {
    let addFunction = ``;
    let addButton = ``;
    if (type == 'notes') {
        addFunction = `onclick="makeContentEditable(${index})"`;
        //addButton = `<button class="button" onclick="storeNoteButtonWasClicked(${index})">Save</button>`;
        addButton = `<img src="img/prufen.png" class="saveAndTrashIcon" onclick="storeNoteButtonWasClicked(${index})">`;
    }
    else if(type == 'trash') {
        addButton = `<img src="img/wiederherstellen.png" class="saveAndTrashIcon" onclick="restoreNoteButtonWasClicked(${index})">`;
    }

    let form = `
        <div id="noteForm${index}" class="note"> 
            <div id="title${index}" class="title" contenteditable="false" role="textbox"` + addFunction + `>${title}</div>
            <div class="mainNote" `+ addFunction + `>
                <div id="note${index}" class="input" contenteditable="false" role="textbox" onkeyup="textAreaAdjust(this, 'noteForm${index}')">${note}</div>
            </div>
            <div class="footerNote">
                <img src="img/mulleimer.png" class="saveAndTrashIcon" onclick="deleteButtonWasClicked('${type}', ${index})">
                `+ addButton + `
            </div>
        </div>`;
    return form;
}


function textAreaAdjust(element, id) {
    let formId = document.getElementById(id);
    let num = parseFloat(25 + element.scrollHeight);
    currentHeight = '150px';
    if (num < 150) {
        num = 150;
    }
    formId.style.height = num + "px";
    currentHeight = num + 64 + "px";

    let convertedFormId = parseInt(id.replaceAll("noteForm", ""));
    if (convertedFormId)
        notesHeight[convertedFormId] = currentHeight;
}


function addNotes(type) {
    let title = [];
    let note = [];

    if (type == 'notes') {
        title = titles;
        note = notes;
    }
    else if (type == 'trash') {
        title = trashTitles;
        note = trashNotes;
    }

    if (note.length == 0 || title.length == 0) return;

    let content = document.getElementById('content');
    for (let i = 0; i < note.length; i++) {
        content.innerHTML += addInputNoteForm(type, title[i], note[i], i);
        const noteForm = document.getElementById('noteForm' + i);
        if (type == 'notes') {
            noteForm.style.height = notesHeight[i];
        }
        else {
            noteForm.style.height = trashNotesHeight[i];
        }
    }
}


function addNote() {
    let inputNote = document.getElementById('inputNote');
    let mainNote = document.getElementById('mainNote');
    let note = document.getElementById('note');
    document.getElementById('inputNote').style.height = '150px';
    inputNote.style.setProperty('min-height', '210px');
    mainNote.style.setProperty('min-height', '150px');
    document.getElementById('title').classList.remove('d-none');
    document.getElementById('footerNote').classList.remove('d-none');
    note.innerHTML = '';
}


function addTitle() {
    let title = document.getElementById('title');
    title.innerHTML = '&nbsp;';
}


function loadNotes() {
    if (!localStorage.getItem('titles') || !localStorage.getItem('notes') || !localStorage.getItem('height')) return;
    titles = JSON.parse(localStorage.getItem('titles'));
    notes = JSON.parse(localStorage.getItem('notes'));
    notesHeight = JSON.parse(localStorage.getItem('height'));
}


function saveNotes() {
    localStorage.setItem('titles', JSON.stringify(titles));
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('height', JSON.stringify(notesHeight));
}


function loadTrashNotes() {
    if (!localStorage.getItem('trashTitles') || !localStorage.getItem('trashNotes') || !localStorage.getItem('trashHeight')) return;
    trashTitles = JSON.parse(localStorage.getItem('trashTitles'));
    trashNotes = JSON.parse(localStorage.getItem('trashNotes'));
    trashNotesHeight = JSON.parse(localStorage.getItem('trashHeight'));
}


function saveTrashNotes() {
    localStorage.setItem('trashTitles', JSON.stringify(trashTitles));
    localStorage.setItem('trashNotes', JSON.stringify(trashNotes));
    localStorage.setItem('trashHeight', JSON.stringify(trashNotesHeight));
}