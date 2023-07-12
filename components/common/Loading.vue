<template>
    <div class="card-portlets-loader text-center">
        <div class="spinner-border text-primary m-2" role="status"></div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            loading: false
        }),
        methods: {
            start() {
                console.log('called')
                this.loading = true;
            },
            finish() {
                this.loading = false;
            }
        }
    };
</script>