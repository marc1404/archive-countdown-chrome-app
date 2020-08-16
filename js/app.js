'use strict';

(function(){
    var secondsDominator = 1000;
    var minutesDominator = secondsDominator * 60;
    var hoursDominator = minutesDominator * 60;
    var daysDominator = hoursDominator * 24;
    var weeksDominator = daysDominator * 7;
    var monthsDominator = weeksDominator * 4;
    var yearsDominator = monthsDominator * 12;

    angular
        .module('app', [])
        .controller('controller', function($scope, $interval){
            $scope.text = 'Feierabend in';
            $scope.time = new Date();

            if($scope.time.getHours() >= 16){
                $scope.time.setDate($scope.time.getDate() + 1);
            }

            $scope.time.setHours(16);
            $scope.time.setMinutes(0);
            $scope.time.setSeconds(0);
            $scope.time.setMilliseconds(0);

            $interval(update, 1);

            function update(){
                if(!$scope.time) return;

                var milliseconds = $scope.time - new Date();

                if(milliseconds < 0){
                    milliseconds = 0;
                }

                var years = Math.floor(milliseconds / yearsDominator);
                milliseconds -= years * yearsDominator;

                var months = Math.floor(milliseconds / monthsDominator);
                milliseconds -= months * monthsDominator;

                var weeks = Math.floor(milliseconds / weeksDominator);
                milliseconds -= weeks * weeksDominator;

                var days = Math.floor(milliseconds / daysDominator);
                milliseconds -= days * daysDominator;

                var hours = Math.floor(milliseconds / hoursDominator);
                milliseconds -= hours * hoursDominator;

                var minutes = Math.floor(milliseconds / minutesDominator);
                milliseconds -= minutes * minutesDominator;

                var seconds = Math.floor(milliseconds / secondsDominator);

                $scope.countdown = '';
                $scope.countdown += appendCountdown(years, 'Jahr', 'Jahre');
                $scope.countdown += appendCountdown(months, 'Monat', 'Monate');
                $scope.countdown += appendCountdown(weeks, 'Woche', 'Wochen');
                $scope.countdown += appendCountdown(days, 'Tag', 'Tage');
                $scope.countdown += appendCountdown(hours, 'Stunde', 'Stunden');
                $scope.countdown += appendCountdown(minutes, 'Minute', 'Minuten');
                $scope.countdown += appendCountdown(seconds, 'Sekunde', 'Sekunden');
            }

            function appendCountdown(value, singular, plural) {
                if (value === 0) return '';
                if (value === 1) return value + ' ' + singular + ' ';

                return value + ' ' + plural + ' ';
            }
        });
}());