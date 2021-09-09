@extends('admin.master')

@section('content')
<div class="wrapper">

  <!-- Preloader -->
  <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__shake" src="/adminlte/dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60">
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
            <h1 class="m-0">Add Sub Categories</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Add Sub Categories</li>
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
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-chart-pie mr-1"></i>
                  Sub Categories
                </h3>
                <div class="card-tools">
                  <ul class="nav nav-pills ml-auto">
                    <li class="nav-item">
                      <a class="nav-link active" href="/products/sub-categories"  >VIEW SUB CATEGORY</a>
                    </li>
                     
                  </ul>
                </div>
              </div><!-- /.card-header -->
              <div class="card-body">
                <form action="/products/post-sub-categories" method="post" enctype="multipart/form-data">
				    @csrf
				    <table class="table table-bordered">
					<tbody>
				 
				    <tr>
						<td>Category</td>
						<td>
						    <select name="category_id" class="form-control" required>
						        <option value="">-:: Select Category ::-</option>
						        @foreach($categories as $category)
						            <option value="{{$category->id}}">{{$category->category_title}}</option>
						        @endforeach
						    </select>
						</td>
					</tr>
					
					<tr>
						<td>Sub Category Title</td>
						<td><input type="text" name="sub_category_title" required placeholder="Enter Category Title" class="form-control"></td>
					</tr>
					<tr>
						<td>Category Image</td>
						<td><input type="file" name="category_image" required placeholder="Category Image"></td>
					</tr>
					<tr>
						<td></td>
						<td><input type="submit" name="category_save" value="Save Sub Category" class="btn btn-primary"></td>
					</tr>
					</tbody>
				</table>
				</form>
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
  