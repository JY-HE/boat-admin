<template>
    <div class="Theme">
        <BoatIconButton v-if="isDark" icon="&#xe600;" title="明亮模式" @click="setMode('light')" />
        <BoatIconButton v-else icon="&#xe650;" title="暗黑模式" @click="setMode('dark')" />
    </div>
</template>

<script setup lang="ts">
import { useThemeMode } from '@/hooks/useThemeMode';

const { isDark, setMode } = useThemeMode();
</script>
