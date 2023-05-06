<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row mb-2">
            <div class="col-12">
                <nuxt-link to="/admin/users/add" class="btn btn-primary waves-effect waves-light float-right"><i class="fe-plus mr-1"></i>Add New</nuxt-link>
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
                                :filter="filter" 
                                :filter-included-fields="filterOn"
                            >
                                <template v-slot:cell(user_name)="items">
                                    {{ items.item.user_details.first_name }} {{ items.item.user_details.last_name }}
                                </template>
                                <template v-slot:cell(user_email)="items">
                                    {{ items.item.email }}{{ items.item.user_details.email_optional ? `, ${items.item.user_details.email_optional}` : '' }}
                                </template>
                                <template v-slot:cell(phone_number)="items">
                                    {{ items.item.user_details.phone_number }}{{ items.item.user_details.phone_optional ? `, ${items.item.user_details.phone_optional}` : '' }}
                                </template>
                                <template v-slot:cell(user_status)="items">
                                    <span class="badge badge-soft-danger" v-if="items.item.user_status == 0">Inactive</span>
                                    <span class="badge badge-soft-success" v-if="items.item.user_status == 1">Active</span>
                                    <span class="badge badge-soft-warning" v-if="items.item.user_status == 2">Suspended</span>
                                </template>
                                <template v-slot:cell(user_created_by)="items">
                                    {{ items.item.created_by_user.user_details.first_name }} {{ items.item.created_by_user.user_details.last_name }} <br/>
                                    {{ items.item.created_by_user.email }}
                                </template>
                                <template v-slot:cell(action)="items">
                                    <div class="button-list">
                                        <nuxt-link 
                                            :to="`/admin/users/${items.item.id}/edit`" 
                                            v-b-tooltip.hover 
                                            :title="`Edit User ${items.item.user_details.first_name} ${items.item.user_details.last_name ? items.item.user_details.last_name : ''}`" 
                                            class="btn btn-sm btn-purple"
                                        >
                                            <i class="mdi mdi-circle-edit-outline"></i>
                                        </nuxt-link>
                                        <button 
                                            v-b-tooltip.hover 
                                            :title="`Delete User ${items.item.user_details.first_name} ${items.item.user_details.last_name ? items.item.user_details.last_name : ''}`" 
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
    name: 'UserListPage',
    middleware: ['auth', 'auth-admin'],
    components: {
        Loading
    },
    data() {
        return {
            title: 'User List',
            items: [
                {
                    text: 'Dashobard',
                    href: '/admin/dashboard/sales',
                },
                {
                    text: 'User List',
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
            // sortBy: ['device_imei', 'device_sim'],
            sortDesc: false,
            fields: [
                {
                    label: 'User Name',
                    key: 'user_name',
                    sortable: true
                },
                {
                    label: 'User Type',
                    key: 'user_role.name',
                    sortable: true
                },
                {
                    label: 'User Email',
                    key: 'user_email',
                    sortable: true
                },
                {
                    label: 'User Phone',
                    key: 'phone_number',
                    sortable: true,
                },
                {
                    label: 'Employee of',
                    key: 'user_details.company_name',
                },
                {
                    label: 'User Status',
                    key: 'user_status',
                    sortable: true,
                },
                {
                    label: 'User Create',
                    key: 'user_created_by',
                    sortable: true
                },
                {
                    key: 'action',
                },
            ],
        }
    },
    head: {
        titleTemplate: '%s User List',
    },
    computed: {
        rows() {
            return this.tableData.length
        }
    },
    created() {
        this.getAllUsers();
    },
    methods: {
        async getAllUsers() {
            await this.$axios.get('admin/users')
                .then((response) => {
                    this.loading = true;
                    this.tableData = response.data.data
                    console.log(this.tableData)
                    this.loading = false;
                }).catch((error) => {
                    console.log(error)
                });
        },
        async deleteHandler(deleteId) {
            console.log(deleteId);
            // this.$swal({
            //     title: 'Are you sure?',
            //     text: 'You can\'t revert your action',
            //     type: 'warning',
            //     showCancelButton: true,
            //     confirmButtonText: 'Yes Delete it!',
            //     cancelButtonText: 'No, Keep it!',
            //     showCloseButton: true,
            //     showLoaderOnConfirm: true
            // }).then((result) => {
            //     if (result.value) {
            //         this.$axios.delete(`admin/devices/${deleteId}`)
            //             .then((response) => {
            //                 if (response.status == 202) {
            //                     this.getAllDevices();
            //                     this.$swal('Deleted', response.data.message, 'success')
            //                 }
            //             }).catch((error) => {
            //                 if (error.response.status == 404) {
            //                     this.$toast.error(error.response.data.message);
            //                 }
            //                 console.log(error.response.data);
            //             });
            //     } else {
            //         this.$swal('Cancelled', 'The Device still intact', 'info')
            //     }
            // });
        }
    }
}
</script>