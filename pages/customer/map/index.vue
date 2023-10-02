<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title">Basic</h4>
                        <p class="card-title-dsec">Example of google maps.</p>
                        <GmapMap :center="{ lat: 2, lng: 2 }" :zoom="5" style="height: 300px"></GmapMap>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "CustomerVehicleMapPage",
    middleware: ["auth", "auth-customer"],
    data() {
        return {
            title: "Vehicle Location",
            items: [
                {
                    text: "Dashobard",
                    href: "#",
                },
                {
                    text: "Vehicle Location",
                    active: true,
                },
            ],
        }
    }
}
</script>