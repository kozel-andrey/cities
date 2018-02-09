/**
 * Created by andrew on 09.02.18.
 */

var GameData = {};
GameData.usedCities = [];
GameData.availableCities = [];
GameData.unavailableLetters = ['Ы', 'Ь', 'Ъ'];
GameData.turn = 1;

GameData.addCity = function (title) {
    title = title.toLocaleUpperCase();
    GameData.usedCities.push(title);
};

GameData.init = function (cities) {
    GameData.usedCities = cities;
};

var Gameplay = {};

Gameplay.isCityUsed = function (title) {
    title = title.toLocaleUpperCase();
    return GameData.usedCities.indexOf(title) == -1;
};

Gameplay.offset = function (city) {
    var offset = 1;
    while (city.substring(city.length - offset) && GameData.unavailableLetters.indexOf(city.substring(city.length - offset)) > -1) {
        offset++;
    }
    return offset;
};

Gameplay.isCityValid = function (title) {
    if (!GameData.usedCities.length) return true;

    title = title.toLocaleUpperCase();
    var city = GameData.usedCities[GameData.usedCities.length - 1];
    var offset = Gameplay.offset(city);
    return city.charAt(city.length - offset) == title.charAt(0);
};

Gameplay.chooseCity = function (title) {
    if (!Gameplay.isCityUsed(title)) {
        Gameplay.usedCityMessage();
        return;
    }
    if (!Gameplay.isCityValid(title)) {
        Gameplay.notValidLetter();
        return;
    }
    CitiesMap.showCity(title);
    GameData.addCity(title);
    Gameplay.nextTurn();

};

Gameplay.nextTurn = function () {
    if (GameData.turn % 2 != 0) return;

    Computer.nextCity();
};

Gameplay.usedCityMessage = function () {
    Gameplay.showError('Данный город уже был назван!')
};

Gameplay.notValidLetter = function () {
    var last = GameData.usedCities[GameData.usedCities.length - 1];
    var offset = Gameplay.offset(last);
    Gameplay.showError('Название города долно начинаться с буквы ' + last.charAt(last.length - offset) + '!')
};

Gameplay.showError = function (text) {
    document.getElementById("error_field").setAttribute('style', 'display: block');
    document.getElementById("error_text").innerText = text;
    setTimeout(function () {
        document.getElementById("error_field").setAttribute('style', 'display: none');
        document.getElementById("error_text").innerText = '';
    }, 2000);

};