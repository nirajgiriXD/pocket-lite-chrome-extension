let link = "";
let lead = JSON.parse(localStorage.getItem("link"));
const inputField = document.getElementById("inputField");
const inputFieldButton = document.getElementById("inputFieldButton");
const container = document.getElementById("container");

window.addEventListener("load", loadAndDisplay);
document.getElementById("inputFieldButton").addEventListener("click", saveLink);
document.getElementById("deleteFieldButton").addEventListener("dblclick", deleteLead);
document.getElementById("grabTabLink").addEventListener("click", grabTabLink);

function loadAndDisplay() {
    if (lead == null) {
        lead = [];
    } else if (lead == "") {
        document.getElementById("ulTag").innerHTML = "";
        lead = [];
    } else {
        let list = "";
        for (let i = 0; i < lead.length; i++) {
            list += `<li>
                    <a target='_blank' href='${lead[i]}'>${lead[i]}</a>
                </li>`
        }
        document.getElementById("ulTag").innerHTML = list;
    }
}

async function grabTabLink() {
    await chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        inputField.value = tabs[0].url;
        link = inputField.value;
    });
}

function saveLink() {
    let list = "";
    if (link != "") {
        inputField.value = link;
        link = "";
    }
    if (inputField.value != "") {
        lead.push(inputField.value);
        for (let i = 0; i < lead.length; i++) {
            list += `<li>
                        <a target='_blank' href='${lead[i]}'>${lead[i]}</a>
                    </li>`
        }
        document.getElementById("ulTag").innerHTML = list;
        localStorage.setItem("link", JSON.stringify(lead));
        inputField.value = "";
    }
}

function deleteLead() {
    localStorage.clear();
    lead = "";
    loadAndDisplay();
}