<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row mb-2">
            <div class="col-12">
                <nuxt-link to="/admin/devices/add" class="btn btn-primary waves-effect waves-light float-right"><i class="fe-plus mr-1"></i>Add New</nuxt-link>
            </div>
        </div>
        <Loading />
        <div class="row">
            <div class="col-12">
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
                                :filter="filter" 
                                :filter-included-fields="filterOn"
                            >
                                <template v-slot:cell(device_use_status)="items">
                                    <span class="badge badge-soft-success" v-if="items.item.device_use_status == 0">Not Used Yet</span>
                                    <span class="badge badge-soft-danger" v-if="items.item.device_use_status == 1">Already Used</span>
                                </template>
                                <template v-slot:cell(device_health_status)="items">
                                    <span class="badge badge-soft-danger" v-if="items.item.device_health_status == 0">Spoiled</span>
                                    <span class="badge badge-soft-success" v-if="items.item.device_health_status == 1">Running</span>
                                    <span class="badge badge-soft-warning" v-if="items.item.device_health_status == 2">Maintenance</span>
                                </template> 
                                <template v-slot:cell(action)="items">
                                    <div class="button-list">
                                        <nuxt-link 
                                            :to="`/admin/devices/${items.item.id}/edit`" 
                                            v-b-tooltip.hover 
                                            :title="`Edit Device ${items.item.device_imei}`" 
                                            class="btn btn-sm btn-purple"
                                        >
                                            <i class="mdi mdi-circle-edit-outline"></i>
                                        </nuxt-link>
                                        <button 
                                            v-if="items.item.device_use_status == 0"
                                            v-b-tooltip.hover 
                                            :title="`Delete Device ${items.item.device_imei}`" 
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
    name: 'DeviceListPage',
    middleware: ['auth', 'auth-admin'],
    components: {
        Loading
    },
    data() {
        return {
            title: 'Device List',
            items: [
                {
                    text: 'Dashobard',
                    href: '/admin/dashboard/sales',
                },
                {
                    text: 'Device List',
                    active: true,
                },
            ],
            tableData: [],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: ['device_imei', 'device_sim'],
            sortDesc: false,
            fields: [
                {
                    label: 'Device IMEI',
                    key: 'device_imei',
                    sortable: true
                },
                {
                    label: 'Device Type',
                    key: 'device_type.device_type_name',
                    sortable: true
                },
                {
                    label: 'Device SIM',
                    key: 'device_sim',
                    sortable: true
                },
                {
                    label: 'Device SIM Type',
                    key: 'device_sim_type',
                    sortable: true,
                    formatter: value => {
                        if (value == 1) {
                            return 'Pre Paid';
                        } else if(value == 2) {
                            return 'Post Paid';
                        }
                    }
                },
                {
                    label: 'Use Status',
                    key: 'device_use_status',
                    sortable: true,
                },
                {
                    label: 'Health Status',
                    key: 'device_health_status',
                    sortable: true
                },
                {
                    key: 'action',
                },
            ],
        }
    },
    head: {
        titleTemplate: '%s Device List',
    },
    computed: {
        rows() {
            return this.tableData.length
        }
    },
    created() {
        this.getAllDevices();
    },
    methods: {
        async getAllDevices() {
            await this.$axios.get('admin/devices')
                .then((response) => {
                    this.$nuxt.$loading.start();
                    this.tableData = response.data.data
                    this.$nuxt.$loading.finish();
                }).catch((error) => {
                    console.log(error)
                });
        },
        async deleteHandler(deleteId) {
            this.$swal({
                title: 'Are you sure?',
                text: 'You can\'t revert your action',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes Delete it!',
                cancelButtonText: 'No, Keep it!',
                showCloseButton: true,
                showLoaderOnConfirm: true
            }).then((result) => {
                if (result.value) {
                    this.$axios.delete(`admin/devices/${deleteId}`)
                        .then((response) => {
                            if (response.status == 202) {
                                this.getAllDevices();
                                this.$swal('Deleted', response.data.message, 'success')
                            }
                        }).catch((error) => {
                            if (error.response.status == 404) {
                                this.$toast.error(error.response.data.message);
                            }
                            console.log(error.response.data);
                        });
                } else {
                    this.$swal('Cancelled', 'The Device still intact', 'info')
                }
            })
        }
    }
}
</script>