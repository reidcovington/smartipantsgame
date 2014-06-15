// $(document).ready(function(){
// if(location.href === 'http://0.0.0.0:3000/users/1'){
//     $.ajax({
//         type: "get"
//         , url: "/users/stats"
//         , dataType: 'JSON'
//         , complete: function(response){
//             console.log(response)
//         }
//     })
    $(function () {
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
                    data: [20, 50, 15, 30, 85],
                    cursor: 'pointer',
                        point: {
                            events: {
                                click: function (e) {
                                    x: e.pageX
                                    console.log(this.x);
                                }
                            }
                        },
                },{
                    name: 'Audio',
                    data: [14, 40, 35, 55, 90],
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
                    data: [19, 35, 70, 50, 80],
                    cursor: 'pointer',
                        point: {
                            events: {
                                click: function (e) {
                                    x: e.pageX
                                    console.log(this.x);
                                }
                            }
                        },
                }]
            })
        })
//     }
// });
