let task = document.querySelector("#tasker");
let tasksearch = document.querySelector("#taskersearch"); 

document.querySelector("#submitform").addEventListener("submit", submitForm);
document.querySelector("#taskersearch").addEventListener("keyup", searchTasks);
document.querySelector("#taskerList").addEventListener("click", deleteTasks);



function submitForm(e){

    let val = task.value;
    if(val.length != 0){

        let html = document.createElement("li");
        html.classList.add("collection-item");
        html.innerHTML = `<div>${val}<a href="javascript:void(0)" class="secondary-content"><i class="material-icons removetask">delete</i></a></div>`;
        document.querySelector("#taskerList").appendChild(html);

    }
    e.preventDefault();
}

function deleteTasks(e){

    if(e.target.classList.contains("removetask")){
        
            e.target.parentElement.parentElement.parentElement.remove()

            let toastContent = $(`<span>${e.target.parentElement.parentElement.textContent} ~ has been removed</span>`).add($('<button class="btn-flat toast-action" id="undoaction">Undo</button>'));
            Materialize.toast(toastContent, 10000);
            document.querySelector("#undoaction").addEventListener("click", undoDeleteTasks);

            console.log();

        
    }
    e.preventDefault();
}
function undoDeleteTasks(e){

    let task = document.querySelector("#undoaction").parentElement.querySelector("span").textContent;
    let val = task.split("~")[0];
    let html = document.createElement("li");
        html.classList.add("collection-item");
        html.innerHTML = `<div>${val}<a href="javascript:void(0)" class="secondary-content"><i class="material-icons removetask">delete</i></a></div>`;
        document.querySelector("#taskerList").appendChild(html);

    e.preventDefault();
}
function searchTasks(e){

    e.preventDefault();
}