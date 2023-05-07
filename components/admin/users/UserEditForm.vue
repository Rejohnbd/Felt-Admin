<template>
    <form @submit.prevent="formSubmitHandler">
        <div class="form-group">
            <div class="form-row">
                <div class="col-md-6">
                    <label for="userFirstName">
                        User First Name<span class="text-danger">*</span>
                    </label>
                    <input 
                        v-model="formModel.first_name" 
                        class="form-control" 
                        id="userFirstName"
                        :class="{ 'is-invalid': submitForm && $v.formModel.first_name.$error }"
                        type="text" 
                        required 
                        placeholder="Enter User First Name" 
                    />
                    <div v-if="submitForm && $v.formModel.first_name.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.first_name.required">User First Name is required</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="userLastName">
                        User Last Name
                    </label>
                    <input 
                        v-model="formModel.last_name" 
                        class="form-control" 
                        id="userLastName"
                        type="text"
                        placeholder="Enter User Last Name" 
                    />
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-row">
                <div class="col-md-4">
                    <label for="userEmail">
                        User Email<span class="text-danger">*</span>
                    </label>
                    <input 
                        v-model="formModel.email" 
                        class="form-control" 
                        id="userEmail"
                        :class="{ 'is-invalid': submitForm && $v.formModel.email.$error }"
                        type="email" 
                        required 
                        placeholder="Enter User Email" 
                    />
                    <div v-if="submitForm && $v.formModel.email.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.email.required">User Email is required</span>
                        <span v-if="!$v.formModel.email.email">Must be a Valid Email</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="userPhone">
                        User Phone<span class="text-danger">*</span>
                    </label>
                    <input 
                        v-model="formModel.phone_number" 
                        class="form-control" 
                        id="userPhone"
                        :class="{ 'is-invalid': submitForm && $v.formModel.phone_number.$error }"
                        type="number"
                        required
                        placeholder="Enter User Phone" 
                    />
                    <div v-if="submitForm && $v.formModel.phone_number.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.phone_number.required">User Phone is required</span>
                        <span v-if="!$v.formModel.phone_number.numeric">Provide Valid Phone Number.</span>
                        <span v-if="!$v.formModel.phone_number.minLength">Phone Number not Less than 11.</span>
                        <span v-if="!$v.formModel.phone_number.maxLength">Phone Number not Greater than 11.</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="userPassword">
                        User Password
                    </label>
                    <div class="input-group input-group-merge">
                        <input 
                            v-model="formModel.password" 
                            class="form-control" 
                            id="userPassword"
                            :type="`${showPassword ? 'text' : 'password'}`" 
                            placeholder="Enter User Password" 
                        />
                        <div class="input-group-append" data-password="false" @click="passwordShow">
                            <div class="input-group-text">
                                <span :class="{ 'fas fa-eye': showPassword, 'fas fa-eye-slash': !showPassword }"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="userRoles">
                Select User Role<span class="text-danger">*</span>
            </label>
            <multiselect 
                v-model="formModel.user_role" 
                track-by="id" 
                label="name" 
                for="userRoles"
                :options="userRoles"
                placeholder="Select User Role" 
                :allow-empty="false"
                :class="{ 'is-invalid': submitForm && $v.formModel.user_role.$error }"
                @select="userRoleHandler()"
            />
            <div v-if="submitForm && $v.formModel.user_role.$error" class="invalid-feedback">
                <span v-if="!$v.formModel.user_role.required">User Role is required</span>
            </div>
        </div>
        <div class="form-group" v-if="selectedUserType == 'driver'">
            <label for="selectCustomer">
                Select Customer<span class="text-danger">*</span>
            </label>
            <multiselect 
                v-model="formModel.customer" 
                track-by="id" 
                label="email" 
                for="selectCustomer"
                :options="customerUsers"
                :custom-label="nameWithPhoneEmail"
                placeholder="Select Customer" 
                :allow-empty="false"
                
            >
            </multiselect>
        </div>
        <div class="form-group" v-if="selectedUserType == 'employee'">
            <div class="form-row">
                <div class="col-md-6">
                    <label for="companyName">
                        Company Name<span class="text-danger">*</span>
                    </label>
                    <input 
                        v-model="formModel.company_name" 
                        class="form-control" 
                        id="companyName"
                        
                        type="text" 
                        required 
                        placeholder="Enter Company Name" 
                    />
                </div>
                <div class="col-md-6">
                    <label for="designation">
                        Designation<span class="text-danger">*</span>
                    </label>
                    <input 
                        v-model="formModel.designation" 
                        class="form-control" 
                        id="designation"
                        :class="{ 'is-invalid': submitForm && $v.formModel.designation.$error }"
                        type="text" 
                        required 
                        placeholder="Enter Designation" 
                    />
                    <div v-if="submitForm && $v.formModel.designation.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.designation.required">Designation is Required.</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group" v-if="selectedUserType == 'customer' || selectedUserType == 'employee'">
            <div class="form-row">
                <div class="col-md-6">
                    <label for="emailOptional">
                        Email Optional
                    </label>
                    <input 
                        v-model="formModel.email_optional" 
                        class="form-control" 
                        id="emailOptional"
                        type="email"
                        placeholder="Enter Optional Email" 
                    />
                </div>
                <div class="col-md-6">
                    <label for="optionalPhoneNumber">
                        Phone Number Optional
                    </label>
                    <input 
                        v-model="formModel.phone_optional" 
                        class="form-control" 
                        id="optionalPhoneNumber"
                        
                        type="number" 
                        placeholder="Enter Optional Phone Number" 
                    />
                </div>
            </div>
        </div>
        <div class="form-group" v-if="selectedUserType == 'customer'">
            <div class="form-row">
                <div class="col-md-12">
                    <label for="userAddress">
                        Customer Address <span class="text-danger">*</span>
                    </label>
                    <textarea 
                        v-model="formModel.address"
                        id="userAddress" 
                        class="form-control" 
                        rows="3"
                        required
                    ></textarea>
                </div>
            </div>
        </div>
        <div class="form-group" v-if="selectedUserType == 'customer'">
            <div class="form-row">
                <div class="col-md-6">
                    <label for="userReference">
                        Customer Reference
                    </label>
                    <textarea 
                        id="userReference" 
                        class="form-control" 
                        rows="2"
                        v-model="formModel.reference"
                    ></textarea>
                </div>
                <div class="col-md-6">
                    <label for="userNotes">
                        Customer Notes
                    </label>
                    <textarea 
                        id="userNotes" 
                        class="form-control" 
                        rows="2"
                        v-model="formModel.notes"
                    ></textarea>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="deviceTypeConfigureText">
                User Image 
            </label>
            <div class="row">
                <div class="col-md-3">
                    <input  
                        type="file" 
                        accept="image/jpeg, image/png, image/jpg" 
                        class="form-control" 
                        @change="previewImage" 
                    />
                </div>
                <div class="col-md-9  text-center">
                    <template v-if="preview">
                        <span class="b-avatar badge-secondary rounded-0" style="width: 9em; height: 9em;">
                            <span class="b-avatar-img"><img :src="preview" alt="image"></span>
                        </span>
                        <p class="mb-0"><code>size: {{ image.size / 1024 }}KB</code></p>
                    </template>
                    <template v-if="editImagePreview">
                        <span class="b-avatar badge-secondary rounded-0" style="width: 9em; height: 9em;">
                            <span class="b-avatar-img"><img :src="$config.BaseUrl + editImage" alt="image"></span>
                        </span>
                    </template>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="userStatus">
                User Status <span class="text-danger">*</span>
            </label>
            <select 
                v-model="formModel.user_status" 
                required
                for="userStatus"
                class="form-control"
                :class="{ 'is-invalid': submitForm && $v.formModel.user_status.$error }"
            >
                <option value="">Select User Status</option>
                <option value="1">Active</option>
                <option value="2">Suspended</option>
                <option value="0">Inactive</option>
            </select>
            <div v-if="submitForm && $v.formModel.user_status.$error" class="invalid-feedback">
                <span v-if="!$v.formModel.user_status.required">User Status is required</span>
                <span v-if="!$v.formModel.user_status.numeric">Select Valid User Status</span>
            </div>
        </div>
        
        <div class="form-group text-right m-b-0">
            <button class="btn btn-primary" type="submit" v-if="operation == 'create'" :disabled="submitLoading">
                <b-spinner class="mr-2" small v-if="submitLoading"></b-spinner> Submit
            </button>
            <button class="btn btn-primary" type="submit" v-if="operation == 'edit'" :disabled="submitLoading">
                <b-spinner class="mr-2" small v-if="submitLoading"></b-spinner> Update
            </button>
            <nuxt-link 
                to="/admin/users"
                class="btn btn-secondary m-l-5 ml-1"
            >Cancel</nuxt-link>
        </div>
    </form>
</template>

<script>
import { 
    required, 
    email, 
    numeric, 
    minLength, 
    maxLength
} from 'vuelidate/lib/validators';
import Multiselect from 'vue-multiselect';
import Loading from '@/components/common/Loading.vue';

export default {
    name: 'UserCreateEdit',
    middleware: ['auth', 'auth-admin'],
    props: {
        operation: String,
        submitLoading: Boolean
    },
    components: {
        Multiselect,
        Loading
    },
    data() {
        return {
            userRoles: [],
            customerUsers: [],
            showPassword: false,
            preview: null,
            editImagePreview: false,
            editImage: '',
            image: '',
            selectedUserType: '',
            formModel: {
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                password: '12345678',
                user_role: '',
                customer: '',
                email_optional: '',
                phone_optional: '',
                company_name: '',
                designation: '',
                address: '',
                reference: '',
                notes: '',
                user_status: ''
            },
            passwordRequired: true,
            submitForm: false,
        }
    },
    validations: {
        formModel: {
            first_name: {
                required
            },
            email: {
                required, email
            },
            phone_number: {
                required, numeric, minLength: minLength(11), maxLength: maxLength(11)
            },
            // password: {
            //     required, 
            //     minLength: minLength(8)
            // },
            user_role: {
                required
            },
            user_status: {
                required, numeric
            }
        }
    },
    mounted() {
        this.$emit("mounted");
    },
    methods: {
        async getUserRoles() {
            await this.$axios.get('admin/user-roles').then((response) => {
                // this.$nuxt.$loading.start();
                this.userRoles = response.data.data;
                // this.$nuxt.$loading.finish();
            }).catch((error) => {
                console.log(error)
            })
        },
        async getCustomerUsers() {
            await this.$axios.get('admin/customer-users').then((response) => {
                // this.$nuxt.$loading.start();
                this.customerUsers = response.data.data;
                // console.log(this.customerUsers)
                // this.$nuxt.$loading.finish();
            }).catch((error) => {
                console.log(error)
            })
        },
        async getcustomerById() {
            await this.$axios.get('admin/users/'+ this.$route.params.id)
                .then((response) => {
                    if (response.status == 200) {
                        this.selectedUserType = response.data.data.user_role.slug;
                        this.formModel = Object.assign({}, response.data.data, response.data.data.user_details, );
                        this.passwordRequired = false;
                    }
                }).catch((error) => {
                    if (error.response.status == 404) {
                        this.$toast.error(error.response.data.message);
                        this.$router.push({
                            path: "/admin/devices",
                        });
                    }
                    console.log(error.response.data);
                });
        },
        passwordShow(){
            this.showPassword = !this.showPassword;
        },
        previewImage(event) {
            var input = event.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.editImagePreview = false;
                    this.preview = e.target.result;
                }
                this.image = input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },
        userRoleHandler(){
            this.selectedUserType = this.formModel.user_role.slug;
        },
        nameWithPhoneEmail({email, user_details}) {
            return `${user_details.first_name} ${user_details.last_name != null ? user_details.last_name : ''} - ${email} - ${user_details.phone_number}`;
        },
        async formSubmitHandler() {
            this.submitForm = true;
            this.$v.$touch();
            if (!this.$v.$invalid) {
                let formData = new FormData();
                if(this.formModel.password != undefined && this.formModel.password != ''){
                    formData.append('password', this.formModel.password);
                } 
                if (this.formModel.customer != undefined && this.formModel.customer != '') {
                    formData.append('customer', this.formModel.customer.id);
                }
                formData.append('first_name', this.formModel.first_name);
                formData.append('last_name', this.formModel.last_name);
                formData.append('email', this.formModel.email);
                formData.append('phone_number', this.formModel.phone_number);
                formData.append('user_role', this.formModel.user_role.id);
                formData.append('email_optional', this.formModel.email_optional);
                formData.append('phone_optional', this.formModel.phone_optional);
                formData.append('company_name', this.formModel.company_name);
                formData.append('designation', this.formModel.designation);
                formData.append('address', this.formModel.address);
                formData.append('reference', this.formModel.reference);
                formData.append('notes', this.formModel.notes);
                formData.append('image', this.image);
                formData.append('user_status', this.formModel.user_status);
                formData.append('id', this.formModel.id);
                this.$emit("form-submitted", formData);
                this.submitForm = false;
            } else {
                return;
            }
        }
    }
}
</script>