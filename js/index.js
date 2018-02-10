/**
 * Created by andrew on 05.02.18.
 */

GameData.init();

chooseCityListener = function (e) {
    if (!e) {
        e = window.event;
    }
    // Enter is pressed
    if (e.keyCode == 13) {
        e.preventDefault();
        submitChooseCity();
    }
};

submitChooseCity = function () {
    var city = document.getElementById("city_input").value;
    GameData.chooseCity(city);
    document.getElementById("city_input").value = '';
};

endGame = function () {
    GameData.endGame();
};

document.getElementById("city_input").addEventListener("keydown", chooseCityListener, false);
document.getElementById("choose_city").addEventListener("click", submitChooseCity, false);
document.getElementById("end_game").addEventListener("click", endGame, false);
