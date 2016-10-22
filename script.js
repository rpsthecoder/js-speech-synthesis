if ('speechSynthesis' in window) with(speechSynthesis) {

    document.querySelector('#play').addEventListener('click', onClickPlay);
    document.querySelector('#pause').addEventListener('click', onClickPause);
    
    function onClickPlay() {
        if(!speaking) { /* start narration */
            utterance = new SpeechSynthesisUtterance(document.querySelector('article').textContent);
            utterance.voice = getVoices()[0];
            utterance.onend = ()=>{this.className = this.nextElementSibling.className = ''; cancel()};
            this.className = 'played';
            speak(utterance);
        } else if (paused) { /* unpause/resume narration */
            this.className = 'played';
            this.nextElementSibling.className = '';
            resume();
        } 
    }

    function onClickPause() {
        if(speaking && !paused){ /* pause narration */
            this.className = 'paused';
            this.previousElementSibling.className = '';
            pause();
        }
    }

}

else { /* speech synthesis not supported */
    msg = document.createElement('h5');
    msg.textContent = "Detected no support for Speech Synthesis";
    msg.style.textAlign = 'center';
    msg.style.backgroundColor = 'red';
    msg.style.color = 'white';
    msg.style.marginTop = msg.style.marginBottom = 0;
    document.body.insertBefore(msg, document.querySelector('div'));
}
