let inputBox = document.querySelector('.todo-body input');
let addBtn = document.querySelector('.todo-body button');
let todoList = document.querySelector('.todo-list');
let deleteBtn = document.querySelector('.footer button');

inputBox.onkeyup = function(){
    let userEnteredValue = inputBox.value;
    if(userEnteredValue.trim() !== 0){
        addBtn.classList.add('active');
    }
    else{
        addBtn.classList.remove('active');
    }
}

addBtn.onclick = function(){
    let userEnteredValue = inputBox.value;
    let getLocalStorageData = localStorage.getItem("new data");
    /*
    ******** Bu usul ham togri lekin pastdagisi sepread operatori bilan ishlangan *****************

    if(getLocalStorageData === null){
        arrayList = [];
    }
    else{
        arrayList = JSON.parse(getLocalStorageData);
    }
    arrayList.push(userEnteredValue);
    localStorage.setItem("new data",arrayList);


    */
    
    let arrayList = JSON.parse(getLocalStorageData) || [];
    localStorage.setItem("new data", JSON.stringify([...arrayList,userEnteredValue]));
    showTasks();
    addBtn.classList.remove("active");
}

    function showTasks(){
        let getLocalStorageData = localStorage.getItem("new data");
        console.log(getLocalStorageData);

        let listArray = JSON.parse(getLocalStorageData) || [];

        const count = document.querySelector('.count');

        count.textContent = listArray.length;

        listArray.length > 0 ? deleteBtn.classList.add("active") : addBtn.classList.remove("active");

        let newLiTeg = "";

        listArray.forEach((element,index) => {
            newLiTeg += 
            `<li>${element}
                <span class="icon" onclick="deleteTask(${index})">
                    <i class="fas fa-trash"></i>
                </span>
            </li>`
        });
            todoList.innerHTML = newLiTeg;
            inputBox.value = "";
}

function deleteTask(index){
    let listArray =  JSON.parse(localStorage.getItem("new data"));
    listArray.splice(index,1);
    localStorage.setItem("new data", JSON.stringify(listArray));
    showTasks();
}

deleteBtn.onclick = function(){
    listArray = [];
    localStorage.setItem("new data", JSON.stringify(listArray));
    showTasks();
}