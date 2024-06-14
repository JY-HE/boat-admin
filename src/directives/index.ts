import { App, Directive } from 'vue';
import copy from './copy';

const directives: Record<string, Directive> = {
    copy,
};

export default {
    install(app: App) {
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key]);
        });
    },
};
