const container = document.querySelector('.container');
const seats = document.querySelectorAll('.rows .seat:not(.occupied)');
const movie = document.getElementById('movie');
const count = document.getElementById('count');
const total = document.getElementById('total');

populateUI();

let ticketPrice = +movie.value; //  + is added to make string data type to integer

//SELCTED MOVIE LOCAL STORAGE
 function selectedMovieStorage (indexOfMovie, value){
 	localStorage.setItem('movieIndex', indexOfMovie)
 	localStorage.setItem('value', value)
 }

//UPDATING THE TICKET COUNT
function updateSelectedCount(){
	const selectedSeats = document.querySelectorAll('.rows .seat.selected');
	const selectSeatIndex = [...selectedSeats].map((seat) => {
		return [...seats].indexOf(seat)
	});
	localStorage.setItem('selectedSeats',(selectSeatIndex)); 

	const selectedSeatsCount = selectedSeats.length;
	
	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice ;
}

//SEAT SELECT EVENT
container.addEventListener('click', (e)=>{
	if(e.target.classList.contains('seat') && 
		!e.target.classList.contains('occupied')){
		e.target.classList.toggle('selected')
	}

	updateSelectedCount();
})

//RESTORE THE SELECTED SEATS FROM LOCAL STORAGE
function populateUI (){
	const selectedSeats = localStorage.getItem('selectedSeats');
		if(selectedSeats !== null && selectedSeats.length > 0){
			seats.forEach((seat, index) =>{
				if(selectedSeats.indexOf(index) > -1){
					seat.classList.add('selected')
				}
		})
	}
	const selectedMovieStorage = localStorage.getItem('movieIndex');
	if(selectedMovieStorage !== null){
		movie.selectedIndex = selectedMovieStorage;
	}
}

//MOVIE CHANGE EVENT
movie.addEventListener('change', e =>{
	ticketPrice = +e.target.value;
	selectedMovieStorage(e.target.selectedIndex, e.target.value)
	updateSelectedCount();
})

//INITIAL COUNT AND TOTAL SETTING 
updateSelectedCount();



