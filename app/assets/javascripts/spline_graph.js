if ((window.location.href.indexOf('/users/1'))>-1){
    $.ajax({url: '/users/data', async: false}).done(function(response){
            stats = response;
            color_correct = stats.color_correct
            audio_correct = stats.audio_correct
            total_correct = stats.total_correct
            total_color_correct = []
            total_audio_correct = []
            total_compile_correct = []
            for (i=0; i < color_correct.length; i++){
                total_color_correct.push(Math.round((color_correct[i]/(20.0+stats.n)) * 100))
            }

            for(i=0; i < audio_correct.length; i++){
                total_audio_correct.push(Math.round((audio_correct[i]/(20.0+stats.n)) * 100))
            }

             for(i=0; i < total_correct.length; i++){
                total_compile_correct.push(Math.round((total_correct[i]/(40.0+2 * stats.n)) * 100))
            }

        });
}

        $(function() {
            $('#total_progress_graph').highcharts({
                credits: {
                    enabled: false
                },
                allowPointSelect: {
                    enabled: true
                },
                chart: {
                    type: 'spline'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: 'SmartiPants Progress'
                },
                xAxis: {
                categories: stats.games,
                title: {
                    text: null
                }
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
                    data: total_compile_correct,
                    cursor: 'pointer',
                        point: {
                            events: {
                                click: function (e) {
                                    x: e.pageX
                                    console.log(this.x);
                                    console.log(stats);
                                    $('#profile_page_graphs').hide();
                                }
                            }
                        },
                },{
                    name: 'Audio',
                    data: total_audio_correct,
                    cursor: 'pointer',
                        point: {
                            events: {
                                click: function (e) {
                                    x: e.pageX
                                    console.log(this.x);
                                }
                            }
                        },
                }, {
                    name: 'Color',
                    data: total_color_correct,
                    cursor: 'pointer',
                        point: {
                            events: {
                                click: function (e) {
                                    x: e.pageX
                                    console.log(this.x);
                                }
                            }
                        }
                }]
            })
        })

