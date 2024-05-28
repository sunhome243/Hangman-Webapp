document.addEventListener('DOMContentLoaded', function() {
    const wordDisplay = document.getElementById('wordDisplay');
    const startButton = document.getElementById('startButton');
    const letterInput = document.getElementById('letterInput');
    const guessButton = document.getElementById('guessButton');
    const message = document.getElementById('message');
    const attemptsLeft = document.getElementById('attemptsLeft');
    const lettersTried = document.getElementById('lettersTried');
    const gameArea = document.getElementById('gameArea');
    const hangmanParts = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg', 'leftEye', 'rightEye', 'mouth'];
    const playerInput = document.getElementById('playerInput');
    const scoreList = document.getElementById('scoreList');
    const startArea = document.getElementById('startArea'); // Get the starting area

    let word = '';
    let guessedLetters = [];
    let wrongAttempts = 0;
    let playerName = '';

    startButton.addEventListener('click', startGame);
    guessButton.addEventListener('click', makeGuess);
    letterInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            makeGuess();
        }
    });

    function startGame() {
        playerName = playerInput.value.trim(); 
        if (playerName === '') {
            alert('Please enter your name!');
            return; 
        }
        startArea.style.display = 'none'; // Hide the start area
        gameArea.style.display = 'block';  // Show the game area

        fetch('/start')
            .then(response => response.json())
            .then(data => {
                word = data.word;
                guessedLetters = [];
                wrongAttempts = 0;
                updateDisplay();
                resetHangman();
                message.textContent = '';
                lettersTried.textContent = '';
                attemptsLeft.textContent = '10';
                letterInput.disabled = false;
                guessButton.disabled = false;
                document.body.style.backgroundColor = '';
                updateScoreDisplay(); // Update score display on game start
            })
            .catch(error => console.error('Error:', error));
    }

    function makeGuess() {
        const letter = letterInput.value.toLowerCase();
        letterInput.value = '';

        if (letter && !guessedLetters.includes(letter)) {
            guessedLetters.push(letter);

            if (!word.includes(letter)) {
                wrongAttempts++;
                attemptsLeft.textContent = 10 - wrongAttempts;
                showHangmanPart(wrongAttempts);

                if (wrongAttempts === 10) {
                    message.textContent = 'Game over! The word was: ' + word;
                    message.style.fontWeight = 'bold';
                    hangmanFall();
                    disableInput();
                }
            } else {
                updateDisplay();

                if (isWordGuessed()) {
                    message.textContent = 'Congratulations! You won!';
                    message.style.fontWeight = 'bold';
                    hangmanSafe();
                    disableInput();
                    updatePlayerScore(playerName, 10 - wrongAttempts); 
                }
            }
        }

        lettersTried.textContent = guessedLetters.join(', ');
    }

    function updateDisplay() {
        const displayWord = word.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
        wordDisplay.textContent = displayWord;
    }

    function isWordGuessed() {
        return word.split('').every(letter => guessedLetters.includes(letter));
    }

    function showHangmanPart(attempt) {
        if (attempt <= hangmanParts.length) {
            document.getElementById(hangmanParts[attempt - 1]).classList.remove('hidden');
        }
    }

    function disableInput() {
        letterInput.disabled = true;
        guessButton.disabled = true;
    }

    function hangmanFall() {
        document.getElementById('head').style.top = '230px';
        document.getElementById('body').style.top = '230px';
        document.getElementById('body').style.transform = 'rotate(75deg)';
        document.getElementById('leftArm').style.top = '260px';
        document.getElementById('leftArm').style.transform = 'rotate(30deg)';
        document.getElementById('rightArm').style.top = '270px';
        document.getElementById('rightArm').style.right = '50px';
        document.getElementById('rightArm').style.transform = 'rotate(20deg)';
        document.getElementById('leftLeg').style.top = '270px';
        document.getElementById('rightLeg').style.top = '260px';
        document.getElementById('rightLeg').style.transform = 'rotate(10deg)';
        document.getElementById('rightLeg').style.left = '50px';
        document.getElementById('leftEye').style.top = '260px';
        document.getElementById('rightEye').style.top = '260px';
        document.getElementById('rightEye').style.left = '40px';
        document.getElementById('mouth').style.top = '260px';
        document.body.style.backgroundColor = '#880808';
        const spikes = document.querySelectorAll('.spikes');
        spikes.forEach(spike => {
            spike.classList.remove('gameWon')
            spike.classList.remove('gameReset')
            spike.classList.add('gameOver'); 
        });
    }

    function hangmanSafe() {
        showFireworks();
        document.body.style.backgroundColor = '#00FF00';
        const spikes = document.querySelectorAll('.spikes');
        spikes.forEach(spike => {
            spike.classList.remove('gameReset')
            spike.classList.remove('gameOver')
            spike.classList.add('gameWon');
        });
    }

    // Function to trigger fireworks animation
    function showFireworks() {
        const fireworksContainer = document.createElement('div');
        fireworksContainer.id = 'fireworks';
        document.body.appendChild(fireworksContainer);

        // Generate random fireworks particles
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createFirework(x, y);
        }

        setTimeout(() => {
            fireworksContainer.remove();
        }, 2000);
    }

    // Function to create a fireworks particle
    function createFirework(x, y) {
        const firework = document.createElement('div');
        firework.classList.add('firework');

        const size = Math.random() * 20 + 10; 
        firework.style.width = `${size}px`;
        firework.style.height = `${size}px`;

        firework.style.left = `${x}px`;
        firework.style.top = `${y}px`;

        const randomColor = getRandomColor();
        firework.style.backgroundColor = randomColor;

        document.body.appendChild(firework);

        firework.addEventListener('animationend', () => {
            firework.remove();
        });
    }


    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function resetHangman() {
        const spikes = document.querySelectorAll('.spikes');
        spikes.forEach(spike => {
            spike.classList.remove('gameWon')
            spike.classList.remove('gameOver')
            spike.classList.add('gameReset'); 
        });

        document.getElementById('head').style.top = '0';
        document.getElementById('body').style.top = '55px';
        document.getElementById('leftArm').style.top = '75px';
        document.getElementById('rightArm').style.top = '75px';
        document.getElementById('leftLeg').style.top = '155px';
        document.getElementById('rightLeg').style.top = '155px';
        document.getElementById('rightLeg').style.left = '75px';
        document.getElementById('leftEye').style.top = '20px';
        document.getElementById('rightEye').style.top = '20px';
        document.getElementById('rightEye').style.left = '100px';
        document.getElementById('mouth').style.top = '35px';

        hangmanParts.forEach(part => {
            document.getElementById(part).classList.add('hidden');
        });
    }

    function updateScoreDisplay() {
        fetch('/scores')
            .then(response => response.json())
            .then(scores => {
                scoreList.innerHTML = ''; // Clear the list
                for (const player in scores) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${player}: ${scores[player]}`;
                    scoreList.appendChild(listItem);
                }
            })
            .catch(error => console.error('Error fetching scores:', error));
    }

    function updatePlayerScore(playerName, score) {
        fetch('/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ player: playerName, score: score })
        })
        .then(response => {
            if (response.ok) {
                updateScoreDisplay(); 
            } else {
                console.error('Error updating score:', response.statusText);
            }
        })
        .catch(error => console.error('Error updating score:', error));
    }
});