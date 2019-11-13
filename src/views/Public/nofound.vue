<template>
    <div class="nofound_">
        <div>
            <img src="../../assets/images/404.png"/>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.nofound_{
    width: 100%;
    height: 100%;
    background: white;
    position: relative;
    div{
        position: absolute;
        width: 400px;
        left:50%;
        margin-left:-200px;
        top: 50%;
        transform:translateY(-100%);
        img{
            width: 100%;
        }
    }
}
</style>