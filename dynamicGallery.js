// object that contains the code for animating the image within the canvas element
var dynamicGallery = {
    imageLinks: ["http://i.imgur.com/9slii5yh.jpg", "http://i.imgur.com/6EGCU9gh.jpg", "http://i.imgur.com/84oTBl8h.jpg", "http://i.imgur.com/ZZO5JWZh.jpg"], // array that contains the links for the image gallery
    imageList: [],
    imageDisplay: 0, // start by loading the first image in the array
    canvas:  document.querySelector("#displayBlock"),

    //preloads the images into the array imageList
    loadImages: function(){
        this.imageLinks.forEach(function(src){
            var toLoad = new Image();
            toLoad.src = src;
            dynamicGallery.imageList.push(toLoad);
        } )
    }, 

    //draws and animates the image
    createImage: function(num){
        var ctx = this.canvas.getContext('2d');
        var img = this.imageList[num];
        var imgAR = img.width/img.height
        this.canvas.height = this.canvas.width/imgAR;
        var imgSize = dynamicGallery.canvas.width*1.1;

        setInterval(function(){
            if(imgSize > dynamicGallery.canvas.width){
                ctx.drawImage(img, 0, 0, imgSize, imgSize/imgAR);
                imgSize--;
            }}, 
        1000/60);
    }
}

// code for the carousel to change the image being displayed
var carousel = {

    init: function(){
        this.addListeners();
        dynamicGallery.createImage(0);
    },

    addListeners: function(){
        var thumbnails = document.querySelector("#thumbnails")
        thumbnails.addEventListener("click", function(event){
            var clicked = event.target.parentNode.value;
            console.log(event.target.parentNode)
            dynamicGallery.imageDisplay = clicked;
            dynamicGallery.createImage(clicked);
           
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
        dynamicGallery.createImage(dynamicGallery.imageDisplay);
    },

    prevImg: function(){
        if(dynamicGallery.imageDisplay > 0){
            dynamicGallery.imageDisplay--;
        } else {
            dynamicGallery.imageDisplay = dynamicGallery.imageList.length - 1;
        }
        dynamicGallery.createImage(dynamicGallery.imageDisplay);
    }
}

dynamicGallery.loadImages();
window.onload = function(){
    carousel.init();
}