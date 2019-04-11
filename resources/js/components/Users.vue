<template>
    <div class="container">

        <div class="row mt-5">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users</h3>

                        <div class="card-tools">
                            <button class="btn btn-primary" @click="addNewUser">Add New</button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <tbody><tr>
                                <th>ID</th>
                                <th>name</th>
                                <th>Type</th>
                                <th>Registered At</th>
                                <th>Modify</th>
                            </tr>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name }}</td>
                                <td>{{user.type | capFirstLetter}}</td>
                                <td>{{user.created_at | companyDateFormat}}</td>
                                <td>
                                    <a href="#" @click="editUser(user)">
                                        <i class="fa fa-edit"></i>
                                    </a>

                                    <a href="#" @click="deleteUser(user.id)" >
                                        <i class="fa fa-trash"></i>
                                    </a>

                                </td>
                            </tr>

                            </tbody></table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>

        <!-- User Modal -->

        <!-- Modal -->
        <div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <!-- Users form start here -->
                    <form @submit.prevent="createUser">

                    <div class="modal-body">

                        <div class="form-group">
                            <label>Name</label>
                            <input required v-model="form.name" type="text" name="name"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name"></has-error>
                        </div>

                        <div class="form-group">
                            <label>Email</label>
                            <input v-model="form.email" type="email" name="email"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <has-error :form="form" field="email"></has-error>
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input v-model="form.password" type="password" name="password"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                            <has-error :form="form" field="password"></has-error>
                        </div>

                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input v-model="form.password_confirmation" type="password" name="password_confirmation"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('password_confirmation') }">
                            <has-error :form="form" field="password_confirmation"></has-error>
                        </div>

                        <div class="form-group">
                            <label>Type</label>
                            <select v-model="form.type" type="text" id="type" name="type"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                <option value="">Select User role</option>
                                <option value="admin">Admin</option>
                                <option value="author">Author</option>
                                <option value="user">Standard User</option>
                            </select>
                            <has-error :form="form" field="type"></has-error>
                        </div>

                        <div class="form-group">
                            <label>Bio</label>
                            <textarea v-model="form.bio"  name="bio"
                                      class="form-control" :class="{ 'is-invalid': form.errors.has('type') }"></textarea>
                            <has-error :form="form" field="type"></has-error>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button :disabled="form.busy" type="submit" class="btn btn-primary">Create</button>
                    </div>

                    </form>

                </div>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        data(){
          return {
              users: {},
              form : new Form({
                  name:'',
                  email:'',
                  password:'',
                  password_confirmation:'',
                  type:'',
                  bio:'',
                  photo:''
              })
          }
        },
        methods: {

          addNewUser(){

            this.form.reset();
            $("#userModal").modal('show');


          },

          editUser(user){
              this.form.reset();
              this.form.fill(user);
              $("#userModal").modal('show');
          },

          deleteUser(id){


              Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                  if (result.value) {

                      this.form.delete("api/users/"+ id)
                          .then(() => {

                              Fire.$emit("loadUserEvent");

                              toast.fire({
                                  type:'success',
                                  title: "User Deleted Successfully"
                              });
                          })
                          .catch(() => {

                              toast.fire({
                                  type:'error',
                                  title: "Oops!! Fail to delete User"
                              });
                          })

                  }
              });




          },

          getUsers(){

              axios.get('api/users').then(( {data} ) => {this.users = data.data})
          },
          createUser(){
                this.$Progress.start();
                this.form.post('api/users')
                    .then((data) => {

                        Fire.$emit("loadUserEvent");

                        $('#userModal').modal('hide');

                        toast.fire({
                            type:'success',
                            title: "User Created Successfully"
                        });

                        this.$Progress.finish()

                    })
                    .catch((err) => {

                        this.$Progress.fail();

                        toast.fire({
                            type:'error',
                            title: "Fail to create user"
                        });



                     });




            }
        },
        created(){
            this.getUsers();

            Fire.$on("loadUserEvent",() => { this.getUsers()})
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
