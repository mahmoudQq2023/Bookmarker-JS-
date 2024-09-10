var bookMarkNameINput = document.getElementById("bookmarkName");
var bookMarkURLInput = document.getElementById("bookmarkURL");
var dataRapper = document.getElementById("tBody");
var searchinput = document.getElementById("search");
var allBookMark = [];

if (localStorage.allBookMarksss != null) {
  allBookMark = JSON.parse(localStorage.allBookMarksss);
  displayData(allBookMark);
}

function addBookMark() {
  if (
    bookMarkNameINput.classList.contains("is-valid") &&
    bookMarkURLInput.classList.contains("is-valid")
  ) {
    var newBookMark = {
      siteName: bookMarkNameINput.value,
      siteUrl: bookMarkURLInput.value,
    };
  
    allBookMark.push(newBookMark);
    localStorage.setItem("allBookMarksss", JSON.stringify(allBookMark));
    displayData(allBookMark);
    clearinputes();
  } else{
    alert("not valid data ")
  }

 
}

function displayData(arr) {
  var cartona = "";
  for (var i = 0; i < arr.length; i++) {
    cartona += `<tr>
            <td>${i + 1}</td>
          <td>${arr[i].siteName}</td>
          <td><a href="${arr[i].siteUrl}" class="btn btn-primary">Visit</a></td>
          <td><button class="btn btn-danger"  onclick="deleteBookMark(${i})">Delete</button></td>
              </tr>
`;
  }
  dataRapper.innerHTML = cartona;
}

function deleteBookMark(index) {
  allBookMark.splice(index, 1);
  localStorage.setItem("allBookMarksss", JSON.stringify(allBookMark));
  displayData(allBookMark);
}

function clearinputes() {
  bookMarkNameINput.value = "";
  bookMarkURLInput.value = "";
}

function search() {
  var word = searchinput.value;
  var searchedWebsiteName = [];

  for (var i = 0; i < allBookMark.length; i++) {
    if (allBookMark[i].siteName.toLowerCase().includes(word.toLowerCase())) {
      searchedWebsiteName.push(allBookMark[i]);
    }
  }
  displayData(searchedWebsiteName);
}

function validateInputes(element) {
  var regex = {
    bookmarkName: /^([a-z]{3})[a-z]*$/i,
    bookmarkURL:
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
  };

  if (regex[element.id].test(element.value) == true) {
    console.log("match");

    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    console.log("not match");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
  }
}
