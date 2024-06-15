declare module 'nprogress' {
    interface NProgressOptions {
        /**
         * 设置进度条的最小百分比，默认为 0.08
         */
        minimum?: number;
        /**
         * 设置进度条动画的缓动效果，默认为 'ease'
         */
        easing?: string;
        /**
         * 设置进度条动画的速度，单位为毫秒，默认为 200
         */
        speed?: number;
        /**
         * 是否启用自动递增，默认为 true
         */
        trickle?: boolean;
        /**
         * 设置自动递增的间隔时间，单位为毫秒，默认为 200
         */
        trickleSpeed?: number;
        /**
         * 是否显示加载的小圆圈，默认为 true
         */
        showSpinner?: boolean;
        /**
         * 设置进度条的父容器，默认为 'body'
         */
        parent?: string;
        /**
         * 设置进度条的模板，可以自定义进度条的 HTML 结构
         * 默认模板为：
         * <div class="bar" role="bar">
                <div class="peg"></div>
            </div>
            <div class="spinner" role="spinner">
                <div class="spinner-icon"></div>
            </div>
         */
        template?: string;
    }

    interface NProgress {
        configure(options: NProgressOptions): NProgress;
        start(): NProgress;
        done(force?: boolean): NProgress;
        set(n: number): NProgress;
        inc(amount?: number): NProgress;
        trickle(): NProgress;
        remove(): void;
        status: null | number;
    }

    const nprogress: NProgress;
    export default nprogress;
}
