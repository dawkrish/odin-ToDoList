const toggle_btn = document.getElementById("toggle")
const add_btn = document.getElementById("add")
const left = document.getElementById("left")
const right = document.getElementById("right")
const heading_tag  = document.getElementById('heading')
const main = document.getElementsByTagName("main")[0]
const formBox = document.getElementById("form")
const nameTag = document.getElementById('name')
const dateTag = document.getElementById('date')
const timeTag = document.getElementById('time')
const sumbitTag = document.getElementById('sumbit-btn')
const closeBtn = document.getElementById('close')
const taskBox = document.getElementById('task-box')


let task_arr = []
let today_tasks = []
let statusBoxesFalse = []
let statusBoxesTrue = []



function setCurrentTime(){
    var today = new Date(); 
    var hour = today.getHours()
    var min = today.getMinutes()
    if (hour < 10) hour = "0" + hour
    if (min < 10) min = "0" + min

    var t = hour + ":" + min
    return t
}

function setTodayDate(){
    var today = new Date(); 
    var year = today.getFullYear()
    var month = today.getMonth() + 1
    var day = today.getDate()

    if(month < 10) month = "0" + month
    if (day < 10) day = "0" + day

    var t = year + "-" + month + "-" + day
    return t
}
dateTag.setAttribute("value",setTodayDate())
timeTag.setAttribute("value",setCurrentTime())



class Task{
    constructor(name,date,time,status,completed){
        this.name = name
        this.date = date
        this.time = time
        this.status = status
    }

    isToday(){
        return this.date == setTodayDate()
    }

    notInList(){
        this.status = false
    }

    isCompleted(){
        this.completed = true
    }
}

formBox.style.display = "none"

toggle_btn.addEventListener("click",()=>{
    left.classList.toggle("hide")
    main.classList.toggle("grid-template")
})

add_btn.addEventListener("click",()=>{
    formBox.classList.remove('hide')
    formBox.classList.add("show")
    taskBox.innerHTML = ""
    dateTag.setAttribute("value",setTodayDate())
    timeTag.setAttribute("value",setCurrentTime())
})

function closeForm(){
    formBox.classList.remove('show')
    formBox.classList.add('hide')
}

closeBtn.addEventListener('click',()=>{
    formBox.classList.remove('show')
    formBox.classList.add('hide')
    displayInbox()
})

function heading(a){
    heading_tag.innerHTML = a.innerHTML
    if(heading_tag.innerHTML == "Inbox"){
        displayInbox()
    }
    if(heading_tag.innerHTML == "Today"){
        displayToday()
    }
}

function displayInbox(){
    taskBox.innerHTML = ""
    for(let i = 0; i < task_arr.length; i++){
        let t = document.createElement('div')
        let statusClass = "statusFalse"
        if (task_arr[i].status == true) statusClass = "statusTrue"
        t.innerHTML = `<span>${i+1}</span>
                        <span>${task_arr[i].name}</span>
                        <span>${task_arr[i].date}</span>
                        <span>${task_arr[i].time}</span>
                        <span class="status ${statusClass}" tellStatus="false"></span>
                        <button class="remove">Remove</button>`
        t.classList.add('task-row')
        taskBox.appendChild(t)
    }
    let statusBoxes  = document.getElementsByClassName("status")
    for(let i = 0; i < statusBoxes.length; i++){
        statusBoxes[i].addEventListener("click",()=>{
            if(statusBoxes[i].getAttribute("tellStatus") == "false"){
                statusBoxes[i].setAttribute("tellStatus","true")
                statusBoxes[i].style.backgroundColor = "mediumaquamarine"
                task_arr[i].status = true
            }
            else{
                statusBoxes[i].setAttribute("tellStatus","false")
                statusBoxes[i].style.backgroundColor = "lightgrey"
                task_arr[i].status = false
            }
        })
    }

    let removeBoxes = document.getElementsByClassName("remove")
    for(let i = 0; i < removeBoxes.length; i++){
        removeBoxes[i].addEventListener("click",()=>{
            
            for(let j = 0; j < today_tasks.length; j++){
                if(today_tasks[j]==task_arr[i]){
                    today_tasks.splice(j,1)
                }
            }
            task_arr.splice(i,1)
            displayInbox()
        })
    }
}


function displayToday(){
    taskBox.innerHTML = ""
    for(let i = 0; i < today_tasks.length; i++){
        let t = document.createElement('div')
        let statusClass = "statusFalse"
        if (today_tasks[i].status == true) statusClass = "statusTrue"
        t.innerHTML = `<span>${i+1}</span>
                        <span>${today_tasks[i].name}</span>
                        <span>${today_tasks[i].date}</span>
                        <span>${today_tasks[i].time}</span>
                        <span class="status ${statusClass}" tellStatus="false"></span>
                        <button class="remove">Remove</button>`
        t.classList.add('task-row')
        taskBox.appendChild(t)
    }
    let statusBoxes  = document.getElementsByClassName("status")
    for(let i = 0; i < statusBoxes.length; i++){
        statusBoxes[i].addEventListener("click",()=>{
            if(statusBoxes[i].getAttribute("tellStatus") == "false"){
                statusBoxes[i].setAttribute("tellStatus","true")
                statusBoxes[i].style.backgroundColor = "mediumaquamarine"
                today_tasks[i].status = true
            }
            else{
                statusBoxes[i].setAttribute("tellStatus","false")
                statusBoxes[i].style.backgroundColor = "lightgrey"
                today_tasks[i].status = false
            }
        })
    }

    let removeBoxes = document.getElementsByClassName("remove")
    for(let i = 0; i < removeBoxes.length; i++){
        removeBoxes[i].addEventListener("click",()=>{
            for(let j = 0; j < task_arr.length; j++){
                if(task_arr[j]==today_tasks[i]){
                    task_arr.splice(j,1)
                }
            }
            today_tasks.splice(i,1)
            displayInbox()
        })
    }
}





sumbitTag.addEventListener("click",(e)=>{
    e.preventDefault()
    let task = new Task(nameTag.value,dateTag.value,timeTag.value,false)
    task_arr.push(task)
    if(task.isToday()){
        console.log("todays task")
        today_tasks.push(task)
    }
    closeForm()
    if(heading_tag.innerHTML == "Inbox"){
        displayInbox()
    }
    if(heading_tag.innerHTML == "Today"){
        displayToday()
    }
    

})



