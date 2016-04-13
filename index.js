function leapYear(year){
  if( (0 == year % 4) && (0 != year % 100) || (0 == year % 400) )
    return true; 
  else
    return false;  
}

function calDoomDay(year) {

  var anchorDays = [2,0,5,3];
  var twoDigit = year%100;

  return ((Math.floor(twoDigit/12)) + (twoDigit%12) + (Math.floor((twoDigit%12)/4)) + (anchorDays[(Math.floor(year/100))%4])) % 7;
}


function findDay(year) {
  var weekDays = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
  
  var doomsDay = calDoomDay(year);

  if (leapYear(year))
    var doomsDates = [4,29,7,4,9,6,11,8,5,10,7,12];
  else
    var doomsDates = [3,28,7,4,9,6,11,8,5,10,7,12];

  var date = 4;
  var month = 3;
  var nearDate = doomsDates[month-1];

  var diff = (Math.abs(nearDate - date))%7;

  if(date < nearDate)
    doomdiff = (doomsDay - diff + 7)%7;
  else
    var doomdiff = (doomsDay + diff)%7;

  document.write(weekDays[doomdiff]);
}