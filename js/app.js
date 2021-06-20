'use strict';

let imageArray = ['bag.jpg' , 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg','chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg' , 'dragon.jpg' , 'pen.jpg', 'pet-sweep.jpg' , 'scissors.jpg' , 'shark.jpg' ,'sweep.png' , 'tauntaun.jpg' , 'unicorn.jpg', 'usb.gif' , 'water-can.jpg' , 'wine-glass.jpg'];



let leftImage = document.getElementById('leftImage');
let middleImage = document.getElementById('middleImage');
let rightImage = document.getElementById('rightImage');
let imageSec = document.getElementById('imageSec');

let counter = 0;

function Images(name, src){
  this.name = name;
  this.src = `./img/${src}`;
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
  let leftIndex = getRandomNum(0 , imageArray.length -1);
  let rightIndex;
  let middleIndex;

  do{
    rightIndex = getRandomNum(0, imageArray.length -1);
  }while (leftIndex === rightIndex);

  do{
    leftIndex = getRandomNum(0, imageArray.length -1);
  } while (middleIndex === leftIndex);

  do{
    middleIndex = getRandomNum(0, imageArray.length -1);
  } while (rightIndex === middleIndex);

  rightImage.src = Images.all[rightIndex].src;
  middleImage.src = Images.all[middleIndex].src;
  leftImage.src = Images.all[leftIndex].src;

  Images.all[rightIndex].showenTimes++;
  Images.all[middleIndex].showenTimes++;
  Images.all[leftIndex].showenTimes++;

  //console.log(Images.all);
  let p = document.createElement('p');
  imageSec.appendChild(p);
  p.textContent = `the  number of times  that has been showen is ${Images.all[rightIndex].showenTimes++}.`;

  let p1 = document.createElement('p');
  imageSec.appendChild(p1);
  p.textContent = `the number of times  that has been showen is ${Images.all[middleIndex].showenTimes++}.`;

  let p2 = document.createElement('p');
  imageSec.appendChild(p2);
  p.textContent = `the number of times  that has been showen is ${Images.all[leftIndex].showenTimes++}.`;

}

function addEventHandler(event ){
  if((event.target.id === 'rightImage' || event.target.id === 'leftImage' || event.target.id === 'middleImage')&& counter <25)

    render();
  counter++;
}
imageSec.addEventListener('click' , addEventHandler);




function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1) + min);
}
