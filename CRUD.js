// globally declard function

function global(array) {
    array.forEach((value) => {
      let getDiv = document.getElementById("grid");
      let getInputText = document.getElementById("title").value;
      let getInputColor = document.getElementById("color").value;
      let getDescription = document.getElementById("description").value;
      let getDate = document.getElementById("date").value;

     

      // create elements
      let div = document.createElement("div");
      div.id = value.div;
      let paraTitle = document.createElement("p");
      let paraDescription = document.createElement("p");
      let paraDate = document.createElement("p");
      let editBtn = document.createElement("button");
      let delBtn = document.createElement("button");

      let span = document.createElement("p");

      // append elements
      getDiv.appendChild(div);
      div.appendChild(paraTitle);
      div.appendChild(paraDescription);
      div.appendChild(paraDate);
      div.appendChild(span);
      span.appendChild(editBtn);
      span.appendChild(delBtn);

      // styling elements
      paraTitle.innerHTML = value.Title;
      paraTitle.style.fontWeight = "bold";

      paraDescription.innerHTML = value.Description;
      paraDescription.style.fontStyle = "italic";
      paraDescription.style.fontSize = "small";

      paraDate.innerHTML = value.Date;

      // styling buttons

      editBtn.innerHTML = "Edit";
      delBtn.innerHTML = "Delete";
      editBtn.style.border = "1px solid black";
      delBtn.style.border = "1px solid black";
      delBtn.style.borderRadius = "5px";
      editBtn.style.borderRadius = "5px";
      delBtn.style.marginLeft = "4px";
      delBtn.style.marginRight = "4px";
      delBtn.style.marginBottom = "4px";
      editBtn.style.marginBottom = "4px";
      delBtn.style.padding = "2px";
      editBtn.style.padding = "2px";
      delBtn.style.color = "white";
      editBtn.style.color = "white";
      span.style.float = "right";

      // styling div
      div.style.backgroundColor = value.Color;

      div.style["boxShadow"] = "0 0 8px #999999";
      div.style.borderRadius = "10px";
      div.style.marginLeft = "4px";
      div.style.marginRight = "4px";

      // function on delete button
      delBtn.onclick = function () {
        deleteit(value.div);
      };

      // function on edit button
      editBtn.onclick = function () {
        editIt(value);
      };
    });
  }

  document.getElementById("update").style.display = "none";

  let dialog = document.getElementById("dialog");

  // getting elements

  let submitButton = document.getElementById("submit");
  let updateButton = document.getElementById("update");

  // function on plus button to display the form dialogue

  function display() {
    dialog.setAttribute("open", true);
  }

  // function on close button to hide the form dialogue

  function formClose() {
    dialog.removeAttribute("open", true);
  }

  let getArray = [];

  // funtion on submit button

  function addNotes(event) {
    console.log("added");

    event.preventDefault();

    

    let num = Math.floor(Math.random() * 100);

    let getDiv = document.getElementById("grid");
    let getInputText = document.getElementById("title").value;
    let getInputColor = document.getElementById("color").value;
    let getDescription = document.getElementById("description").value;
    let getDate = document.getElementById("date").value;

    if (getInputText == "" && getDescription =="") {
        alert("Please fill the input")
        event.preventDefault();
      }

    // create elements
    let div = document.createElement("div");
    div.id = "div" + num;
    let paraTitle = document.createElement("p");
    paraTitle.id = "paraTitle" + num;
    let paraDescription = document.createElement("p");
    paraDescription.id = "paraDescription" + num;
    let paraDate = document.createElement("p");
    paraDate.id = "paraDate" + num;
    let editBtn = document.createElement("button");
    let delBtn = document.createElement("button");

    let span = document.createElement("p");

    // append elements
    getDiv.appendChild(div);
    div.appendChild(paraTitle);
    div.appendChild(paraDescription);
    div.appendChild(paraDate);
    div.appendChild(span);
    span.appendChild(editBtn);
    span.appendChild(delBtn);

    // styling elements
    paraTitle.innerHTML = getInputText;
    paraTitle.style.fontWeight = "bold";

    paraDescription.innerHTML = getDescription;
    paraDescription.style.fontStyle = "italic";
    paraDescription.style.fontSize = "small";

    paraDate.innerHTML = getDate;

    // styling buttons

    editBtn.innerHTML = "Edit";
    delBtn.innerHTML = "Delete";
    editBtn.style.border = "1px solid black";
    delBtn.style.border = "1px solid black";
    delBtn.style.borderRadius = "5px";
    editBtn.style.borderRadius = "5px";
    delBtn.style.marginLeft = "4px";
    delBtn.style.marginRight = "4px";
    delBtn.style.marginBottom = "4px";
    editBtn.style.marginBottom = "4px";
    delBtn.style.padding = "2px";
    editBtn.style.padding = "2px";
    delBtn.style.color = "white";
    editBtn.style.color = "white";
    span.style.float = "right";

    // styling div
    div.style.backgroundColor = getInputColor;

    div.style["boxShadow"] = "0 0 8px #999999";
    div.style.borderRadius = "10px";
    div.style.marginLeft = "4px";
    div.style.marginRight = "4px";

    // object creation

    let getObject = {
      div: "div" + num,
      Title: getInputText,
      Description: getDescription,
      Color: getInputColor,
      Date: getDate,
    };

    getArray.push(getObject);

    // set item in local storage

    localStorage.setItem("storingArray", JSON.stringify(getArray));

    getArray.forEach((value) => {
      delBtn.onclick = function () {
        deleteit(value.div);
      };

      // function on edit button
      editBtn.onclick = function () {
        editIt(value);
      };
    });

    // when form is submitted all inputs becomes empty and form will close

    document.getElementById("title").value = "";
    document.getElementById("color").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";

    dialog.removeAttribute("open", true);
  }

  // filter search funtion

  function filter() {
    let search = document.getElementById("search").value.toUpperCase();
    let newArray = getArray.filter(function (getInnerObject) {
      if (getInnerObject.Title.toUpperCase().includes(search)) {
        return true;
      } else if (
        getInnerObject.Description.toUpperCase().includes(search)
      ) {
        return true;
      } else {
        return false;
      }
    });

    document.getElementById("grid").innerHTML = "";

    // call into the global function

    global(newArray);
  }

  // get local storage

  const getStorageNotes = localStorage.getItem("storingArray");
  if (getStorageNotes !== null) {
    getArray = JSON.parse(getStorageNotes);
  }

  // get array from local storage and call into the global function

  global(getArray);

  // calling function on delete button

  function deleteit(getID) {
    console.log(getID);
    let y = document.getElementById(getID);

    const getStorageNotes = JSON.parse(
      localStorage.getItem("storingArray")
    );

    let deleteItem = getStorageNotes.findIndex(function (value) {
      return value.div == getID;
    });
    if (deleteItem > -1) {
      getStorageNotes.splice(deleteItem, 1);
      getArray.splice(deleteItem, 1);
      localStorage.setItem("storingArray", JSON.stringify(getStorageNotes));
      y.remove();
    }
  }

  let editedValue;

  // edit notes list

  function editIt(value) {
    editedValue = value;

    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "inline-block";

    dialog.setAttribute("open", true);

    document.getElementById("title").value = value.Title;
    document.getElementById("description").value = value.Description;
    document.getElementById("date").value = value.Date;
    document.getElementById("color").value = value.Color;
  }

  // update notes list

  function updateIt(value) {
    console.log(value);
    document.getElementById("submit").style.display = "inline-block";
    document.getElementById("update").style.display = "none";



    let index = getArray.findIndex((item) => {
      return item.div == value.div;
    });
    let obj = {
      div: value.div,
      Title: document.getElementById("title").value,
      Description: document.getElementById("description").value,
      Date: document.getElementById("date").value,
      Color: document.getElementById("color").value,
    };

    if (index > -1) {
      getArray[index] = obj;
      dialog.removeAttribute("open", true);

      localStorage.setItem("storingArray", JSON.stringify(getArray));
    }
  }

