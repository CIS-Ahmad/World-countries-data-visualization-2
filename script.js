
import { countries } from "./data.js";


let Asce = true;
let SeV = null;
let btnBwisClicked = true;

function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function getEleUsingID(ID) {
    return document.getElementById(ID);
}

function CreateElement(name, className, id = null, textContent = "", father = null) {

    const element = document.createElement(name);
    element.classList.add(className);

    if (textContent !== "") {
        element.textContent = textContent;
    }

    if (id) {
        element.id = id;
    }

    if (father) {
        const parent = getEleUsingID(father);
        parent.appendChild(element);
    }
    else {
        document.body.appendChild(element);
    }

    return element;
}

function GetCountryStartWithN(pre) {
    if (pre === "")
        return countries;
    return countries.filter(c => c.toLowerCase().startsWith(pre.toLowerCase()));
}

function GetCountryContineN(text) {
    if (text === "")
        return countries;
    return countries.filter(c => c.toLowerCase().includes(text.toLowerCase()));

}

function SortArray(ArrayData) {

    const arr = [...ArrayData];

    return Asce
        ? arr.sort((a, b) => a.localeCompare(b)) : arr.sort((a, b) => b.localeCompare(a));

}

function Display(ArrayData) {
    const output = getEleUsingID(`output`);
    output.innerHTML = "";
    const HT = getEleUsingID("HelpText");

    if (SeV) {
        HT.style.display = "flex";

        const PreText = getEleUsingID("pretext");
        PreText.textContent = SeV;
        PreText.style.color = getRandomColor();

        const CoNum = getEleUsingID("NumberOfCu");
        CoNum.textContent = ArrayData.length;
        CoNum.style.color = getRandomColor();
    }
    else {
        HT.style.display = "none";

    }
    for (let i = 0; i < ArrayData.length; i++) {
        CreateElement("div", "GridElement", "", ArrayData[i], "output");
    }

}

function FDisplay() {
    const SerchBox = getEleUsingID("SerchBox");
    const value = SerchBox.value;

    const filtered = (btnBwisClicked ? GetCountryStartWithN(value) : GetCountryContineN(value));

    Display(SortArray(filtered));
}

document.addEventListener("DOMContentLoaded", () => {

    getEleUsingID("NumOfCo").textContent = countries.length;
    const BWbtn = CreateElement("button", "but", "", "search beggining word", "butGroup");
    const AWbtn = CreateElement("button", "but", "", "search any word", "butGroup");
    const buttons = [BWbtn, AWbtn];

    const Sortbtn = CreateElement("button", "but", "", "", "butGroup");

    Sortbtn.innerHTML = `<img src="assets/Image/a-to-z.png">`;

    Sortbtn.addEventListener("click", () => {
        if (Asce) {
            Sortbtn.innerHTML = `<img src="assets/Image/z-to-a.png">`;
            Asce = false;
            Sortbtn.title = "Sorting A → Z";
            FDisplay();
        }
        else {
            Sortbtn.innerHTML = `<img src="assets/Image/a-to-z.png">`;
            Asce = true;
            Sortbtn.title = "Sorting Z → A";
            FDisplay();
        }
    });

    const SerchBox = CreateElement("input", "SerchBox", "SerchBox", null, "SearchGroup");
    SerchBox.type = "text";
    SerchBox.placeholder = "search Countries";

    SerchBox.addEventListener("input", (e) => {

        e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, "");

        SeV = SerchBox.value;


        FDisplay();
    });

    const SerachTool = CreateElement("button", "SerachTool", "", "", "SearchGroup");

    SerachTool.innerHTML = `<img src="assets/SVG/searchTool.svg">`

    SerachTool.addEventListener("click", () => {
        SeV = SerchBox.value;

        FDisplay();

    });

    BWbtn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        SeV = SerchBox.value;

        BWbtn.classList.add("active");
        AWbtn.disabled = false;
        BWbtn.disabled = true;
        btnBwisClicked = true;
        FDisplay();

    });


    AWbtn.addEventListener("click", () => {

        buttons.forEach(b => b.classList.remove("active"));
        AWbtn.classList.add("active");

        AWbtn.disabled = true;
        BWbtn.disabled = false;
        btnBwisClicked = false;
        SeV = SerchBox.value;

        FDisplay();

    });

});

Display(countries);