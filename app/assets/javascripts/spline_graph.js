if ((window.location.href.indexOf('/users/1'))>-1){
    $.ajax({url: '/users/data', async: false}).done(function(response){
            stats = response;
            console.log(stats.games);
            // onAjaxComplete();
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
                    data: stats.total_correct,
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
                    data: stats.audio_correct,
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
                    data: stats.color_correct,
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

