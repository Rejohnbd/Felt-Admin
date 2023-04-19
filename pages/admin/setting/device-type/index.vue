<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row mb-2">
            <div class="col-12">
                <nuxt-link to="/admin/setting/device-type/add" class="btn btn-primary waves-effect waves-light float-right"><i class="fe-plus mr-1"></i>Add New</nuxt-link>
            </div>
        </div>
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
                            <b-table :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered"></b-table>
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
export default {
    name: 'DeviceTypeListPage',
    middleware: ['auth', 'auth-admin'],
    data() {
        return {
            title: 'Device Type List',
            items: [{
                    text: 'Dashobard',
                    href: '#',
                },
                {
                    text: 'Setting',
                    href: '#'
                },
                {
                    text: 'Device List',
                    active: true,
                },
            ],
            tableData: [
                {
                    name: 'Lucinda Stickley',
                    position: 'Data Coordiator',
                    office: 'Sirnarasa',
                    age: 31,
                    date: '2018/07/29',
                    salary: '$13600'
                }, {
                    name: 'Henrietta Carsberg',
                    position: 'Data Coordiator',
                    office: 'Paninggaran',
                    age: 59,
                    date: '2019/07/13',
                    salary: '$13700'
                }, {
                    name: 'Phylys David',
                    position: 'Senior Developer',
                    office: 'New Glasgow',
                    age: 52,
                    date: '2019/04/08',
                    salary: '$15200'
                }, {
                    name: 'Brena Shivell',
                    position: 'Graphic Designer',
                    office: 'Caen',
                    age: 50,
                    date: '2018/12/14',
                    salary: '$15800'
                }, {
                    name: 'Carmon Tuiller',
                    position: 'Marketing Assistant',
                    office: 'Jiangbei',
                    age: 46,
                    date: '2019/06/19',
                    salary: '$12800'
                }, {
                    name: 'Tina Strattan',
                    position: 'Account Representative III',
                    office: 'São Miguel da Carreira',
                    age: 31,
                    date: '2019/07/08',
                    salary: '$13900'
                }, {
                    name: 'Jon Tarbox',
                    position: 'Senior Cost Accountant',
                    office: 'Ryazhsk',
                    age: 61,
                    date: '2019/02/22',
                    salary: '$16000'
                }, {
                    name: 'Carmine Hollibone',
                    position: 'Assistant Manager',
                    office: 'Punta del Este',
                    age: 50,
                    date: '2019/04/23',
                    salary: '$15000'
                }, {
                    name: 'Cora Germann',
                    position: 'Automation Specialist III',
                    office: 'Heshui',
                    age: 47,
                    date: '2019/03/27',
                    salary: '$11300'
                }, {
                    name: 'Dawna Hillyatt',
                    position: 'Biostatistician I',
                    office: 'Suresnes',
                    age: 37,
                    date: '2018/12/02',
                    salary: '$14800'
                }, {
                    name: 'Natty Casini',
                    position: 'Senior Developer',
                    office: 'Pucallpa',
                    age: 31,
                    date: '2018/08/19',
                    salary: '$11900'
                }, {
                    name: 'Vittorio Lauder',
                    position: 'Developer II',
                    office: 'Tønsberg',
                    age: 54,
                    date: '2018/12/10',
                    salary: '$16200'
                }, {
                    name: 'Chery Cardenas',
                    position: 'Senior Developer',
                    office: 'Santo Tomas',
                    age: 26,
                    date: '2018/12/07',
                    salary: '$11100'
                }, {
                    name: 'Hilde McFfaden',
                    position: 'Senior Financial Analyst',
                    office: 'Cruz',
                    age: 43,
                    date: '2018/11/05',
                    salary: '$14100'
                }, {
                    name: 'Siward Kindred',
                    position: 'Office Assistant III',
                    office: 'Béziers',
                    age: 39,
                    date: '2018/09/26',
                    salary: '$15500'
                }
        ],
        totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: 'age',
            sortDesc: false,
            fields: [{
                key: 'name',
                sortable: true
            },
            {
                key: 'position',
                sortable: true
            },
            {
                key: 'office',
                sortable: true
            },
            {
                key: 'age',
                sortable: true
            },
            {
                key: 'date',
                sortable: true
            },
            {
                key: 'salary',
                sortable: true
            },
            ],
        }
    },
    head: {
        titleTemplate: '%s Device List',
    },
    created() {
        this.getAllDeviceType();
        // this.$axios.get('all-users').then((response) => {
        //     console.log(response)
        // }).catch((error) => {
        //     console.log(error)
        // })
    },
    methods: {
        async getAllDeviceType() {
            await this.$axios.get('admin/device-types').then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>