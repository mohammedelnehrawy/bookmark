var siteName = document.getElementById("sitename");
var myBtn = document.getElementById("mybtn");
var urlName = document.getElementById("urlname");
var allBookmark = [];

if (localStorage.getItem("taskName") != null) {
  allBookmark = JSON.parse(localStorage.getItem("taskName"));
  display(allBookmark);
}

myBtn.addEventListener("click", function () {

  var urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  var urlRegexWWW = /^www\.[^\s/$.?#].[^\s]*$/i;

  var userUrl = urlName.value;
  if (urlRegexWWW.test(userUrl)) {
    userUrl = "http://" + userUrl;
  }

  if (urlRegex.test(userUrl)) {
    var siteNameRegex = /^[a-zA-Z ]+$/;
    if (siteNameRegex.test(siteName.value)) {
      var submit = {
        bookMarkWeb: siteName.value,
        urlName: userUrl,
        id: Math.random() * 1000,
      };

      allBookmark.push(submit);
      localStorage.setItem("bookMarkValue", JSON.stringify(allBookmark));
      display(allBookmark);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong.... Please enter valid data! ",
        
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong.... Please enter valid data! ",
     
    });
  }

  
});

function display(allBookmark) {
  var cartona = ``;
  for (var i = 0; i < allBookmark.length; i++) {
    cartona += 
    ` <tr>
            <td>${i +1}</td>
            <td>${allBookmark[i].bookMarkWeb}</td>
           <td>
            <a href="${allBookmark[i].urlName}" target="_blank">
              <button class="btn btn-success")>
              <i class="fa-solid fa-eye pe-2"></i>Visit
              </button> 
            </a>

            <td>
              <button class="btn btn-danger" onclick="Delete(${i})">
                <i class="fa-solid fa-trash-can"></i> Delete
              </button>
            </td>
          </tr> 
          `;
  }
  document.getElementById("tablebody").innerHTML = cartona;
}


// /delete  ----------/

function Delete(index) {
  allBookmark.splice(index, 1);
  localStorage.setItem("taskName", JSON.stringify(allBookmark));
  display(allBookmark);
}
