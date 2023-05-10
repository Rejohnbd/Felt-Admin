<template>
    <form @submit.prevent="formSubmitHandler">
        <h5 class="mb-3 text-uppercase bg-light p-2">
            <i class="mdi mdi-account-circle mr-1"></i> Personal Info
        </h5>
        <div class="form-group">
            <div class="form-row">
                <div class="col-md-6">
                    <label for="userFirstName">
                        First Name<span class="text-danger">*</span>
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
                        Last Name
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
            </div>
        </div>

        <div class="form-group">
            <div class="form-row">
                <div class="col-12">
                    <label for="userAddress">
                        Customer Address <span class="text-danger">*</span>
                    </label>
                    <textarea 
                        v-model="formModel.address"
                        id="userAddress" 
                        class="form-control" 
                        :class="{ 'is-invalid': submitForm && $v.formModel.address.$error }"
                        rows="3"
                        required
                    ></textarea>
                    <div v-if="submitForm && $v.formModel.address.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.address.required">Address is Required</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label>
                Profile Image 
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
        <div class="text-right">
            <button type="submit" class="btn btn-success mt-2">
                Update
            </button>
        </div>
    </form>
</template>

<script>
    import { required } from 'vuelidate/lib/validators';

    export default {
        name: 'CustomerProfileEditForm',
        middleware: ['auth', 'auth-customer'],
        mounted() {
            this.$emit("mounted");
        },
        data() {
            return {
                preview: null,
                editImagePreview: false,
                editImage: '',
                image: '',
                formModel: {
                    first_name: '',
                    last_name: '',
                    email_optional: '',
                    phone_number: '',
                    phone_optional: '',
                    address: '',
                    user_status: ''
                },
                submitForm: false
            }
        },
        validations: {
            formModel: {
                first_name: {
                    required
                },
                address: {
                    required
                },
            }
        },
        methods: {
            async getUserProfile() {
                await this.$axios.get('customer/profile')
                    .then((response) => {
                        this.formModel = Object.assign({}, response.data.data);
                        if (response.data.data.image != 'default.png') {
                            this.editImage = response.data.data.image;
                            this.editImagePreview = true;
                        }
                    }).catch((error) => {
                        console.log(error)
                    });
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
            async formSubmitHandler() {
                this.submitForm = true;
                this.$v.$touch();
                console.log(this.formModel)
                if (!this.$v.$invalid) {
                    let formData = new FormData();
                    formData.append('first_name', this.formModel.first_name);
                    formData.append('last_name', this.formModel.last_name);
                    formData.append('email_optional', this.formModel.email_optional);
                    formData.append('phone_optional', this.formModel.phone_optional);
                    formData.append('address', this.formModel.address);
                    formData.append('image', this.image);
                    if (this.image != "") {
                        formData.append('image', this.image);
                    }
                    this.$emit("form-submitted", formData);
                    this.submitForm = false;
                } else {
                    return;
                }
            }
        }
    }
</script>