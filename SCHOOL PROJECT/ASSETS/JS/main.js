

let apiKey = "Bearer dcb0cb34-53fb-40b3-a367-68a076ed2611";
let newContent = document.querySelector("#newContent");
let studentPage = document.querySelector("#studentPage");
let nameError = document.querySelector("#nameError")
let startDateError = document.querySelector("#startDateError")
let endDateError = document.querySelector("#endDateError")


function getPromo() {
    fetch("http://146.59.242.125:3009/promos", {
        method: 'GET',
        headers: {
            "authorization": apiKey
        }
    }).then((response) => {
        if (response.ok) {
            response.json().then((data) => {

                console.log("vos promos")
                console.log(data);
                data.forEach(promo => {
                    createPromo(promo);
                });
            });
        } else {
            console.log("erreur de saisie");
        }

    });
}
getPromo();

function send() {
    let obj = {
        name: document.querySelector("#name").value,
        startDate: document.querySelector("#start").value,
        endDate: document.querySelector("#end").value,
    };


    console.log(obj);
    fetch("http://146.59.242.125:3009/promos", {
        method: "POST",
        headers: {
            "authorization": apiKey,
            "content-type": "application/json",
        },
        body: JSON.stringify(obj)
    }).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                console.log(data);
                console.log("Nouvelle promo créée avec succès");
                newContent.innerHTML = ""
                getPromo()
            });
        } else {
            response.json().then((data) => {
                nameError.innerHTML = data.errors.name.message
                startDateError.innerHTML = data.errors.startDate.message
                endDateError.innerHTML = data.errors.endDate.message
                console.log("erreur de saisie")

            })
        }

    });
}

function createPromo(obj) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("newDiv");

    let nameTitle = document.createElement("h4");
    nameTitle.innerHTML = obj.name;
    let startDate = document.createElement("p");
    const startDateValue = new Date(obj.startDate);
    startDate.innerHTML = `${startDateValue.getDate()} /${startDateValue.getMonth() + 1}/${startDateValue.getFullYear()}`;


    let endDate = document.createElement("p");
    const endDateValue = new Date(obj.endDate);
    endDate.innerHTML = `${endDateValue.getDate()} /${endDateValue.getMonth() + 1}/${endDateValue.getFullYear()}`;

    newDiv.appendChild(nameTitle);
    newDiv.appendChild(startDate);
    newDiv.appendChild(endDate);

    let removeBtn = document.createElement("button");
    removeBtn.innerHTML = "Supprimer";
    removeBtn.addEventListener("click", () => {
        newDiv.remove();
        deletePromo(obj._id);
    });
    newDiv.appendChild(removeBtn);

    let detailsBtn = document.createElement("p");
    detailsBtn.classList.add("detailsBtn")
    detailsBtn.innerHTML = "Détails";
    detailsBtn.addEventListener("click", () => {
        localStorage.setItem('currentPromoId', obj._id);
        location.href = "./pages/page1.html";
    });
    newDiv.appendChild(detailsBtn);

    let modifyBtn = document.createElement("button");
    modifyBtn.innerHTML = "Modifier";
    newDiv.appendChild(modifyBtn);

    let modifyForm = document.createElement("form");
    modifyForm.classList.add("modifyForm");
    modifyForm.style.display = "none";

    let newName = document.createElement("input");
    newName.placeholder = "Changer le nom";
    let newStartDate = document.createElement("input");
    newStartDate.placeholder = "Changer la date de début";
    newStartDate.type = "date";
    let newEndDate = document.createElement("input");
    newEndDate.placeholder = "Changer la date de fin";
    newEndDate.type = "date";

    let saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Enregistrer";

    modifyForm.appendChild(newName);
    modifyForm.appendChild(newStartDate);
    modifyForm.appendChild(newEndDate);
    modifyForm.appendChild(saveBtn);

    newDiv.appendChild(modifyForm);

    modifyBtn.addEventListener("click", () => {
        modifyForm.style.display = modifyForm.style.display === "none" ? "block" : "none";
    });

    saveBtn.addEventListener("click", (e) => {
        e.preventDefault();

        let updatedPromo = {
            name: newName.value || obj.name,
            startDate: newStartDate.value || obj.startDate,
            endDate: newEndDate.value || obj.endDate,
        };

        fetch(`http://146.59.242.125:3009/promos/${obj._id}`, {
            method: "PUT",
            headers: {
                "authorization": apiKey,
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedPromo)
        }).then((response) => {
            if (response.ok) {
                nameTitle.innerHTML = updatedPromo.name;
                startDate.innerHTML = updatedPromo.startDate;
                endDate.innerHTML = updatedPromo.endDate;
                modifyForm.style.display = "none";
                console.log(`Promo with ID ${obj._id} updated successfully.`);
            } else {
                console.log(`Failed to update promo with ID ${obj._id}`);
            }
        });
    });

    newContent.appendChild(newDiv);
}


function deletePromo(id) {
    fetch("http://146.59.242.125:3009/promos/" + id, {
        method: 'DELETE',
        headers: {
            "authorization": apiKey
        }
    }).then((response) => {
        if (response.ok) {
            console.log(`Promo with ID ${id} deleted successfully.`);
        } else {
            console.log(`Failed to delete promo with ID ${id}`);
        }
    });
}



