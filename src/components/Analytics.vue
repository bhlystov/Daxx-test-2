<template>
    <!--TODO: отдать фронтендщику вынести инлайн-стили в классы -->
    <!--<div v-loading="loading">-->
        <!--<div class="flash-notice">-->
            <!--<div class="alert alert-info">-->
                <!--Это BETA версия вкладки. Будем рады Вашей обратной связи по номеру телефона 4050.-->
            <!--</div>-->
        <!--</div>-->

        <!--<div class="flash-notice" v-if="lastSystemUpdate">-->
            <!--<div class="alert alert-info">-->
                <!--{{ lastSystemUpdate }}-->
            <!--</div>-->
        <!--</div>-->

        <!--<div style="border: 1px solid #337ab7; border-radius: 5px;">-->
            <!--<div class="header-nav">-->
                <!--<div class="button-wrapper">-->
                    <!--<period-toggle-->
                            <!--:data-list-toggle="dataListToggle"-->
                            <!--:groupBy="groupBy"-->
                    <!--/>-->
                <!--</div>-->

                <!--<h1 style="color: #fff; margin: 0;">Динамика заказов</h1>-->

                <!--<range-picker-->
                        <!--:date-from="dateFrom"-->
                        <!--:date-to="dateTo"-->
                <!--/>-->
            <!--</div>-->

            <!--<div class="flash-notice" v-if="dataWasLoaded && !hasOrdersForPeriod">-->
                <!--<div class="alert alert-warning">-->
                    <!--Данных за выбранный период не найдено. Выберите, пожалуйста, другой интервал даты.-->
                <!--</div>-->
            <!--</div>-->

            <!--<div v-if="hasOrdersForPeriod" style="margin-bottom: 5px;">-->
                <!--<sales-chart-by-period-->
                        <!--:labels="chartByPeriodLabels"-->
                        <!--:yAxis="chartByPeriodParamsView"-->
                        <!--:series="chartByPeriodSeries"-->
                        <!--style="border-bottom: 1px solid #ddd;"-->
                <!--/>-->

                <!--<div class="wrapper-diagram-pie-chart">-->
                    <!--<sales-pie-chart-->
                            <!--title="В разрезе статусов"-->
                            <!--:series="pieByStatusSeries"-->
                            <!--:drilldown="pieByStatusDrilldown"-->
                            <!--:colors="optionsColorsPieCharts"-->
                            <!--style="border-right: 1px solid #ddd;"-->
                    <!--/>-->

                    <!--<sales-pie-chart-->
                            <!--title="По типу оплаты"-->
                            <!--:series="pieByPaymentTypeSeries"-->
                            <!--:colors="optionsColorsPieCharts"-->
                    <!--/>-->
                <!--</div>-->

            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
    <div>
        <h1>Мы подгрузили компонент Analytics</h1>
    </div>
</template>

<script>
    import PeriodToggle from './Analytics/PeriodToggle.vue';
    import RangePicker from './Analytics/RangePicker.vue';
    import SalesChartByPeriod from './Analytics/SalesChartByPeriod.vue';
    import SalesPieChart from './Analytics/SalesPieChart.vue';
    import apiClient from './api/client';
    import {format, parse, subDays} from 'date-fns';

    const formatDate = date => format(parse(date), 'DD.MM.YYYY');
    const formatDateTime = date => format(parse(date), 'DD.MM.YYYY / H:mm');

    // должно быть синхронизировано с \Privatmarket\BusinessBundle\Entity\OrderStatusEnum
    const STATUS_ID_DECLINED_BY_COMPANY = 5;

    // Успешные статусы в первом drilldown
    const SUCCESS_STATUS_GROUP_CODE = 'success';

    export default {
        name: 'Analytics',
        components: {
            PeriodToggle,
            RangePicker,
            SalesChartByPeriod,
            SalesPieChart,
        },
        props: {
//            companyId: {
//                type: Number,
//                required: true,
//            },
//            dateFrom: {
//                type: String,
//                default() {
//                    return formatDate(subDays(new Date(), 30));
//                },
//            },
//            dateTo: {
//                type: String,
//                default() {
//                    return formatDate(new Date());
//                },
//            },
//            groupBy: {
//                type: String,
//                default: 'day',
//            },
        },
        data() {
            return {
                loading: false,
                dataListToggle: [{label: "день", code: "day"}, {label: "месяц", code: "month"}],
                analytics: {},
            }
        },
        computed: {
            dataWasLoaded() {
                return Object.keys(this.analytics).length > 0;
            },
            lastSystemUpdate() {
                if (!this.analytics['last_update_date']) {
                    return '';
                }

                return `Данные обновляются 1 раз в час. Последнее обновление ${formatDateTime(this.analytics['last_update_date'])}.`;
            },
            chartByPeriodSource() {
                switch (this.groupBy) {
                    case 'day':
                        return this.analytics['by_date'] || [];

                    case 'month':
                        return this.analytics['by_month'] || [];
                }

                return [];
            },
            chartByPeriodLabels() {
                return this.chartByPeriodSource.map(item => item.label);
            },
            chartByPeriodParamsView() {
                return [{
                    labels: {
                        format: '{value}',
                        style: {
                            color: "#428bca",
                        },
                    },
                    allowDecimals: false,
                    title: {
                        text: 'Кол-во заказов',
                        style: {
                            color: "#428bca",
                        },
                    },
                }, {
                    labels: {
                        format: '{value} грн',
                        style: {
                            color: "#ff642a",
                        },
                    },
                    title: {
                        text: 'Оборот',
                        style: {
                            color: "#ff642a",
                        },
                    },
                    opposite: true,
                }, {
                    labels: {
                        format: '{value} грн',
                        style: {
                            color: "#90EE90",
                        },
                    },
                    title: {
                        text: 'Доход.',
                        style: {
                            color: "#90EE90",
                        },
                    },
                    opposite: true,
                    visible: false,
                }];
            },
            totalCountByPeriodSource() {
                return {
                    turnover: this.chartByPeriodSource
                        .map(item => item.turnover)
                        .reduce( (sum, current) => sum + current),
                    revenue: this.chartByPeriodSource
                        .map(item => item.revenue)
                        .reduce( (sum, current) => sum + current),
                    orders_count: this.chartByPeriodSource
                        .map(item => item.orders_count)
                        .reduce( (sum, current) => sum + current)
                };
            },
            chartByPeriodSeries() {
                const lines = {
                    orders_count: {
                        label: `Количество заказов ( ${this.totalCountByPeriodSource.orders_count} шт )`,
                        type: "column",
                        color: "#428bca",
                    },
                    turnover: {
                        label: `Оборот ( ${this.totalCountByPeriodSource.turnover} грн)`,
                        type: "spline",
                        dashStyle: 'shortdot',
                        yAxis: 1,
                        color: "#ff642a",
                    },
                    revenue: {
                        label: `Доход ( ${this.totalCountByPeriodSource.revenue} грн )`,
                        type: "spline",
                        yAxis: 1,
                        color: "#90EE90",
                    },
                };

                const series = [];
                for (const [key, line] of Object.entries(lines)) {
                    series.push({
                        name: line.label,
                        type: line.type,
                        dashStyle: line.dashStyle,
                        yAxis: line.yAxis,
                        color: line.color,
                        data: this.chartByPeriodSource.map(item => item[key]),
                    })
                }

                return series;
            },

            pieByStatusSource() {
                return this.analytics["by_status"] || [];
            },
            pieByDeclineStatusSource() {
                return this.analytics["by_decline_status"] || [];
            },
            pieByStatusSeries() {
                const series = {};

                // группируем и суммируем по status_group_code
                for (const item of this.pieByStatusSource) {
                    const statusGroupCode = item.status_group_code;

                    if (!series[statusGroupCode]) {
                        series[statusGroupCode] = {
                            name: item.status_group_label,
                            drilldown: statusGroupCode !== SUCCESS_STATUS_GROUP_CODE ? statusGroupCode : null,
                            y: 0,
                        }
                    }

                    series[statusGroupCode].y += item.orders_count;
                }

                return Object.values(series).filter(item => item.y > 0);
            },
            pieByStatusDrilldown() {
                const drilldowns = {};

                for (const item of this.pieByStatusSource) {
                    const statusGroupCode = item.status_group_code;

                    if (!drilldowns[statusGroupCode]) {
                        drilldowns[statusGroupCode] = {
                            id: statusGroupCode,
                            name: 'Заказов',
                            data: [],
                        }
                    }

                    drilldowns[statusGroupCode].data.push({
                        name: item.status_label,
                        y: item.orders_count,
                        drilldown: item.status_id === STATUS_ID_DECLINED_BY_COMPANY ? item.status_id : null,
                    });
                }

                // добавляем третий дриллдаун
                drilldowns[STATUS_ID_DECLINED_BY_COMPANY] = {
                    id: STATUS_ID_DECLINED_BY_COMPANY,
                    name: 'Заказов',
                    data: this.pieByDeclineStatusSource
                        .map(item => {
                            return {
                                name: item.label,
                                y: item.count,
                            }
                        }),
                };

                return Object
                    .values(drilldowns)
                    .map(drilldown => {
                        drilldown.data = drilldown.data.filter(item => item.y > 0);

                        return drilldown;
                    });
            },

            pieByPaymentTypeSource() {
                return this.analytics["by_payment_type"] || [];
            },
            pieByPaymentTypeSeries() {
                return this
                    .pieByPaymentTypeSource
                    .map(item => {
                        return {
                            name: item.type_label,
                            y: item.orders_count,
                        }
                    })
                    .filter(item => item.y > 0);
            },

            hasOrdersForPeriod() {
                return this.pieByStatusSource.some(item => item && item.orders_count > 0);
            },
            optionsColorsPieCharts() {
                return ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066',
                    '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'];
            },
        },
        watch: {
            $route(to, from) {
                // если дата не менялась - не нужно делать запрос на сервер
                if (from.query.dateFrom === to.query.dateFrom && from.query.dateTo === to.query.dateTo) {
                    return;
                }

                this.reload();
            },
        },
        mounted() {
            this.reload();
        },
        methods: {
            async reload() {
                this.loading = true;

                this.analytics = await apiClient.getAnaliticsData(this.companyId, {
                    from: this.dateFrom,
                    to: this.dateTo,
                });

                this.loading = false;
            },
        },
    }
</script>

<style lang="scss">
    .header-nav {
        height: 67px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #337ab7;
        padding: 0 20px 0 20px;
        margin-bottom: 20px;

        .button-wrapper {
            display: flex;
        }
    }

    .wrapper-diagram-pie-chart {
        display: flex;

        .diagram-pie-chart {
            width: 50%;
        }
    }
</style>
