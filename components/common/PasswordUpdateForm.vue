<template>
    <form @submit.prevent="formSubmitHandler">
        <h5 class="mb-3 text-uppercase bg-light p-2">
            <i class="mdi mdi-account-circle mr-1"></i> Password Update
        </h5>
        <div class="form-group">
            <div class="form-row">
                <div class="col-md-12">
                    <label for="userOld">
                        Old Password<span class="text-danger">*</span>
                    </label>
                    <input 
                        v-model="formModel.old_password" 
                        class="form-control" 
                        id="userOld"
                        :class="{ 'is-invalid': submitForm && $v.formModel.old_password.$error }"
                        type="password" 
                        required 
                        placeholder="Enter Old Password" 
                    />
                    <div v-if="submitForm && $v.formModel.old_password.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.old_password.required">Old Password required</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-row">
                <div class="col-md-12">
                    <label for="userNewPassword">
                        New Password<span class="text-danger">*</span>
                    </label>
                    <input 
                        v-model="formModel.new_password" 
                        class="form-control" 
                        id="userNewPassword"
                        :class="{ 'is-invalid': submitForm && $v.formModel.new_password.$error }"
                        type="password" 
                        required 
                        placeholder="Enter New Password" 
                    />
                    <div v-if="submitForm && $v.formModel.new_password.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.new_password.required">New Password is require</span>
                        <span v-if="!$v.formModel.new_password.minLength">Password Minimum Length 8</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-row">
                <div class="col-md-12">
                    <label for="userConfirmPassword">
                        Confirm Password<span class="text-danger">*</span>
                    </label>
                    <input 
                        v-model="formModel.confirm_new_password" 
                        class="form-control" 
                        id="userConfirmPassword"
                        :class="{ 'is-invalid': submitForm && $v.formModel.confirm_new_password.$error }"
                        type="password" 
                        required 
                        placeholder="Enter Confirm Password" 
                    />
                    <div v-if="submitForm && $v.formModel.confirm_new_password.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.confirm_new_password.required">Confirm Password is require</span>
                        <span v-if="!$v.formModel.confirm_new_password.minLength">Password Minimum Length 8</span>
                    </div>
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
    import { required, minLength } from 'vuelidate/lib/validators';

    export default {
        name: 'PasswordUpdateForm',
        middleware: ['auth'],
        mounted() {
            // this.$emit("mounted");
        },
        data() {
            return {
                formModel: {
                    old_password: '',
                    new_password: '',
                    confirm_new_password: ''
                },
                submitForm: false
            }
        },
        validations: {
            formModel: {
                old_password: {
                    required,
                },
                new_password: {
                    required,
                    minLength: minLength(8)
                },
                confirm_new_password: {
                    required,
                    minLength: minLength(8)
                }
            }
        },
        methods: {
            formSubmitHandler() {
                this.submitForm = true;
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$emit("form-submitted", this.formModel);
                    this.submitForm = false;
                } else {
                    return;
                }
            }
        }
    }
</script>