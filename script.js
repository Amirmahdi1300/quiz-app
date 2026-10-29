// صفحه‌های اصلی
const startScreen = document.querySelector('#start-screen');
const quizScreen = document.querySelector('#quiz-screen');
const resultScreen = document.querySelector('#result-screen');

// دکمه‌ها
const startBtn = document.querySelector('#start-btn');
const nextBtn = document.querySelector('#next-btn');
const restartBtn = document.querySelector('#restart-btn');

// سؤال و گزینه‌ها
const questionNumber = document.querySelector('#question-number');
const totalQuestions = document.querySelector('#total-questions');
const questionText = document.querySelector('#question-text');
const answerContainer = document.querySelector('#answer-container');
const feedbackMessage = document.querySelector('#feedback-message');

// امتیاز و پیشرفت آزمون
const scoreValue = document.querySelector('#score-value');
const progressBar = document.querySelector('#progress-bar');
const progressTrack = document.querySelector('.progress-track');

// نتیجه نهایی
const resultTitle = document.querySelector('#result-title');
const resultMessage = document.querySelector('#result-message');
const resultIcon = document.querySelector('#result-icon');
const finalScore = document.querySelector('#final-score');

// انتخاب دکمه‌های گزینه‌ها
const getAnswerButtons = () =>
    answerContainer.querySelectorAll('.answer-btn');
const questions = [
    {
        text: 'پایتخت ایران کدام است؟',
        options: ['تهران', 'شیراز', 'تبریز', 'اصفهان'],
        answer: 'تهران'
    },

    {
        text: 'بهترین و محبوب ترین شخصیت در ایران ',
        options: ['میثاقی', 'اکبر عبدی', 'علی کریمی', 'رضا گلزار'],
        answer: 'رضا گلزار'
    },
    {
        text: 'قدیمی ترین حکومت متعلق به کدام کشور است؟',
        options: ['عربستان سعودی', 'عراق', 'ایران', 'المان'],
        answer: 'ایران'
    },
    {
        text: ' پایتخت برزیل کدام است ؟',
        options: ['برازیلیا', 'پورتوالگره', 'فورتالزا', 'سالوادور'],
        answer: 'برازیلیا'
    },
    {
        text: 'کامل ترین ورزش برای آمادگی جسمانی بالا, کدام ورزش است ؟',
        options: ['کراسفیت داخل مایوستاتین', 'کراسفیت ', 'بدنسازی', 'کلیستنیکس'],
        answer: 'کراسفیت داخل مایوستاتین'
    },
    {
        text: 'محبوب ترین برند خودرو در دنیا؟ ',
        options: ['BMW', 'tesla', 'IranKhodro', 'mercedes-benz'],
        answer: 'BMW'
    },
    {
        text: 'کامل ترین بازیکن تاریخ فوتبال ؟',
        options: ['مسی', 'بیرانوند نسخه سربازی', 'خداد عزیزی', 'رونالدو'],
        answer: 'رونالدو'
    },
    {
        text: 'کدام تیم ایرانی بیشترین قهرمانی در اسیا را دارد و ابروی فوتبال ایران در اسیا است ؟',
        options: ['تراختور', 'استقلال', 'پرسپولیس', 'پاس'],
        answer: 'استقلال'
    },
    {
        text: 'میزبان جام جهانی سال 2018 کدام کشور بود ؟',
        options: ['برزیل', 'روسیه', 'ایران', 'المان'],
        answer: 'روسیه'
    },
    {
        text: 'سونی محصول گدام کشور است  ؟',
        options: ['ژاپن', 'کره جنوبی', 'چین', 'امریکا'],
        answer: 'ژاپن'
    }
];
let currentQuestionIndex = 0;  // for questions 
let pointQuestions = 0  // for keeping the points of questions

function progressBar1() {
    const fullProgress = (currentQuestionIndex + 1) / questions.length * 100;
    progressBar.style.width = `${fullProgress}%`;
}

// show and detect All questions 
function showAnswers() {
    answerContainer.innerHTML = '';
    totalQuestions.textContent = questions.length
    questions[currentQuestionIndex].options.forEach(function (option) {
        const btnQ = document.createElement("button")
        btnQ.classList.add("answer-btn")
        btnQ.textContent = option
        answerContainer.appendChild(btnQ)
        btnQ.addEventListener('click', function () {
            if (option === questions[currentQuestionIndex].answer) {
                feedbackMessage.hidden = false
                feedbackMessage.textContent = " باریکلا!پاسخ درست است"
                ++pointQuestions
            } else {
                feedbackMessage.hidden = false
                feedbackMessage.textContent = ` پاسخ اشتباه است! جواب درست : "${questions[currentQuestionIndex].answer}" میباشد`
            }
            scoreValue.textContent = pointQuestions
            const btn = getAnswerButtons()
            btn.forEach((item) => {
                if (item.textContent === questions[currentQuestionIndex].answer) {
                    item.classList.add("true-answer")
                } else {
                    item.classList.add("wrong-answer")
                }
            })
            btn.forEach((btn) => {
                btn.disabled = true
            })
            nextBtn.disabled = false
        })
    })
    progressBar1()
}

function loadQuestion() {
    questionNumber.textContent = currentQuestionIndex + 1
    feedbackMessage.hidden = true
    questionText.textContent = questions[currentQuestionIndex].text
    nextBtn.disabled = true
    showAnswers()
}
// for moving next questions
function nextBtn1() {
    ++currentQuestionIndex

    if (questions.length === currentQuestionIndex) {
        quizScreen.hidden = true;
        resultScreen.hidden = false;
        finalScore.textContent = pointQuestions
        scoreValue.textContent = pointQuestions
        return;
    }
    loadQuestion()
}
// for restarting questions again
function restart() {
    resultScreen.hidden = true;
    quizScreen.hidden = false;
    currentQuestionIndex = 0;
    pointQuestions = 0;
    scoreValue.textContent = 0
    loadQuestion()
}
// for questions pages 
function startBTN() {
    startScreen.hidden = true;
    quizScreen.hidden = false;
    loadQuestion()
}
startBtn.addEventListener('click', startBTN)
nextBtn.addEventListener("click", nextBtn1)
restartBtn.addEventListener('click', restart)