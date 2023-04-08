<template>
    <div>
        <div class="account-pages mt-5 mb-5">
            <div class="container">
                <Nuxt />
            </div>
        </div>
        <footer class="footer footer-alt">
            2020 - {{ new Date().getFullYear() }} &copy; Developed by <a href="https://aritlab.com/" target="_blank">ARITLAB</a>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "auth",
        auth: 'guest',
        data() {
            return {
                // 
            }
        },
    }
</script>