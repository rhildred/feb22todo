import config from "./firebase.js";
import firebase from 'firebase/app';
import 'firebase/database';

function getFromFirebase() {
    firebase.database().ref('todos').on("value", snapshot =>{
        let oTodos = snapshot.val();
        let oTaskList = document.getElementById("tasklist");
        console.log(oTodos);
        oTaskList.innerHTML = "";
        Object.keys(oTodos).map((key) => {
            let oElement = document.createElement("div");
            oElement.className = "col-md-6";
            oElement.innerHTML = oTodos[key].taskName;
            let oButton = document.createElement("button");
            oButton.innerHTML = "x";
            oButton.className = "col-md-3";
            oButton.addEventListener("click", deleteTodo);
            let oComplete = document.createElement("button");
            oComplete.innerHTML = "&#10004;";
            oComplete.className = "col-md-3";
            oComplete.addEventListener("click", completeTodo);
            let oRow = document.createElement("div");
            oRow.className = "row"
            oRow.id = key;
            oRow.append(oElement);
            oRow.append(oButton);
            oRow.append(oComplete);
            oTaskList.prepend(oRow);
        });
    });
}

function deleteTodo(evt){
    let sId = evt.target.parentNode.id;
    firebase.database().ref('todos/' + sId).remove(()=>{
        console.log("removed " + sId);
    });
}

function completeTodo(evt){
    let sId = evt.target.parentNode.id;
    firebase.database().ref('todos/' + sId + "/dateCompleted").set(new Date().toISOString(), ()=>{
        console.log("completed " + sId);
    });
}

window.addEventListener("load", ()=>{
    //document is loaded now
    firebase.initializeApp(config);
    getFromFirebase();
    document.getElementById("taskForm").addEventListener("submit", (evt)=>{
        evt.preventDefault();
        let sTask = document.getElementById("task").value;
        document.getElementById("task").value = "";
        let taskID = new Date().toISOString().replace(".", "_");
        firebase.database().ref('todos/' + taskID).set({
            taskName: sTask
        }).then(() => {
            console.log("inserted");
        });

    });
})