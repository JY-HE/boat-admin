import { Directive, DirectiveBinding } from 'vue';
import { BoatNotification } from '@koihe/boat-ui';

const copyText = (text?: string) => {
    if (!text) return;
    navigator.clipboard
        .writeText(text)
        .then(() => {
            BoatNotification({
                title: '复制成功',
                type: 'success',
                offset: 80,
            });
        })
        .catch(err => {
            BoatNotification({
                title: '复制失败',
                content: err,
                type: 'error',
                offset: 80,
            });
        });
};

const vCopy: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        el.addEventListener('click', () => {
            if (binding.value) {
                copyText(binding.value);
            }
        });
    },
    unmounted(el) {
        el.removeEventListener('click', copyText);
    },
};

export default vCopy;
