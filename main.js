const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const containerBtn = document.querySelector('#submit')

let score = 0
let questionIndex = 0 
clearContainer()
showQuestion()
containerBtn.onclick = checkAnswer

function clearContainer() {
	headerContainer.innerHTML = ''
	listContainer.innerHTML = ''
}

function showQuestion() {
	const questionHTML = `<h2 class="title">${questions[questionIndex]['question']}</h2>`
	headerContainer.innerHTML = questionHTML

	let answerNumber = 1
	for (item of questions[questionIndex]['answers']) {
		const answerHTML = 
		`<li>
			<label>
				<input value="${answerNumber++}" type="radio" class="answer" name="answer" />
				<span>${item}</span>
			</label>
		</li>`
		
		listContainer.innerHTML += answerHTML
	}
}

function checkAnswer() {
	const checkedAnswer = listContainer.querySelector('input[type="radio"]:checked')

	if (!checkedAnswer) {
		containerBtn.blur()
		return 
	}

	const userAnswer = parseInt(checkedAnswer.value)

	if (userAnswer === questions[questionIndex]['correct']){
		score++
	}

	if (questionIndex !== questions.length - 1) {
		questionIndex++
		clearContainer()
		showQuestion()
	}else {
		clearContainer()
		showResults()
	}
}

function showResults() {
	let title, message

	if (score == questions.length) {
		title = 'Поздравляем!'
		message = 'Вы ответили верно на все вопросы!'
	}else if ((score * 100) / questions.length > 50) {
		title = 'Неплохой результат!'
		message = 'Вы дали более половины правильных ответов'
	}else {
		title = 'Стоит постараться('
		message = 'Вы дали менее половины правильных ответов'
	} 	

	const finalRes = `${score} из ${questions.length}`


	const resTemplate = `
		<h2 class="title">${title}</h2>
		<h3 class="summary">${message}</h3>
		<p class="result">${finalRes}</p>
	`

	headerContainer.innerHTML = resTemplate

	containerBtn.blur()
	containerBtn.innerText = 'Начать заново'
	containerBtn.onclick = ()=> history.go()
}

