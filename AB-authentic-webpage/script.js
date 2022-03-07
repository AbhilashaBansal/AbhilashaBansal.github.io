//RANDOM QUOTES
const quotes = [
  "'IT'S A SLOW PROCESS, BUT QUITTING WON'T SPEED IT UP.'",
  "'THERE IS NO EXCUSE FOR NOT TRYING.' - BARACK OBAMA",
  "'YOU WILL NEVER ALWAYS BE MOTIVATED, SO YOU MUST LEARN TO BE DISCIPLINED.'",
  "'THE KEY TO SUCCESS IS TO START BEFORE YOU ARE READY.'",
  "'DO WHAT YOU CAN WITH THE TIME AND TALENTS YOU HAVE AT THIS PRESENT MOMENT.'",
  "'ALL OF OUR DREAMS CAN COME TRUE IF WE HAVE THE COURAGE TO PURSUE THEM.' - WALT DISNEY",
  "'Sometimes the best way to deal with disappointment in one arena is to accomplish something else.'",
  "'WINNERS DONT MAKE EXCUSES.'",
  "'Kindness is the most tender and effective form of leaving a memory inside people's hearts.'"

];

const fn1 = function() {
  let randomIdx = Math.floor(Math.random() * quotes.length);
  console.log(randomIdx);
  document.getElementById("top-quote").innerHTML = quotes[randomIdx];
};


const button1 = document.getElementById("btn01");

button1.addEventListener('click', fn1);

//WEIGHT ON MARS

const fn2 = function (e) {
  e.preventDefault();
  const weight = parseInt(document.querySelector('#weight').value);
  const result = document.querySelector('#result');
  const remark = document.querySelector('#remark');
  if( (weight==='') || (weight<0) || (isNaN(weight)) ){
    result.innerHTML = "Please enter a valid weight.";
  }
  else{
    //calculate weight on mars
    const weightOnMars = ((weight/9.81) * 3.711).toFixed(2);
    //display
    result.style.color = "hotpink";
    result.innerHTML = `<span>${weightOnMars}</span>`;
    remark.innerHTML = "Congratulations, you're pretty lean on Mars!";
  }
};

const form = document.getElementById("btn02");
form.addEventListener('click', fn2);