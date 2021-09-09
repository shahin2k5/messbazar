@extends('admin.master')

@section('content')
<div class="wrapper">

  <!-- Preloader -->
  <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__shake" src="/assets/images/mobile/logo.png" alt="MESSBAZAR" height="60" width="60">
  </div>

 
  @include('admin.navbar')
  @include('admin.sidebar')  
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Users</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Users</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          <div class="col-lg-12 col-6">
            <!-- small box -->
            
          </div>
          <!-- ./col -->
          
         
           
        </div><!-- /.row -->
		
        <!-- Main row -->
        <div class="row">
          <!-- Left col -->
          
          <section class="col-lg-12 connectedSortable">
             
            <!-- Custom tabs (Charts with tabs)-->
            <div class="card">
                 @if($errors->any())
                    {!! implode('', $errors->all('<div class="alert alert-warning alert-dismissible">
                        :message <button type="button" class="close" data-dismiss="alert">&times;</button>
                        </div>')) !!}
                 @endif
             
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-chart-pie mr-1"></i>
                  Users
                </h3>
                <div class="card-tools">
                  <ul class="nav nav-pills ml-auto">
                    <li class="nav-item">
                      <!--<a class="nav-link active" href="/products/add-categories"  >ADD CATEGORY</a>-->
                    </li>
                     
                  </ul>
                </div>
              </div><!-- /.card-header -->
              <div class="card-body">
				<table class="table table-bordered">
				    <thead>
				        <th>ID</th>
						<th>House/Mess</th>
						<th>User Details</th>
						<th>Address</th>
						<th>Meal Manager</th>
						<th>Rice Manager</th>
						<th>Sales</th>
						<th>Delete</th>
				    </thead>
					<tbody>
				@foreach($users as $user)
					<tr>
					
						<td>{{$user->id}}</td>
						<td>
						    {{$user->house_mess_name}}<br>
						    {{$user->user_type}}
						</td>
						<td>
						    {{$user->user_full_name}}<br>
						    {{$user->email}}<br>
						    {{$user->user_mobile}}
						</td>
						 
						<td>
						    {{$user->full_address}}<br>
						    {{$user->branch_name}}
						</td>
						 
						<td>
						    {{$user->current_meal_manager}}<br>
						    {{$user->current_meal_manager_mobile}}
						</td>
						<td>
						    {{$user->current_rice_manager}}<br>
						    {{$user->current_rice_manager_mobile}}
						</td>
					 
						<td width='100' align="center">
						    <a href="/user/sales/orders/{{$user->id}}" class="btn btn-success">
						        <i class="nav-icon fas fa-bars"></i>
						    </a>
						</td>
						<td width='100' align="center">
						    <a href="/users/delete-user/{{$user->id}}" class="btn btn-danger" onclick="return confirm('Do you want to delete user & sales!')">Delete</a>
						</td>
					</tr>
				@endforeach
					</tbody>
					<tfooter>
					    <th colspan='8'>{{$users->links()}}{{$users->total()}} </th>
					</tfooter>
				</table>
              </div><!-- /.card-body -->
            </div>
            <!-- /.card -->

         
		
          </section>
          <!-- /.Left col -->
          <!-- right col (We are only adding the ID to make the widgets sortable)-->
           
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  
  @include('admin.footer')

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->
@endsection
  