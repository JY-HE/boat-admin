<template>
    <div></div>
</template>

<script lang="ts" setup>
import API from '@/api';

const requestRes = async () => {
    let result = await API.login('zhangsan', '1222');
    console.log('Rd ~ file: Request.vue ~ line 10 ~ requestRes ~ result', result);
};
</script>
