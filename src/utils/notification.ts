import { ElNotification } from 'element-plus';
import { RecordType } from '@/types';

const BoatNotify = (config: RecordType) => {
    // 当前配置
    const currentConfig = { ...config };
    // 当前类型样式
    const customClass = currentConfig.type;
    // 单列消息配置
    const noMessage = !currentConfig.message ? 'noMessage' : '';
    // 相对屏幕顶部的偏移量
    currentConfig.offset = 'offset' in config ? config.offset : 80;
    // 显示时间
    currentConfig.duration = 'duration' in config ? config.duration : 3000;
    // 自定义样式类名
    currentConfig.customClass = `${customClass} ${noMessage}`;

    ElNotification(currentConfig);
};
export default BoatNotify;
