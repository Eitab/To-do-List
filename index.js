let input=document.querySelector(".input");
let submit=document.querySelector(".add");
let tasksDiv=document.querySelector(".tasks");

//empty array to store the tasks
let arrayOfTasks=[];

//check if Theres task in Local Storage...when we reload the page
if(localStorage.getItem("tasks")){ // if we have tasks already
    arrayOfTasks=JSON.parse(localStorage.getItem("tasks"))
}

//Trigger get data from Local Storage function
getDataFromLocalStorage();

//Add task
submit.onclick = function(){
    if(input.value!=""){
        addTaskToArray(input.value); //add task to array of taskss
        input.value=""; // after add we want to get empty input field
    }
};

//Click on Task Element
tasksDiv.addEventListener("click",(e)=>{
    // Delete Button
    if(e.target.classList.contains("del")){
         //remove Task from Local Storage
         deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //remove element from page(span)
        e.target.parentElement.remove(); //but if we reload the element back so we need to remove from local storage
    }
     //task Element
     if(e.target.classList.contains("task")){
         //toggle completed for the task
         toggleStatusTaskWith(e.target.getAttribute("data-id"))
         //toggle done class
         e.target.classList.toggle("done");
     }

});

function addTaskToArray(taskText) { //taskText= input.value that user insert
    // Task Data
    const task = {
      id: Date.now(),// use the date to make id
      title: taskText,
      completed: false,
    };
    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);
    //Add Tasks to Page
    addElementsToPageFrom(arrayOfTasks);
    //add task to local storage
    addDataToLocalStorageFrom(arrayOfTasks);

}

function addElementsToPageFrom(arrayOfTasks){
    //empty task div
    tasksDiv.innerHTML="";
    //Looping on Array of tasks
    arrayOfTasks.forEach((task) =>{
        //create main Div
        let div=document.createElement("div");//create new div to store the tasks
        div.className="task";
        //check if task done
        if(task.completed==true){
            div.className="task done";
        }
        div.setAttribute("data-id", task.id);//the value of"data-id" is task.id
        div.appendChild(document.createTextNode(task.title));
        //create delete button
        let span=document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("Delete"));
        //append button to main div
        div.appendChild(span);
        //add task div to tasks contanier
        tasksDiv.appendChild(div);

    });

}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));//stringify:converts javascript value to json string(key:tasks, value:json....)
  }
  function getDataFromLocalStorage(){
      let data=window.localStorage.getItem("tasks");
      if(data){ // to make sure if data is exists
          let tasks=JSON.parse(data) //tasks:array that contains data that exists in localStorage
          addElementsToPageFrom(tasks);// to show all the tasks in the page when we want to insert or reload
      }
  }
  function deleteTaskWith(taskId){
      //loop over the arrayOfTasks and get all the task id except task if of the task that we want to remove
      arrayOfTasks=arrayOfTasks.filter((task)=>task.id!=taskId) 
      addDataToLocalStorageFrom(arrayOfTasks) //update the local storage 
  }
function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i].id == taskId) {
        arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
      }
    }
    addDataToLocalStorageFrom(arrayOfTasks);

}


  //1. when we open the page for the first time => arrayOfTasks is empty
  //2. check if localStorage if there are tasks => so arrayOfTasks=the data that exists in local storage
  //3. getDataFromLocalStorage this function check there data in local storage and shows this data in the page
