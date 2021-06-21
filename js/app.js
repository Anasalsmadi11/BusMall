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


let counter = 0;
let round = 25;

function Images(name, src){
  this.name = name;
  this.imgSrc = `./img/${src}`;
  this.showenTimes = 0;
  this.numOfClicks = 0;
  Images.all.push(this); // we put this which also have the same meaning of the function 'Images' and by doing this we get an array that contain the four paramaters'name,src,shownTimes,numOfClicks' ..try console.log(Images.all)
}

Images.all= []; //all is property inside the constructor function we can name it anything we want

for(let i = 0 ; i<imageArray.length ; i++){
  new Images(imageArray[i].split('.')[0] ,imageArray[i]);
  //console.log(imageArray[i].split('.')[0] ,imageArray[i]);

}

function render(){
  leftIndex = getRandomNum(0 , imageArray.length -1);

  do{
    middleIndex = getRandomNum(0, imageArray.length -1);
    rightIndex = getRandomNum(0, imageArray.length -1);
  }while (leftIndex === middleIndex || leftIndex === rightIndex || middleIndex === rightIndex);


  leftImage.src = Images.all[leftIndex].imgSrc;
  rightImage.src = Images.all[rightIndex].imgSrc;
  middleImage.src = Images.all[middleIndex].imgSrc;

  Images.all[rightIndex].showenTimes++;
  Images.all[middleIndex].showenTimes++;
  Images.all[leftIndex].showenTimes++;

}

function addEventHandler(event ){
  if((event.target.id === 'rightImage' || event.target.id === 'leftImage' || event.target.id === 'middleImage')&& counter <round){

    if(event.target.id === 'rightImage'){
      Images.all[rightIndex].numOfClicks++;

    }

    if(event.target.id === 'leftImage'){
      Images.all[leftIndex].numOfClicks++;

    }

    if(event.target.id === 'middleImage'){
      Images.all[middleIndex].numOfClicks++;

    }
    counter++;
    render();
  }

}

function printResult(e){
  for(let i = 0 ; i < Images.all.length; i++){
    let li = document.createElement('li');
    resultList.appendChild(li);
    li.textContent = `${Images.all[i].name} had ${Images.all[i].showenTimes} votes, and was seen ${Images.all[i].numOfClicks} times`;
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
