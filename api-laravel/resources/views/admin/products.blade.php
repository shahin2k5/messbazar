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
            <h1 class="m-0">Products</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Products</li>
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
                      <a class="nav-link active" href="/products/add-products"  >ADD PRODUCTS</a>
                    </li>
                     
                  </ul>
                </div>
              </div><!-- /.card-header -->
              <div class="card-body" style="overflow-y:scroll">
				<table class="table table-bordered">
				    <thead bgcolor='#eee'>
				        <th>Image</th>
				        <th>Product Name</th>
				        <th>Category/Sub Cat.</th>
				        <th>Pur.</th>
				        <th>Sale Rate</th>
				        <th>Discount</th>
				        <th>Final Sale Rate</th>
				        <th>Hot Product</th>
				        <th>New Arrival</th>
				        <th>Discount Product</th>
				        <th>PCS Box</th>
				        <th>Edit</th>
				        <th>Delete</th>
				    </thead>
					<tbody>
				@foreach($products as $product)
					<tr>
					    <td><img src="/{{$product->image}}" height=50 width=50></td>
						<td>{{$product->product_title}}</td>
						<td>{{$product->category->category_title}}/{{!empty($product->sub_category)?
						       $product->sub_category->category_title:'-'}}</td>
						<td>{{$product->purchase_price}}</td>
						<td>{{$product->sale_price}}</td>
						<td>{{$product->discount}}</td>
						<td>{{$product->final_sale_price}}</td>
						<td>{{$product->hot_product}}</td>
						<td>{{$product->new_arrival}}</td>
						<td>{{$product->discount_product}}</td>
						<td>{{$product->show_pcs_box}}</td>
						<td width='100' align="center">
						    <a href="/products/edit-products/{{$product->id}}" class="btn btn-info">
						        <i class="nav-icon fas fa-pencil-alt"></i>
						    </a>
						</td>
						<td width='100' align="center">
						    <a href="/products/delete-products/{{$product->id}}" class="btn btn-danger" onclick="return confirm('Do you want to delete!')">Delete</a>
						</td>
					</tr>
				@endforeach
					</tbody>
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
  