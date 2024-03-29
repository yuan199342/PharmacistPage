
const CarouselModule = function(){
	var myArr = ""
	const carImgs = document.querySelector('#carousel-imgs')
	const carUp = document.querySelector('#up')
	const carNext = document.querySelector('#next')
	const carImg = carImgs.querySelectorAll('img')
	const carImgMove = - carImg.length * carImg[0].offsetWidth
	const carousel = document.querySelector('#carousel')
	const carTips = document.querySelector('#car-tips')
	const carLi = carTips.querySelectorAll('li')
	const carCaption = document.querySelector('#caption')
	const carCaptionP = carCaption.querySelectorAll('p')
	var carTimer
	var carIndex = 0
	var carMove = 0
//載入JSON
function loadCarouselCaption(){
var xmlhttp = new XMLHttpRequest();
var url = "caption.txt"
xmlhttp.onreadystatechange = function() {
	//調取本地資源 status 為0 
    if (this.readyState == 4 && this.status == 0) {
        myArr = JSON.parse(this.responseText);
		printCaption();
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
}
	
	//XML的回呼 將caption內容印出來
function printCaption(){
	for(i=0;i<myArr.length;i++){
		carCaptionP[i].innerHTML = myArr[i].value
		//carCaptionP[0].style.display = "block"
		console.log(carCaptionP[i])
	}
}
	
//右方caption隨輪播改變
function caption(){
	
	for(i=0;i<carCaptionP.length;i++){
	//carCaptionP[i].removeAttribute('style');	
		carCaptionP[i].classList.remove('active');
		console.log(carCaptionP[i].classList)
	}
//carCaptionP[carIndex].style.display = "block";	
	carCaptionP[carIndex].classList.add('active')
}
	
	
//點擊右按鈕 換下一張照片
function clickNext(){
	//換照片的功能
	carMove -= carImg[0].offsetWidth
	if(carMove === carImgMove){carMove = 0}
	carImgs.style.left = carMove + "px"
	
	//所有小圓點解除active
	for(i=0;i<carLi.length;i++){
		carLi[i].classList.remove('active')
	}
	
	//對應的小圓點加上active
	carIndex++
	if(carIndex === carImg.length){carIndex = 0}
	carLi[carIndex].classList.add('active')
	console.log(myArr[carIndex].value)
	caption()
}

//點擊左按鈕 換上一張照片
function clickUp(){
	//換照片的功能
	if(carMove === 0){carMove = carImgMove}
	carMove += carImg[0].offsetWidth
	carImgs.style.left = carMove + "px"
	
	//所有小圓點解除active
	for(i=0;i<carLi.length;i++){
		carLi[i].classList.remove('active')
	}
	
	//對應的小圓點加上active
	if(carIndex === 0){carIndex = carImg.length}
	carIndex--
	carLi[carIndex].classList.add('active')
	caption()
}
	loadCarouselCaption();
	
	//用閉包將每個小圓點掛上EventListener
for(j=0;j<carLi.length;j++){
	(function(j){
		carLi[j].addEventListener('click',function (){
			for(i=0;i<carLi.length;i++){
		carLi[i].classList.remove('active')
	}
			this.classList.add('active')
			carIndex = j
			carMove = j * -carImg[0].offsetWidth
			carImgs.style.left = carMove + "px"
			caption()
		})
		
	})(j)
	
}
	carNext.addEventListener('click',clickNext)
    carUp.addEventListener('click',clickUp)
	   
}
CarouselModule();
