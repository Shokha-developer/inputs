let container = document.querySelector('.container')
let btn = document.querySelector('.todo button')
let modal = document.querySelector(".modal")
let closeModal = document.querySelector(".modal__close")
let saveBtn = document.querySelector(".edited button")
let content = document.querySelector(".modal__content")
let form = document.forms.todo
let form_modal = document.forms.edited
let input = form_modal.querySelector(".modal__input")







let arr = [
    {
        id: 1,
        task: "Купить теслу",
        time: "10:45",
        isDone: false
    },
    {
        id: 2,
        task: "Купить молоко",
        time: "05:45",
        isDone: true
    },
    {
        id: 3,
        task: "Пойти по кушать",
        time: "08:50",
        isDone: false
    },
]


function reload() {
    container.innerHTML = ""

    for (let item of arr) {
        let div = document.createElement('div')
        let topDiv = document.createElement('div')
        let spanB = document.createElement('span')
        let btnRemove = document.createElement('button')
        let imgX = document.createElement('img')
        let editImg = document.createElement('img')
        let span = document.createElement('span')

        // class
        div.classList.add('item')
        topDiv.classList.add('top')
        spanB.classList.add('b')
        if (item.isDone === true) {
            spanB.classList.add('strike')
        }
        btnRemove.classList.add('remove')
        // text
        spanB.innerHTML = item.task
        span.innerHTML = item.time
        // attribute
        imgX.src = "./assets/icons/x.svg"
        imgX.alt = "remove image"
        editImg.src = "./assets/icons/edit.svg"
        editImg.alt = "edit"

        // append

        btnRemove.append(editImg, imgX)
        topDiv.append(spanB, btnRemove)
        div.append(topDiv, span)

        container.append(div)

        // functions

        imgX.onclick = () => {
            arr = arr.filter(i => i.id !== item.id)
            reload()
        }

        spanB.onclick = () => {
            item.isDone = !item.isDone

            reload()
            // spanB.classList.add('active')
        }
        editImg.onclick = () => {
            modal.classList.add("show")
            form_modal.onsubmit = (event) => {
                event.preventDefault()
                modal.classList.remove("show")

                let editedTsk = {}

                let fn = new FormData(form_modal)

                fn.forEach((value, key) => {
                    editedTsk[key] = value
                })

                item.task = input.value

                reload()
            }
        }
        closeModal.onclick = () => {
            modal.classList.remove("show")
        }
    }
}

reload()


form.onsubmit = (e) => {
    e.preventDefault()

    let task = {
        id: Math.random(),
        isDone: false,
        time: new Date().getHours() + ":" + new Date().getMinutes()
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        task[key] = value
    });

    arr.push(task);
    reload()
}
