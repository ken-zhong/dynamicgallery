// object that contains the code for animating the image within the canvas element
var dynamicGallery = {
    // array that contains the links for the image gallery. Simply add image links here to update the carousel
    imageLinks: ["http://i.imgur.com/9slii5yh.jpg", "http://i.imgur.com/6EGCU9gh.jpg", "http://i.imgur.com/84oTBl8h.jpg", "http://i.imgur.com/ZZO5JWZh.jpg"], 
    imageList: [],
    imageDisplay: 0, // start by loading the first image in the array

    //preloads the images into the array imageList
    loadImages: function(){
        this.imageLinks.forEach(function(src){
            var toLoad = new Image();
            toLoad.src = src;
            dynamicGallery.imageList.push(toLoad);
        } )
    }, 
}


// code for the carousel to change the image being displayed
var carousel = {

    init: function(){
        this.addListeners();
        createImage(0);
    },

    addListeners: function(){
        var thumbnails = document.querySelector("#thumbnails")
        thumbnails.addEventListener("click", function(event){
            var clicked = event.target.parentNode.value;
            console.log(event.target.parentNode)
            dynamicGallery.imageDisplay = clicked;
            createImage(clicked);
           
        })

        window.addEventListener("keydown", function(event){
            if (event.keyCode === 39){
                carousel.nextImg();
            } 
            else if (event.keyCode === 37){
                carousel.prevImg();
            }
        })

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
var imgSize = canvas.width*1.1;
var img = dynamicGallery.imageList[0];
var imgAR = 16/9;

function createImage(num){
    
    img = dynamicGallery.imageList[num];
    imgAR = img.width/img.height
    canvas.height = canvas.width/imgAR;
    imgSize = canvas.width*1.1;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    clearInterval(interval);
    interval = setInterval(drawImage, 1000/60);
}

function drawImage(){
    if(imgSize > canvas.width){
        ctx.drawImage(img, 0, 0, imgSize, imgSize/imgAR);
        imgSize--;
    }
}

dynamicGallery.loadImages();
window.onload = function(){
    carousel.init();
}