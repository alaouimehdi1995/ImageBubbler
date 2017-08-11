/**
 * Created by mehdi on 11/08/17.
 */
function el(id){return document.getElementById(id);} // Get elem by ID

var resultCanvas  = el("colorMap");
var enableMargin=false;
var marginProportion=0.1;


function checkBoxHandler(element){
    if(element.checked){
        enableMargin=true;
    }
    else{
        enableMargin=false;
    }
}


function getAverageColor(imageContext,widthStart,widthFinish,heightStart,heightFinish,blockSize) {
    var pixelData;
    var pixels = {R: 0, G: 0, B: 0, number: 0};
    for (var i = widthStart; i < widthFinish; i += blockSize) {
        for (var j = heightStart; j < heightFinish; j += blockSize) {
            pixelData = imageContext.getImageData(i, j, 1, 1).data;
            pixels.R += pixelData[0];
            pixels.G += pixelData[1];
            pixels.B += pixelData[2];
            pixels.number += 1;
        }
    }

    pixels.R = parseInt(pixels.R / pixels.number);
    pixels.G = parseInt(pixels.G / pixels.number);
    pixels.B = parseInt(pixels.B / pixels.number);

    return pixels;
}

function split(imageCanvas,proportion,e){
    var imageContext=imageCanvas.getContext("2d");
    var element=e.target;
    var parent=element.parentNode;
    parent.removeChild(element);
    var c1,c2,c3,c4,pixl;
    var marginProportion=0.2;
    c1=document.createElement("div");
    c1.className='bloc';
    c1.style.width=(parseFloat(element.style.width)/2)+"px";
    c1.style.height=(parseFloat(element.style.height)/2)+"px";
    c1.style.top=element.style.top;
    c1.style.left=element.style.left;
    if(enableMargin)
        c1.style.margin=marginProportion*parseFloat(c1.style.width)+"px";

    pixl=getAverageColor(imageContext,proportion*parseFloat(c1.style.left),proportion*(parseFloat(c1.style.left)+parseFloat(c1.style.width)),proportion*parseFloat(c1.style.top),proportion*(parseFloat(c1.style.top)+parseFloat(c1.style.height)),35);
    c1.style.backgroundColor = "rgb(" + pixl.R + "," + pixl.G + "," + pixl.B + ")";
    c1.addEventListener("mousemove",function(e){split(imageCanvas,proportion,e);},false);

    c2=document.createElement("div");
    c2.className='bloc';
    c2.style.width=(parseFloat(element.style.width)/2)+"px";
    c2.style.height=(parseFloat(element.style.height)/2)+"px";
    c2.style.top=element.style.top;
    if(enableMargin)
        c2.style.margin=marginProportion*parseFloat(c1.style.width)+"px";
    c2.style.left=(parseFloat(element.style.left)+parseFloat(c1.style.width))+"px";
    pixl=getAverageColor(imageContext,proportion*parseFloat(c2.style.left),proportion*(parseFloat(c2.style.left)+parseFloat(c2.style.width)),proportion*parseFloat(c2.style.top),proportion*(parseFloat(c2.style.top)+parseFloat(c2.style.height)),35);
    c2.style.backgroundColor = "rgb(" + pixl.R + "," + pixl.G + "," + pixl.B + ")";
    c2.addEventListener("mousemove",function(e){split(imageCanvas,proportion,e);},false);

    c3=document.createElement("div");
    c3.className='bloc';
    c3.style.width=(parseFloat(element.style.width)/2)+"px";
    c3.style.height=(parseFloat(element.style.height)/2)+"px";
    c3.style.left=element.style.left;
    if(enableMargin)
        c3.style.margin=marginProportion*parseFloat(c1.style.width)+"px";
    c3.style.top=(parseFloat(element.style.top)+parseFloat(c1.style.height))+"px";
    pixl=getAverageColor(imageContext,proportion*parseFloat(c3.style.left),proportion*(parseFloat(c3.style.left)+parseFloat(c3.style.width)),proportion*parseFloat(c3.style.top),proportion*(parseFloat(c3.style.top)+parseFloat(c3.style.height)),35);
    c3.style.backgroundColor = "rgb(" + pixl.R + "," + pixl.G + "," + pixl.B + ")";
    c3.addEventListener("mousemove",function(e){split(imageCanvas,proportion,e);},false);

    c4=document.createElement("div");
    c4.className='bloc';
    c4.style.width=(parseFloat(element.style.width)/2)+"px";
    c4.style.height=(parseFloat(element.style.height)/2)+"px";
    if(enableMargin)
        c4.style.margin=marginProportion*parseFloat(c1.style.width)+"px";
    c4.style.top=(parseFloat(element.style.top)+parseFloat(c2.style.height))+"px";
    c4.style.left=(parseFloat(element.style.left)+parseFloat(c2.style.width))+"px";
    pixl=getAverageColor(imageContext,proportion*parseFloat(c4.style.left),proportion*(parseFloat(c4.style.left)+parseFloat(c4.style.width)),proportion*parseFloat(c4.style.top),proportion*(parseFloat(c4.style.top)+parseFloat(c4.style.height)),35);
    c4.style.backgroundColor = "rgb(" + pixl.R + "," + pixl.G + "," + pixl.B + ")";
    c4.addEventListener("mousemove",function(e){split(imageCanvas,proportion,e);},false);

    parent.appendChild(c1);
    parent.appendChild(c2);
    parent.appendChild(c3);
    parent.appendChild(c4);
}
function readImage() {
    var newdiv=document.createElement('div');
    newdiv.className="resultImage";
    resultCanvas.parentNode.replaceChild(newdiv,resultCanvas);
    newdiv.id="colorMap";
    resultCanvas=newdiv;
    if ( this.files && this.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
            var img = new Image();

            img.addEventListener("load", function() {


                var imageCanvas=document.createElement("canvas");
                imageCanvas.width=img.width;
                imageCanvas.height=img.height;
                var imageContext=imageCanvas.getContext("2d");
                imageContext.drawImage(img, 0, 0);

                var pix=getAverageColor(imageContext,0,imageCanvas.width,0,imageCanvas.height,35);

                var proportion=0.7; //window proportion

                if(parseFloat(img.width)>parseFloat(img.height)){
                    resultCanvas.style.width=(proportion*parseFloat(screen.width))+"px";
                    resultCanvas.style.height=resultCanvas.style.width;
                    resultCanvas.style.visibility="visible";
                    proportion=parseFloat(img.width)/parseFloat(resultCanvas.style.width);
                }
                else{
                    resultCanvas.style.height=(proportion*parseFloat(screen.height))+"px";
                    resultCanvas.style.width=resultCanvas.style.height
                    resultCanvas.style.visibility="visible";
                    proportion=parseFloat(img.height)/parseFloat(resultCanvas.style.height);
                }


                var newDiv=document.createElement('div');
                newDiv.className='bloc';
                newDiv.style.width=Math.max(parseFloat(resultCanvas.style.width),parseFloat(resultCanvas.style.height))+"px";
                newDiv.style.height=parseFloat(newDiv.style.width)+"px";
                newDiv.style.backgroundColor="rgb(" + pix.R + "," + pix.G + "," + pix.B + ")";
                setMiddle(newDiv,0,resultCanvas.style.width,0,resultCanvas.style.height);
                resultCanvas.appendChild(newDiv);
                newDiv.addEventListener("mousemove",function(e){split(imageCanvas,proportion,e);},false);

            });
            img.src = e.target.result;
        };
        FR.readAsDataURL( this.files[0] );

    }
}





el("fileUpload").addEventListener("change", readImage, false);


function setMiddle(child,widthStart,widthEnd,heightStart,heightEnd){
    child.style.left=(parseFloat(widthEnd)+parseFloat(widthStart)-parseFloat(child.style.width))+"px";
    child.style.top=(parseFloat(heightEnd)+parseFloat(heightStart)-parseFloat(child.style.height))+"px";
}



