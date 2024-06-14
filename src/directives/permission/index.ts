import type { Directive, DirectiveBinding } from 'vue';
import { hasPermission } from '@/utils/permission';

const vPermission: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const { value } = binding;
        if (!value) return;
        const [resource, action] = value;
        if (!hasPermission(resource, action)) {
            el.parentNode?.removeChild(el);
        }
    },
};

export default vPermission;
