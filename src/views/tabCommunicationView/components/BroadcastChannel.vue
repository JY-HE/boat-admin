<template>
    <div class="flex flex-col w-fit-content gap-4">
        <div>
            <BoatTitle title="原理"></BoatTitle>
            <p class="text-h2 font-style-4 mb-4">
                BroadcastChannel
                提供了在同源的不同浏览上下文（窗口、标签页、iframe、Worker）之间进行双向广播消息的能力。
            </p>

            <BoatTitle title="优缺点"></BoatTitle>
            <div>
                <p class="text-h2 font-style-4 mb-4">
                    优​点：使用简单，无需轮询或额外写
                    localStorage；支持任意数据类型；发送者也能接收消息。
                </p>
                <p class="text-h2 font-style-4">缺点：IE 不支持；较旧浏览器兼容性欠佳。</p>
            </div>
        </div>
        <boat-button @click="openAnotherTab">请先点击此处打开另一个标签页</boat-button>
        <input v-model="message" placeholder="输入消息" class="mr-4" />
        <boat-button @click="sendMessage">发送消息</boat-button>
        <p class="text-h2">接收到的消息: {{ receivedMessage }}</p>
    </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'BroadcastChannel' });

const message = ref('');
const receivedMessage = ref('');
// 创建一个 BroadcastChannel 实例，频道名称为 'tab-communication'
const channel = new BroadcastChannel('tab-communication');

const sendMessage = () => {
    if (message.value.trim()) {
        // 发送消息到频道
        // 这里可以使用 JSON.stringify(message.value) 来发送对象或数组等复杂数据类型
        channel.postMessage(message.value);
        message.value = '';
    }
};

const handleMessage = (event: MessageEvent) => {
    receivedMessage.value = event.data;
};

const openAnotherTab = () => {
    window.open(window.location.href, '_blank');
};

onMounted(() => {
    // 监听消息事件
    channel.addEventListener('message', handleMessage);
});

onUnmounted(() => {
    channel.removeEventListener('message', handleMessage);
});
</script>

<style lang="scss"></style>
