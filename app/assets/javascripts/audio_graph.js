var ready;
ready = function() {


    if ((window.location.href.indexOf('profile'))>-1){
        $.ajax({url: '/users/data', async: false}).done(function(response){
                stats = response;
                stats_data2 = []
                stats_data4 = []
                stats_data2.push(Math.round((stats.audios_true[1] || 0)/(20.0 + stats.n) *100))
                stats_data2.push(Math.round((stats.audios_true[2] || 0)/(20.0 + stats.n) *100))
                stats_data2.push(Math.round((stats.audios_true[3] || 0)/(20.0 + stats.n) *100))
                stats_data2.push(Math.round((stats.audios_true[4] || 0)/(20.0 + stats.n) *100))
                stats_data2.push(Math.round((stats.audios_true[5] || 0)/(20.0 + stats.n) *100))

                stats_data4.push(Math.round((stats.audios_false[1] || 0)/(20.0 + stats.n) *100))
                stats_data4.push(Math.round((stats.audios_false[2] || 0)/(20.0 + stats.n) *100))
                stats_data4.push(Math.round((stats.audios_false[3] || 0)/(20.0 + stats.n) *100))
                stats_data4.push(Math.round((stats.audios_false[4] || 0)/(20.0 + stats.n) *100))
                stats_data4.push(Math.round((stats.audios_false[5] || 0)/(20.0 + stats.n) *100))
                stats_data2_total = (eval(stats_data2.join('+')))
                stats_data4_total = (eval(stats_data4.join('+')))
            });
    $(function () {

            var colors = Highcharts.getOptions().colors,
                categories = ['hit','miss'],
                name = 'Audio',
                data = [{
                        y: stats_data2_total,
                        color: colors[0],
                        drilldown: {
                            name: 'Hit',
                            categories: ['audio1','audio2','audio3','audio4','audio5'],
                            data: stats_data2,
                            color: colors[0]
                        }
                    }, {
                        y: stats_data4_total,
                        color: colors[4],
                        drilldown: {
                            name: 'miss',
                            categories: ['audio1','audio2','audio3','audio4','audio5'],
                            data: stats_data4,
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

    }


};

$(document).ready(ready);
$(document).on('page:load', ready);
