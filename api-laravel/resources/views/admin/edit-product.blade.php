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
                  Edit Products
                </h3>
                <div class="card-tools">
                  <ul class="nav nav-pills ml-auto">
                    <li class="nav-item">
                      <a class="nav-link active" href="/products/products"  >VIEW PRODUCTS</a>
                    </li>
                     
                  </ul>
                </div>
              </div><!-- /.card-header -->
              <div class="card-body">
                <form action="/products/post-edit-products" method="post" enctype="multipart/form-data">
				    @csrf
				    <table class="table table-bordered">
					<tbody>
				 
				 
					<tr>
						<td>Product Title</td>
						<td>
						    <input type="hidden" name="product_id" value="{{$product->id}}" required  class="form-control">
						    <input type="text" name="product_title" value="{{$product->product_title}}"  placeholder="Enter Product Title" class="form-control">
						</td>
					</tr>
					
					<tr>
						<td>Category</td>
						<td>
						    <select name="category_id" class="form-control" required>
						        <option value="{{$product->category_id}}">{{$product->category_id}}</option>
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
						        <option value="{{$product->subcategory_id}}">{{$product->subcategory_id}}</option>
						        @foreach($sub_categories as $category)
						            <option value="{{$category->id}}">{{$category->category_title}}</option>
						        @endforeach
						    </select>
						</td>
					</tr>
					
					<tr>
						<td>Product Image</td>
						<td><input type="file" name="product_image" value="{{$product->subcategory_id}}" placeholder="Product Image"></td>
					</tr>
					
					<tr>
						<td>Short Description</td>
						<td><input type="text" name="short_description" value="{{$product->short_description}}" required placeholder="Enter Product Short Description" class="form-control" multiline=true></td>
					</tr>
					
					<tr>
						<td>Unit Type</td>
						<td>
						    <select name="unit_type" class="form-control" required>
						        <option value="{{$product->unit_type}}">{{$product->unit_type}}</option>
						        <option value="PCS">PCS</option>
						        <option value="KGS">KGS</option>
						        <option value="BAG">BAG</option>
						         
						    </select>
						</td>
					</tr>
					
				 
					
					<tr>
						<td>Purchase Price</td>
						<td><input type="text" name="purchase_price" value="{{$product->purchase_price}}" required placeholder="Enter Purchase Price" class="form-control"></td>
					</tr>
					
					
					<tr>
						<td>Sale Price</td>
						<td><input type="text" name="sale_price" value="{{$product->sale_price}}" required placeholder="Enter Sale Price" class="form-control"></td>
					</tr>
					
					
					<tr>
						<td>Discount</td>
						<td><input type="text" name="discount_price" value="{{$product->discount}}" placeholder="Enter Discount Price" class="form-control"></td>
					</tr>
					
					
					<tr>
						<td>Final Sale Price</td>
						<td><input type="text" name="final_sale_price" value="{{$product->final_sale_price}}" required  placeholder="Enter Final Sale Price" class="form-control"></td>
					</tr>
					
					
					<tr>
						<td>View in Hot Products </td>
						<td><input type="checkbox" value="1" checked="{{$product->hot_product}}" name="hot_product" class="form-control"></td>
					</tr>
					
					<tr>
						<td>View in New Arrival </td>
						<td><input type="checkbox" value="1" checked="{{$product->new_arrival}}"   name="new_arrival"  class="form-control"></td>
					</tr>
					
					<tr>
						<td>View in Discount Product </td>
						<td><input type="checkbox" value="1"  name="discount_product" checked="{{$product->discount_product}}"  class="form-control"></td>
					</tr>
					
					<tr>
						<td>Show PCS Box </td>
						<td><input type="checkbox" value="1"  name="show_pcs_box"  checked="{{$product->show_pcs_box}}"   class="form-control"></td>
					</tr>
					
					
					
					<tr>
						<td></td>
						<td><input type="submit" name="product_save" value="Update Product" class="btn btn-primary"></td>
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
  