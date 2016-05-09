/**
 * Created by JFCS on 4/29/16.
 */
myApp.controller("ChartContentController", ["$scope", "$uibModalInstance", "results", "MoneyRaisedService",
    function($scope, $uibModalInstance, results,MoneyRaisedService) {
    var moneyRaisedService = MoneyRaisedService;
    $scope.results = results;
    $scope.accounts = moneyRaisedService.accountArray;
    console.log("Inside the actual ChartContentController:", $scope.results);
    console.log("Inside the actual ChartContentController:", $scope.accounts);

    $scope.chartType = function(type) {
        if (type == "piechart") {
            $scope.load = $scope.piechart;
        } else if (type == "bargraph"){
            $scope.load = $scope.bargraph;
        } else {
            $scope.load = $scope.barchart;
        }
    };

    $scope.piechart = function(data) {
        console.log("Pie Chart Data:", data);
        AmCharts.makeChart("chartdiv",
        {
            "type": "pie",
            "angle": 20,
            "balloonText": "[[title]]<br><span style='font-size:14px'><b>$[[value]]</b> ([[percents]]%)</span>",
            "depth3D": 20,
            "titleField": "group",
            "valueField": "money",
            "fontSize": 12,
            "theme": "default",
            "allLabels": [],
            "balloon": {},
            "titles": [
                {
                    "id": "goals",
                    "size": 16,
                    "text": "Donations by Individuals 2016"
                }
            ],
            "dataProvider": [
                {
                    "group": $scope.accounts[0].type,
                    "money": $scope.accounts[0].ytd
                },
                {
                    "group": $scope.accounts[1].type,
                    "money": $scope.accounts[1].ytd
                },
                {
                    "group": $scope.accounts[2].type,
                    "money": $scope.accounts[2].ytd
                },
                {
                    "group": $scope.accounts[3].type,
                    "money": $scope.accounts[3].ytd
                },
                {
                    "group": $scope.accounts[4].type,
                    "money": $scope.accounts[4].ytd
                },
                {
                    "group": $scope.accounts[5].type,
                    "money": $scope.accounts[5].ytd
                },
                {
                    "group": $scope.accounts[6].type,
                    "money": $scope.accounts[6].ytd
                }
            ],
        }
    );
};

    $scope.bargraph = function(data) {

        AmCharts.makeChart("chartdiv",
            {
                "type": "serial",
                "categoryField": "date",
                "dataDateFormat": "YYYY-MM-DD",
                "autoMarginOffset": 40,
                "marginRight": 60,
                "marginTop": 60,
                "fontSize": 13,
                "theme": "default",
                "categoryAxis": {
                    "parseDates": true
                },
                "chartCursor": {
                    "enabled": true
                },
                "chartScrollbar": {
                    "enabled": true
                },
                "trendLines": [],
                "graphs": [
                    {
                        "columnWidth": 0.44,
                        "cornerRadiusTop": 8,
                        "dashLength": 4,
                        "fillAlphas": 0.51,
                        "id": "AmGraph-1",
                        "lineAlpha": 0.44,
                        "title": "graph 1",
                        "type": "column",
                        "valueField": "column-1"
                    },
                    {
                        "bullet": "square",
                        "bulletBorderAlpha": 1,
                        "bulletBorderThickness": 1,
                        "bulletSize": 16,
                        "id": "AmGraph-2",
                        "lineThickness": 3,
                        "title": "graph 2",
                        "valueField": "column-2"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": $scope.results.type
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "titles": [],
                "dataProvider": [
                    {
                        "date": "2016 ytd",
                        "column-1": $scope.results.ytd,
                        "column-2": $scope.results.goal
                    },
                    {
                        "date": "2015 ytd",
                        "column-1": $scope.results.ytdM1,
                        "column-2": $scope.results.goal

                    },
                    {
                        "date": "2014 ytd",
                        "column-1": $scope.results.ytdM2,
                        "column-2": $scope.results.goal

                    },
                    {
                        "date": "2015 fy",
                        "column-1": $scope.results.tfyM1,
                        "column-2": $scope.results.goal

                    },
                    {
                        "date": "2014 fy",
                        "column-1": $scope.results.tfyM2,
                        "column-2": $scope.results.goal

                    }

                ]
            }
        );
    };

    $scope.barchart = function(data) {

        AmCharts.makeChart("chartdiv",
            {
                "type": "serial",
                "categoryField": "date",
                //"rotate": true,
                //"angle": 30,
                //"depth3D": 30,
                "startDuration": 1,
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "fillAlphas": 1,
                        "id": "AmGraph-1",
                        "title": "Donations",
                        "type": "column",
                        "clustered":false,
                        "valueField": "Donations"
                    },
                    {
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "fillAlphas": 1,
                        "id": "AmGraph-2",
                        "title": "Goals",
                        "columnWidth": 0.5,
                        "clustered":false,
                        "type": "column",
                        "valueField": "Goal"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "clustered":false,
                        //"stackType": 'regular',
                        "title": ""
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "legend": {
                    "enabled": true,
                    "useGraphSettings": true
                },
                "titles": [
                    {
                        "id": "Title-1",
                        "size": 15,
                        "text": $scope.results.type
                    }
                ],
                "dataProvider": [
                    {
                        "date": "2016 ytd",
                        "Donations": $scope.results.ytd,
                        "Goal": $scope.results.goal
                    },
                    {
                        "date": "2015 ytd",
                        "Donations": $scope.results.ytdM1
                        //"Goal": $scope.results.goal

                    },
                    {
                        "date": "2014 ytd",
                        "Donations": $scope.results.ytdM2
                        //"Goal": $scope.results.goal

                    },
                    {
                        "date": "2015 fy",
                        "Donations": $scope.results.tfyM1
                        //"Goal": $scope.results.goal

                    },
                    {
                        "date": "2014 fy",
                        "Donations": $scope.results.tfyM2
                        //"Goal": $scope.results.goal

                    }
                ]
            }
        );
    };

    $scope.load = $scope.barchart;

    $scope.close = function () {
        $uibModalInstance.close();
    };

}]);
