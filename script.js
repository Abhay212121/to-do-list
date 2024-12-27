let listItems = document.querySelectorAll('.item')
let listItemsBg = document.querySelector('.sidebar')
let bannerHead = document.querySelector('.banner-head')
let newProjectBtn = document.querySelector('#project-submit-btn')
let allItems = document.querySelector('.all-items')
let addBtn, cancelBtn;
let dropBoxBtns = document.querySelectorAll('.more-options')
let dropBox = document.querySelector('.dropbox')
let lowerSideBarListItems = document.querySelectorAll('.lower-item')
let dropboxDiv;

let newProjectBtnCount = 1;
newProjectBtn.addEventListener('click', () => {
  if (newProjectBtnCount == 1) {
    addNewProjectBox()
    newProjectBtnCount = 0
  }
})

document.addEventListener('click', (e) => {
  if (dropboxDiv != undefined) {
    dropboxDiv.remove()
  }
})


lowerSideBarListItems.forEach((listItem) => {

  listItem.lastElementChild.addEventListener('click', (e) => {
    if (dropboxDiv == undefined) {
      dropboxDiv = document.createElement('div')
      dropboxDiv.classList.add('dropbox');
      dropboxDiv.innerHTML =
        `<div class="edit-btn">Rename</div>
      <div class="delete-btn">Delete</div>`
      listItem.prepend(dropboxDiv)
      e.stopPropagation()
    }

    else {
      dropboxDiv.remove()
      dropboxDiv = document.createElement('div')
      dropboxDiv.classList.add('dropbox');
      dropboxDiv.innerHTML =
        `<div class="edit-btn">Rename</div>
      <div class="delete-btn">Delete</div>`
      listItem.prepend(dropboxDiv)
      e.stopPropagation()

    }

  })
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
    addingNewDynamicItemInList(val)
    div.remove()
  })
  cancelBtn.addEventListener('click', () => {
    newProjectBtnCount = 1
    div.remove()
  })
}

function addingNewDynamicItemInList(val) {
  let div = document.createElement('div');
  div.innerHTML =
    `<div class="item">
    <img
      src="images/burger-bar.png"
      alt="icon not found"
      class="more-options"
    />
    <div class="item">${val}</div>
    <img
      src="images/more options.png"
      alt="not found"
      class="more-options"
    />
  </div>`

  allItems.append(div)
}

// listItems.forEach((item) => {
//   item.addEventListener('click', (e) => {
//     e.stopPropagation()
//     console.log(item)
//     // bannerHead.textContent = item[2].textContent
//   })

// })


