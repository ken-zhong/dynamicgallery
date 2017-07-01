// This object contains the code for setting up the image gallery within the canvas element
var dynamicGallery = {
    // below array contains the links for the image gallery. add image links here to update the carousel
    imageLinks: ["photos/1.jpg", "photos/2.jpg", "photos/3.jpg", "photos/4.jpg", "photos/5.jpg", "photos/6.jpg"], 
    imageList: [],
    imageDisplay: 0, // var to keep track of which image to display
    //method below loads the images from imageLinks into the array imageList
    loadImages: function(){
        this.imageLinks.forEach(function(src){
            var toLoad = new Image();
            toLoad.src = src;
            dynamicGallery.imageList.push(toLoad);
        });
    } 
}

// code for the carousel to change the image being displayed
var carousel = {
    init: function(){
        this.addListeners();
        createImage(0);
    },
    addListeners: function(){
        //listeners for the thumbnail icons
        var thumbnails = document.querySelector("#dG-thumbnails")
        thumbnails.addEventListener("click", function(event){
            var clicked = event.target.parentNode.value;
            console.log(event.target.parentNode)
            dynamicGallery.imageDisplay = clicked;
            createImage(clicked);
        })
        //listeners for left and right arrow key
        window.addEventListener("keydown", function(event){
            if (event.keyCode === 39){
                carousel.nextImg();
            } 
            else if (event.keyCode === 37){
                carousel.prevImg();
            }
        })
        //listeners for the left and right click buttons
        var next = document.querySelector(".next")
        var prev = document.querySelector(".prev")
        next.addEventListener("click", function(){
            carousel.nextImg();
        })
        prev.addEventListener("click", function(){
            carousel.prevImg();
        })
    },
    nextImg: function(){
        if(dynamicGallery.imageDisplay < dynamicGallery.imageList.length - 1){
            dynamicGallery.imageDisplay++;
        } else {
            dynamicGallery.imageDisplay = 0;
        }
        createImage(dynamicGallery.imageDisplay);
    },
    prevImg: function(){
        if(dynamicGallery.imageDisplay > 0){
            dynamicGallery.imageDisplay--;
        } else {
            dynamicGallery.imageDisplay = dynamicGallery.imageList.length - 1;
        }
        createImage(dynamicGallery.imageDisplay);
    }
}

var canvas = document.querySelector("#displayBlock");
var ctx = canvas.getContext('2d');
var interval;
var zoomSize = 1.1; // controls the "zoom" factor of the animation.
var imgSize = canvas.width*zoomSize; 
var img = dynamicGallery.imageList[0];
var imgAR = 16/9;

function createImage(num){
    img = dynamicGallery.imageList[num];
    imgAR = img.width/img.height
    canvas.height = canvas.width/imgAR;
    imgSize = canvas.width*1.1;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    updateThumbnail();
    clearInterval(interval);
    interval = setInterval(drawImage, 1000/60);
}

function drawImage(){
    if(imgSize > canvas.width){
        ctx.drawImage(img, 0, 0, imgSize, imgSize/imgAR);
        imgSize--;
    } else {
        clearInterval(interval);
    }
}

function updateThumbnail(){
    var images = document.querySelectorAll(".img-thumbnails");

    for(var i = 0; i < images.length; i++){
        if(i === dynamicGallery.imageDisplay){
            images[i].classList.add("thumb-selected"); 
        } else {
            images[i].classList.remove("thumb-selected");
        }
    }
}

//loads the image gallery and initializes the listeners
dynamicGallery.loadImages();
window.onload = function(){
    carousel.init();
}
