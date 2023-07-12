<template>
    <div v-if="$nuxt.isOffline">
        <Offline />
    </div>
    <div v-else>
        <Vertical v-if="layout.layoutType === 'vertical'" :layout="layout.layoutType">
            <Nuxt />
        </Vertical>

        <Detached v-if="layout.layoutType === 'detached'" :layout="layout.layoutType">
            <slot />
        </Detached>

        <TwoColumn v-if="layout.layoutType === 'two-column'" :layout="layout.layoutType"> 
            <slot />
        </TwoColumn>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import Vertical from "./vertical";
    import Detached from "./detached";
    import TwoColumn from "./two-column";
    import Offline from '@/components/common/Offline.vue'

    export default {
        middleware: 'auth',
        components: {
            Vertical,
            Detached,
            TwoColumn,
            Offline
        },
        data() {
            return {
            }
        },
        computed: mapState(["layout"]),
        mounted() {
            if (this.$route.query.layout) {
                this.$store.dispatch('layout/changeLayoutType', {
                    layoutType: this.$route.query.layout
                })
            }
        }
    };
</script>


