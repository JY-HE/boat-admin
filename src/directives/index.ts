import { App, Directive } from 'vue';
import copy from './copy';
import permission from './permission';
import debounce from './debounce';

const directives: Record<string, Directive> = {
    copy,
    permission,
    debounce,
};

export default {
    install(app: App) {
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key]);
        });
    },
};
