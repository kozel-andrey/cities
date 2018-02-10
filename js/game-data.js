/**
 * Created by andrew on 09.02.18.
 */

var GameData = {

    usedCities: [],
    availableCities: [],
    unavailableLetters: ['Ы', 'Ь', 'Ъ'],
    turn: 1,

    init: function (cities) {
        var this_ = this;

        function loadJSON(callback) {

            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', 'data/cities.json', true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    callback(xobj.responseText);
                }
            };
            xobj.send(null);
        }

        loadJSON(function (text) {
            var cityObjects = JSON.parse(text).rocid.city;
            cityObjects.forEach(function (city) {
                this_.availableCities.push(city.name.toUpperCase());
            });
        });
    },

    addCity: function (title) {
        title = title.toLocaleUpperCase();
        this.usedCities.push(title);
    },

    chooseCity: function (title) {
        if (!this.isCityUsed(title)) {
            this.usedCityMessage();
            return;
        }
        if (!this.isCityValid(title)) {
            this.notValidLetter();
            return;
        }
        if (!this.isCityExists(title)) {
            this.notValidCity(title);
            return;
        }
        CitiesMap.showCity(title);
        this.addCity(title);
        this.addMessage( title + '. Назовите город на букву ' + this.getLastLetter(), 'info');
        this.nextTurn();
    },

    isCityUsed: function (title) {
        title = title.toLocaleUpperCase();
        return this.usedCities.indexOf(title) == -1;
    },

    isCityValid: function (title) {
        if (!GameData.usedCities.length) return true;

        title = title.toLocaleUpperCase();
        return this.getLastLetter() == title.charAt(0);
    },

    isCityExists: function (title) {
        return this.availableCities.indexOf(title.toUpperCase()) != -1;
    },

    getLastLetter: function () {
        var city = GameData.usedCities[GameData.usedCities.length - 1];
        var offset = 1;
        while (city.substring(city.length - offset) && GameData.unavailableLetters.indexOf(city.substring(city.length - offset)) > -1) {
            offset++;
        }
        return city.charAt(city.length - offset);
    },

    nextTurn: function () {
        this.turn++;
        if (GameData.turn % 2 != 0) return;

        Computer.nextCity();
    },

    endGame: function () {
        document.getElementById("city_input").setAttribute("disabled", true);
        document.getElementById("end_game").setAttribute("disabled", true);
        document.getElementById("choose_city").setAttribute("disabled", true);
        document.getElementById("result-field").setAttribute("style", 'display: block');
        var this_ = this;
        this.usedCities.forEach(function (city) {
            var index = this_.usedCities.indexOf(city);
            var div = document.createElement('div');
            div.innerHTML = '<string class="text-info">' + city + '</string>';
            if(index % 2 == 0) {
                document.getElementById("your_cities").appendChild(div);
            } else {
                document.getElementById("computer_cities").appendChild(div);
            }
        })
    },

    usedCityMessage: function () {
        this.addMessage('Данный город уже был назван!', 'danger')
    },

    notValidLetter: function () {
        this.addMessage('Название города долно начинаться с буквы ' + this.getLastLetter() + '!', 'danger')
    },

    notValidCity: function (title) {
        this.addMessage('Не известный город:  ' + title + '!', 'danger')
    },

    addMessage: function (text, style) {
        var div = document.createElement('div');
        div.innerHTML = '<string class="text-' + style + '">' + text + '</string>';
        var chat = document.getElementById("chat");
        chat.insertBefore(div, chat.firstChild);

    }
};