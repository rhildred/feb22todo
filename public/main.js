import config from "./firebase.js";
import firebase from 'firebase/app';
import 'firebase/database';

function getFromFirebase() {
    firebase.database().ref('todos').on("value", snapshot =>{
        let oTodos = snapshot.val();
        console.log(oTodos);
        document.getElementById("tasklist").innerHTML = "";
        Object.keys(oTodos).map((key) => {
            let oElement = document.createElement("p");
            oElement.innerHTML = oTodos[key].taskname;
            document.getElementById("tasklist").prepend(oElement);
        });
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
            taskname: sTask
        }).then(() => {
            console.log("inserted");
        });

    });
})