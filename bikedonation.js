var valueArray = [];//creates an empty array to put input values for the donation form
var bikeList = [];
var donation = document.getElementById("donationtableDiv");
donation.style.display="none";
//function to create new bike objects for donation
function Bike(firstname, lastname, make, model, email, serial, condition) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.make = make;
  this.model = model;
  this.email = email;
  this.serial = serial;
  this.condition = condition;
}
//shows the user their inputed information in a table to confirm their bike donation
function showDonation(bike) {
  var table = document.createElement("table");
  table.setAttribute("id", "donationTable");
  donation.style.display="block";
  donation.appendChild(table);
  for(var key in bike) {
    var value = bike[key];
    valueArray.push(value);
  }
  var properties = Object.keys(bike);
  for(i = 0; i < properties.length; i++) {//donation table
    var tableRow = document.createElement("tr");
    table.appendChild(tableRow);
    var cell1 = document.createElement("td");
    cell1.setAttribute("class", "donationtd");
    tableRow.appendChild(cell1);
    cell1.innerHTML= properties[i];
    var cell2 = document.createElement("td");
    cell2.setAttribute("class", "donationtd");
    tableRow.appendChild(cell2);
    cell2.innerHTML = valueArray[i];
  }
  var button = document.createElement("button");//confirm button
  button.setAttribute("id", "confirmbutton");
  donation.appendChild(button);
  button.innerHTML = "Confirm";
  button.addEventListener("click", function() {
    table.style.display="none";
    button.style.display="none";
    var messageDiv = document.createElement("div");
    messageDiv.setAttribute("id", "messageDiv");
    donation.appendChild(messageDiv);
    var message1 = document.createElement("p");
    var message2 = document.createElement("p");
    messageDiv.appendChild(message1);
    messageDiv.appendChild(message2);
    message1.innerHTML = "Thank you so much for your donation, " + bike.firstname + "! Together we have managed to connect " + bikeList.length + " bikes with new and excited owners."
    message2.innerHTML = "With your help we will be able to provide access to resouces and biking skills to all members in the community."
  });
}
//function that takes the user bike donation info and stores them in localStorage and calls another function to display their input in a table
function newBike(submittedForm) {
  var firstname = submittedForm.firstname.value;
  var lastname = submittedForm.lastname.value;
  var make = submittedForm.make.value;
  var model = submittedForm.model.value;
  var email = submittedForm.email.value;
  var serial = submittedForm.serial.value;
  var condition = submittedForm.condition.value;
  var bike = new Bike(firstname, lastname, make, model, email, serial, condition);
  if (localStorage.getItem('bikes sold') === null) {
    bikeList.push(bike);
    localStorage.setItem('bikes sold', JSON.stringify(bikeList));
  } else {
    bikeList = JSON.parse(localStorage.getItem('bikes sold'));
    bikeList.push(bike);
    localStorage.setItem('bikes sold', JSON.stringify(bikeList));
  }
  showDonation(bike);
};
//function that shows a div populated with the bike info based on what which image was clicked
function popup(url, bikeinfo) {
	var div = document.getElementById("clickedBike");
  div.style.display="block";
  var button = document.createElement("button");
  button.setAttribute("id", "close");
  button.addEventListener("click", closePopUp);
  button.innerHTML = "x";
  var img = document.getElementById("img");
  img.setAttribute("src", url);
  img.setAttribute("class", "showbike");
  div.appendChild(button);
  var bikeDescription = document.createElement("p");
  bikeDescription.setAttribute("id", "bikeinfop");
  bikeDescription.innerHTML = bikeinfo;
  div.appendChild(bikeDescription);
}
//closes the pop up div and clears out the information
function closePopUp() {
  var div = document.getElementById("clickedBike");
  var img = document.getElementById("img");
  var bikeDescription = document.getElementById("bikeinfop");
  bikeDescription.innerHTML = "";
  bikeDescription.setAttribute("id", "used");
  div.setAttribute("src", "");
  div.style.display="none";

}
