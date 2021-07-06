function flip(ele) {
	ele.classList.toggle('is_flipped')
};

function createCards(id) {
    temp = document.getElementById("deck").innerHTML;
    document.getElementById("deck").innerHTML = temp + '<li class="card"><div class="card_inner" onclick="flip(this)"><div class="card_face card_face_front" id="'+id+'" style="background-image: url("assets/'+id+'.png");"></div><div class="card_face card_face_back"></div></div></li>';
}

function onload(){
	var dir = "assets/";
	var fileextension = ".png";
	$.ajax({
	    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
	    url: dir,
	    success: function (data) {
	        //List all .png file names in the page
	        $(data).find("a:contains(" + fileextension + ")").each(function () {
	            var filename = this.href.replace(window.location, "").replace("http://", "");
	            createCards(filename);
	        });
	    }
	});
}