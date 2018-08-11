<template>
    <div class="col-xs-12 col-md-12 col-lg-12 container">
        <header>
            <h1>Header</h1>
        </header>
        <aside
                class="col-xs-3 col-md-3 col-lg-3 terminal-overview"
        >
            <p>Some content inside</p>
        </aside>
        <main
                v-loading="isLoading"
                class="col-xs-9 col-md-9 col-lg-9 analytics-container"
        >
            <h2>Open</h2>
            <torque-chart
                    :labels="chartLabelsOpen"
                    :yAxis="chartParamsView"
                    :series="chartSeriesOpen"
                    class="open-torque column-chart"
            />

            <h2>Close</h2>
            <torque-chart
                    :labels="chartLabelsClose"
                    :yAxis="chartParamsView"
                    :series="chartSeriesClose"
                    class="close-torque column-chart"
            />
        </main>
    </div>
</template>

<script>
    import TorqueChart from './Analytics/TorqueChart.vue';
    import apiClient from './api/client';

    const Forecast_Open_Torque = 'ForecastOpenTorque';

    export default {
        name: 'Analytics',
        components: {
            TorqueChart,
        },
        data() {
            return {
                isLoading: false,
                analytics: [],
            }
        },
        computed: {
            sortingSourceAnalyticsDataByPosition() {
                return this.analytics.sort( (prevElem, nextElem) => {
                    if(prevElem.Position < nextElem.Position) {
                        return -1;
                    }
                    if(prevElem.Position > nextElem.Position) {
                        return 1;
                    }
                    return 0
                });
            },
            chartParamsView() {
                return [{
                    labels: {
                        format: '{value}',
                        style: {
                            color: "#428bca",
                        },
                    },
                    allowDecimals: true,
                    title: {
                        text: 'Required torque (%)',
                        style: {
                            color: "#428bca",
                        },
                    },
                }];
            },
            chartColumnData() {
                return {
                    AverageTorque: {
                        label: 'Average open torque',
                        type: 'column',
                        color: '#428bca',
                    },
                    LastTorque: {
                        label: 'Last open torque',
                        type: 'column',
                        color: '#90EE90',
                    },
                    ForecastOpenTorque : {
                        label: 'Forecast Open Torque',
                        type: 'column',
                        color: '#ff642a',
                    },
                }
            },

            /**
             * Computed properties For Open Torque
             */

            chartSourceDirectionOpen() {
                return this.sortingSourceAnalyticsDataByPosition.filter(
                    item => item.Direction === 'Open' && item.Profile === 1
                    ) || [];
            },

            chartLabelsOpen() {
                return this.chartSourceDirectionOpen.map(item => item.Position);
            },

            /**
             * Predicted value
             * */
            forecastFeatureTorqueOpen() {
                return this.chartSourceDirectionOpen.map( item =>
                    Math.floor(Math.random() * (item.AverageTorque - item.LastTorque)) +  item.LastTorque
                );
            },

            chartSeriesOpen() {
                const series = [];
                for (const [key, line] of Object.entries(this.chartColumnData)) {
                    series.push({
                        name: line.label,
                        type: line.type,
                        color: line.color,
                        data: key !== Forecast_Open_Torque
                            ? this.chartSourceDirectionOpen.map(item => item[key])
                            : this.forecastFeatureTorqueOpen,
                    })
                }
                return series;
            },

            /**
             * Computed properties For Close Torque
             */
            chartSourceDirectionClose() {
                return this.sortingSourceAnalyticsDataByPosition.filter(
                    item => item.Direction === 'Close' && item.Profile === 1
                    ) || [];
            },
            chartLabelsClose() {
                return this.chartSourceDirectionClose.map(item => item.Position);
            },
            /**
             * Predicted value
             * */
            forecastFeatureTorqueClose() {
                return this.chartSourceDirectionClose.map( item =>
                    Math.floor(Math.random() * (item.AverageTorque - item.LastTorque)) +  item.LastTorque
                );
            },
            chartSeriesClose() {
                const series = [];
                for (const [key, line] of Object.entries(this.chartColumnData)) {
                    series.push({
                        name: line.label,
                        type: line.type,
                        color: line.color,
                        data: key !== Forecast_Open_Torque
                            ? this.chartSourceDirectionClose.map(item => item[key])
                            : this.forecastFeatureTorqueClose,
                    })
                }
                return series;
            },
        },
        mounted() {
            this.reload();
        },
        methods: {
            async reload() {
                this.isLoading = true;
                this.analytics = await apiClient.getAnaliticsData();
                this.isLoading = false;
            },
        },
    }
</script>

<style lang="scss" scoped>
    .container {
        header {
            height: 90px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid black;
        }

        .terminal-overview {
            float: left;
            border: 1px solid black;
        }

        .analytics-container {
            float: left;

            .column-chart {
                border-bottom: 1px solid #ddd;
            }
        }
    }
</style>
