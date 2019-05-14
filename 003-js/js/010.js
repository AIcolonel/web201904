
window.onload=function(){
	function toChange(){
		var oBox=document.getElementById('box');
		oBox.style.width="300px";
		oBox.style.height="300px";
		oBox.style.background="yellow";
	}

	var oBox=document.getElementById('box');
	oBox.onclick = toChange;
}

