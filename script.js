let listItems = document.querySelectorAll('.item')
// let lowerListItems = document.querySelectorAll('.lower-item')
let listItemsBg = document.querySelector('.sidebar')
let bannerHead = document.querySelector('.banner-head')
let newProjectBtn = document.querySelector('#project-submit-btn')
let allItems = document.querySelector('.all-items')
let addBtn, cancelBtn;
let dropBoxBtns = document.querySelectorAll('.more-options')
let dropBox = document.querySelector('.dropbox')
let burgerBtn = document.querySelector('.menu-icon')
let sidebar = document.querySelector('.sidebar')
let dropboxDiv;
let selectedDiv = document.querySelector('.upper-sidebar').children[1]



//creating the database

let projects = ['Work', 'Study', 'Gym']

// function ProjectData(projectName) {
//   this.projectName = projectName
// }

// function addProject(value) {
//   const project = new ProjectData(value)
//   projects.push(project)
//   resetingTheLowerSidebar()
//   fillingTheLowerSidebar(projects)
// }



//handling the top left burger button in the header
let sidebarFlag = true
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
  // console.log(dropboxDiv)
  if (dropboxDiv != undefined) {
    dropboxDiv.remove()
  }
})


function moreOptionsBtnFunc() {
  let lowerSideBarListItems = document.querySelectorAll('.lower-item')
  lowerSideBarListItems.forEach((listItem) => {
    listItem.lastElementChild.addEventListener('click', (e) => {
      let temp = listItem
      if (dropboxDiv == undefined) {
        // e.stopPropagation()
        dropboxDiv = document.createElement('div')
        dropboxDiv.classList.add('dropbox');
        dropboxDiv.innerHTML =
          `<div class="edit-btn">Rename</div>
        <div class="delete-btn">Delete</div>`
        listItem.prepend(dropboxDiv)
      }
      else {
        dropboxDiv.remove()
        // e.stopPropagation()
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
          renameInputboxValue = document.querySelector('#rename-project-inputbox').value
          const index = projects.indexOf(projectName);
          projects[index] = renameInputboxValue
          resetingTheLowerSidebar()
          fillingTheLowerSidebar(projects)
        })

        let cancelBtn = document.querySelector('.cancel-btn')
        cancelBtn.addEventListener('click', () => {
          console.log(renameAndCancelBox)
          console.log(temp)
          renameAndCancelBox.replaceWith(temp)
        })


      })
    })
  })
}



//adding new value inside the sidebar
let newProjectBtnCount = 1;
newProjectBtn.addEventListener('click', () => {
  if (newProjectBtnCount == 1) {
    addNewProjectBox()
    newProjectBtnCount = 0
  }
})


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
  })
  cancelBtn.addEventListener('click', () => {
    newProjectBtnCount = 1
    div.remove()
  })
}



function fillingTheLowerSidebar(projects) {
  projects.forEach((project) => {
    let projectDiv = document.createElement('div')
    projectDiv.classList.add('lower-item')
    projectDiv.innerHTML =
      `<img src="images/burger-bar.png" alt="icon not found" />
    <div class="item-name">${project}</div>
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

fillingTheLowerSidebar(projects);


function resetingTheLowerSidebar() {
  allItems.innerHTML = ''
}


// function handlingTheRenameDeleteBtns(div) {
//   let dropBoxDeleteBtn = document.querySelector('.delete-btn')
//   dropBoxDeleteBtn.addEventListener('click', () => {
//     let indexOfItem =
//       projects.pop()
//     resetingTheLowerSidebar()
//     fillingTheLowerSidebar(projects)
//   })
// }


listItems.forEach((item) => {
  item.addEventListener('click', () => {
    selectedDiv = item
    tempDiv.style.backgroundColor = ''
    selectingTheListItemsFunc(selectedDiv.textContent)
  })
})


function selectingTheListItemsFunc(name = selectedDiv.textContent) {
  selectedDiv.style.backgroundColor = '#A0E0BB'
  bannerHead.innerHTML = name
  tempDiv = selectedDiv
}

let tempDiv = selectedDiv;
selectingTheListItemsFunc(selectedDiv.textContent)