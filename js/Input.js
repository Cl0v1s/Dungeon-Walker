window.onkeydown = function(event) {
	var e = event || window.event;
	var key = e.which || e.keyCode;
	LastKey=key;
	//alert(key);
}

window.onkeyup = function(event) {
	LastKey=0;
}


function Input()
{
}

Input.prototype.equals=function(value)
{
		if(LastKey==value)
		{
			LastKey=0;
			return true;
		}
		else
		{
			return false;
		}
}
