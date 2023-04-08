<template>
    <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    2020 - {{ new Date().getFullYear() }} &copy; Developed by <a href="https://aritlab.com/" target="_blank">ARITLAB</a>
                </div>
                <div class="col-md-6">
                    <div class="text-md-right footer-links d-none d-sm-block">
                        <a href="javascript:void(0);">{{ $t('about-us') }}</a>
                        <a href="javascript:void(0);">{{ $t('help') }}</a>
                        <a href="javascript:void(0);">{{ $t('contact-us') }}</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'CustomerFooter'
    }
</script>