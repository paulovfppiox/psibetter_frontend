<template>
    <div class="checklist-container">
        <span style="line-height: 1; font-family: 'Arial', sans-serif;">✔</span>
    </div>
</template>

<script>
 export default {
    name:'MyChecklistIcon',
    data() {
        return { 
            TOKEN: '',
            SERVERNAME: '',
        };
    }, 
}
</script>

<style>
.checklist-container  {
    width: 20px; 
    height: 20px; 
    background-color: #4CAF50; 
    border-radius: 50%; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    font-size: 15px; 
    color: #fff;
}
</style>