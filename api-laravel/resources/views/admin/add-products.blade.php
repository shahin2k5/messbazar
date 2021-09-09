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
            <h1 class="m-0">Products</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Add Products</li>
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
                  Products
                </h3>
                <div class="card-tools">
                  <ul class="nav nav-pills ml-auto">
                    <li class="nav-item">
                      <a class="nav-link active" href="/products/categories"  >VIEW PRODUCTS</a>
                    </li>
                     
                  </ul>
                </div>
              </div><!-- /.card-header -->
              <div class="card-body">
                <form action="/products/post-products" method="post" enctype="multipart/form-data">
				    @csrf
				    <table class="table table-bordered">
					<tbody>
				 
				 
					<tr>
						<td>Product Title</td>
						<td><input type="text" name="product_title"  placeholder="Enter Product Title" class="form-control"></td>
					</tr>
					
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
						<td>Sub Category</td>
						<td>
						    <select name="subcategory_id" class="form-control" required>
						        <option value="">-:: Select Sub Category ::-</option>
						        @foreach($sub_categories as $category)
						            <option value="{{$category->id}}">{{$category->category_title}}</option>
						        @endforeach
						    </select>
						</td>
					</tr>
					
					<tr>
						<td>Product Image</td>
						<td><input type="file" name="product_image" placeholder="Product Image" required></td>
					</tr>
					
					<tr>
						<td>Short Description</td>
						<td><input type="text" name="short_description" required placeholder="Enter Product Short Description" class="form-control" multiline=true></td>
					</tr>
					
					<tr>
						<td>Unit Type</td>
						<td>
						    <select name="unit_type" class="form-control" required>
						        <option value="">-::Select Unit Type::-</option>
						        <option value="PCS">PCS</option>
						        <option value="KGS">KGS</option>
						        <option value="BAG">BAG</option>
						         
						    </select>
						</td>
					</tr>
					
				 
					
					<tr>
						<td>Purchase Price</td>
						<td><input type="text" name="purchase_price" required placeholder="Enter Purchase Price" class="form-control"></td>
					</tr>
					
					
					<tr>
						<td>Sale Price</td>
						<td><input type="text" name="sale_price" required placeholder="Enter Sale Price" class="form-control"></td>
					</tr>
					
					
					<tr>
						<td>Discount</td>
						<td><input type="text" name="discount_price"  placeholder="Enter Discount Price" class="form-control"></td>
					</tr>
					
					
					<tr>
						<td>Final Sale Price</td>
						<td><input type="text" name="final_sale_price" required  placeholder="Enter Final Sale Price" class="form-control"></td>
					</tr>
					
					
					<tr>
						<td>View in Hot Products </td>
						<td><input type="checkbox" value="1" name="hot_product" class="form-control"></td>
					</tr>
					
					<tr>
						<td>View in New Arrival </td>
						<td><input type="checkbox" value="1"  name="new_arrival"  class="form-control"></td>
					</tr>
					
					<tr>
						<td>View in Discount Product </td>
						<td><input type="checkbox" value="1"  name="discount_product" class="form-control"></td>
					</tr>
					
					<tr>
						<td>Show PCS Box </td>
						<td><input type="checkbox" value="1"  name="show_pcs_box"    class="form-control"></td>
					</tr>
					
					
					
					<tr>
						<td></td>
						<td><input type="submit" name="product_save" value="Save Product" class="btn btn-primary"></td>
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
  