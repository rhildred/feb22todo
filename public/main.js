window.addEventListener("load", ()=>{
    document.getElementById("taskForm").addEventListener("submit", (evt)=>{
        let sTask = document.getElementById("task").value;
        let oElement = document.createElement("p");
        oElement.innerHTML = sTask;
        document.getElementById("tasklist").prepend(oElement);
        evt.preventDefault();
    });
})