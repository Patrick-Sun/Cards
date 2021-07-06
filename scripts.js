function flip(ele) {
	ele.classList.toggle('is_flipped')
};

function order_name() {
	$("#deck li").sort(name_sort).appendTo('#deck');
	document.getElementById("button_name").classList.add('button_active')
	document.getElementById("button_date").classList.remove('button_active')

}

function order_date() {
	$("#deck li").sort(date_sort).appendTo('#deck');
	document.getElementById("button_date").classList.add('button_active')
	document.getElementById("button_name").classList.remove('button_active')
}

function name_sort(a, b){
    return a.id.localeCompare(b.id);
}

function date_sort(a, b){
    return a.dataset.order.localeCompare(b.dataset.order);
}