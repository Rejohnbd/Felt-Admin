<template>
    <div>
        <div class="account-pages mt-5 mb-5">
            <div class="container">
                <Nuxt />
            </div>
        </div>
        <footer class="footer footer-alt">
            2020 - {{ new Date().getFullYear() }} &copy; Developed by <a href="https://cpsdbd.com/" target="_blank">CPSD</a>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 
        }
    },
}
</script>