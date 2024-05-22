<template>
    <div class="PicturePreview">
        <div class="imageList">
            <img :src="img1Src" draggable="false" @click="previewSrc = img1Src" />
            <img :src="img2Src" draggable="false" @click="previewSrc = img2Src" />
        </div>
        <div class="parentBox">
            <!-- <div id="previewBox"> -->
            <img id="previewBox" :src="previewSrc" draggable="false" />
            <!-- </div> -->
            <div v-if="previewSrc" class="operation">
                <BoatIconfont icon="&#xec13;" title="缩小" @click="simulateWheelEvent(100)" />
                <BoatIconfont icon="&#xec14;" title="放大" @click="simulateWheelEvent(-100)" />
                <BoatIconfont v-if="isOriginalSize" icon="&#xe918;" title="图片原始大小" />
                <BoatIconfont v-else icon="&#xe7cf;" title="图片适应窗口大小" />
                <BoatIconfont icon="&#xe722;" title="左旋转" @click="rotateLeft" />
                <BoatIconfont icon="&#xe720;" title="右旋转" @click="rotateRight" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import exampleImage from '@/assets/img/7.png'; // 使用 import 语句加载图片

const img1Src = ref('/img/8.jpg'); // 路径相对于 public 目录
const img2Src = ref(exampleImage);
const previewSrc = ref('');
const isOriginalSize = ref(false);

const isDragging = ref<boolean>(false);
const imageX = ref<number>(0); // 图片初始位置
const imageY = ref<number>(0);

onMounted(() => {
    init();
});

/**
 * 初始化
 */
const init = () => {
    const imgBoxDom = document.querySelector('#previewBox') as HTMLElement;
    // 禁止选中文字/图片
    document.addEventListener('selectstart', e => {
        e.preventDefault();
    });
    imgBoxDom.addEventListener('wheel', event => {
        wheelHandler(event, imgBoxDom);
    });
    imgBoxDom.addEventListener('mousedown', event => {
        mouseDownHandler(event, imgBoxDom);
    });
};

/**
 * 鼠标滚轮放大或缩小图片
 * @param event 鼠标滚轮事件
 * @param dom 装载预览图片的dom
 */
const wheelHandler = (event: WheelEvent, dom: HTMLElement) => {
    event.preventDefault();
    const zoomStep = 0.1;
    const transf = getTransform(dom);
    if (event.deltaY < 0) {
        transf.scale = Math.min(transf.scale + zoomStep, 10.0);
    } else {
        transf.scale = Math.max(0.1, Math.min(transf.scale - zoomStep, 10.0));
    }
    const parent = document.querySelector('.parentBox') as HTMLElement;
    const newTransf = limitBorder(
        dom,
        parent,
        transf.transX,
        transf.transY,
        transf.scale,
        transf.rotate
    );
    applyTransform(dom, {
        transX: newTransf.transX,
        transY: newTransf.transY,
        scale: transf.scale,
        rotate: transf.rotate,
    });
};

/**
 * 鼠标按下
 * @param event 鼠标按钮事件
 * @param dom 装载预览图片的dom
 */
const mouseDownHandler = (event: MouseEvent, dom: HTMLElement) => {
    const transf = getTransform(dom);
    isDragging.value = transf.scale > 1; // 图片放大才可以拖拽
    imageX.value = event.clientX - transf.transX;
    imageY.value = event.clientY - transf.transY;
    document.addEventListener('mousemove', ev => {
        mouseMoveHandler(ev, dom);
    });
    document.addEventListener('mouseup', ev => {
        mouseUpHandler(ev, dom);
    });
};

/**
 * 鼠标抬起
 * @param event 鼠标按钮事件
 * @param dom 装载预览图片的dom
 */
const mouseUpHandler = (event: MouseEvent, dom: HTMLElement) => {
    isDragging.value = false;
    document.removeEventListener('mousemove', ev => {
        mouseMoveHandler(ev, dom);
    });
    document.removeEventListener('mouseup', ev => {
        mouseUpHandler(ev, dom);
    });
};

/**
 * 鼠标移动
 * @param event 鼠标按钮事件
 * @param dom 装载预览图片的dom
 */
const mouseMoveHandler = (event: MouseEvent, dom: HTMLElement) => {
    if (isDragging.value && checkMouse(event)) {
        const parent = document.querySelector('.parentBox') as HTMLElement;
        const { scale, rotate } = getTransform(dom);
        const moveX = event.clientX - imageX.value; // x向移动距离
        const moveY = event.clientY - imageY.value; // y向移动距离
        const newTransf = limitBorder(dom, parent, moveX, moveY, scale, rotate);
        applyTransform(dom, {
            transX: newTransf.transX,
            transY: newTransf.transY,
            scale,
            rotate,
        });
    }
};

/**
 * 检查鼠标是否在容器内
 * @param event 鼠标按钮事件
 */
const checkMouse = (event: MouseEvent) => {
    const dom = document.querySelector('.parentBox') as HTMLElement;
    const domRect = dom.getBoundingClientRect();
    if (
        event.clientX > domRect.right ||
        event.clientX < domRect.left ||
        event.clientY > domRect.bottom ||
        event.clientY < domRect.top
    ) {
        return false;
    }
    return true;
};

/**
 * 通过getComputedStyle获取transform矩阵,并用split分割
 * 如 transform: translate(100, 100);
 * getComputedStyle可以取到"matrix(1, 0, 0, 1, 100, 100)"
 * @param dom 装载预览图片的dom
 * @returns {number} returns.transX - 图片在 x 方向上的偏移量
 * @returns {number} returns.transY - 图片在 y 方向上的偏移量
 * @returns {number} returns.scale - 图片的缩放比例
 * @returns {number} returns.rotate - 图片的旋转角度
 */
const getTransform = (dom: HTMLElement) => {
    const transform = getComputedStyle(dom).transform;
    if (transform === 'none') {
        return {
            transX: 0,
            transY: 0,
            scale: 1,
            rotate: 0,
        };
    }

    const arr = transform.split(',');

    const a = parseFloat(arr[0].split('(')[1]);
    const b = parseFloat(arr[1]);
    const c = parseFloat(arr[2]);
    const d = parseFloat(arr[3]);
    const e = parseFloat(arr[4]);
    const f = parseFloat(arr[5].split(')')[0]);

    const scale = Math.sqrt(a * a + b * b);
    const rotate = Math.atan2(b, a) * (180 / Math.PI); // 将弧度转换为度数

    return {
        transX: e,
        transY: f,
        scale: scale,
        rotate: rotate,
    };
};

/**
 * 应用 transform 对象到 matrix 上
 * @param dom 装载预览图片的 dom
 * @param transformObj 包含 transX, transY, scale, 和 rotate 的 transform 对象
 */
const applyTransform = (
    dom: HTMLElement,
    transformObj: { transX: number; transY: number; scale: number; rotate: number }
) => {
    const { transX, transY, scale, rotate } = transformObj;

    // 将角度转换为弧度
    const rad = rotate * (Math.PI / 180);

    // 计算 matrix 参数
    const a = Math.cos(rad) * scale;
    const b = Math.sin(rad) * scale;
    const c = -Math.sin(rad) * scale;
    const d = Math.cos(rad) * scale;
    const e = transX;
    const f = transY;

    // 应用新的 transform 属性
    dom.style.transform = `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`;
};

/**
 * 获取边框限制的transform的x, y偏移量
 * @param imageDom 装载预览图片的dom
 * @param parentDom 父盒子dom
 * @param moveX 父盒子的x移动距离
 * @param moveY 父盒子的y移动距离
 * @param scale 缩放比例
 * @param rotate 旋转角度
 * @returns {number} returns.transX - 图片在 x 方向上的偏移量
 * @returns {number} returns.transY - 图片在 y 方向上的偏移量
 */
const limitBorder = (
    imageDom: HTMLElement,
    parentDom: HTMLElement,
    moveX: number,
    moveY: number,
    scale: number,
    rotate: number
) => {
    // console.log('🚀 ~ PicturePreview.vue:246 ~ moveX:', moveX);
    // console.log('🚀 ~ PicturePreview.vue:246 ~ moveY:', moveY);
    // console.log('🚀 ~ PicturePreview.vue:246 ~ scale:', scale);
    // console.log('🚀 ~ PicturePreview.vue:246 ~ rotate:', rotate);
    // const rad = (rotate * Math.PI) / 180; // 将角度转换为弧度
    // const {
    //     clientWidth: imageWidth,
    //     clientHeight: imageHeight,
    //     offsetLeft: imageLeft,
    //     offsetTop: imageTop,
    // } = imageDom;
    // const { clientWidth: parentWidth, clientHeight: parentHeight } = parentDom;

    // // 计算旋转后的图像宽度和高度
    // const rotatedWidth =
    //     Math.abs(imageWidth * Math.cos(rad)) + Math.abs(imageHeight * Math.sin(rad));
    // const rotatedHeight =
    //     Math.abs(imageWidth * Math.sin(rad)) + Math.abs(imageHeight * Math.cos(rad));

    // let transX;
    // let transY;

    // // 放大的图片超出父盒子时，图片最多拖动到与父盒子边框对齐
    // if (rotatedWidth * scale > parentWidth || rotatedHeight * scale > parentHeight) {
    //     transX = Math.min(
    //         Math.max(moveX, parentWidth - (rotatedWidth * scale + imageWidth) / 2 - imageLeft),
    //         -imageLeft + (rotatedWidth * scale - imageWidth) / 2
    //     );
    //     console.log('🚀 ~ PicturePreview.vue:270 ~ transX:', transX);
    //     transY = Math.min(
    //         Math.max(moveY, parentHeight - (rotatedHeight * scale + imageHeight) / 2 - imageTop),
    //         -imageTop + (rotatedHeight * scale - imageHeight) / 2
    //     );
    //     console.log('🚀 ~ PicturePreview.vue:275 ~ transY:', transY);
    // }
    // // 图片缩小时，偏移量逐渐减少到0
    // else {
    //     transX = Math.max(
    //         Math.min(moveX, parentWidth - (rotatedWidth * scale + imageWidth) / 2 - imageLeft),
    //         -imageLeft + (rotatedWidth * scale - imageWidth) / 2
    //     );
    //     console.log('🚀 ~ PicturePreview.vue:282 ~ transX:', transX);
    //     transY = Math.max(
    //         Math.min(moveY, parentHeight - (rotatedHeight * scale + imageHeight) / 2 - imageTop),
    //         -imageTop + (rotatedHeight * scale - imageHeight) / 2
    //     );
    //     console.log('🚀 ~ PicturePreview.vue:282 ~ transY:', transY);
    // }
    // return { transX, transY };
    const {
        clientWidth: imageWidth,
        clientHeight: imageHeight,
        offsetLeft: imageLeft,
        offsetTop: imageTop,
    } = imageDom;
    console.log('🚀 ~ PicturePreview.vue:296 ~ imageWidth:', imageWidth);
    console.log('🚀 ~ PicturePreview.vue:296 ~ imageHeight:', imageHeight);
    console.log('🚀 ~ PicturePreview.vue:296 ~ imageLeft:', imageLeft);
    console.log('🚀 ~ PicturePreview.vue:296 ~ imageTop:', imageTop);
    const { clientWidth: parentWidth, clientHeight: parentHeight } = parentDom;
    let transX;
    let transY;
    // 放大的图片超出父盒子时，图片最多拖动到与父盒子边框对齐
    if (imageWidth * scale > parentWidth || imageHeight * scale > parentHeight) {
        // imageWidth * (scale + 1) : 图片放大后的宽度；  imageWidth * (scale + 1) / 2 ：确定中心点的位置
        // parentWidth - (imageWidth * (scale + 1)) / 2 - imageLeft ：图片在 x 方向上可以向右移动的最大距离
        // -imageLeft + (imageWidth * (scale - 1)) / 2 ：图片在 x 方向上可以向左移动的最大距离
        transX = Math.min(
            Math.max(moveX, parentWidth - (imageWidth * (scale + 1)) / 2 - imageLeft),
            -imageLeft + (imageWidth * (scale - 1)) / 2
        );
        transY = Math.min(
            Math.max(moveY, parentHeight - (imageHeight * (scale + 1)) / 2 - imageTop),
            -imageTop + (imageHeight * (scale - 1)) / 2
        );
    }
    // 图片缩小时，偏移量逐渐减少到0
    else {
        transX = Math.max(
            Math.min(moveX, parentWidth - (imageWidth * (scale + 1)) / 2 - imageLeft),
            -imageLeft + (imageWidth * (scale - 1)) / 2
        );
        transY = Math.max(
            Math.min(moveY, parentHeight - (imageHeight * (scale + 1)) / 2 - imageTop),
            -imageTop + (imageHeight * (scale - 1)) / 2
        );
    }
    return { transX, transY };
};

/**
 * 模拟滚轮事件
 * @param deltaY 滚轮的 deltaY 值，负值表示向上滚动，正值表示向下滚动
 */
const simulateWheelEvent = (deltaY: number) => {
    const imgBoxDom = document.querySelector('#previewBox') as HTMLElement;
    const event = new WheelEvent('wheel', { deltaY });
    wheelHandler(event, imgBoxDom);
};

/**
 * 左旋转
 */
const rotateLeft = () => {
    const imgBoxDom = document.querySelector('#previewBox') as HTMLElement;
    console.log('🚀 ~ PicturePreview.vue:350 ~ imgBoxDom:', imgBoxDom);
    const parent = document.querySelector('.parentBox') as HTMLElement;
    const transf = getTransform(imgBoxDom);
    transf.rotate = (transf.rotate - 90) % 360;
    applyTransform(imgBoxDom, transf);
    // const newTransf = limitBorder(
    //     imgBoxDom,
    //     parent,
    //     transf.transX,
    //     transf.transY,
    //     transf.scale,
    //     transf.rotate
    // );
    // applyTransform(imgBoxDom, {
    //     transX: newTransf.transX,
    //     transY: newTransf.transY,
    //     scale: transf.scale,
    //     rotate: transf.rotate,
    // });
};

/**
 * 右旋转
 */
const rotateRight = () => {
    const imgBoxDom = document.querySelector('#previewBox') as HTMLElement;
    const parent = document.querySelector('.parentBox') as HTMLElement;
    const transf = getTransform(imgBoxDom);
    transf.rotate = (transf.rotate + 90) % 360;
    applyTransform(imgBoxDom, transf);

    // const newTransf = limitBorder(
    //     imgBoxDom,
    //     parent,
    //     transf.transX,
    //     transf.transY,
    //     transf.scale,
    //     transf.rotate
    // );
    // applyTransform(imgBoxDom, {
    //     transX: newTransf.transX,
    //     transY: newTransf.transY,
    //     scale: transf.scale,
    //     rotate: transf.rotate,
    // });
};
</script>

<style lang="scss">
.PicturePreview {
    @include wh;
    @include flexCenter(space-between);
    padding: pxToRem(16);
    .imageList {
        @include flexCenter(center, center, true);
        @include whrem(500, 100%);
        grid-gap: pxToRem(200);
        img {
            @include whrem(250);
            object-fit: contain;
            cursor: pointer;
            transition: all 0.5s ease;
            &:hover {
                transform: scale(1.5);
            }
        }
    }
    .parentBox {
        border: pxToRem(2) solid;
        @include themeColor(1, border-color);
        flex: 1;
        flex-shrink: 0;
        height: 100%;
        overflow: hidden;
        position: relative;
        @include flexCenter;
        #previewBox {
            // @include wh;
            transform: translate(0, 0);
            transform-origin: center center;
            // object-fit: contain;
            // img {
            //     @include wh;
            //     object-fit: contain;
            // }
        }
        .operation {
            width: fit-content;
            height: 48;
            @include themeColor(0.6, background-color);
            position: absolute;
            z-index: 100;
            bottom: pxToRem(16);
            left: 50%;
            transform: translateX(-50%);
            border-radius: pxToRem(36);
            @include flexCenter;
            grid-gap: pxToRem(24);
            padding: pxToRem(16) pxToRem(24);
            .BoatIconfont {
                @include iconSize(1);
                @include whiteColor(1, color);
                cursor: pointer;
            }
        }
    }
}
</style>
