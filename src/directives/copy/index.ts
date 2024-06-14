import { Directive, DirectiveBinding } from 'vue';
import BoatNotify from '@/utils/notification';

const copyText = (text?: string) => {
    if (!text) return;
    navigator.clipboard
        .writeText(text)
        .then(() => {
            BoatNotify({
                title: '复制成功',
                type: 'success',
            });
        })
        .catch(err => {
            BoatNotify({
                title: '复制失败',
                message: err,
                type: 'error',
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
