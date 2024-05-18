<template>
    <div class="PicturePreview">
        <div class="imageList">
            <img :src="img1Src" draggable="false" @click="previewSrc = img1Src" />
            <img :src="img2Src" draggable="false" @click="previewSrc = img2Src" />
        </div>
        <div class="parentBox">
            <div id="previewBox">
                <img :src="previewSrc" draggable="false" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import exampleImage from '@/assets/img/截图20240518104520.png'; // 使用 import 语句加载图片

const img1Src = ref('/public/img/截图20240518104550.png'); // 路径相对于 public 目录
const img2Src = ref(exampleImage);
const previewSrc = ref('');

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
        mousedownHandler(event, imgBoxDom);
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
    const imgDom = document.querySelector('#previewBox > img') as HTMLElement;
    if (event.deltaY < 0) {
        transf.scale = Math.min(transf.scale + zoomStep, 10.0);
    } else {
        transf.scale = Math.max(0.1, Math.min(transf.scale - zoomStep, 10.0));
    }
    imgDom.style.objectFit = transf.scale > 1 ? 'fill' : 'contain';
    const parent = document.querySelector('.parentBox') as HTMLElement;
    const newTransf = limitBorder(dom, parent, transf.transX, transf.transY, transf.scale);
    dom.style.transform = `matrix(${transf.scale}, 0, 0, ${transf.scale}, ${newTransf.transX}, ${newTransf.transY})`;
};

/**
 * 鼠标按下
 * @param event 鼠标按钮事件
 * @param dom 装载预览图片的dom
 */
const mousedownHandler = (event: MouseEvent, dom: HTMLElement) => {
    const transf = getTransform(dom);
    isDragging.value = transf.scale > 1; // 图片放大才可以拖拽
    imageX.value = event.clientX - transf.transX;
    imageY.value = event.clientY - transf.transY;
    document.addEventListener('mousemove', ev => {
        mousemoveHandler(ev, dom);
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
        mousemoveHandler(ev, dom);
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
const mousemoveHandler = (event: MouseEvent, dom: HTMLElement) => {
    if (isDragging.value && checkMouse(event)) {
        const parent = document.querySelector('.parentBox') as HTMLElement;
        const { scale } = getTransform(dom);
        const moveX = event.clientX - imageX.value; // x向移动距离
        const moveY = event.clientY - imageY.value; // y向移动距离
        const newTransf = limitBorder(dom, parent, moveX, moveY, scale);
        dom.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${newTransf.transX}, ${newTransf.transY})`;
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
 * 当transform属性没有旋转rotate和拉伸skew时
 * matrix的第1, 4, 5, 6个参数为 x方向倍数, y方向倍数, x方向偏移量, y方向偏移量
 * @param dom 装载预览图片的dom
 * @returns {number} returns.transX - 图片在 x 方向上的偏移量
 * @returns {number} returns.transY - 图片在 y 方向上的偏移量
 * @returns {number} returns.scale - 图片的缩放比例
 */
const getTransform = (dom: HTMLElement) => {
    const arr = getComputedStyle(dom).transform.split(',');
    const transX = arr?.at(-2) || 0;
    const transY = arr?.at(-1)?.split(')')[0] || 0;
    const scale = arr?.at(-3) || 1;
    return {
        transX: +transX,
        transY: +transY,
        scale: +scale,
    };
};

/**
 * 获取边框限制的transform的x, y偏移量
 * @param imageDom 装载预览图片的dom
 * @param parentDom 父盒子dom
 * @param moveX 父盒子的x移动距离
 * @param moveY 父盒子的y移动距离
 * @param scale
 * @returns {number} returns.transX - 图片在 x 方向上的偏移量
 * @returns {number} returns.transY - 图片在 y 方向上的偏移量
 */
const limitBorder = (
    imageDom: HTMLElement,
    parentDom: HTMLElement,
    moveX: number,
    moveY: number,
    scale: number
) => {
    const {
        clientWidth: imageWidth,
        clientHeight: imageHeight,
        offsetLeft: imageLeft,
        offsetTop: imageTop,
    } = imageDom;
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
        #previewBox {
            @include wh;
            transform: translate(0, 0);
            img {
                @include wh;
                object-fit: contain;
            }
        }
    }
}
</style>
