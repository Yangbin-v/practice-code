/**
 * author: yangbin
 * date: 2022.02.22
 */

import {createApp} from 'vue';
import app from './app.vue';

let em = document.createElement('div');
em.setAttribute('id', 'app');
document.body.appendChild(em);

createApp(app).mount('#app');
