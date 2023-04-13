
// info box
document.getElementById('textbox1').addEventListener('click', () => {
    document.getElementById('container1').style.display = 'flex';
    document.getElementById('textbox1').style.display = 'none';
});
document.getElementById('close').addEventListener('click', () => {
    document.getElementById('container1').style.display = 'none';
    document.getElementById('textbox1').style.display = 'block';
    document.getElementById('title-alert').innerText=""
    document.getElementById('text-alert').innerText=""
});


const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const editButton = document.getElementById('edit-node');
const delremButton = document.getElementById('rem-Delete');
const alrtremButton = document.getElementById('rem-Alter');
const archremButton = document.getElementById('rem-Archive');
const archiveButton = document.getElementById('displayAechive');
const noteButton = document.getElementById('displayNote');
const txtNoteButton = document.getElementById('displayTxtNote');
const reminderButton = document.getElementById('displayReminder');
const displayDeleted = document.getElementById('displayDeleted');

const notesDiv = document.getElementById('notes');
showAll();
function addNotes() {

    // localStorage.setItem('notes', JSON.stringify(notes));
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notes = [];
    }
    else {
        notes = JSON.parse(notes);
    }
    if (addTitle.value == '') {
        document.getElementById('title-alert').innerText="*Title can't be empty."
        return;
    }

    if (addText.value == '') {
        document.getElementById('title-alert').innerText=""
        document.getElementById('text-alert').innerText="*Note can't be empty."
        return;
    }
    document.getElementById('title-alert').innerText=""
    document.getElementById('text-alert').innerText=""
    const alarmTime = document.getElementById('alert-time').value;
    const now = new Date();
    const alarm = new Date(now.toDateString() + ' ' + alarmTime);
    if (alarmTime !== '') {
      
        let remindernotes = localStorage.getItem('remindernotes');
    if (remindernotes === null) {
        remindernotes = [];
    }
    else {
        remindernotes = JSON.parse(remindernotes);
    }
        const remnoteObj = {
            title: addTitle.value,
            note: addText.value,
            time: alarmTime
        }
        addTitle.value = '';
        addText.value = '';
        document.getElementById('alert-time').value = '';
        remindernotes.push(remnoteObj);
        localStorage.setItem('remindernotes', JSON.stringify(remindernotes));
			// Set a timeout to show an alert when each time is reached
			
		

        showRemainderNotes();
        // alert("not selected");
    }
    else {

        const noteObj = {
            title: addTitle.value,
            note: addText.value
        }
        addTitle.value = '';
        addText.value = '';
        notes.push(noteObj);
        localStorage.setItem('notes', JSON.stringify(notes))
        showNotes();
    }
}

function getTimeRemaining(ind) {
    let remindernotes = localStorage.getItem('remindernotes');
    if (remindernotes === null) {
        notesDiv.style.display = 'none';
        return;
    }
    else {
        remindernotes = JSON.parse(remindernotes);
    }
    let timeString = remindernotes[ind].time;
    let timeParts = timeString.split(":");
    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);
    let now = new Date();
    let target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    if (target <= now) {
        target.setDate(target.getDate() + 1);
    }
    
    
    return target - now;
}

//displaying notes in the main page
function showNotes() {
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    const title = document.getElementById('noteSection');
    title.innerText = "Nothing to show...";
    if (notes !== null) {
        
        notes = JSON.parse(notes);
        notesDiv.style.display = 'flex';
    for (let i = 0; i < notes.length; i++) {
        const titleContent = notes[i].title + "";
        const noteContent = notes[i].note + "";
        title.innerText = "Notes without Remainder"
        notesHTML += `<div class="note">
                           <div class="noteBtn">
                               <i class="fa-solid fa-box-archive archiveNote" id="${i}" onclick="archiveNode(${i})"></i>
                               <i class="fa-solid fa-trash-can deleteNote" id="${i}" onclick="deleteNode(${i})"></i>
                               <i class="fa-solid fa-pen editNode" id="${i}" onclick="editNode(${i})"></i>
                            </div>
                            <h1 class="title">${notes[i].title === "" ? 'Note' : notes[i].title}</h1>
                            <p class="text">${notes[i].note}</p>
                        </div>
    `
    }
    }
    else{
        notesDiv.style.display = 'none';
    }
    notesDiv.innerHTML = notesHTML;

}
// deliting nodes
function deleteNode(ind) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    }
    else {
        notes = JSON.parse(notes);
    }

    let deletednotes = localStorage.getItem('deletednotes');
    if (deletednotes === null) {
        deletednotes = [];
    }
    else {
        deletednotes = JSON.parse(deletednotes);
    }
    const deletednoteObj = {
        title: notes[ind].title,
        note: notes[ind].note
    }
    deletednotes.push(deletednoteObj);
    localStorage.setItem('deletednotes', JSON.stringify(deletednotes))


    notes.splice(ind, 1);
    localStorage.setItem('notes', JSON.stringify(notes))
    showNotes();
}
//displaying deleted nodes
function showDeletedNodes() {
    document.getElementById('container1').style.display = 'none';
    document.getElementById('textbox1').style.display = 'block';
    let deletednotesHTML = '';
    let deletednotes = localStorage.getItem('deletednotes');

    const title = document.getElementById('noteSection');
    title.innerText = "Nothing to show...";
    let count=0
    if (deletednotes !== null) {
       count++;
        deletednotes = JSON.parse(deletednotes);
    
    notesDiv.style.display = 'flex';
    title.innerText = "Deleted Notes";
    for (let i = 0; i < deletednotes.length; i++) {
       
        deletednotesHTML += `<div class="note1">
        <h1 class="title">${deletednotes[i].title === "" ? 'Note' : deletednotes[i].title}</h1>
            <p class="text">${deletednotes[i].note}</p>
    </div>
    `
    }
    }
    notesDiv.innerHTML = deletednotesHTML;
    let remdeletednotes = localStorage.getItem('remdeletednotes');
    if (remdeletednotes !== null) {
       count++;
        remdeletednotes = JSON.parse(remdeletednotes);
    
    notesDiv.style.display = 'flex';
    title.innerText = "Deleted Notes"
    for (let i = 0; i < remdeletednotes.length; i++) {
        const timeString12hr = new Date('1970-01-01T' + remdeletednotes[i].time + 'Z')
        .toLocaleTimeString('en-US',
          {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
        );
        
        deletednotesHTML += `<div class="note1">
                        <div class="noteBtn3">
                            <i class="fa-solid fa-clock fa-xs">${" "+timeString12hr}</i>
                        </div>
                            <h1 class="title">${remdeletednotes[i].title === "" ? 'Note' : remdeletednotes[i].title}</h1>
                            <p class="text">${remdeletednotes[i].note}</p>
                        </div>
    `
    }
    }
    notesDiv.innerHTML = deletednotesHTML;

    if(count === 0){
        notesDiv.style.display = 'none';
    }




}
// archiving nodes
function archiveNode(ind) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    }
    else {
        notes = JSON.parse(notes);
    }

    let archnotes = localStorage.getItem('archnotes');
    if (archnotes === null) {
        archnotes = [];
    }
    else {
        archnotes = JSON.parse(archnotes);
    }
    const archnoteObj = {
        title: notes[ind].title,
        note: notes[ind].note
    }
    archnotes.push(archnoteObj);
    localStorage.setItem('archnotes', JSON.stringify(archnotes))


    notes.splice(ind, 1);
    localStorage.setItem('notes', JSON.stringify(notes))
    showNotes();
}

//displaying archived notes
function showArchivedNodes() {
    document.getElementById('container1').style.display = 'none';
    document.getElementById('textbox1').style.display = 'block';
    let archnotesHTML = '';
    let archnotes = localStorage.getItem('archnotes');
    const title = document.getElementById('noteSection');
    title.innerText = "Nothing to show...";
    let count=0;
    if (archnotes !== null) {
        count++;
        archnotes = JSON.parse(archnotes);
    
    notesDiv.style.display = 'flex';
    for (let i = 0; i < archnotes.length; i++) {
        title.innerText = "Archived Notes"
        archnotesHTML += `<div class="note">
                             <div class="noteBtn1">
                               <i class="fa-solid fa-square-check archiveNote" id="${i}" onclick="restoreArchiveNode(${i})"></i>
                               <i class="fa-solid fa-trash-can deleteNote" id="${i}" onclick="deleteArchedNode(${i})"></i>
                            </div>
        <h1 class="title">${archnotes[i].title === "" ? 'Note' : archnotes[i].title}</h1>
            <p class="text">${archnotes[i].note}</p>
    </div>
    `

    }
}
    notesDiv.innerHTML = archnotesHTML;


    let remarchnotes = localStorage.getItem('remarchnotes');
    if (remarchnotes !== null) {
      count++;
        remarchnotes = JSON.parse(remarchnotes);
    
    notesDiv.style.display = 'flex';
    for (let i = 0; i < remarchnotes.length; i++) {
        const timeString12hr = new Date('1970-01-01T' + remarchnotes[i].time + 'Z')
        .toLocaleTimeString('en-US',
          {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
        );                     
        title.innerText = "Archived Notes"
        archnotesHTML += `<div class="note">
                            <div class="noteBtn2">
                            <i class="fa-solid fa-clock fa-xs">${" "+timeString12hr}</i>
                            </div>
                             <div class="noteBtn1">
                               <i class="fa-solid fa-square-check archiveNote" id="${i}" onclick="restoringArchiveRemNotes(${i})"></i>
                               <i class="fa-solid fa-trash-can deleteNote" id="${i}" onclick="deleteArchedRemNode(${i})"></i>
                            </div>
        <h1 class="title1">${remarchnotes[i].title === "" ? 'Note' : remarchnotes[i].title}</h1>
            <p class="text">${remarchnotes[i].note}</p>
    </div>
    `

    }
}
    notesDiv.innerHTML = archnotesHTML;

    if(count === 0){
        notesDiv.style.display = 'block';
    }




}


// editing nodes
function editNode(ind) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    }
    else {
        notes = JSON.parse(notes);
    }

    const myModal = new bootstrap.Modal('#editModal');
    const myButton = document.querySelector('#edit-node');
    myModal.show();
    let M_title = document.getElementById('m-title'); // Modal details
    let M_text = document.getElementById('m-text'); // Modal title
    M_title.value = notes[ind].title === "" ? 'Note' : notes[ind].title;
    M_text.innerText = notes[ind].note;
   

    editButton.addEventListener('click', () => {
        if(M_title.value ==='' || M_text.value ===''){
            document.getElementById('Mtitle-alert').innerText="Title or note can't be empty.";
            return
        }
        else{
            document.getElementById('Mtitle-alert').innerText="";
        notes[ind].title = M_title.value;
        notes[ind].note = M_text.value;
        localStorage.setItem('notes', JSON.stringify(notes));
        showNotes();
        }
    });


}

//restoring archive notes to normal notes

function restoreArchiveNode(ind) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    }
    else {
        notes = JSON.parse(notes);
    }

    let archnotes = localStorage.getItem('archnotes');
    if (archnotes === null) {
        return;
    }
    else {
        archnotes = JSON.parse(archnotes);
    }
    const noteObj = {
        title: archnotes[ind].title,
        note: archnotes[ind].note
    }
    notes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(notes))


    archnotes.splice(ind, 1);
    localStorage.setItem('archnotes', JSON.stringify(archnotes));
    showArchivedNodes();


}

//deleting archived notes
function deleteArchedNode(ind) {
    let archnotes = localStorage.getItem('archnotes');
    if (archnotes === null) {
        return;
    }
    else {
        archnotes = JSON.parse(archnotes);
    }

    let deletednotes = localStorage.getItem('deletednotes');
    if (deletednotes === null) {
        deletednotes = [];
    }
    else {
        deletednotes = JSON.parse(deletednotes);
    }
    const deletednoteObj = {
        title: archnotes[ind].title,
        note: archnotes[ind].note
    }
    deletednotes.push(deletednoteObj);
    localStorage.setItem('deletednotes', JSON.stringify(deletednotes))


    archnotes.splice(ind, 1);
    localStorage.setItem('archnotes', JSON.stringify(archnotes));
    showArchivedNodes()

}

function showRemainderNotes() {
    document.getElementById('container1').style.display = 'none';
    document.getElementById('textbox1').style.display = 'block';
    let notesHTML = '';
    let remindernotes = localStorage.getItem('remindernotes');
    const title = document.getElementById('noteSection');
    title.innerText = "Nothing to show...";
    
    if (remindernotes !== null) {
        
        
        remindernotes = JSON.parse(remindernotes);
    
    notesDiv.style.display = 'flex';
    
    
    
    for (let i = 0; i < remindernotes.length; i++) {
        const timeString12hr = new Date('1970-01-01T' + remindernotes[i].time + 'Z')
        .toLocaleTimeString('en-US',
          {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
        );
        title.innerText = "Notes with Remainder"
        notesHTML += `<div class="note">
                        <div class="noteBtn3">
                            <i class="fa-solid fa-clock fa-xs">${" "+timeString12hr}</i>
                        </div>
                            <h1 class="title">${remindernotes[i].title === "" ? 'Note' : remindernotes[i].title}</h1>
                            <p class="text">${remindernotes[i].note}</p>
                        </div>
    `
       setTimeout(function() {
            const myModal = new bootstrap.Modal('#remainderModal');
             myModal.show();
             let M_details = document.getElementById('m-details'); // Modal details
             M_details.innerText ="Title :"
             M_details.innerText += remindernotes[i].title === "" ? 'Note' : remindernotes[i].title+"\nDetails :"+remindernotes[i].note +"\n\nNote : click on Delete button to Delete the Note, Remind Later to Remind you after 5 minuts or on Archive to move the note to archive.";
            
     
             delremButton.addEventListener('click', () => {
                // alert(i);
                deleteRemNotes(i);
                return;
            });
            alrtremButton.addEventListener('click', () => {
                // alert(i);
               let hr=parseInt(remindernotes[i].time.split(":")[0]);
               let min = parseInt(remindernotes[i].time.split(":")[1]);
                min+=5; 
               if(min<5){
                remindernotes[i].time=hr+":0"+min;
               }
               else
               remindernotes[i].time=hr+":"+min;
                localStorage.setItem('remindernotes', JSON.stringify(remindernotes));
                // setTimeout(function() {
                // }, getTimeRemaining(i));
                showRemainderNotes()
    
            });

            archremButton.addEventListener('click', ()=> {
                
                archiveRemNotes(i)
                return;
            })
            
        }, getTimeRemaining(i));
    }
    notesDiv.innerHTML = notesHTML;
}
else{
    notesDiv.style.display = 'none';
}

    
    
}

function showAll(){
    document.getElementById('container1').style.display = 'none';
    document.getElementById('textbox1').style.display = 'block';
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    const title = document.getElementById('noteSection');
    title.innerText = "Nothing to show...";
    let count=0;
    if (notes !== null) {
       count++;
        notes = JSON.parse(notes);
    
    notesDiv.style.display = 'flex';
    for (let i = 0; i < notes.length; i++) {
        title.innerText = "Notes"
        notesHTML += `<div class="note">
                           <div class="noteBtn">
                               <i class="fa-solid fa-box-archive archiveNote" id="${i}" onclick="archiveNode(${i})"></i>
                               <i class="fa-solid fa-trash-can deleteNote" id="${i}" onclick="deleteNode(${i})"></i>
                               <i class="fa-solid fa-pen editNode" id="${i}" onclick="editNode(${i})"></i>
                            </div>
                            <h1 class="title">${notes[i].title === "" ? 'Note' : notes[i].title}</h1>
                            <p class="text">${notes[i].note}</p>
                        </div>
    `
    }
    }
    

    let remindernotes = localStorage.getItem('remindernotes');
    if (remindernotes !== null) {
       
        count++;
        remindernotes = JSON.parse(remindernotes);
        notesDiv.style.display = 'flex';
    for (let i = 0; i < remindernotes.length; i++) {
        const timeString12hr = new Date('1970-01-01T' + remindernotes[i].time + 'Z')
        .toLocaleTimeString('en-US',
          {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
        );
        title.innerText = "Notes"
        notesHTML += `<div class="note">
                           <div class="noteBtn3">
                               <i class="fa-solid fa-clock fa-xs">${" "+timeString12hr}</i>
                            </div>
                            
                            <h1 class="title">${remindernotes[i].title === "" ? 'Note' : remindernotes[i].title}</h1>
                            <p class="text">${remindernotes[i].note}</p>
                        </div>
    `
    }
    }
    notesDiv.innerHTML = notesHTML;
    if(count===0){
        notesDiv.style.display = 'none';
    }

}
//notes with remainder delete operation

function deleteRemNotes(ind){
    let remindernotes = localStorage.getItem('remindernotes');
    if (remindernotes === null) {
        return;
    }
    else {
        remindernotes = JSON.parse(remindernotes);
    }

    let remdeletednotes = localStorage.getItem('remdeletednotes');
    if (remdeletednotes === null) {
        remdeletednotes = [];
    }
    else {
        remdeletednotes = JSON.parse(remdeletednotes);
    }
    const remdltnoteObj = {
        title: remindernotes[ind].title,
        note: remindernotes[ind].note,
        time :remindernotes[ind].time
    }
    remdeletednotes.push(remdltnoteObj);
    localStorage.setItem('remdeletednotes', JSON.stringify(remdeletednotes))


    remindernotes.splice(ind, 1);
    localStorage.setItem('remindernotes', JSON.stringify(remindernotes));
    showRemainderNotes();
}

const inputField = document.getElementById("search");
  const stringToCheck = "Hello World!";

  inputField.addEventListener("input", function() {
    const inputValue = inputField.value;

    document.getElementById('container1').style.display = 'none';
    document.getElementById('textbox1').style.display = 'block';
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    const title = document.getElementById('noteSection');
    title.innerText = "Nothing to show...";
    let count=0;
    if (notes !== null) {
        count++;
        notes = JSON.parse(notes);
    notesDiv.style.display = 'flex';
    for (let i = 0; i < notes.length; i++) {
        
        if(notes[i].title.startsWith(inputValue)){
            title.innerText = "Notes Starting with "+inputValue;
        notesHTML += `<div class="note">
                           <div class="noteBtn">
                               <i class="fa-solid fa-box-archive archiveNote" id="${i}" onclick="archiveNode(${i})"></i>
                               <i class="fa-solid fa-trash-can deleteNote" id="${i}" onclick="deleteNode(${i})"></i>
                               <i class="fa-solid fa-pen editNode" id="${i}" onclick="editNode(${i})"></i>
                            </div>
                            <h1 class="title">${notes[i].title === "" ? 'Note' : notes[i].title}</h1>
                            <p class="text">${notes[i].note}</p>
                        </div>
    `
        }
    }
       

    }
    
    let remindernotes = localStorage.getItem('remindernotes');

    if (remindernotes !== null) {
        count++;
        remindernotes = JSON.parse(remindernotes);
    notesDiv.style.display = 'flex';
    for (let i = 0; i < remindernotes.length; i++) {
        
        if(remindernotes[i].title.startsWith(inputValue)){
            title.innerText = "Notes Starting with "+inputValue;
            const timeString12hr = new Date('1970-01-01T' + remindernotes[i].time + 'Z')
            .toLocaleTimeString('en-US',
              {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
            );
            notesHTML += `<div class="note">
                               <div class="noteBtn3">
                                   <i class="fa-solid fa-clock fa-xs">${" "+timeString12hr}</i>
                                </div>
                                
                                <h1 class="title">${remindernotes[i].title === "" ? 'Note' : remindernotes[i].title}</h1>
                                <p class="text">${remindernotes[i].note}</p>
                            </div>
        `
    
        }
    }
       

    }
    notesDiv.innerHTML = notesHTML;
    if(inputValue ===''){
        title.innerText = "Notes";
    }
    
    if(count===0){
        notesDiv.style.display = 'none';
    }

   
  });

  function archiveRemNotes(ind){
    let remindernotes = localStorage.getItem('remindernotes');
    if (remindernotes === null) {
        return;
    }
    else {
        remindernotes = JSON.parse(remindernotes);
    }

    let remarchnotes = localStorage.getItem('remarchnotes');
    if (remarchnotes === null) {
        remarchnotes = [];
    }
    else {
        remarchnotes = JSON.parse(remarchnotes);
    }
    const remarchnoteObj = {
        title: remindernotes[ind].title,
        note: remindernotes[ind].note,
        time: remindernotes[ind].time
    }
    remarchnotes.push(remarchnoteObj);
    localStorage.setItem('remarchnotes', JSON.stringify(remarchnotes))


    remindernotes.splice(ind, 1);
    localStorage.setItem('remindernotes', JSON.stringify(remindernotes))
    showArchivedNodes();

  }

  function deleteArchedRemNode(ind){
    let remarchnotes = localStorage.getItem('remarchnotes');
    if (remarchnotes === null) {
        return;
    }
    else {
        remarchnotes = JSON.parse(remarchnotes);
    }

    let remdeletednotes = localStorage.getItem('remdeletednotes');
    if (remdeletednotes === null) {
        remdeletednotes = [];
    }
    else {
        remdeletednotes = JSON.parse(remdeletednotes);
    }
    const remarcnoteObj = {
        title: remarchnotes[ind].title,
        note: remarchnotes[ind].note,
        time :remarchnotes[ind].time
    }
    remdeletednotes.push(remarcnoteObj);
    localStorage.setItem('remdeletednotes', JSON.stringify(remdeletednotes))


    remarchnotes.splice(ind, 1);
    localStorage.setItem('remarchnotes', JSON.stringify(remarchnotes));
    showArchivedNodes();

  }

  function restoringArchiveRemNotes(ind){
    let remindernotes = localStorage.getItem('remindernotes');
    if (remindernotes === null) {
        return;
    }
    else {
        remindernotes = JSON.parse(remindernotes);
    }

    let remarchnotes = localStorage.getItem('remarchnotes');
    if (remarchnotes === null) {
        return;
    }
    else {
        remarchnotes = JSON.parse(remarchnotes);
    }
    const remnoteObj = {
        title: remarchnotes[ind].title,
        note: remarchnotes[ind].note,
        time: remarchnotes[ind].time
    }
    remindernotes.push(remnoteObj);
    localStorage.setItem('remindernotes', JSON.stringify(remindernotes))


    remarchnotes.splice(ind, 1);
    localStorage.setItem('remarchnotes', JSON.stringify(remarchnotes));
    showArchivedNodes();
  }
  

addNoteButton.addEventListener('click', addNotes);
displayDeleted.addEventListener('click', showDeletedNodes);
archiveButton.addEventListener('click', showArchivedNodes);
noteButton.addEventListener('click', showAll);
txtNoteButton.addEventListener('click', showNotes);
reminderButton.addEventListener('click', showRemainderNotes);