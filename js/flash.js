function getByClass(oParent,sClass){
	var aEle=oParent.getElementsByTagName("*");
	var aResult=[];
	
	for(var i=0;i<aEle.length;i++){
		if (aEle[i].className==sClass) {
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

var imgData=[
	{"id":"1","src":"img/flash/1.jpg","txt":"水何澹澹,山岛竦峙."},
	{"id":"2","src":"img/flash/2.jpg","txt":"黑白性感美女"},
	{"id":"3","src":"img/flash/3.jpg","txt":"北海道图片"},
	{"id":"4","src":"img/flash/4.jpg","txt":"职场魅力女性"},
	{"id":"5","src":"img/flash/5.jpg","txt":"超模伊莉娜·莎伊克Irina Shayk"},
	{"id":"6","src":"img/flash/6.jpg","txt":"水何澹澹,山岛竦峙."},
	{"id":"7","src":"img/flash/7.jpg","txt":"巍峨雪山，白雪皑皑."},
	{"id":"8","src":"img/flash/8.jpg","txt":"超酷跑车1"},
	{"id":"9","src":"img/flash/9.jpg","txt":"超酷跑车2"},
	{"id":"10","src":"img/flash/10.jpg","txt":"夏日里的连衣裙美女"},
	{"id":"11","src":"img/flash/11.jpg","txt":"咖啡馆里的美女"},
	{"id":"12","src":"img/flash/12.jpg","txt":"高清美女图片"},
	{"id":"13","src":"img/flash/13.jpg","txt":"唯美十字架"},
	{"id":"14","src":"img/flash/14.jpg","txt":"唯美"},
	{"id":"15","src":"img/flash/15.jpg","txt":"桀骜不驯的野马"},
	{"id":"16","src":"img/flash/16.jpg","txt":"夜灯"},
	{"id":"17","src":"img/flash/17.jpg","txt":"美丽冻人"},
	{"id":"18","src":"img/flash/18.jpg","txt":"气质摄影"},
];

window.onload=function(){
	var oDiv=document.getElementById("playimages");
	var oBtnPrev=getByClass(oDiv,"prev")[0];
	var oBtnNext=getByClass(oDiv,"next")[0];
	var oMarkLeft=getByClass(oDiv,"mark_left")[0];
	var oMarkRight=getByClass(oDiv,"mark_right")[0];
	
	var oBigUl=getByClass(oDiv,"big_pic")[0];
	var aBigLi=oBigUl.getElementsByTagName("li");
	var oSmallDiv=getByClass(oDiv,"small_pic")[0];
	var aSmallLi=oSmallDiv.getElementsByTagName("li");
	var oSmallUl=oSmallDiv.getElementsByTagName("ul")[0];
	
	var nowZIndex=2;
	var now=0;
	
	//数据显示
	var oTxt=getByClass(oBigUl,"txt")[0];
	var oNum=oTxt.getElementsByTagName("span")[0];
	
	//数据初始化
	for(var i=0;i<imgData.length;i++){
		var oBigLi=document.createElement("li");
		var oBigPic=document.createElement("img");
		
		var oSmallLi=document.createElement("li");
		var oSmallPic=document.createElement("img");
		
		oBigLi.appendChild(oBigPic);
		oBigUl.appendChild(oBigLi);
		oSmallLi.appendChild(oSmallPic);
		oSmallUl.appendChild(oSmallLi);
		
		aBigLi[i].getElementsByTagName("img")[0].src=imgData[i].src;
		oTxt.innerHTML=imgData[i].txt+"<span>"+parseInt(imgData[now].id)+"/"+parseInt(imgData.length)+"</span>";
		//oNum.innerHTML="<span>"+parseInt(imgData[now].id+1)+"/"+parseInt(imgData.length)+"</span>";
		aSmallLi[i].getElementsByTagName("img")[0].src=imgData[i].src;
	}
	
	oSmallUl.style.width=aSmallLi.length*aSmallLi[0].offsetWidth+"px";
	
	//左右按钮
	//
	oBtnPrev.onmouseover=oMarkLeft.onmouseover=function(){
		startMove(oBtnPrev,"opacity",100);
	}
	//
	oBtnPrev.onmouseout=oMarkLeft.onmouseout=function(){
		startMove(oBtnPrev,"opacity",0);
	}
	//
	oBtnNext.onmouseover=oMarkRight.onmouseover=function(){
		startMove(oBtnNext,"opacity",100);
	}
	//
	oBtnNext.onmouseout=oMarkRight.onmouseout=function(){
		startMove(oBtnNext,"opacity",0);
	}
	//切换函数
	function tab(){
		aBigLi[now].style.zIndex=nowZIndex++;
		
		for (var i=0;i<aSmallLi.length;i++) {
			startMove(aSmallLi[i],"opacity",60);
		}
		startMove(aSmallLi[now],"opacity",100);
		
		aBigLi[now].style.height=0;
		startMove(aBigLi[now],"height",360);
		
		//oTxt.innerHTML=imgData[now].txt;
		oTxt.innerHTML=imgData[now].txt+"<span>"+parseInt(imgData[now].id)+"/"+parseInt(imgData.length)+"</span>";
		//oNum.innerHTML=parseInt(imgData[now].id+1)+"/"+parseInt(imgData.length);
		
		if(now==0){
			startMove(oSmallUl,"left",0);
		}
		else if(now==aSmallLi.length-1){
			startMove(oSmallUl,"left",-(now-2)*aSmallLi[0].offsetWidth);
		}
		else{
			startMove(oSmallUl,"left",-(now-1)*aSmallLi[0].offsetWidth);
		}
	}
	//大图切换
	for(var i=0;i<aSmallLi.length;i++){
		aSmallLi[i].index=i;
		
		aSmallLi[i].onclick=function(){
			if(this.index==now){
				return;
			}
			now=this.index;
			tab();
		}
		//小图淡入淡出
		aSmallLi[i].onmouseover=function(){
			startMove(this,"opacity",100);
		}
		aSmallLi[i].onmouseout=function(){
			if (this.index!=now) {
				startMove(this,"opacity",60);
			} else {
				return;
			}
			
		}
	}
	oBtnPrev.onclick=function(){
		now--;
		if(now==-1){
			now=aSmallLi.length-1;
		};
		tab();
	}
	
	oBtnNext.onclick=function(){
		now++;
		if(now==aSmallLi.length){
			now=0;
		};
		tab();
	}
	
	var timer=setInterval(oBtnNext.onclick,2000);
	oDiv.onmouseover=function(){
		clearInterval(timer);
	}
	oDiv.onmouseout=function(){
		timer=setInterval(oBtnNext.onclick,2000);
	}
}
