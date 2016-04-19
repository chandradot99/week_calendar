// Function to generate random color for birthday card boxes
function getRandomColor() {

 return 'rgb(' +  (Math.floor((150-160)*Math.random()) + 230) + ',' + 
                  (Math.floor((120-160)*Math.random()) + 230) + ',' + 
                  (Math.floor((120-160)*Math.random()) + 230) + ')';
}



// Function to calculate size of squares inside birthday cards
function getDivSize(dayBirthdays) {

  var totalBirthdays = [0,0,0,0,0,0,0];

  for(var i=0;i<dayBirthdays.length;i++)
    totalBirthdays[i] = dayBirthdays[i].length;

  var divSize = [0,0,0,0,0,0,0]

  for(var i=0;i<divSize.length;i++)
    divSize[i] = (100/(Math.ceil(Math.sqrt(totalBirthdays[i])))) + "%";

  return divSize;
}



// Function to check if a given year is a leap year or not
function leapYear(year){
  if( (0 == year % 4) && (0 != year % 100) || (0 == year % 400) )
    return true; 
  else
    return false;  
}



// Function to find day for given birthday using doomsday algorithm and it returns the array of days, each containing the array of initials.
function doomsdayAlgorithm(year,birthdays) {

  var anchorDays = [2,0,5,3];
  var twoDigit = year%100;
  var doomsDay =  ((Math.floor(twoDigit/12)) + (twoDigit%12) + (Math.floor((twoDigit%12)/4)) + (anchorDays[(Math.floor(year/100))%4])) % 7;
  var dayBirthdays = [[],[],[],[],[],[],[]];

  if (leapYear(year))
    var doomsDates = [4,29,7,4,9,6,11,8,5,10,7,12];
  else
    var doomsDates = [3,28,7,4,9,6,11,8,5,10,7,12];

  for(var i=0;i<birthdays.length;i++)
  {
    var birth = birthdays[i].birthday;
    var birthYear = parseInt(birth.substr(6,4));
    var date = parseInt(birth.substr(3,2));
    var month = parseInt(birth.substr(0,2));

    if(year>=birthYear)
    {
      var nearDate = doomsDates[month-1];
      var diff = (Math.abs(nearDate - date))%7;

      var day;
      if(date < nearDate)
        day = (doomsDay - diff + 7)%7;
      else
        day = (doomsDay + diff)%7;

      var nameArr = (birthdays[i].name).split(" ");
      var name = nameArr[0][0] + nameArr[1][0];
      dayBirthdays[day].push(name);
    }
  }

  for(var i=0;i<dayBirthdays.length;i++)
  {
    if(dayBirthdays[i].length == 0)
      dayBirthdays[i].push("No Birthdays");
  }
  return dayBirthdays;   
}



// function to create square boxes for birthday cards
function createSquareBoxForCard(dayBirthdays)
{
    for(var i =0;i<dayBirthdays.length;i++)
    {
      for(var j = 0; j<dayBirthdays[i].length;j++)
      {
        var divSize = getDivSize(dayBirthdays);
        var para = document.createElement("P");                       
        var t = document.createTextNode(dayBirthdays[i][j]);  
        para.appendChild(t);    
        document.getElementById(weekDays[i]).appendChild(para);
        para.style.width = divSize[i];
        para.style.height = divSize[i];
        para.style.backgroundColor = getRandomColor();
      }
    } 
}



// Function to clear a birthday card boxes on update of year
function clearBirthdayCard()
{
  for(var i=0;i<weekDays.length;i++)
  {
    var node = document.getElementById(weekDays[i]);
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  }
}



// Main function
function findDay() {
  var year = document.getElementById("year").value;
  var birthdays = eval(document.getElementById("json").value);

  if(year === "")
  {
    alert("Year cannot be blank");
    return false;
  }

  if (isNaN(year) || year<=0) 
  {
    alert("Year is not valid");
    return false;
  }

  clearBirthdayCard();

  //To sort json data according to the age
  birthdays.sort(function(a,b) { 
    return new Date(b.birthday).getTime() - new Date(a.birthday).getTime() 
  });

  var dayBirthdays = doomsdayAlgorithm(year,birthdays);
  createSquareBoxForCard(dayBirthdays);                          
}



// Global Variables and json data
var weekDays = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];