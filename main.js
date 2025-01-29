export default class Tasks {
    constructor(project, title, details, date, favFlag = false, icon = 'new-star', flagImg = "images/new-star.png") {
        this.project = project;
        this.title = title;
        this.details = details;
        this.date = date;
        this.favFlag = favFlag;
        this.icon = icon;
        this.flagImg = flagImg
    }

    calculateTimeInms() {
        let newDate = new Date(this.date)
        let newTime = newDate.getTime()
        return newTime
    }

    calculateDate() {
        if (this.date != 'No Due Date') {
            let newDate = new Date(this.date)
            newDate = newDate.toISOString().split('T')[0]
            return newDate
        }
    }

    calculateId() {
        let id = this.title + this.details.slice(0, 5)
        return id
    }
}











// let tasks = [];

// function Task(project, title, details, date, favFlag, checkBox) {
//     this.project = project;
//     this.title = title;
//     this.details = details;
//     this.date = date;
//     this.favFlag = favFlag;
//     this.checkBox = checkBox;

//     this.displayTasks = function () {
//         if ()
//     }

// }


// let gym = new Task()