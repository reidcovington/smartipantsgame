if ((window.location.href.indexOf('/users/1'))>-1){
    $.ajax({url: '/users/data', async: false}).done(function(response){
            stats = response;
            // console.log(stats.last_game_color);
            // onAjaxComplete();
        });
}
$(function () {

        var colors = Highcharts.getOptions().colors,
            categories = ['hit','miss'],
            name = 'Browser brands',
            data = [{
                    y: stats.last_game_audio,
                    color: colors[0],
                    drilldown: {
                        name: 'Hit',
                        categories: ['audio1','audio2','audio3','audio4','audio5','audio6','audio7', 'audio8'],
                        data: [2,10,8,1,1,1,1,1],
                        color: colors[0]
                    }
                }, {
                    y: 100 - stats.last_game_audio,
                    color: colors[4],
                    drilldown: {
                        name: 'miss',
                        categories: ['audio1','audio2','audio3','audio4','audio5','audio6','audio7', 'audio8'],
                        data: [5,5,10,20,15,15,3,2],
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
        $('#AudioGraph').highcharts({
            credits: {
                enabled: false
            },
            chart: {
                type: 'pie'
            },
            title: {
                text: 'AudioGraph'
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

