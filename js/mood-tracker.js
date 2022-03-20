let date = new Date();
let day = date.getDate();
let year = date.getFullYear();
let month = date.getMonth();
let nameOfMonth = date.toLocaleString('en-US', { month: 'long' });
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let today = date.toLocaleDateString('en-US',options)

function getNumberOfDays (year, month) {
	return new Date(year, month+1, 0).getDate()
}
function daysIntoYear(date){
	return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

let thisMonthsNumberOfDays = getNumberOfDays(year, month)
// year progress
let yearProgress = Math.floor(daysIntoYear(date) / 365 * 100)

// Changing Value within DOM
document.getElementById('activeDate').textContent =  `${today}`
document.getElementById('year-progress').style = `width: ${yearProgress}%`
document.getElementById('year-progress').textContent = `${yearProgress}%`
document.getElementById('remainingDay').textContent = `${365 - daysIntoYear(date)}`
document.getElementById('moodBlock-month').textContent = nameOfMonth

// Generate random number between min and max
function random(min, max) {  
	return Math.floor(Math.random() * (max - min + 1) + min);
}
// Return st,nd,rd, or th after a number
function ord(n) {
	return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

// generate for (now random) moodblocks
let moodBlocks = document.getElementById('moodBlocks')
let moodArray = ['Very though', 'Difficult', 'Average', 'Great','Amazing']
let currentMoodArray = [0,0,0,0,0]
let countMood = 0
let moodBoard = []
let moodRow = []

for(let i=1; i<=thisMonthsNumberOfDays; i++){
	let moodId = 0
	moodRow = []
	let gridContainer = document.createElement('div')
	gridContainer.className = 'grid-container justify-content-center'
	gridContainer.id = 'gridContainer-'+i
	
	let blockRowDate = document.createElement('div')
	blockRowDate.id = `blockRowDate-${i}`
	blockRowDate.appendChild(document.createTextNode(i))
	
	// append element to gridContainer
	gridContainer.appendChild(blockRowDate)
	for(let j=1; j<=12; j++){
		
		let gridItem = document.createElement('div')
		
		gridItem.setAttribute('title',`${ord(i)} of ${nameOfMonth}`);
		if(j<4 && i<day){
			moodId = random(3,5)
			currentMoodArray[moodId-1] += 1
			moodRow.push(moodId)
			countMood++
			gridItem.setAttribute('title',`my morning was ${moodArray[moodId-1]}`)
		}else if(j<7 && i<day){
			moodId = random(2,5)
			currentMoodArray[moodId-1] += 1
			moodRow.push(moodId)
			countMood++
			gridItem.setAttribute('title',`my noon was ${moodArray[moodId-1]}`)
		}else if(j<10 && i<day){
			moodId = random(1,5)
			currentMoodArray[moodId-1] += 1
			moodRow.push(moodId)
			countMood++
			gridItem.setAttribute('title',`my afternoon was ${moodArray[moodId-1]}`)
		}else if(j<=12 && i<day) {
			moodId = random(2,4)
			currentMoodArray[moodId-1] += 1
			moodRow.push(moodId)
			countMood++
			gridItem.setAttribute('title',`my evening was ${moodArray[moodId-1]}`)
		}

		

		gridItem.setAttribute('data-toggle','popover')
		gridItem.setAttribute('data-trigger','focus')
		gridItem.setAttribute('tabindex','0')
		if(i == day){
			gridItem.className = `grid-item moodType-${moodId} grid-item-today`
		} else {
			gridItem.className = `grid-item moodType-${moodId}`
		}
		gridContainer.appendChild(gridItem)
	}
	moodBoard.push(moodRow)
	moodBlocks.appendChild(gridContainer)
}
// Board legends
let percentage0 = document.getElementById('percentage-0').textContent = (currentMoodArray[0]/countMood*100).toFixed(0)+'%' 
let percentage1 = document.getElementById('percentage-1').textContent = (currentMoodArray[1]/countMood*100).toFixed(0)+'%' 
let percentage2 = document.getElementById('percentage-2').textContent = (currentMoodArray[2]/countMood*100).toFixed(0)+'%' 
let percentage3 = document.getElementById('percentage-3').textContent = (currentMoodArray[3]/countMood*100).toFixed(0)+'%' 
let percentage4 = document.getElementById('percentage-4').textContent = (currentMoodArray[4]/countMood*100).toFixed(0)+'%' 

let ratio0 = document.getElementById('ratio-0').textContent = '(' + currentMoodArray[0] + ' / ' + countMood + ')'
let ratio1 = document.getElementById('ratio-1').textContent = '(' + currentMoodArray[1] + ' / ' + countMood + ')'
let ratio2 = document.getElementById('ratio-2').textContent = '(' + currentMoodArray[2] + ' / ' + countMood + ')'
let ratio3 = document.getElementById('ratio-3').textContent = '(' + currentMoodArray[3] + ' / ' + countMood + ')'
let ratio4 = document.getElementById('ratio-4').textContent = '(' + currentMoodArray[4] + ' / ' + countMood + ')'


// Cycle through MoodsBlocks
gridCycler = document.querySelectorAll('.grid-item')
for(let i=0; i<gridCycler.length; i++){
	gridCycler[i].addEventListener('click', function() {
		if(gridCycler[i].classList[1] === 'moodType-1'){
			gridCycler[i].classList.remove(gridCycler[i].classList[1])
			gridCycler[i].classList.add('moodType-2')
		} else if(gridCycler[i].classList[1] === 'moodType-2'){
			gridCycler[i].classList.remove(gridCycler[i].classList[1])
			gridCycler[i].classList.add('moodType-3')
		} else if(gridCycler[i].classList[1] === 'moodType-3'){
			gridCycler[i].classList.remove(gridCycler[i].classList[1])
			gridCycler[i].classList.add('moodType-4')
		} else if(gridCycler[i].classList[1] === 'moodType-4'){
			gridCycler[i].classList.remove(gridCycler[i].classList[1])
			gridCycler[i].classList.add('moodType-5')
		} else if(gridCycler[i].classList[1] === 'moodType-5'){
			gridCycler[i].classList.remove(gridCycler[i].classList[1])
			gridCycler[i].classList.add('moodType-1')
		} else {
			gridCycler[i].classList.remove(gridCycler[i].classList[1])
			gridCycler[i].classList.add('moodType-3')
		}
		console.log(gridCycler[i].classList[1])
	});
}
