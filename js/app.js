'use strict';

let imageArray = ['bag.jpg' , 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg','chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg' , 'dragon.jpg' , 'pen.jpg', 'pet-sweep.jpg' , 'scissors.jpg' , 'shark.jpg' ,'sweep.png' , 'tauntaun.jpg' , 'unicorn.jpg', 'usb.gif' , 'water-can.jpg' , 'wine-glass.jpg'];

let showResult = document.getElementById('showResult');
let resultList = document.getElementById('resultList');


let leftImage = document.getElementById('leftImage');
let middleImage = document.getElementById('middleImage');
let rightImage = document.getElementById('rightImage');
let imageSec = document.getElementById('imageSec');

let leftIndex ;
let rightIndex;
let middleIndex;

let checkArray = [];

let counter = 0;
let round = 25;

function Images(name, sr){
  this.name = name;
  this.imgSrc = `./img/${sr}`;
  this.showenTimes = 0;
  this.numOfClicks = 0;
  Images.all.push(this); // we put this which also have the same meaning of the function 'Images' and by doing this we get an array that contain the four paramaters'name,src,shownTimes,numOfClicks' ..try console.log(Images.all)
}

Images.all= []; //all is property inside the constructor function we can name it anything we want and its array of objects try console.log( Images.all)
for(let i = 0 ; i<imageArray.length ; i++){
  new Images(imageArray[i].split('.')[0] ,imageArray[i]);
  //console.log(imageArray[i].split('.')[0] ,imageArray[i]);

}

function render(){

  do{
    leftIndex = getRandomNum(0 , imageArray.length -1);
    middleIndex = getRandomNum(0, imageArray.length -1);
    rightIndex = getRandomNum(0, imageArray.length -1);
  }while (leftIndex === middleIndex || leftIndex === rightIndex || middleIndex === rightIndex || checkArray.includes(leftIndex) || checkArray.includes(middleIndex) || checkArray.includes(rightIndex));

  /*console.log( checkArray.includes(leftIndex) , checkArray.includes(middleIndex) ,checkArray.includes(rightIndex)); */

  checkArray= [];
  
  //console.log(checkArray.includes(leftIndex))

  checkArray.push(leftIndex,middleIndex,rightIndex);
  console.log( checkArray);


  leftImage.src = Images.all[leftIndex].imgSrc; // here there is an array 'all' inside an object constructor 'Images' and inside the array there is a number of objects and to determine one of them i write a number between [] in this way it will choose the object that has the same order and anside each object there is properities which they are name,imgSrc,... so to select the src i need to go inside the object ive choosen and write its name
  rightImage.src = Images.all[rightIndex].imgSrc; // here the rightImage is an oject and inside it its properities name, imgSrc, numOfClicks...  and we knew it is an object because we decided it to be object by equaking it to an oject 'Images'
  middleImage.src = Images.all[middleIndex].imgSrc;

  Images.all[rightIndex].showenTimes++;
  Images.all[middleIndex].showenTimes++;
  Images.all[leftIndex].showenTimes++;


}

function addEventHandler(event ){
  if((event.target.id === 'rightImage' || event.target.id === 'leftImage' || event.target.id === 'middleImage')&& counter <round){


    if(event.target.id === 'rightImage'){
      Images.all[rightIndex].numOfClicks++; // ++ sign to increase the number of clikcs for each photo on the right side only

    }

    if(event.target.id === 'leftImage'){
      Images.all[leftIndex].numOfClicks++;

    }

    if(event.target.id === 'middleImage'){
      Images.all[middleIndex].numOfClicks++;

    }
    counter++;
    render();
  } else{
    drawChart();
  }

}

function printResult(){
  for(let i = 0 ; i < Images.all.length; i++){
    let li = document.createElement('li');
    resultList.appendChild(li);
    li.textContent = `${Images.all[i].name} had ${Images.all[i].numOfClicks} votes, and was seen ${Images.all[i].showenTimes} times`;
  }
  showResult.removeEventListener('click', printResult);
}


showResult.addEventListener('click' , printResult);
imageSec.addEventListener('click' , addEventHandler);


render();




function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1) + min);
}


function drawChart(){

  let name = [];
  let view = [];
  let clicks =[];
  for(let i = 0 ; i< Images.all.length ; i++){
    name.push(Images.all[i].name);
    view.push(Images.all[i].showenTimes);
    clicks.push(Images.all[i].numOfClicks);
  }


  let ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: name,
      datasets: [{
        label: '# of clicks',
        data: clicks,
        backgroundColor: 'blue'
        ,
        borderColor: 'rgba(91, 391, 11, 1)',
        borderWidth: 2
      },{
        label: '# of views' ,
        data: view,
        backgroundColor: 'yellow'
        ,
        borderColor: 'rgba(55, 199, 1, 1)',

        borderWidth: 2
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}
