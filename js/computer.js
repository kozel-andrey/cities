var Computer = {

    waitAndGetCity: function () {
        setTimeout(this.getCity, 2000);
    },

    nextCity: function () {
        GameData.addMessage('Компьютер думает....', 'warning');
        this.waitAndGetCity();
    },

    getCity: function () {
        var startLetter = GameData.getLastLetter();
        for (var i = 0; i < GameData.availableCities.length; i++) {
            var city = GameData.availableCities[i];
            if (city.charAt(0) == startLetter && GameData.usedCities.indexOf(city) == -1) {
                GameData.chooseCity(city);
                break;
            }
        }
    }


};