let apiKey = "Bearer dcb0cb34-53fb-40b3-a367-68a076ed2611";
let studentPage = document.querySelector("#studentPage");
let promoid = localStorage.getItem("currentPromoId");

let studentNameError = document.querySelector("#studentNameError")
let firstNameError = document.querySelector("#firstNameError")
let ageError = document.querySelector("#ageError")

function getPromobyId() {
    fetch("http://146.59.242.125:3009/promos/" + promoid, {
        method: 'GET',
        headers: {
            "authorization": apiKey
        }
    }).then((response) => {
        response.json().then((data) => {
            if (response.ok) {
                console.log(data);
                console.log("chargement de la promo " + promoid + " réussit")
                data.students.forEach(student => {
                    createNewStudent(student);
                });
            } else {
                console.log("Erreur dans le chargment de la promo")
            }

        });
    });
}
getPromobyId();

function sendStudent() {
    let studentObj = {
        lastName: document.querySelector("#studentName").value,
        firstName: document.querySelector("#studentFirstName").value,
        age: document.querySelector("#studentAge").value,
    };

    console.log(studentObj);
    fetch(`http://146.59.242.125:3009/promos/${promoid}/students`, {
        method: "POST",
        headers: {
            "authorization": apiKey,
            "content-type": "application/json",
        },
        body: JSON.stringify(studentObj)
    }).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                console.log(data);
                console.log("élève ajouté avec succès")
                studentPage.innerHTML = ""
                getPromobyId();
            });
        } else {
            response.json().then((data) => {
                studentNameError.innerHTML = data.errors.firstName.message
                firstNameError.innerHTML = data.errors.lastName.message
                age.innerHTML = data.errors.age.message
            })
            console.log("Erreur l'élève n'a pas été ajouté à promo " + promoid)
        }

    });
}

// function createNewStudent(studentObj) {
//     let detailsContainer = document.createElement("div");
//     detailsContainer.classList.add("detailsContainer");

//     let studentContainer = document.createElement("div");
//     studentContainer.classList.add("studentContainer");

//     let nameDiv = document.createElement("div");
//     nameDiv.innerHTML = studentObj.lastName;

//     let firstnameDiv = document.createElement("div");
//     firstnameDiv.innerHTML = studentObj.firstName;

//     let ageDiv = document.createElement("div");
//     ageDiv.innerHTML = studentObj.age + " ans";

//     let removeStudent = document.createElement("button");
//     removeStudent.innerHTML = "Supprimer";

//     removeStudent.addEventListener("click", () => {
//         studentContainer.remove()
//         deleteStudent(promoid, studentObj._id)
//     });

//     let modifyBtn = document.createElement("button")
//     modifyBtn.innerHTML = "Modifier"

//     modifyBtn.addEventListener("click", () => {
//         modify = true
//     })

//     let modifyStudent = document.createElement("form")
//     let newName = document.createElement("input")
//     newName.placeholder = "Changer le nom"
//     let newFirstName = document.createElement("input")
//     newFirstName.placeholder = "Changer le prénom"
//     let newAge = document.createElement("input")
//     newAge.placeholder = "Changer l'age"

//     let newAddBtn = document.createElement("button");
//     newAddBtn.innerHTML = "Modifier";

//     studentContainer.appendChild(nameDiv);
//     studentContainer.appendChild(firstnameDiv);
//     studentContainer.appendChild(ageDiv);
//     studentContainer.appendChild(removeStudent);
//     studentContainer.appendChild(modifyBtn)
//     modifyStudent.appendChild(newName)
//     modifyStudent.appendChild(newFirstName)
//     modifyStudent.appendChild(newAge)
//     studentContainer.appendChild(modifyStudent)
//     detailsContainer.appendChild(studentContainer);
//     studentPage.appendChild(detailsContainer);

//     if (modify == false) {
//         modifyStudent.style.display = "none"
//     }
//     else {
//         modifyStudent.style.display = "flex"
//     }

// }


function createNewStudent(studentObj) {
    let detailsContainer = document.createElement("div");
    detailsContainer.classList.add("detailsContainer");

    let studentContainer = document.createElement("div");
    studentContainer.classList.add("studentContainer");

    let nameDiv = document.createElement("div");
    nameDiv.innerHTML = studentObj.lastName;

    let firstnameDiv = document.createElement("div");
    firstnameDiv.innerHTML = studentObj.firstName;

    let ageDiv = document.createElement("div");
    ageDiv.innerHTML = studentObj.age + " ans";

    let removeStudent = document.createElement("button");
    removeStudent.innerHTML = "Supprimer";

    removeStudent.addEventListener("click", () => {
        studentContainer.remove();
        deleteStudent(promoid, studentObj._id);
    });

    let modifyBtn = document.createElement("button");
    modifyBtn.innerHTML = "Modifier";

    let modifyStudent = document.createElement("form");
    modifyStudent.classList.add("modifyForm");

    let newName = document.createElement("input");
    newName.placeholder = "Changer le nom";
    let newFirstName = document.createElement("input");
    newFirstName.placeholder = "Changer le prénom";
    let newAge = document.createElement("input");
    newAge.placeholder = "Changer l'âge";

    let newAddBtn = document.createElement("button");
    newAddBtn.innerHTML = "Enregistrer";

    modifyStudent.appendChild(newName);
    modifyStudent.appendChild(newFirstName);
    modifyStudent.appendChild(newAge);
    modifyStudent.appendChild(newAddBtn);
    modifyStudent.style.display = "none";

    modifyBtn.addEventListener("click", () => {
        modifyStudent.style.display = modifyStudent.style.display === "none" ? "block" : "none";
    });

    newAddBtn.addEventListener("click", (e) => {
        e.preventDefault();
        studentObj.lastName = newName.value || studentObj.lastName;
        studentObj.firstName = newFirstName.value || studentObj.firstName;
        studentObj.age = newAge.value || studentObj.age;

        nameDiv.innerHTML = studentObj.lastName;
        firstnameDiv.innerHTML = studentObj.firstName;
        ageDiv.innerHTML = studentObj.age + " ans";

        modifyStudent.style.display = "none";
    });

    studentContainer.appendChild(nameDiv);
    studentContainer.appendChild(firstnameDiv);
    studentContainer.appendChild(ageDiv);
    studentContainer.appendChild(removeStudent);
    studentContainer.appendChild(modifyBtn);
    studentContainer.appendChild(modifyStudent);
    detailsContainer.appendChild(studentContainer);
    studentPage.appendChild(detailsContainer);
}



function deleteStudent(promoid, id) {
    fetch("http://146.59.242.125:3009/promos/" + promoid + "/students/" + id, {
        method: 'DELETE',
        headers: {
            "authorization": apiKey
        }
    }).then((response) => {
        if (response.ok) {
            console.log(`student with ID ${id} deleted successfully.`);
        } else {
            console.log(`Failed to delete student with ID ${id}`);
        }
    });
}
