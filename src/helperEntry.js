/* eslint-disable */
'use strict';
const helper = (function () {
    const render = require('./helperRender');
    const events = require('./helperEvents');
    $(document).ready(() => {
        render.init();
        events.init();
    });
});
module.exports = helper();
