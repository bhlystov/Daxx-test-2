<template>

    <el-date-picker
            v-model="selectedDateRange"
            :clearable="false"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="Дата начала"
            end-placeholder="Дата окончания"
            :picker-options="pickerOptions"
            format="dd.MM.yyyy"
            value-format="dd.MM.yyyy"
    >
    </el-date-picker>
</template>

<script>
    import {subDays} from 'date-fns';

    const getRange = days => [subDays(new Date(), days), new Date()];

    export default {
        name: 'RangePicker',
        props: {
            dateFrom: {
                type: String,
            },
            dateTo: {
                type: String,
            },
        },
        data() {
            return {
                pickerOptions: {
                    shortcuts: [
                        {
                            text: 'За неделю',
                            onClick(picker) {
                                picker.$emit('pick', getRange(7));
                            },
                        }, {
                            text: 'За месяц',
                            onClick(picker) {
                                picker.$emit('pick', getRange(30));
                            },
                        }, {
                            text: 'За 3 месяца',
                            onClick(picker) {
                                picker.$emit('pick', getRange(90));
                            },
                        },
                        {
                            text: 'За 6 месяцев',
                            onClick(picker) {
                                picker.$emit('pick', getRange(182));
                            },
                        },
                    ],
                },
            };
        },
        computed: {
            selectedDateRange: {
                get() {
                    return [this.dateFrom, this.dateTo];
                },
                set(range) {
                    const query = this.$route.query;

                    this.$router.push({
                        name: 'analytics/index',
                        query: {
                            ...query,
                            dateFrom: range[0],
                            dateTo: range[1],
                        },
                    });
                },
            },
        },
    };
</script>

<style>
    /* К сожалению у компонента нет возможности стилизовать */
    .el-date-editor--daterange.el-input__inner {
        width: 250px;
    }
</style>
