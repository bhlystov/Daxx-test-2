// Инициализация модулей, локализации и настроек по-умолчанию
import {Chart} from 'highcharts-vue';

import Highcharts from 'highcharts';

Highcharts.setOptions({
    lang: {
        resetZoom: 'Reset zoom',
    },
});

export default Chart;
