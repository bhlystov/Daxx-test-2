// Инициализация модулей, локализации и настроек по-умолчанию
import {Chart} from 'highcharts-vue';

import Highcharts from 'highcharts';
import loadDrilldown from 'highcharts/modules/drilldown';

loadDrilldown(Highcharts);

Highcharts.setOptions({
    lang: {
        drillUpText: 'Вернуться',
        resetZoom: 'Сбросить масштаб',
    },
});

export default Chart;
