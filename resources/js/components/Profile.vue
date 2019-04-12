<style>

    .widget-user-header{
        background-position: center center;
        background-size: cover;
        height:250px !important;
    }

</style>

<template>
    <div class="container">
        <div class="row justify-content-center mt-3">
            <div class="col-md-12">
                <div class="card card-widget widget-user">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header text-white" style="background: url('./img/user-cover.png')">
                        <h3 class="widget-user-username">Elizabeth Pierce</h3>
                        <h5 class="widget-user-desc">Web Designer</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle" :src="getProfileUrl()" alt="User Avatar">
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">3,200</h5>
                                    <span class="description-text">SALES</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">13,000</h5>
                                    <span class="description-text">FOLLOWERS</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4">
                                <div class="description-block">
                                    <h5 class="description-header">35</h5>
                                    <span class="description-text">PRODUCTS</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                </div>
            </div>
        </div>

        <div class="row justify-content-center mt-3">
            <div class="col-md-12">
            <div class="card">
                <div class="card-header p-2">
                    <ul class="nav nav-pills">
                        <li class="nav-item"><a class="nav-link" href="#activity" data-toggle="tab">Activity</a></li>
                        <li class="nav-item"><a class="nav-link active show" href="#settings" data-toggle="tab">Settings</a></li>
                    </ul>
                </div><!-- /.card-header -->
                <div class="card-body">
                    <div class="tab-content">
                        <div class="tab-pane" id="activity">

                        <h3>Display User Activity</h3>



                        </div>


                        <div class="tab-pane active show" id="settings">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label for="name" class="col-sm-2 control-label">Name</label>

                                    <div class="col-sm-10">
                                        <input type="text" v-model="form.name" class="form-control" :class="{ 'is-invalid': form.errors.has('name') }"
                                               id="name" placeholder="Name">

                                        <has-error :form="form" field="name"></has-error>
                                    </div>


                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-sm-2 control-label">Email</label>

                                    <div class="col-sm-10">
                                        <input type="email" v-model="form.email"  class="form-control" :class="{ 'is-invalid': form.errors.has('email') }"
                                               id="email" placeholder="Email">
                                        <has-error :form="form" field="email"></has-error>
                                    </div>


                                </div>

                                <div class="form-group">
                                    <label for="bio" class="col-sm-2 control-label">Experience</label>

                                    <div class="col-sm-10">
                                        <textarea class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"
                                                  v-model="form.bio" id="bio" placeholder="Experience"></textarea>
                                        <has-error :form="form" field="bio"></has-error>
                                    </div>



                                </div>
                                <div class="form-group">
                                    <label for="photo" class="col-sm-2 control-label">Profile photo</label>

                                    <div class="col-sm-10">
                                        <input type="file" @change="grabPhoto" style="border:none;padding-left: 0px" class="form-control" id="photo" >
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="password"  class="col-sm-10 control-label">Password ( Leave empty if not changing )</label>

                                    <div class="col-sm-10">
                                        <input type="password" v-model="form.password" class="form-control"
                                               :class="{ 'is-invalid': form.errors.has('password') }" id="password" >
                                        <has-error :form="form" field="password"></has-error>
                                    </div>


                                </div>

                                <div class="form-group">
                                    <div class="col-sm-offset-2 col-sm-10">
                                        <button @click.prevent="üpdateProfile()" type="submit" class="btn btn-success">Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!-- /.tab-pane -->
                    </div>
                    <!-- /.tab-content -->
                </div><!-- /.card-body -->
            </div>
        </div>
       </div>
    </div>
</template>

<script>
    export default {
        data() {

            return {

                photoUrl: '',

                form : new Form({
                    id:'',
                    name:'',
                    email:'',
                    password:'',
                    type:'',
                    bio:'',
                    photo:''
                })
            }
        },

        methods: {

            getProfileUrl(){


               return this.photoUrl;


            },

            grabPhoto(element)
            {
                let file = element.target.files[0];


                if(file['size'] < 2097152) {

                    //this.photoUrl = file['name'];

                    let reader = new FileReader();
                    reader.onloadend = () => {

                        this.form.photo = reader.result;
                    };
                    reader.readAsDataURL(file);
                }
                else
                {

                    Swal.fire({
                        title: 'Image Upload Error',
                        text: "Uploaded image cannot be more than 2M in size",
                        type: 'error',
                    });
                }
            },

            üpdateProfile()
            {
                this.$Progress.start();

                this.form.put('api/profile')
                    .then(({data}) => {

                        console.log(data);

                        this.photoUrl = "img/profile/" + data.data.photo;

                        toast.fire({
                            type:'success',
                            title: "Update was Successfully"
                        });

                        this.$Progress.finish();
                    })
                    .catch((err) => {

                        toast.fire({
                            type:'success',
                            title: "Fail to update info."
                        });

                        this.$Progress.fail();
                    });
            }
        },

        created() {
            axios.get("api/profile")
                .then(({data}) => {

                    this.form.fill(data);

                    this.photoUrl = "img/profile/" + data.photo;


                })
                .catch((err) => {
                    console.log("error",err);
                });
        },

        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
