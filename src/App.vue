<template>
    <div class="demo">
        <Demo/>
        <div></div>
    </div>
</template>
<script>
import Demo from './Demo.vue';
export default {
    components:{
        Demo
    }

}
</script>
<style scoped lang="scss">
.demo{
    background: rgb(253, 117, 117);
    div{
        color:white;
        background: rgb(7, 64, 250)
    }
}
</style>