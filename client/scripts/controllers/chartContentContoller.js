/**
 * Created by JFCS on 4/29/16.
 */
myApp.controller("ChartContentController", ["$scope", "$uibModalInstance", "results",
    function($scope, $uibModalInstance, results) {

    $scope.results = results;
    console.log("Inside the actual ChartContentController:", $scope.results);

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
                    "text": "Donations by Individuals"
                }
            ],
            "dataProvider": [
                {
                    "group": "Staff",
                    "money": 6526
                },
                {
                    "group": "Board",
                    "money": 9135
                },
                {
                    "group": "Committee",
                    "money": 1480
                },
                {
                    "group": "Parents",
                    "money": 10228
                },
                {
                    "group": "Alums",
                    "money": 21262
                },
                {
                    "group": "Participants",
                    "money": 2376
                },
                {
                    "group": "Community Support",
                    "money": 22013
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
                        "title": ""
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "titles": [],
                "dataProvider": [
                    {
                        "date": "2014-03-01",
                        "column-1": 8,
                        "column-2": 5
                    },
                    {
                        "date": "2014-03-02",
                        "column-1": 6,
                        "column-2": 7
                    },
                    {
                        "date": "2014-03-03",
                        "column-1": 2,
                        "column-2": 3
                    },
                    {
                        "date": "2014-03-04",
                        "column-1": 1,
                        "column-2": 3
                    },
                    {
                        "date": "2014-03-05",
                        "column-1": 2,
                        "column-2": 1
                    },
                    {
                        "date": "2014-03-06",
                        "column-1": 3,
                        "column-2": 2
                    },
                    {
                        "date": "2014-03-07",
                        "column-1": 6,
                        "column-2": 8
                    }
                ]
            }
        );
    };

    $scope.barchart = function(data) {

        AmCharts.makeChart("chartdiv",
            {
                "type": "serial",
                "categoryField": "category",
                "rotate": true,
                "angle": 30,
                "depth3D": 30,
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
                        "title": "graph 1",
                        "type": "column",
                        "valueField": "column-1"
                    },
                    {
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "fillAlphas": 1,
                        "id": "AmGraph-2",
                        "title": "graph 2",
                        "type": "column",
                        "valueField": "column-2"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "stackType": "regular",
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
                        "text": "Chart Title"
                    }
                ],
                "dataProvider": [
                    {
                        "category": "category 1",
                        "column-1": 8,
                        "column-2": 5
                    },
                    {
                        "category": "category 2",
                        "column-1": 6,
                        "column-2": 7
                    },
                    {
                        "category": "category 3",
                        "column-1": 2,
                        "column-2": 3
                    }
                ]
            }
        );
    };

    $scope.load = $scope.piechart;

    $scope.close = function () {
        $uibModalInstance.close();
    };

}]);
