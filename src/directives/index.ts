import { App, Directive } from 'vue';
import copy from './copy';
import permission from './permission';

const directives: Record<string, Directive> = {
    copy,
    permission,
};

export default {
    install(app: App) {
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key]);
        });
    },
};
