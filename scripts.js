function flip(ele) {
	ele.classList.toggle('is_flipped')
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
	    return a.dataset.order.localeCompare(b.dataset.order);
	  });
	} else if (sortAttribute=="card") {
		var sorted = originals.toArray().sort(function(a, b) {
			return a.id.localeCompare(b.id);
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