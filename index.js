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
  {
    totalBirthdays[i] = dayBirthdays[i].length;
  }

  var divSize = [0,0,0,0,0,0,0]

  for(var i=0;i<divSize.length;i++)
  {
    divSize[i] = (100/(Math.ceil(Math.sqrt(totalBirthdays[i])))) + "%";
  }

  return divSize;
}

// Function to check if a given year is a leap year or not
function leapYear(year){
  if( (0 == year % 4) && (0 != year % 100) || (0 == year % 400) )
    return true; 
  else
    return false;  
}

// Function to find doomsday of an input year
function calDoomDay(year) {

  var anchorDays = [2,0,5,3];
  var twoDigit = year%100;

  return ((Math.floor(twoDigit/12)) + (twoDigit%12) + (Math.floor((twoDigit%12)/4)) + (anchorDays[(Math.floor(year/100))%4])) % 7;
}

// Implements main logic to find day for input date
function findDayForInputDate(dayBirthdays,doomsDay,year)
{
  if (leapYear(year))
    var doomsDates = [4,29,7,4,9,6,11,8,5,10,7,12];
  else
    var doomsDates = [3,28,7,4,9,6,11,8,5,10,7,12];

  for(var i=0;i<birthdays.length;i++)
  {
    var birth = birthdays[i].birthday;
    var date = parseInt(birth.substr(3,2));
    var month = parseInt(birth.substr(0,2));

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

// function to create square box for birthday card
function createSquareBoxForCard(weekDays,dayBirthdays)
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
function clearBirthdayCard(weekDays)
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
  var weekDays = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
  clearBirthdayCard(weekDays);

  birthdays.sort(function(a,b) { 
    return new Date(b.birthday).getTime() - new Date(a.birthday).getTime() 
  });

  var doomsDay = calDoomDay(year);
  var dayBirthdays = [[],[],[],[],[],[],[]];
  findDayForInputDate(dayBirthdays,doomsDay,year);
  createSquareBoxForCard(weekDays,dayBirthdays);                          
}

var birthdays = [
  {
    name: "Tyrion Lannister",
    birthday: "12/02/1978"
  }, {
    name: "Cersei Lannister",
    birthday: "11/30/1975"
  }, {
    name: "Daenerys Targaryen",
    birthday: "11/24/1991"
  }, {
    name: "Arya Stark",
    birthday: "11/25/1996"
  }, {
    name: "Jon Snow",
    birthday: "12/03/1989"
  }, {
    name: "Jorah Mormont",
    birthday: "12/16/1968"
  }, {
    name: "Jaime Lannister",
    birthday: "12/06/1975"
  }, {
    name: "Sandor Clegane",
    birthday: "11/07/1969"
  }, {
    name: "Tywin Lannister",
    birthday: "10/12/1951"
  }, {
    name: "Theon Greyjoy",
    birthday: "12/31/1989"
  }, {
    name: "Samwell Tarly",
    birthday: "12/07/1990"
  }, {
    name: "Joffrey Baratheon",
    birthday: "06/12/1992"
  }, {
    name: "Catelyn Stark",
    birthday: "12/03/1962"
  }, {
    name: "Bran Stark",
    birthday: "12/02/1995"
  }, {
    name: "Petyr Baelish",
    birthday: "11/20/1974"
  }, {
    name: "Robb Stark",
    birthday: "11/28/1986"
  }, {
    name: "Brienne Tarth",
    birthday: "11/27/1985"
  }, {
    name: "Margaery Tyrell",
    birthday: "12/02/1989"
  }, {
    name: "Stannis Baratheon",
    birthday: "09/14/1971"
  }, {
    name: "Davos Seaworth",
    birthday: "02/13/1973"
  }, {
    name: "Tormund Giantsbane",
    birthday: "12/14/1974"
  }, {
    name: "Jeor Mormont",
    birthday: "11/01/1955"
  }, {
    name: "Eddard Stark",
    birthday: "12/02/1963"
  }, {
    name: "Khal Drogo",
    birthday: "12/05/1980"
  }, {
    name: "Ramsay Bolton",
    birthday: "12/05/1976"
  }, {
    name: "Robert Baratheon",
    birthday: "12/02/1965"
  }, {
    name: "Daario Naharis",
    birthday: "12/02/1985"
  }, {
    name: "Viserys Targaryen",
    birthday: "12/06/1984"
  }
];

