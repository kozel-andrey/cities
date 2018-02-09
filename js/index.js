/**
 * Created by andrew on 05.02.18.
 */
(function(root) {

    var cities = getCities();
    GameData.init(cities);
    Computer.init(cities);

    function getCities() {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString('../data/rocid.xml', "text/xml");
    };

    document.getElementById("city_input").addEventListener("keydown", function(e) {
        if (!e) {
            e = window.event;
        }
        // Enter is pressed
        if (e.keyCode == 13) {
            e.preventDefault();
            var city = document.getElementById("city_input").value;
            Gameplay.chooseCity(city);
        }
    }, false);

})(this);