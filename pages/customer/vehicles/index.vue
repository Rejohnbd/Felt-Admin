<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-12" v-if="loading">
                <Loading />
            </div>
            <div class="col-12" v-else>
                <div class="card">
                    <div class="card-body">
                        <p class="text-muted font-13 mb-4"></p>
                        <div class="row mb-md-2">
                            <div class="col-sm-12 col-md-6">
                                <div id="tickets-table_length" class="dataTables_length">
                                    <label class="d-inline-flex align-items-center">
                                        Show&nbsp;
                                        <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                                    </label>
                                </div>
                            </div>
                            <!-- Search -->
                            <div class="col-sm-12 col-md-6">
                                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                                    <label class="d-inline-flex align-items-center">
                                        Search:
                                        <b-form-input v-model="filter" type="search" placeholder="Search..." class="form-control form-control-sm ml-2"></b-form-input>
                                    </label>
                                </div>
                            </div>
                            <!-- End search -->
                        </div>
                        <!-- Table -->
                        <div class="table-responsive mb-0">
                            <b-table 
                                :items="tableData" 
                                :fields="fields" 
                                responsive="sm" 
                                :per-page="perPage" 
                                :current-page="currentPage" 
                                :sort-by.sync="sortBy" 
                                :sort-desc.sync="sortDesc" 
                                :filter="filter" 
                                :filter-included-fields="filterOn"
                            >
                                <template v-slot:cell(vehicle_type)="items">
                                    <span class="b-avatar badge-secondary rounded mr-2">
                                        <span class="b-avatar-img">
                                            <img :src="$config.BaseUrl + items.item.vehicle_type.vehicle_type_image" :alt="items.item.vehicle_type.vehicle_type_image" />
                                        </span>
                                    </span>
                                    {{ items.item.vehicle_brand }} {{ items.item.vehicle_model_year }}
                                </template>
                                <template v-slot:cell(driver_info)="items">
                                    <b>Name: </b> {{ items.item.driver_info.user_details.first_name }} {{ items.item.driver_info.user_details.last_name }}
                                    <br/>
                                    <b>Email: </b> {{ items.item.driver_info.email }}
                                    <br/>
                                    <b>Phone: </b> {{ items.item.driver_info.user_details.phone_number }}
                                </template>
                                
                                <template v-slot:cell(service_package)="items">
                                    {{ items.item.service_package.package_name }} ({{ items.item.service_package.subscription_fee }} Tk/Month)
                                </template>
                                <template v-slot:cell(device_info)="items">
                                    {{ items.item.device_info.device_type.device_type_name }} <br/>
                                    <b>IMEI:</b> {{ items.item.device_info.device_imei }}
                                </template>
                                <template v-slot:cell(installation_status)="items">
                                    <span class="badge badge-soft-danger" v-if="items.item.installation_status == 0">Not Installed</span>
                                    <span class="badge badge-soft-success" v-if="items.item.installation_status == 1">Installed</span>
                                </template>
                                <template v-slot:cell(payment_status)="items">
                                    <span class="badge badge-soft-danger" v-if="items.item.payment_status == 0">Not Active</span>
                                    <span class="badge badge-soft-success" v-if="items.item.payment_status == 1">Actived</span>
                                </template>
                                <template v-slot:cell(service_status)="items">
                                    <span class="badge badge-soft-danger" v-if="items.item.service_status == 0">Not Started</span>
                                    <span class="badge badge-soft-success" v-if="items.item.service_status == 1">Started</span>
                                </template>
                                <!-- <template v-slot:cell(action)="items">
                                    <div class="button-list">
                                        <nuxt-link 
                                            to="#" 
                                            v-b-tooltip.hover 
                                            :title="`Edit Vehicle ${items.item.registration_number}`" 
                                            class="btn btn-sm btn-purple"
                                        >
                                            <i class="mdi mdi-circle-edit-outline"></i>
                                        </nuxt-link>
                                        <button 
                                            v-b-tooltip.hover 
                                            :title="`Delete Vehicle ${items.item.registration_number}`" 
                                            type="button" 
                                            class="btn btn-sm btn-danger"
                                            @click="deleteHandler(items.item.id)"
                                        >
                                            <i class="mdi mdi-delete"></i>
                                        </button> 
                                    </div>
                                </template> -->
                            </b-table>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="dataTables_paginate paging_simple_numbers float-right">
                                    <ul class="pagination pagination-rounded mb-0">
                                        <!-- pagination -->
                                        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue';

export default {
    name: "VehicleListPage",
    middleware: ["auth", "auth-customer"],
    components: {
        Loading
    },
    data() {
        return {
            title: "Vehicle List",
            items: [
                {
                    text: "Dashobard",
                    href: "#",
                },
                {
                    text: "Vehicle List",
                    active: true,
                },
            ],
            loading: false,
            tableData: [],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "registration_number",
            sortDesc: false,
            fields: [
                {
                    label: 'Vehicle Type',
                    key: 'vehicle_type'
                },
                {
                    key: "registration_number",
                    sortable: true
                },
                {
                    key: "driver_info",
                    sortable: true
                },
                {
                    key: "service_package",
                    sortable: true
                },
                {
                    key: "device_info",
                    sortable: true
                },
                {
                    key: "payment_status",
                    sortable: true
                },
                {
                    key: "action",
                    sortable: true
                },
            ],
        };
    },
    head: {
        titleTemplate: "%s Vehicle List",
    },
    computed: {
        rows() {
            return this.tableData.length;
        }
    },
    created() {
        this.getAllDeviceType();
    },
    methods: {
        async getAllDeviceType() {
            await this.$axios.get("customer/customer-vehicles")
                .then((response) => {
                    this.loading = true;
                    this.tableData = response.data.data;
                    this.loading = false;
                }).catch((error) => {
                    console.log(error);
                });
        }
    }
}
</script>