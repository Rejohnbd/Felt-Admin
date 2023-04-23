<template>
    <form @submit.prevent="formSubmitHandler">
        <div class="form-group">
            <label for="vehicleTypeName">
                Vehicle Type Name<span class="text-danger">*</span>
            </label>
            <input 
                v-model="formModel.vehicle_type_name" 
                class="form-control" 
                id="vehicleTypeName"
                :class="{ 'is-invalid': submitForm && $v.formModel.vehicle_type_name.$error }"
                type="text" 
                required 
                placeholder="Enter Vehicle Type Name" 
            />
            <div v-if="submitForm && !$v.formModel.vehicle_type_name.required" class="invalid-feedback">
                Vehicle Type Name is required.
            </div>
        </div>
        <div class="form-group">
            <label for="deviceTypeConfigureText">
                Vehicle Type Image <span class="text-danger">*</span>
            </label>
            <div class="row">
                <div class="col-md-3">
                    <input  
                        type="file" 
                        accept="image/png" 
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
        <div class="form-group text-right m-b-0">
            <button class="btn btn-primary" type="submit" v-if="operation == 'create'">Submit</button>
            <button class="btn btn-primary" type="submit" v-if="operation == 'edit'">Update</button>
            <nuxt-link 
                to="/admin/setting/vehicle-type"
                class="btn btn-secondary m-l-5 ml-1"
            >Cancel</nuxt-link>
        </div>
    </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'VehicleTypeCreateEditForm',
    middleware: ['auth', 'auth-admin'],
    props: {
        operationType: String,
        operation: String
    },
    data() {
        return {
            preview: null,
            image: '',
            formModel: {
                vehicle_type_name: '',
            },
            submitForm: false,
            editImagePreview: false,
            editImage: ''
        }
    },
    validations: {
        formModel: {
            vehicle_type_name: {
                required
            }
        }
    },
    mounted() {
        this.$emit("mounted");
    },
    methods: {
        previewImage(event){
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
        async getVehicleTypeById() {
            try {
                await this.$axios.get("admin/vehicle-types/" + this.$route.params.id)
                    .then((response) => {
                        console.log(response);
                        if (response.status == 200) {
                            this.formModel = Object.assign({}, response.data.data);
                            // console.log(this.$config.BaseUrl + response.data.data.vehicle_type_image)
                            this.editImage = response.data.data.vehicle_type_image;
                            this.editImagePreview = true;
                        }
                    }).catch((error) => {
                        if (error.response.status == 404) {
                            this.$toast.error(error.response.data.message);
                            this.$router.push({
                                path: "/admin/setting/vehicle-type",
                            });
                        }
                        console.log(error.response.data);
                    });
            } catch (error) {
                this.$toast.error("Connection Error");
                console.log('Connection Error:', error);
            }
        },
        async formSubmitHandler() {
            this.submitForm = true;
            this.$v.$touch();
            if (!this.$v.$invalid) {
                if(this.$props.operation == 'create') {
                    if (this.image != "") {
                        let formData = new FormData();
                        formData.append('vehicle_type_name', this.formModel.vehicle_type_name);
                        formData.append('vehicle_type_image', this.image);

                        this.$emit("form-submitted", formData);
                    } else {
                        this.$toast.error('Vehicle Type Image is Required');
                    }
                } else {
                    let formData = new FormData();
                    formData.append("_method", "put");
                    formData.append('vehicle_type_name', this.formModel.vehicle_type_name);
                    formData.append('vehicle_type_image', this.image);
                    this.$emit("form-submitted", {id: this.formModel.id, data: formData});
                }
                this.submitForm = false;
            } else {
                return;
            }
        }
    }
}
</script>