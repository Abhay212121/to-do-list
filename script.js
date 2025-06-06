import Tasks from './main.js';

let listItems = document.querySelectorAll('.item')
let bannerHead = document.querySelector('.banner-head')
let newProjectBtn = document.querySelector('#project-submit-btn')
let allItems = document.querySelector('.all-items')
let dropBoxBtns = document.querySelectorAll('.more-options')
let dropBox = document.querySelector('.dropbox')
let burgerBtn = document.querySelector('.menu-icon')
let sidebar = document.querySelector('.sidebar')


let selectedDiv = document.querySelector('.upper-sidebar').children[1]
let sidebarFlag = true
let tempDiv = selectedDiv;
let newProjectBtnCount = 1;
let dropboxDiv;
let addBtn, cancelBtn;

//creating the database
let projects = ['Work', 'Study', 'Gym']
let tasksArr = []


selectingTheListItemsFunc(selectedDiv.textContent)
fillingTheLowerSidebar(projects);


listItems.forEach((item) => {
  item.addEventListener('click', () => {
    selectedDiv = item
    tempDiv.style.backgroundColor = ''
    selectingTheListItemsFunc(selectedDiv.textContent)
  })
})


function moreOptionsBtnFunc() {
  let lowerSideBarListItems = document.querySelectorAll('.lower-item')
  lowerSideBarListItems.forEach((listItem) => {
    listItem.lastElementChild.addEventListener('click', (e) => {
      let temp = listItem
      if (dropboxDiv == undefined) {
        dropboxDiv = document.createElement('div')
        dropboxDiv.classList.add('dropbox');
        dropboxDiv.innerHTML =
          `<div class="edit-btn">Rename</div>
        <div class="delete-btn">Delete</div>`
        listItem.prepend(dropboxDiv)
      }
      else {
        dropboxDiv.remove()
        dropboxDiv = document.createElement('div')
        dropboxDiv.classList.add('dropbox');
        dropboxDiv.innerHTML =
          `<div class="edit-btn">Rename</div>
        <div class="delete-btn">Delete</div>`
        listItem.prepend(dropboxDiv)
      }

      let projectName = listItem.querySelector('.item-name').innerHTML
      let dropBoxDeleteBtn = document.querySelector('.delete-btn')
      dropBoxDeleteBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        selectedDiv = document.querySelector('.upper-sidebar').children[1]
        let filteredArray = projects.filter(e => e !== projectName)
        projects = filteredArray
        resetingTheLowerSidebar()
        fillingTheLowerSidebar(projects)
        selectingTheListItemsFunc()
        clearingTheResultDiv()
        tempArr = tasksArr.filter((element) => element.project == selectedDiv.querySelector('.item-name').innerHTML)
        generatingTasks(tempArr)
      })

      let dropBoxRenameBtn = document.querySelector('.edit-btn')
      dropBoxRenameBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        let renameAndCancelBox = document.createElement('div')
        renameAndCancelBox.classList.add('rename-inputbox-section')
        renameAndCancelBox.innerHTML =
          `<div class="rename-inputbox-section-above">
          <img
            src="images/burger-bar.png"
            alt="icon not found"
            class="more-options"
          />
          <input
            type="text"
            id="rename-project-inputbox"
            value = ${projectName}
          />
        </div>
        <div class="rename-inputbox-section-below">
          <button class="btn1 rename-btn">Rename</button>
          <button class="btn2 cancel-btn">Cancel</button>
        </div>`
        listItem.append(renameAndCancelBox)
        listItem.replaceWith(renameAndCancelBox)

        //new two buttons
        let renameBtn = document.querySelector('.rename-btn')
        renameBtn.addEventListener('click', () => {
          let renameInputboxValue = document.querySelector('#rename-project-inputbox').value
          const index = projects.indexOf(projectName);
          projects[index] = renameInputboxValue
          resetingTheLowerSidebar()
          fillingTheLowerSidebar(projects)
        })

        let cancelBtn = document.querySelector('.cancel-btn')
        cancelBtn.addEventListener('click', () => {
          renameAndCancelBox.replaceWith(temp)
        })


      })
    })
  })
}


function addNewProjectBox() {
  let div = document.createElement('div');
  div.innerHTML =
    `<div class="new-project-inputbox-section">
    <div class="new-project-inputbox-section-above">
      <img
        src="images/burger-bar.png"
        alt="icon not found"
        class="more-options"
      />
      <input
        type="text"
        placeholder="Enter Project Name"
        id="new-project-inputbox"
      />
    </div>
    <div class="new-project-inputbox-section-below">
      <button class="btn1">Add</button>
      <button class="btn2">Cancel</button>
    </div>
  </div>`
  allItems.append(div);
  addBtn = document.querySelector('.btn1');
  cancelBtn = document.querySelector('.btn2')
  handlingTheNewBtns(div)
}

function handlingTheNewBtns(div) {
  addBtn.addEventListener('click', () => {
    newProjectBtnCount = 1
    let val = document.querySelector('#new-project-inputbox').value
    projects.push(val)
    resetingTheLowerSidebar()
    fillingTheLowerSidebar(projects)
    div.remove()
    addingFunctionalitiesInLowerSidebar()
  })
  cancelBtn.addEventListener('click', () => {
    newProjectBtnCount = 1
    div.remove()
  })
}


function fillingTheLowerSidebar(projects) {
  projects.forEach((project) => {
    let projectDiv = document.createElement('div')
    projectDiv.classList.add('lower-item', 'lower-sidebar-item')
    projectDiv.innerHTML =
      `<img src="images/burger-bar.png" alt="icon not found" class= 'pencil' />
    <div class="item-name ">${project}</div>
    <img
      src="images/more options.png"
      alt="not found"
      class="more-options"
    />`

    projectDiv.addEventListener('click', (e) => {
      e.stopPropagation()
      selectedDiv = projectDiv
      tempDiv.style.backgroundColor = ''
      selectingTheListItemsFunc(project)
    })
    allItems.append(projectDiv)
  })
  moreOptionsBtnFunc()
}


function resetingTheLowerSidebar() {
  allItems.innerHTML = ''
}


function selectingTheListItemsFunc(name = selectedDiv.textContent) {
  selectedDiv.style.backgroundColor = '#A0E0BB'
  bannerHead.innerHTML = name
  tempDiv = selectedDiv
}


//handling the top left burger button in the header
burgerBtn.addEventListener('click', () => {
  if (sidebarFlag) {
    sidebar.style.display = 'none';
    sidebarFlag = false
  }
  else {
    sidebar.style.display = 'inline'
    sidebarFlag = true
  }
})



//removing the dropbox
document.addEventListener('click', () => {
  if (dropboxDiv != undefined) {
    dropboxDiv.remove()
  }
})


//adding the projectbox
newProjectBtn.addEventListener('click', () => {
  if (newProjectBtnCount == 1) {
    addNewProjectBox()
    newProjectBtnCount = 0
  }
})









//handling the new task form

let mainSection = document.querySelector('.main-section')
let bannerReferenceNode = document.querySelector('.banner')
let addNewTaskBtnFlag = 0






let addNewTaskBtn = document.querySelector('.add-new-task')
let formDiv = document.createElement('div');


function handlingTheAddNewTaskBtn() {
  addNewTaskBtn.addEventListener('click', () => {

    if (addNewTaskBtnFlag == 0) {
      formDiv = document.createElement('div');
      formDiv.classList.add('task-section')
      formDiv.innerHTML =
        `<div class="task-input-form">
      <div class="div-task-title div-flex">
      <label for="task-title">Title:</label>
      <input
      type="text"
      id="task-title"
      placeholder="What to do?"
      required
      />
      </div>
      <label for="task-details">Details(optional):</label>
      <textarea
      placeholder="Mushkil waqt Commando sakht!"
      class="div-task-details div-flex"
      rows="5"
      ></textarea>
      
      <div class="div-task-deadline div-flex">
      <label for="task-deadline">Date:</label>
      <input type="date" id="task-deadline" />
      </div>
      <div class="button-section-task-input-form">
      <button class="btn1" id="add-button-task-input-form">Add</button>
      <button class="btn2" id="cancel-button-task-input-form">
      Cancel
      </button>
      </div>
      </div>`
      addTaskBtnReferenceNode.before(formDiv)


      addNewTaskBtnFlag = 1;
      //handling the add btn
      let addButtonTaskInputForm = document.querySelector('#add-button-task-input-form')
      let taskTitle = document.querySelector('#task-title')
      let TaskDetails = document.querySelector('.div-task-details')
      let TaskDeadline = document.querySelector('#task-deadline')

      addButtonTaskInputForm.addEventListener('click', () => {
        let taskTitleVal = taskTitle.value
        let TaskDetailsVal = TaskDetails.value
        if (taskTitleVal != '' || TaskDetailsVal != '') {

          let TaskDeadlineVal = TaskDeadline.value
          let directoryName = selectedDiv.querySelector('.item-name').innerHTML
          let task = new Tasks(count, directoryName, taskTitleVal, TaskDetailsVal, TaskDeadlineVal)
          tasksArr.push(task)
          count++
          formDiv.remove()
          clearingTheResultDiv()
          tempArr = tasksArr.filter((element) => element.project == selectedDiv.querySelector('.item-name').innerHTML)
          generatingTasks(tempArr)
        }
      })

      //handling the cancel btn
      let cancelButtonTaskInputForm = document.querySelector('#cancel-button-task-input-form')
      cancelButtonTaskInputForm.addEventListener('click', () => {
        formDiv.remove()
        addNewTaskBtnFlag = 0
      })
    }
  })
}

let count = 0;
let tempArr;

let lowerSidebarItems = document.querySelectorAll('.lower-sidebar-item')
addingFunctionalitiesInLowerSidebar()
function addingFunctionalitiesInLowerSidebar() {
  lowerSidebarItems = document.querySelectorAll('.lower-sidebar-item')
  lowerSidebarItems.forEach((item) => {
    item.addEventListener('click', () => {
      clearingTheResultDiv()
      addNewTaskBtn.style.display = 'flex'
      formDiv.remove()
      addNewTaskBtnFlag = 0
      tempArr = tasksArr.filter((element) => element.project == selectedDiv.querySelector('.item-name').innerHTML)
      generatingTasks(tempArr)
      handlingTheAddNewTaskBtn()
    })

  })
}

addNewTaskBtn.style.display = 'none'
let upperSidebarItems = document.querySelectorAll('.upper-sidebar-item')

upperSidebarItems.forEach((item) => {
  item.addEventListener('click', () => {
    addNewTaskBtn.style.display = 'none'
  })
})




let addTaskBtnReferenceNode = document.querySelector('.add-new-task')
let resultDiv = document.createElement('div')

function generatingTasks(newArray) {
  resultDiv.remove()
  newArray.forEach((item) => {
    resultDiv = document.createElement('div')
    if (item.date == '') {
      item.date = 'No Due Date'
    }
    resultDiv.classList.add('form-output')
    resultDiv.innerHTML =
      `<div class="left-of-form-output">
      <input type="checkbox" id="task-checkbox" />
      <div class="task-title-and-task-description-display">

      <p class="form-output-title-display ${(item.completed) ? 'completed' : ''}">${item.title}</p>
      <p class="form-output-description-display ${(item.completed) ? 'completed' : ''}">${item.details}</p>
      
      </div>
      </div>
      <div class="right-of-form-output">
      <div class="date">${item.date}</div>
      <img
      src=${item.flagImg}
      alt="star not found"
      class="new-star"
      />
      <img
      src="images/delete.png"
      alt="more options icon"
      class="more-options-form-output"
      />
      </div>`
    addTaskBtnReferenceNode.before(resultDiv)
    addNewTaskBtnFlag = 0


    let checkbox = resultDiv.querySelector('#task-checkbox')
    let starBtn = resultDiv.querySelector('.new-star')
    let delBtn = resultDiv.querySelector('.more-options-form-output')

    let title = resultDiv.querySelector('.form-output-title-display')
    let desc = resultDiv.querySelector('.form-output-description-display')

    let tempArr = tasksArr.filter((element) => element.project == selectedDiv.querySelector('.item-name').innerHTML)

    //handling the checked functionality
    checkbox.addEventListener('click', () => {

      title.classList.toggle('completed')
      desc.classList.toggle('completed')
      tasksArr[item.id].completed = !tasksArr[item.id].completed
      clearingTheResultDiv()
      // generatingTasks(tempArr)

      if (selectedDiv.querySelector('.item-name').innerHTML == 'All Tasks') {
        generatingTasks(tasksArr)
      }

      else if (selectedDiv.querySelector('.item-name').innerHTML == 'Today') {
        todayData()
      }

      else if (selectedDiv.querySelector('.item-name').innerHTML == 'Next 7 Days') {
        weekData()
      }
      else if (selectedDiv.querySelector('.item-name').innerHTML == 'Important') {
        favData()
      }
      else {
        generatingTasks(tempArr)
      }

    })

    //handling the star btn functionality
    starBtn.addEventListener('click', () => {

      tempArr = tasksArr.filter((element) => element.project == selectedDiv.querySelector('.item-name').innerHTML)

      if (!item.favFlag) {
        item.flagImg = "images/glowing-star.png"
        item.favFlag = true;
      }

      else {
        item.flagImg = "images/new-star.png"
        item.favFlag = false
      }

      clearingTheResultDiv()
      // generatingTasks(tempArr)

      if (selectedDiv.querySelector('.item-name').innerHTML == 'All Tasks') {
        generatingTasks(tasksArr)
      }

      else if (selectedDiv.querySelector('.item-name').innerHTML == 'Today') {
        todayData()
      }

      else if (selectedDiv.querySelector('.item-name').innerHTML == 'Next 7 Days') {
        weekData()
      }
      else if (selectedDiv.querySelector('.item-name').innerHTML == 'Important') {
        favData()
      }
      else {
        generatingTasks(tempArr)
      }
    })

    // handlingTheDeleteBtn()
    delBtn.addEventListener('click', () => {
      tasksArr = tasksArr.filter(element => element.id != item.id)
      tempArr = tasksArr.filter((element) => element.project == selectedDiv.querySelector('.item-name').innerHTML)
      clearingTheResultDiv()
      // generatingTasks(tempArr)

      if (selectedDiv.querySelector('.item-name').innerHTML == 'All Tasks') {
        generatingTasks(tasksArr)
      }

      else if (selectedDiv.querySelector('.item-name').innerHTML == 'Today') {
        todayData()
      }

      else if (selectedDiv.querySelector('.item-name').innerHTML == 'Next 7 Days') {
        weekData()
      }
      else if (selectedDiv.querySelector('.item-name').innerHTML == 'Important') {
        favData()
      }
      else {
        generatingTasks(tempArr)
      }
    })
  })
}

function clearingTheResultDiv() {
  let formOutputSection = document.querySelectorAll('.form-output')
  formOutputSection.forEach((item) => {
    item.remove()
  })
}


upperSidebarItems.forEach((item) => {
  item.addEventListener('click', () => {
    clearingTheResultDiv()
    formDiv.remove()

    let tempName = item.querySelector('.item-name').textContent

    if (tempName == 'All Tasks') {
      generatingTasks(tasksArr)
    }

    else if (tempName == 'Today') {
      todayData()
    }

    else if (tempName == 'Next 7 Days') {
      weekData()
    }

    else if (tempName == 'Important') {
      favData()
      let outputBox = document.querySelectorAll('.form-output')
      outputBox.forEach((temp) => {
        let starBtn = temp.lastElementChild.getElementsByTagName('img')[0]
        starBtn.addEventListener('click', () => {
          clearingTheResultDiv()
          favData()
        })
      })
    }
  })
})

function todayData() {
  let today = new Date()
  today = today.toISOString().split('T')[0]

  const tempDailyArr = tasksArr.filter((element) => {
    if (element.calculateDate() == today) {
      return element
    }
  })

  generatingTasks(tempDailyArr)
}

function weekData() {
  let today = new Date()
  today = today.toISOString().split('T')[0]

  const tempWeeklyArr = tasksArr.filter((element) => {
    let todayDateArr = today.split('-')
    let taskDateArr = element.calculateDate().split('-')

    if (todayDateArr[0] == taskDateArr[0]) {
      if (todayDateArr[1] == taskDateArr[1]) {
        if (taskDateArr[2] - todayDateArr[2] >= 0 && taskDateArr[2] - todayDateArr[2] < 7) {
          return element
        }
      }
      else {
        if ((taskDateArr[2] + +30) - todayDateArr[2] >= 0 && (taskDateArr[2] + +30) - todayDateArr[2] < 7) {
          return element
        }
      }
    }
    else {
      if ((taskDateArr[2] + +365 + 30) - (todayDateArr[2] + +365) >= 0 && (taskDateArr[2] + +365 + 30) - (todayDateArr[2] + +365) < 7) {
        return element
      }
    }
  })

  generatingTasks(tempWeeklyArr)
}

function favData() {
  const tempArr = tasksArr.filter((element) => {
    if (element.favFlag == true) {
      return element
    }
  })
  generatingTasks(tempArr)
}
