function burgerButtonClicked() {
    openedSidebar = !openedSidebar;
    burgerButtonWasClicked = !burgerButtonWasClicked;

    if (openedSidebar)
        openSidebar();
    else
        closeSidebar();
}


function closeNoteButtonWasClicked() {
    let title = document.getElementById('title');
    let note = document.getElementById('note');
    let inputNote = document.getElementById('inputNote');
    let mainNote = document.getElementById('mainNote');
    inputNote.style.setProperty('min-height', '32px');
    inputNote.style.setProperty('height', '32px');
    mainNote.style.setProperty('min-height', '32px');
    document.getElementById('title').classList.add('d-none');
    document.getElementById('footerNote').classList.add('d-none');

    if (note.innerHTML !== '' || title.innerHTML !== 'Titel') {
        if (title.innerHTML == '&nbsp;' || title.innerHTML == 'Titel' && note.innerHTML == '') {
            document.getElementById('title').innerHTML = 'Titel';
            document.getElementById('note').innerHTML = 'Notiz schreiben...';
            return;
        }
        else if (title.innerHTML == 'Titel')
            titles.push('&nbsp;');
        else
            titles.push(title.innerHTML);
        notes.push(note.innerHTML);
        notesHeight.push(currentHeight);
    }

    document.getElementById('title').innerHTML = 'Titel';
    document.getElementById('note').innerHTML = 'Notiz schreiben...';

    saveNotes();
    render('notes');
}


function deleteButtonWasClicked(type, index) {
    loadTrashNotes();
    loadNotes();

    if (type == 'notes') {
        trashTitles.push(titles[index]);
        trashNotes.push(notes[index]);
        trashNotesHeight.push(notesHeight[index]);

        if (titles.length > 1 || notes.length > 1) {
            titles.splice(index, 1);
            notes.splice(index, 1);
            notesHeight.splice(index, 1);
        }
        else {
            titles.pop();
            notes.pop();
            notesHeight.pop();
        }
    }
    else {
        if (trashTitles.length > 1 || trashNotes.length > 1) {
            trashTitles.splice(index, 1);
            trashNotes.splice(index, 1);
            trashNotesHeight.splice(index, 1);
        }
        else {
            trashTitles.pop();
            trashNotes.pop();
            trashNotesHeight.pop();
        }
    }

    localStorage.clear();
    saveTrashNotes();
    saveNotes();
    render(type);
}

function noteButtonWasClicked() {
    loadNotes();
    closeSidebar();
    document.getElementById('inputNote').classList.remove('d-none');
    document.getElementById('noteBG').classList.remove('noteBG');
    trashView = false;
    if (trashView) {
        document.getElementById('content').style.marginTop = '128px';
    }
    else {
        document.getElementById('content').style.marginTop = '64px';
    }
    render('notes');
}

function trashButtonWasClicked() {
    loadTrashNotes();
    closeSidebar();
    document.getElementById('inputNote').classList.add('d-none');
    document.getElementById('trashBG').classList.remove('trashBG');
    trashView = true;
    if (trashView) {
        document.getElementById('content').style.marginTop = '128px';
    }
    else {
        document.getElementById('content').style.marginTop = '64px';
    }
    render('trash');
}

function openSidebar() {
    openedSidebar = true;

    let w = window.innerWidth;

    let sidebar = document.getElementById('sidebar');
    let noteDescription = document.getElementById('hideNoteDescription');
    let trashDescription = document.getElementById('hideTrashDescription');
    document.getElementById('noteBG').classList.add('noteBG');
    document.getElementById('trashBG').classList.add('trashBG');
    noteDescription.classList.remove('d-none');
    trashDescription.classList.remove('d-none');

    sidebar.style.setProperty('width', '200px');
    sidebar.style.setProperty('box-shadow', 'inset 1px 1px 1px rgba(0,0,0,.1), inset -1px -1px 1px rgba(0,0,0,.5)');
    sidebar.style.setProperty('border', '1px solid rgba(0, 0, 0, 0.7)');
    sidebar.style.setProperty('border-width', '0px 1px 0px 0px');


    if (trashView) {
        document.getElementById('content').style.marginTop = '128px';
    }
    else {
        document.getElementById('content').style.marginTop = '64px';
    }
}

function closeSidebar() {
    if (burgerButtonWasClicked) return;
    openedSidebar = false;

    let w = window.innerWidth;

    let sidebar = document.getElementById('sidebar');
    let noteDescription = document.getElementById('hideNoteDescription');
    let trashDescription = document.getElementById('hideTrashDescription');
    document.getElementById('noteBG').classList.remove('noteBG');
    document.getElementById('trashBG').classList.remove('trashBG');
    noteDescription.classList.add('d-none');
    trashDescription.classList.add('d-none');


    sidebar.style.setProperty('width', '100px');
    sidebar.style.setProperty('box-shadow', 'none');
    sidebar.style.setProperty('border', 'none');

    if (trashView) {
        document.getElementById('content').style.marginTop = '128px';
    }
    else {
        document.getElementById('content').style.marginTop = '64px';
    }

    currentHeight = '150px';
}


function makeContentEditable(index) {
    let title = document.getElementById('title' + index);
    let note = document.getElementById('note' + index);
    if (title.innerHTML == '&nbsp;') {
        title.innerHTML = 'Titel';
    }
    title.setAttribute('contenteditable', true);
    note.setAttribute('contenteditable', true);
}


function storeNoteButtonWasClicked(index) {
    loadNotes();
    let title = document.getElementById('title' + index);
    let note = document.getElementById('note' + index);

    if (title.innerHTML == 'Titel') {
        document.getElementById('title' + index).innerHTML = '&nbsp;';
    }

    titles[index] = title.innerHTML;
    notes[index] = note.innerHTML;
    notesHeight[index] = currentHeight;

    title.setAttribute('contenteditable', false);
    note.setAttribute('contenteditable', false);

    currentHeight = '150px';
    saveNotes();
    render('notes');
}

function restoreNoteButtonWasClicked(index) {
    loadTrashNotes();
    titles.push(trashTitles[index]);
    notes.push(trashNotes[index]);
    notesHeight.push(trashNotesHeight[index]);
    trashTitles.splice(index, 1);
    trashNotes.splice(index, 1);
    trashNotesHeight.splice(index, 1);
    saveTrashNotes();
    saveNotes();
    render('trash');
}