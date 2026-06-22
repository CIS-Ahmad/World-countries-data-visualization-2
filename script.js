const countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombi',
    'Comoros',
    'Congo (Brazzaville)',
    'Congo',
    'Costa Rica',
    "Cote d'Ivoire",
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor (Timor Timur)',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia, The',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea, North',
    'Korea, South',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia and Montenegro',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe'
]

let Asce = true;

let btnBwisClicked = true;

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

    for (let i = 0; i < ArrayData.length; i++) {
        CreateElement("div", "GridElement", "", ArrayData[i], "output");
    }

}

document.addEventListener("DOMContentLoaded", () => {

    getEleUsingID("NumOfCo").textContent = countries.length;
    const BWbtn = CreateElement("button", "but", "", "search beggining word", "butGroup");
    const AWbtn = CreateElement("button", "but", "", "search any word", "butGroup");
    const buttons = [BWbtn, AWbtn];

    const Sortbtn = CreateElement("button", "but", "", "", "butGroup");

    Sortbtn.innerHTML = `<img src="Image/A to Z.png">`;

    Sortbtn.addEventListener("click", () => {
        if (Asce) {
            Sortbtn.innerHTML = `<img src="Image/Z to A.png">`;
            Asce = false;
            Sortbtn.title = "Sorting A → Z";
        }
        else {
            Sortbtn.innerHTML = `<img src="Image/A to Z.png">`;
            Asce = true;
            Sortbtn.title = "Sorting Z → A";
        }
    });

    const SerchBox = CreateElement("input", "SerchBox", null, null, "SearchGroup");
    SerchBox.type = "text";
    SerchBox.placeholder = "search Countries";

    SerchBox.addEventListener("input", () => {

        if (btnBwisClicked) {
            Display(SortArray(GetCountryStartWithN(SerchBox.value)));
        }
        else {
            Display(SortArray(GetCountryContineN(SerchBox.value)));
        }
    });

    const SerachTool = CreateElement("button", "SerachTool", "", "", "SearchGroup");

    SerachTool.innerHTML = `<svg
            fill="#000000"
            viewBox="0 0 24 24"
            id="search-alt"
            data-name="Line Color"
            xmlns="http://www.w3.org/2000/svg"
            class="icon line-color"
          >
            <line
              id="secondary"
              x1="21"
              y1="21"
              x2="15.8"
              y2="15.8"
              style="
                fill: none;
                stroke: rgb(255, 255, 255);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 2;
              "
            ></line>
            <circle
              id="primary"
              cx="10.5"
              cy="10.5"
              r="7.5"
              style="
                fill: none;
                stroke: rgb(255, 255, 255);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 2;
              "
            ></circle>
          </svg>`

    SerachTool.addEventListener("click", () => {

        if (btnBwisClicked) {
            Display(SortArray(GetCountryStartWithN(SerchBox.value)));
        }
        else {
            Display(SortArray(GetCountryContineN(SerchBox.value)));
        }

    });

    BWbtn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));

        BWbtn.classList.add("active");
        AWbtn.disabled = false;
        BWbtn.disabled = true;
        btnBwisClicked = true;
        Display(SortArray(GetCountryStartWithN(SerchBox.value)));


    });


    AWbtn.addEventListener("click", () => {

        buttons.forEach(b => b.classList.remove("active"));
        AWbtn.classList.add("active");

        AWbtn.disabled = true;
        BWbtn.disabled = false;
        btnBwisClicked = false;
        Display(SortArray(GetCountryContineN(SerchBox.value)));

    });


}); 