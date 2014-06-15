$(function () {
        $('#container').highcharts({
            credits: {
                enabled: false
            },
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Username'
            },
            subtitle: {
                text: 'SmartiPants Progress'
            },
            xAxis: {
                categories: ['game1', 'game2', 'game3', 'gam4', 'game5']
            },
            yAxis: {
                title: {
                    text: 'Percent correct'
                },
                labels: {
                    formatter: function() {
                        return this.value + '%'
                    }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                }
            },
            series: [{
                name: 'Total',
                data: [20, 50, 15, 30, 85]
            },{
                name: 'Audio',
                data: [14, 40, 35, 55, 90]
            }, {
                name: 'Color',
                data: [19, 35, 70, 50, 80]
            }]
        });
    });

