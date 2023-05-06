<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row mb-2">
            <div class="col-12">
                <nuxt-link to="/admin/setting/vehicle-type/add" class="btn btn-primary waves-effect waves-light float-right"><i class="fe-plus mr-1"></i>Add New</nuxt-link>
            </div>
        </div>
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
                                <template v-slot:cell(vehicle_type_image)="items">
                                    <span class="b-avatar badge-secondary rounded">
                                        <span class="b-avatar-img">
                                            <img :src="$config.BaseUrl + items.item.vehicle_type_image" :alt="items.item.vehicle_type_name" />
                                        </span>
                                    </span>
                                </template>

                                <template v-slot:cell(action)="items">
                                    <div class="button-list">
                                        <nuxt-link 
                                            :to="`/admin/setting/vehicle-type/${items.item.id}/edit`" 
                                            v-b-tooltip.hover 
                                            :title="`Edit Device Type ${items.item.device_type_name}`" 
                                            class="btn btn-sm btn-purple"
                                        >
                                            <i class="mdi mdi-circle-edit-outline"></i>
                                        </nuxt-link>
                                        <button 
                                            v-b-tooltip.hover 
                                            :title="`Delete Device Type ${items.item.device_type_name}`" 
                                            type="button" 
                                            class="btn btn-sm btn-danger"
                                            @click="deleteHandler(items.item.id)"
                                        >
                                            <i class="mdi mdi-delete"></i>
                                        </button> 
                                    </div>
                                </template>
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
    name: "VehicleTypeListPage",
    middleware: ["auth", "auth-admin"],
    components: {
        Loading
    },
    data() {
        return {
            title: "Vehicle Type List",
            items: [{
                    text: "Dashobard",
                    href: "#",
                }, {
                    text: "Setting",
                    href: "#"
                }, {
                    text: "Vehicle Type List",
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
            sortBy: "vehicle_type_name",
            sortDesc: false,
            fields: [
                {
                    key: "vehicle_type_image",
                    sortable: true
                },
                {
                    key: "vehicle_type_name",
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
        titleTemplate: "%s Vehicle Type List",
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
            await this.$axios.get("admin/vehicle-types").then((response) => {
                this.loading = true;
                this.tableData = response.data.data;
                this.loading = false;
            }).catch((error) => {
                console.log(error);
            });
        },
        async deleteHandler(deleteId) {
            console.log(deleteId);
            this.$swal({
                title: "Are you sure?",
                text: "You can't revert your action",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes Delete it!",
                cancelButtonText: "No, Keep it!",
                showCloseButton: true,
                showLoaderOnConfirm: true
            }).then((result) => {
                if (result.value) {
                    // this.$swal('Deleted', 'You successfully deleted this file', 'success');
                    this.$swal("Deleted", "Delete feature under development", "success");
                }
                else {
                    // this.$swal('Cancelled', 'Your file is still intact', 'info');
                    this.$swal("Cancelled", "Delete feature under development", "info");
                }
            });
        }
    },
    components: { Loading }
}
</script>