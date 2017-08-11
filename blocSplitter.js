/**
 * Created by mehdi on 11/08/17.
 */


function split(imageCanvas,proportion,e){
    var imageContext=imageCanvas.getContext("2d");
    console.log("split called");
    var element=e.target;
    var x=element.left;
    var y=element.top;
    var parent=element.parentNode;
    parent.removeChild(element);
    var c1,c2,c3,c4;
    var marginProportion=0.2;
    c1=document.createElement("div");
    c1.className='bloc';
    c1.style.width=(parseFloat(element.style.width)/2)+"px";
    c1.style.height=(parseFloat(element.style.height)/2)+"px";
    c1.style.top=element.style.top;
    c1.style.left=element.style.left;
    //c1.style.margin=marginProportion*parseFloat(c1.style.width)+"px";

    //console.log("c1 position:\n"+parseFloat(c1.style.left)+","+parseFloat(c1.style.left)+parseFloat(c1.style.width)+","+parseFloat(c1.style.top)+","+parseFloat(c1.style.top)+parseFloat(c1.style.height));
    //console.log("element middle:\n"+parseFloat(element.style.left)+","+parseFloat(element.style.left)+parseFloat(c1.style.width)+","+parseFloat(element.style.top)+","+parseFloat(c1.style.top)+parseFloat(c1.style.height));



    var pixl=getAverageColor(imageContext,proportion*parseFloat(c1.style.left),proportion*(parseFloat(c1.style.left)+parseFloat(c1.style.width)),proportion*parseFloat(c1.style.top),proportion*(parseFloat(c1.style.top)+parseFloat(c1.style.height)),35);
    c1.style.backgroundColor = "rgb(" + pixl.R + "," + pixl.G + "," + pixl.B + ")";
    c1.addEventListener("mousemove",function(e){split(imageCanvas,proportion,e);},false);

    c2=document.createElement("div");
    c2.className='bloc';
    c2.style.width=(parseFloat(element.style.width)/2)+"px";
    c2.style.height=(parseFloat(element.style.height)/2)+"px";
    c2.style.top=element.style.top;
    //c2.style.margin=marginProportion*parseFloat(c1.style.width)+"px";
    c2.style.left=(parseFloat(element.style.left)+parseFloat(c1.style.width))+"px";
    pixl=getAverageColor(imageContext,proportion*parseFloat(c2.style.left),proportion*(parseFloat(c2.style.left)+parseFloat(c2.style.width)),proportion*parseFloat(c2.style.top),proportion*(parseFloat(c2.style.top)+parseFloat(c2.style.height)),35);
    c2.style.backgroundColor = "rgb(" + pixl.R + "," + pixl.G + "," + pixl.B + ")";
    c2.addEventListener("mousemove",function(e){split(imageCanvas,proportion,e);},false);

    c3=document.createElement("div");
    c3.className='bloc';
    c3.style.width=(parseFloat(element.style.width)/2)+"px";
    c3.style.height=(parseFloat(element.style.height)/2)+"px";
    c3.style.left=element.style.left;
    //c3.style.margin=marginProportion*parseFloat(c1.style.width)+"px";
    c3.style.top=(parseFloat(element.style.top)+parseFloat(c1.style.height))+"px";
    pixl=getAverageColor(imageContext,proportion*parseFloat(c3.style.left),proportion*(parseFloat(c3.style.left)+parseFloat(c3.style.width)),proportion*parseFloat(c3.style.top),proportion*(parseFloat(c3.style.top)+parseFloat(c3.style.height)),35);
    c3.style.backgroundColor = "rgb(" + pixl.R + "," + pixl.G + "," + pixl.B + ")";
    c3.addEventListener("mousemove",function(e){split(imageCanvas,proportion,e);},false);

    c4=document.createElement("div");
    c4.className='bloc';
    c4.style.width=(parseFloat(element.style.width)/2)+"px";
    c4.style.height=(parseFloat(element.style.height)/2)+"px";
    //c4.style.margin=marginProportion*parseFloat(c1.style.width)+"px";
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

