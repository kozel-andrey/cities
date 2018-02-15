/**
 * Created by andrew on 05.02.18.
 */

var CitiesMap = {

    /**
     * Зашруэаем полный список городов из файла сразу что бы
     * была возможность валидации пользовательского ввода, что бы
     * он мог вводить только корректные имена городов
     */

    showCity: function (title) {
        ymaps.geocode(title, {results: 1}).then(function (res) {
            document.getElementById('map').innerHTML = '';

            var firstGeoObject = res.geoObjects.get(0);
            var myMap = new ymaps.Map("map", {
                center: firstGeoObject.geometry.getCoordinates(),
                zoom: 11
            });

            myMap.container.fitToViewport();
            attachReverseGeocode(myMap);
        }, function (err) {
            alert(err.message);
        });

        // При щелчке левой кнопкой мыши выводится
        // информация о месте, на котором щёлкнули.
        function attachReverseGeocode(myMap) {
            myMap.events.add('click', function (e) {
                var coords = e.get('coordPosition');

                // Отправим запрос на геокодирование.
                ymaps.geocode(coords).then(function (res) {
                    var names = [];
                    // Переберём все найденные результаты и
                    // запишем имена найденный объектов в массив names.
                    res.geoObjects.each(function (obj) {
                        names.push(obj.properties.get('name'));
                    });
                    // Добавим на карту метку в точку, по координатам
                    // которой запрашивали обратное геокодирование.
                    myMap.geoObjects.add(new ymaps.Placemark(coords, {
                        // В качестве контента иконки выведем
                        // первый найденный объект.
                        iconContent: names[0],
                        // А в качестве контента балуна - подробности:
                        // имена всех остальных найденных объектов.
                        balloonContent: names.reverse().join(', ')
                    }, {
                        preset: 'twirl#redStretchyIcon',
                        balloonMaxWidth: '250'
                    }));
                });
            });
        }
    }

};