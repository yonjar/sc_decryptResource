// a.indexOf('albumCommunicationTitles')>0

let idol_list = [
  "mano",
  "hiori",
  "meguru",
  "kogane",
  "mamimi",
  "sakuya",
  "yuika",
  "kiriko",
  "kaho",
  "choco",
  "juri",
  "rinze",
  "natsuha",
  "amana",
  "tenka",
  "chiyuki",
  "asahi",
  "fuyuko",
  "mei",
  "touru",
  "madoka",
  "koito",
  "hinana",
];

let setData = function (json_str) {
  localStorage.setItem("yon:idols", json_str);
};

let getData = function () {
  return JSON.parse(localStorage.getItem("yon:idols"));
};

let setCostumeData = function (json_str) {
  localStorage.setItem("yon:cos", json_str);
};

let getCostumeData = function () {
  return JSON.parse(localStorage.getItem("yon:cos"));
};

if (!localStorage.getItem("yon:idols")) {
  let tmp = {};
  // for (let idol of idols) {
  //   tmp[idol] = [];
  // }

  setData(JSON.stringify(tmp));
}

if (!localStorage.getItem("yon:cos")) {
  setCostumeData(JSON.stringify({}));
}

let sc_data = JSON.parse(json_str);

// idol
let local_data = getData();
let idols = sc_data["produceIdols"];

for (let idol of idols) {
  local_data[idol.id] = idol;
}
setData(JSON.stringify(local_data));

// costume
let costumeData = getCostumeData();
let idolCostumes = sc_data["idolCostumes"];

for (let costume of idolCostumes) {
  // if (costume.kind === "plain") continue;
  costumeData[costume.idolId] = costume;
}
setCostumeData(JSON.stringify(costumeData));

window.tryDownload = (content, filename) => {
  const eleLink = document.createElement("a");
  eleLink.download = filename;
  eleLink.style.display = "none";
  const blob = new Blob([content], {
    type: "application/json",
  });
  eleLink.href = URL.createObjectURL(blob);
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
};

window.dl = function (t) {
  switch (t) {
    case "idol":
      tryDownload(localStorage.getItem("yon:idols"), "idolsHash.json");
      break;

    case "cos":
      tryDownload(localStorage.getItem("yon:cos"), "idolsCos.json");
      break;
  }
};
