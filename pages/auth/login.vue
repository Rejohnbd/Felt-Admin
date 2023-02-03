<template>
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
                <div class="card-body p-4">
                    <div class="text-center w-75 m-auto">
                        <div class="auth-logo">
                            <nuxt-link to="/" class="logo logo-dark text-center">
                                <span class="logo-lg">
                                    <img src="~/assets/images/logo-dark.png" alt height="22" />
                                </span>
                            </nuxt-link>

                            <nuxt-link to="/" class="logo logo-light text-center">
                                <span class="logo-lg">
                                    <img src="~/assets/images/logo-light.png" alt height="22" />
                                </span>
                            </nuxt-link>
                        </div>
                        <p class="text-muted mb-4 mt-3">Enter your Email Address and Password to Access Admin Panel.</p>
                    </div>

                    <form action="#">
                        <div class="form-group mb-3">
                            <label for="emailaddress">Email address</label>
                            <input id="emailaddress" class="form-control" type="email" required
                                placeholder="Enter your email" />
                        </div>

                        <div class="form-group mb-3">
                            <label for="password">Password</label>
                            <div class="input-group input-group-merge">
                                <input id="password" type="password" class="form-control"
                                    placeholder="Enter your password" />
                                <div class="input-group-append" data-password="false">
                                    <div class="input-group-text">
                                        <span class="password-eye"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group mb-0 text-center">
                            <button class="btn btn-primary btn-block" type="submit">Log In</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-12 text-center">
                    <p>
                        <nuxt-link to="/auth/recoverpwd" class="text-muted ml-1">Forgot your password?</nuxt-link>
                    </p>
                    <p class="text-muted">
                        Home
                        <nuxt-link to="/" class="text-primary font-weight-medium ml-1">Home</nuxt-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    layout: "auth",
    data() {
        return {};
    },
    head() {
        return {
            title: `Login | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
};
</script>