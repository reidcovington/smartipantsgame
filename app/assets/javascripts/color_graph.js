if ((window.location.href.indexOf('/users/1'))>-1){
    $.ajax({url: '/users/data', async: false}).done(function(response){
            stats = response;
            console.log(stats.colors_true);
            // onAjaxComplete();
        });
}

$(function () {
        var colors = Highcharts.getOptions().colors,
            categories = ['hit','miss'],
            name = 'Browser brands',
            data = [{
                    y: stats.last_game_color,
                    color: colors[0],
                    drilldown: {
                        name: 'Hit',
                        categories: ['color1','color2','color3','color4','color5','color6','color7', 'color8'],
                        data: [5,10,15,5,5,10,10,5],
                        color: colors[0]
                    }
                }, {
                    y: 100 - stats.last_game_color,
                    color: colors[4],
                    drilldown: {
                        name: 'miss',
                        categories: ['color1','color2','color3','color4','color5','color6','color7', 'color8'],
                        data: [5,5,5,5,5,5,5,5],
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

