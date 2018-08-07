<template>
    <div class="btn-group buttons-nav">
        <button type="button"
                v-for="item in dataListToggle"
                :key="item.code"
                @click="clickHandler(item.code)"
                class="btn btn-success"
                :class="{ active: groupBy === item.code }"
        >
            {{ item.label }}
        </button>
    </div>
</template>

<script>
    export default {
        name: 'PeriodToggle',
        props: {
            dataListToggle: {
                type: Array,
                default() {
                    return [];
                },
            },
            groupBy: {
                type: String,
            },
        },
        methods: {
            /**
             * @method clickHandler
             * @param orderByData {String} //month / day
             */
            clickHandler(orderByData) {
                const query = this.$route.query;

                this.$router.push({
                    name: 'analytics/index',
                    query: {
                        ...query,
                        group: orderByData,
                    },
                });
            },
        },
    }
</script>

<style lang="scss">
    .buttons-nav {
        button {
            padding: 10px 30px;
            background-color: #36ad39;
        }
    }
</style>
