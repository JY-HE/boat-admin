<template>
    <div>
        <div class="mb-12">
            <BoatTitle title="允许选中复制"></BoatTitle>
            <p class="font-style-3 text-h1">
                这是一段文字，你可以使用鼠标选中并且复制。这是一段文字，你可以使用鼠标选中并且复制。这是一段文字，你可以使用鼠标选中并且复制。这是一段文字，你可以使用鼠标选中并且复制。这是一段文字，你可以使用鼠标选中并且复制。这是一段文字，你可以使用鼠标选中并且复制。
            </p>
        </div>
        <div class="mb-12">
            <BoatTitle title="禁止选中"></BoatTitle>
            <p class="font-style-3 text-h1 select-none">
                这是一段文字，你无法使用鼠标选中。这是一段文字，你无法使用鼠标选中。这是一段文字，你无法使用鼠标选中。这是一段文字，你无法使用鼠标选中。这是一段文字，你无法使用鼠标选中。这是一段文字，你无法使用鼠标选中。这是一段文字，你无法使用鼠标选中。这是一段文字，你无法使用鼠标选中。这是一段文字，你无法使用鼠标选中。
            </p>
        </div>
        <div class="mb-12">
            <BoatTitle title="可以选中但禁止复制"></BoatTitle>
            <p
                class="font-style-3 text-h1"
                @copy.prevent="handleCopy"
                @cut.prevent="handleCut"
                @dragstart.prevent
            >
                这是一段文字，你可以选中但禁止复制。这是一段文字，你可以选中但禁止复制。这是一段文字，你可以选中但禁止复制。这是一段文字，你可以选中但禁止复制。这是一段文字，你可以选中但禁止复制。这是一段文字，你可以选中但禁止复制。这是一段文字，你可以选中但禁止复制。这是一段文字，你可以选中但禁止复制。
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
function handleCopy(e: ClipboardEvent) {
    e.preventDefault(); // 阻止默认复制行为
    alert('禁止复制！');
}

function handleCut(e: ClipboardEvent) {
    e.preventDefault(); // 阻止默认剪切行为
    alert('禁止剪切！');
}
</script>

<style lang="scss"></style>
