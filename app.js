let task = document.querySelector("#tasker");
let tasksearch = document.querySelector("#taskersearch"); 

document.querySelector("#submitform").addEventListener("submit", submitForm);
document.querySelector("#taskersearch").addEventListener("keyup", searchTasks);
document.querySelector("#taskerList").addEventListener("click", deleteTasks);

//run db dom pp
populateDom();


function submitForm(e){

    let val = task.value;
    if(val.length != 0){

        //save the task to db
        saveTask(val);

        let html = document.createElement("li");
            html.classList.add("collection-item");
            html.innerHTML = `<div><span id="taskvall">${val}</span><a href="javascript:void(0)" class="secondary-content tooltipped" data-position="right" data-delay="50" data-tooltip="Delete Task"><i class="material-icons removetask">delete</i></a></div>`;
        document.querySelector("#taskerList").appendChild(html);

    }
    e.preventDefault();
}

//delete chosen task
function deleteTasks(e){

    if(e.target.classList.contains("removetask")){
        
            e.target.parentElement.parentElement.parentElement.remove();
            //delete task from db
            deleteTaskInDb(e.target.parentElement.parentElement.firstChild.textContent);
            let toastContent = $(`<span>${e.target.parentElement.parentElement.firstChild.textContent} ~ has been removed</span>`).add($('<button class="btn-flat toast-action" id="undoaction">Undo</button>'));
                Materialize.toast(toastContent, 10000);
            document.querySelector("#undoaction").addEventListener("click", undoDeleteTasks);
        
    }
    e.preventDefault();
}

//undo delete
function undoDeleteTasks(e){

    let task = document.querySelector("#undoaction").parentElement.querySelector("span").textContent;
    let val = task.split("~")[0];
    let html = document.createElement("li");
        html.classList.add("collection-item");
        html.innerHTML = `<div><span id="taskvall">${val}</span><a href="javascript:void(0)" class="secondary-content tooltipped" data-position="right" data-delay="50" data-tooltip="Delete Task"><i class="material-icons removetask">delete</i></a></div>`;
    document.querySelector("#taskerList").appendChild(html);
    document.querySelector("#undoaction").parentElement.remove();

    //save the undo task again
    saveTask(val);
    e.preventDefault();
}

//search tasks
function searchTasks(e){

    let search = tasksearch.value;
    let eachVal = document.querySelectorAll(".collection-item");

    if(eachVal.length != 0){

        eachVal.forEach((v)=>{

            if(v.firstChild.textContent.search(search) != -1){
                v.style.display =  'block';
            }else{
                v.style.display =  'none';
            }
        });

    }else{
        document.querySelectorAll(".collection-item").forEach(()=>{
            v.style.display =  'block';
        });

    }
    e.preventDefault();
}

//save task
function saveTask(val){

    let task = val;
    let tasks;

    if(localStorage.getItem("tasks") == null){

        tasks = [];

    }else{

        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//fetch from local db
function populateDom(){
    
    if(localStorage.getItem("tasks") != null){

        let tasks = JSON.parse(localStorage.getItem('tasks'));

        tasks.forEach((val)=>{

            var html = document.createElement("li");
            html.classList.add("collection-item");
                html.innerHTML = `<div><span id="taskvall">${val}</span><a href="javascript:void(0)" class="secondary-content tooltipped" data-position="right" data-delay="50" data-tooltip="Delete Task"><i class="material-icons removetask">delete</i></a></div>`;
            document.querySelector("#taskerList").appendChild(html);

        });

    }

}

//delete task
function deleteTaskInDb(val){

    if(localStorage.getItem("tasks") != null){

        let tasks = JSON.parse(localStorage.getItem('tasks'));
        
        if(tasks.indexOf(val) != -1){

            tasks.splice(tasks.indexOf(val), 1);
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));

    }

}

