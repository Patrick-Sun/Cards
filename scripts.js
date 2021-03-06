function flip(ele) {
	ele.classList.toggle('is_flipped')
};

function flip_all() {
  var cards = document.getElementsByClassName("card_inner");
  for (var i = 0; i < cards.length; i++) {
     cards.item(i).classList.toggle('is_flipped');
  }

  var icons = document.getElementsByClassName("flip_icon");
  for (var i = 0; i < icons.length; i++) {
   icons.item(i).classList.toggle('is_flipped');
  }
};

function order_name() {
	animateSort("#deck", "li", "card");
	document.getElementById("button_name").classList.add('button_active')
	document.getElementById("button_date").classList.remove('button_active')

}

function order_date() {
  animateSort("#deck", "li", "date");
	document.getElementById("button_date").classList.add('button_active')
	document.getElementById("button_name").classList.remove('button_active')
}

function animateSort(parent, child, sortAttribute) {
  var promises = [];
  var positions = [];
  var originals = $(parent).find(child);

  	if (sortAttribute=="date") {
	  var sorted = originals.toArray().sort(function(a, b) {
	    return a.dataset.orderdate.localeCompare(b.dataset.orderdate);
	  });
	} else if (sortAttribute=="card") {
		var sorted = originals.toArray().sort(function(a, b) {
      return a.dataset.ordercard.localeCompare(b.dataset.ordercard);
	  	});
	}

  originals.each(function() {
    //store original positions
    positions.push($(this).position());
  }).each(function(originalIndex) {
    //change items to absolute position
    var $this = $(this);
    var newIndex = sorted.indexOf(this);
    sorted[newIndex] = $this.clone(); //copy the original item before messing with its positioning
    $this.css("position", "absolute").css("top", positions[originalIndex].top + "px").css("left", positions[originalIndex].left + "px");

    //animate to the new position
    var promise = $this.animate({
      top: positions[newIndex].top + "px",
      left: positions[newIndex].left + "px"
    }, 400);
    promises.push(promise);
  });

  //instead of leaving the items out-of-order and positioned, replace them in sorted order
  $.when.apply($, promises).done(function() {
    originals.each(function(index) {
      $(this).replaceWith(sorted[index]);
    });
  });
}

function scroll_to_card(ele) {

  const y = document.getElementById(ele.dataset.ref).getBoundingClientRect().top + window.scrollY - 20;
  window.scroll({
    top: y,
    behavior: 'smooth'
  });
}