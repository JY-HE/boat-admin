import { type BoatNotificationProps } from '@koihe/boat-ui/es/notification'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
     /**
     * 通知函数，只需要传入想覆盖的字段，其它用默认值
     */
    $BoatNotify(options: Partial<BoatNotificationProps>): void
  }
}
