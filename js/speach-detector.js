/**
 * Created by andrew on 10.02.18.
 */

var SpeechRecognizer = {

    init: function () {
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

        var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + GameData.availableCities.join(' | ') + ' ;'
        var recognition = new SpeechRecognition();
        var speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
        recognition.lang = 'ru-RU';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        document.getElementById('speak').addEventListener('click', function() {
            recognition.start();
            console.log('Ready to receive a color command.');
        });

        recognition.onresult = function(event) {
            var last = event.results.length - 1;
            var city = event.results[last][0].transcript;
            GameData.chooseCity(city)
        };

        recognition.onspeechend = function() {
            recognition.stop();
        };

        recognition.onnomatch = function() {
            GameData.addMessage('Мы Вас не слышим :(', 'warning');
        };

        recognition.onerror = function(event) {
            GameData.addMessage('Ошибка при прослушивании :(', 'danger');
        }
    }

};