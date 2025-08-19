<script lang="ts">
import { defineComponent } from 'vue-demi'
//@ts-ignore
export default defineComponent({
    props:{
        src: String,
    },
    data(){
        return {
            value: '123'
        }
    },
    mounted(){
        console.warn(this.value)
    }
})
</script>

<template>
    <img :src="src" class="image"></img>
</template>


<style scoped>
.image {
    width: 300px;
    height: 200px;
    margin: 0 auto;
}
</style>