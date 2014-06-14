$(function () {

        var colors = Highcharts.getOptions().colors,
            categories = ['Color1', 'Color2', 'Color3', 'Color4', 'Color5', 'Color6', 'Color7', 'Color8'],
            name = 'Browser brands',
            data = [{
                    y: 12.5,
                    color: colors[0],
                    drilldown: {
                        name: 'Color1',
                        categories: ['correct',' incorrect'],
                        data: [6.25,6.25],
                        color: colors[0]
                    }
                }, {
                    y: 12.5,
                    color: colors[1],
                    drilldown: {
                        name: 'Color2',
                        categories: ['correct',' incorrect'],
                        data: [6.25,6.25],
                        color: colors[1]
                    }
                }, {
                    y: 12.5,
                    color: colors[2],
                    drilldown: {
                        name: 'Color3',
                        categories: ['correct',' incorrect'],
                        data: [6.25,6.25],
                        color: colors[2]
                    }
                }, {
                    y: 12.5,
                    color: colors[3],
                    drilldown: {
                        name: 'Color4',
                        categories: ['correct',' incorrect'],
                        data: [6.25,6.25],
                        color: colors[3]
                    }
                }, {
                    y: 12.5,
                    color: colors[4],
                    drilldown: {
                        name: 'Color5',
                        categories: ['correct',' incorrect'],
                        data: [6.25,6.25],
                        color: colors[4]
                    }
                }, {
                    y: 12.5,
                    color: colors[5],
                    drilldown: {
                        name: 'Color6',
                        categories: ['correct',' incorrect'],
                        data: [6.25,6.25],
                        color: colors[4]
                    }
                }, {
                    y: 12.5,
                    color: colors[6],
                    drilldown: {
                        name: 'Color7',
                        categories: ['correct',' incorrect'],
                        data: [6.25,6.25],
                        color: colors[4]
                    }
                }, {
                    y: 12.5,
                    color: colors[7],
                    drilldown: {
                        name: 'Color8',
                        categories: ['correct',' incorrect'],
                        data: [6.25,6.25],
                        color: colors[4]
                    }
                }];

        // Build the data arrays
        var browserData = [];
        var versionsData = [];
        for (var i = 0; i < data.length; i++) {

            // add browser data
            browserData.push({
                name: categories[i],
                y: data[i].y,
                color: data[i].color
            });

            // add version data
            for (var j = 0; j < data[i].drilldown.data.length; j++) {
                var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
                versionsData.push({
                    name: data[i].drilldown.categories[j],
                    y: data[i].drilldown.data[j],
                    color: Highcharts.Color(data[i].color).brighten(brightness).get()
                });
            }
        }

        // Create the chart
        $('#ColorGraph').highcharts({
             credits: {
                enabled: false
            },
            chart: {
                type: 'pie'
            },
            title: {
                text: 'ColorGraph'
            },
            yAxis: {
                title: {
                    text: 'Total percent market share'
                }
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%']
                }
            },
            tooltip: {
              valueSuffix: '%'
            },
            series: [{
                name: 'Browsers',
                data: browserData,
                size: '60%',
                dataLabels: {
                    formatter: function() {
                        return this.y > 5 ? this.point.name : null;
                    },
                    color: 'white',
                    distance: -30
                }
            }, {
                name: 'Versions',
                data: versionsData,
                size: '80%',
                innerSize: '60%',
                dataLabels: {
                    formatter: function() {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>'+ this.point.name +':</b> '+ this.y +'%'  : null;
                    }
                }
            }]
        });
    });

