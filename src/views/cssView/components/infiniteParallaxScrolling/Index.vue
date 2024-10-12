<template>
    <div class="infiniteParallaxScrolling">
        <div class="scrollContainer"></div>
    </div>
</template>

<script lang="ts" setup>
const imgs = computed(() => {
    return [
        new URL('@/assets/img/1.png', import.meta.url).href,
        new URL('@/assets/img/2.png', import.meta.url).href,
        new URL('@/assets/img/3.png', import.meta.url).href,
        new URL('@/assets/img/4.png', import.meta.url).href,
        new URL('@/assets/img/5.png', import.meta.url).href,
    ];
});
let container: HTMLElement | null = null;
let currentIndex = 0;
let isAnimating = false;
function prevIndex() {
    if (currentIndex === 0) return imgs.value.length - 1;
    return currentIndex - 1;
}
function nextIndex() {
    if (currentIndex === imgs.value.length - 1) return 0;
    return currentIndex + 1;
}
function createElement(index: number) {
    const img = document.createElement('img');
    img.src = imgs.value[index];
    const div = document.createElement('div');
    div.classList.add('item');
    div.appendChild(img);
    container?.appendChild(div);
    return div;
}
function resetElement() {
    if (!container) return;
    container.innerHTML = '';
    const prev = prevIndex();
    const next = nextIndex();
    createElement(prev).classList.add('prev');
    createElement(currentIndex).classList.add('current');
    createElement(next).classList.add('next');
}

function handleWheelEvent(e: WheelEvent) {
    if (!e.deltaY || !container || isAnimating) return;
    isAnimating = true;
    if (e.deltaY > 0) {
        container.className = 'scrollContainer scrollDown';
    } else {
        container.className = 'scrollContainer scrollUp';
    }
}

function handleTransitionEnd() {
    isAnimating = false;
    if (container?.classList.contains('scrollDown')) {
        currentIndex = nextIndex();
    } else if (container?.classList.contains('scrollUp')) {
        currentIndex = prevIndex();
    }
    container?.classList.remove('scrollDown', 'scrollUp');
    resetElement();
}

onMounted(() => {
    container = document.querySelector('.scrollContainer');
    if (!container) {
        console.error('Failed to get scrollContainer');
        return;
    }
    resetElement();
    window.addEventListener('wheel', handleWheelEvent);
    container.addEventListener('transitionend', handleTransitionEnd);
});
onUnmounted(() => {
    if (container) {
        container.removeEventListener('animationend', handleTransitionEnd);
    }
    window.removeEventListener('wheel', handleWheelEvent);
});
</script>

<style lang="scss">
.infiniteParallaxScrolling {
    .scrollContainer {
        @include wh;
        overflow: hidden;
        position: relative;

        .item {
            @include wh;
            overflow: hidden;
            position: absolute;
            transition: 0.5s linear;

            img {
                @include wh;
                position: absolute;
                object-fit: cover;
                transition: 1s;
            }

            &.prev,
            &.next {
                height: 0;
                z-index: 1;
            }

            &.prev {
                img {
                    transform: translateY(-10%);
                }
            }

            &.next {
                bottom: 0;
                img {
                    bottom: 0;
                    transform: translateY(10%);
                }
            }
        }

        &.scrollUp {
            .item {
                &.prev {
                    height: 100%;
                    img {
                        transform: translateY(0);
                    }
                }
                &.current {
                    img {
                        transform: translateY(10%);
                    }
                }
            }
        }
        &.scrollDown {
            .item {
                &.next {
                    height: 100%;
                    img {
                        transform: translateY(0);
                    }
                }
                &.current {
                    img {
                        transform: translateY(-10%);
                    }
                }
            }
        }
    }
}
</style>
