<template>
    <div class="diagram-pie-chart">
        <chart :options="chartOptions" />
    </div>
</template>

<script>
    import Chart from './highcharts';

    export default {
        name: 'SalesPieChart',
        components: {
            Chart,
        },
        props: {
            title: {
                type: String,
                required: true,
            },
            //Documentation which data we need https://www.highcharts.com/demo/pie-drilldown/grid-light
            series: {
                type: Array,
                required: true,
            },
            drilldown: {
                type: Array,
            },
            colors: {
                type: Array,
            },
        },
        computed: {
            chartOptions() {
                return {
                    chart: {
                        type: 'pie',
                    },
                    colors: this.colors,
                    title: {
                        text: this.title,
                    },
                    credits: {
                        enabled: false,
                    },
                    plotOptions: {
                        pie: {
                            showInLegend: true,
                            size: '100%',
                            point: {
                                events: {
                                    legendItemClick: function (e) {
                                        e.preventDefault();
                                    },
                                },
                            },
                            dataLabels: {
                                enabled: true,
                                distance: -35,
                                format: '{y} (<b>{point.percentage:.1f} %</b>)',
                                filter: {
                                    property: 'percentage',
                                    operator: '>',
                                    value: 0,
                                },
                            },
                        },
                    },
                    series: [
                        {
                            name: "Заказов",
                            colorByPoint: true,
                            data: this.series,
                            showInLegend: true,
                        },
                    ],
                    drilldown: {
                        series: this.drilldown,
                    },
                };
            },
        },
    }
</script>
