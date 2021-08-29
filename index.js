var columns;
var widthOfColumns,width;
function getInputValue() {
    columns=[];
    var userInput =$("input").val();
    userInput=userInput.trim();
    var val=Number(userInput);
    width=Number(document.querySelector(".box").offsetWidth)-2*val;
    document.querySelector(".footer").innerText="";
    if(val>100){
        document.querySelector("p").innerText="Max Limit Exceeded";
        return;
    }
    // alert(val)
    widthOfColumns=Math.floor(width/val);
    console.log(widthOfColumns+" "+width);
    for(let i=0;i<val;i++){
        let x=Math.floor(Math.random()*100+1);
        columns.push(x);
    }
    draw(columns,widthOfColumns,width);

}
function draw(columns,widthOfColumns,width){
    var box=document.querySelector(".box");
    var str="";
    for(let i=0;i<columns.length;i++){
       str+=`<div class="col col${i}"></div>`
    }
    box.innerHTML=str;
    var sum=0;
    for(let i=0;i<columns.length;i++){

        document.querySelector(`.col${i}`).style.width=`${widthOfColumns*0.8}px`;
        document.querySelector(`.col${i}`).style.height=`${columns[i]}%`;
        document.querySelector(`.col${i}`).innerText=`${columns[i]}`;
        document.querySelector(`.col${i}`).style.fontSize=`${widthOfColumns*1.2}%`;
    }
}

document.querySelector(".linearSearch").addEventListener("click",function(){
    document.querySelector(".footer").innerText="";
    draw(columns,widthOfColumns,width);
    let value=document.querySelectorAll("input")[1].value;
    let temp= document.querySelectorAll(".col");
    var index=0;
    var check=0;
    var store= setInterval(function(){
       if(index>=1){
        temp[index-1].classList.remove("col-search")
       }
       if(index==columns.length){
        document.querySelector(".footer").innerText="Your Number is not there.";
        clearInterval(store);
    }
        temp[index].classList.add("col-search")
        var insideNumber=Number(temp[index].innerText);
        if(value==insideNumber){
    
            document.querySelector(".footer").innerText="Your Number is  there.";
            clearInterval(store);
        }
        index++;

    },300);
});
document.querySelector(".binarySearch").addEventListener("click",function(){
    let value=document.querySelectorAll("input")[1].value;
    document.querySelector(".footer").innerText="";
    var index=0;
    var check=0;
    columns.sort(function(a, b){return a - b});
    document.querySelector(".box").innerHTML="";
    draw(columns,widthOfColumns,width);
    let temp= document.querySelectorAll(".col");
    var left=0,right=columns.length-1;
    var middle;
    var prev=-1;
    var store= setInterval(function(){
       if(prev!=-1){
        temp[prev].classList.remove("col-search")
       }
       middle=Math.floor((left+right)/2);
        temp[middle].classList.add("col-search")
        var insideNumber=Number(temp[middle].innerText);
        if(value==insideNumber){
            document.querySelector(".footer").innerText=`Your Number is  there at index ${middle+1}`;
            // temp[middle].classList.remove("col-search")
            clearInterval(store);
        }
        if(left>right){
            temp[prev].classList.remove("col-search")
            document.querySelector(".footer").innerText="Your Number is not  there.";
            clearInterval(store);
        }
        if(insideNumber>value){
            right=middle-1;
        }else{
            left=middle+1;
        }
        prev=middle;

    },300);
});


   