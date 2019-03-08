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
            let oElement = document.createElement("p");
            oElement.innerHTML = oTodos[key].taskName;
            oElement.innerHTML += "<button class=\"deleteTask\" id=\"" + key + "\">x</button>";
            oTaskList.prepend(oElement);
        });
    });
}

function deleteTodo(sKey){
    if(sKey){
        alert("deleted" + sKey);
    }
}

window.addEventListener("load", ()=>{
    //document is loaded now
    firebase.initializeApp(config);
    getFromFirebase();
    deleteTodo();
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