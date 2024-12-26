let listItems = document.querySelectorAll('.item')
let listItemsBg = document.querySelector('.sidebar')
let bannerHead = document.querySelector('.banner-head')
let newProjectBtn = document.querySelector('#project-submit-btn')
let allItems = document.querySelector('.all-items')
let addBtn;


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
    handlingTheNewAddBtn(div)
}

function handlingTheNewAddBtn(div) {
    addBtn.addEventListener('click', () => {
        newProjectBtnCount = 1
        let val = document.querySelector('#new-project-inputbox').value
        addingNewDynamicItemInList(val)
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




