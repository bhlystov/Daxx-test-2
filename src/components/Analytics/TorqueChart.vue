<template>
    <chart :options="chartOptions" />
</template>

<script>
    import Chart from './highcharts';

    export default {
        name: 'TorqueChart',
        components: {
            Chart,
        },
        props: {
            title: {
                type: String,
            },
            labels: {
                type: Array,
                //required: true,
            },
            //Documentation which data we need https://www.highcharts.com/demo/combo-dual-axes/grid-light
            series: {
                type: Array,
                required: true,
            },

            yAxis: {
                type: Array,
                required: true,
            },
        },
        computed: {
            chartOptions() {
                return {
                    chart: {
                        zoomType: 'xy',
                    },
                    title: {
                        text: this.title,
                    },
                    credits: {
                        enabled: false,
                    },
                    tooltip: {
                        shared: true,
                    },
                    xAxis: {
                        categories: this.labels,
                        crosshair: true,
                        title: {
                            text: "Value position"
                        }
                    },
                    legend: {
                        symbolWidth: 30,
                        align: 'right',
                        x: -30,
                        verticalAlign: 'top',
                        y: 25,
                        floating: true,
                    },
                    yAxis: this.yAxis,
                    series: this.series,
                };
            },
        },
    }
</script>


