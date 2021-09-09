@extends('admin.master')

@section('content')
<div class="wrapper">

  <!-- Preloader -->
  <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__shake" src="/assets/images/mobile/logo.png" alt="MessBazar" height="60" width="60">
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
            <h1 class="m-0">Sales/Orders</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Sales/Orders</li>
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
                  Sales
                </h3>
                <div class="card-tools">
                  <ul class="nav nav-pills ml-auto">
                    
                  </ul>
                </div>
              </div><!-- /.card-header -->
              <div class="card-body">
                <table class="table">
                    <tr>
                        <td>
                            <select class="form-control" name="txtField">
                                <option>Search For</option>
                                <option>Order Date</option>
                                <option>Delivery Date</option>
                                <option>Order ID</option>
                                <option>Customer ID</option>
                                <option>Branch</option>
                                <option>Address</option>
                            </select>
                        </td>
                        <td><input type="text" class="form-control" name='txtValue'></td>
                        <td><button type="submit" class="btn btn-primary" name='btnSearch'>Search</button></td>
                        <td colspan="8" align="right"> </td>
                    </tr>
                </table>
				<table class="table table-bordered">
				    <thead bgcolor="#ccc">
				        <th>Order ID</th>
				        <th>Customer</th>
				        <th>Delivery</th>
				        <th>Sale Details</th>
				        <th>Status</th>
				        <th>Notes</th>
				        <th>Details</th>
				    </thead>
					<tbody>
				@foreach($orders as $order)
					<tr>
						<td>{{$order->id}}</td>
						<td>
						    @if(!empty($order->customer))
						        <div style="white-space: nowrap;">{{$order->customer->user_full_name}}</div>
						        <div style="white-space: nowrap;">{{$order->customer->house_mess_name}}</div>
						        <div style="white-space: nowrap;">{{$order->customer->house_mess_name}}</div>
						        <div style="white-space: nowrap;">{{$order->customer->current_meal_manager}}</div>
						        <div style="white-space: nowrap;">{{$order->customer->current_meal_manager_mobile}}</div>
						        <div style="white-space: nowrap;">{{$order->customer->user_type}}</div>
						         
						    @endif
						</td>
						<td>
						    <div style="white-space: wrap;">{{!empty($order->orderAddress->full_address)?
						                $order->orderAddress->full_address:''}}</div>
						    <div style="white-space: nowrap;">{{!empty($order->orderAddress)?$order->orderAddress->user_mobile:''}}</div>
						    <div style="white-space: nowrap;">{{!empty($order->orderAddress)?$order->orderAddress->branch_name:''}}</div>
						    <div style="white-space: nowrap;">Order at: {{!empty($order->orderAddress)?$order->orderAddress->created_at:''}}</div>
						    <div style="white-space: nowrap;">Delivery: {{!empty($order->orderAddress)?$order->orderAddress->delivery_time:''}}</div>
						</td>
						<td>
						    <div style="white-space: nowrap;">Qnty: {{$order->product_qnty}}</div>
						    <div style="white-space: nowrap;">Sale: {{$order->total_sale_price}}</div>
						    <div style="white-space: nowrap;">Discount: {{$order->total_discount}}</div>
						    <div style="white-space: nowrap;">Total: {{$order->total_final_price}}</div>
						</td>
					 
						<td style="text-transform:uppercase;{{$order->cart_status=='delivered'?'color:green':'color:orange'}}"><b>{{$order->cart_status}}</b></td>
						<td>{{$order->notes}}</td>
						<td>
						    <a href="/sales/edit-orders/{{$order->id}}" class="btn btn-success">
						        <i class="nav-icon fas fa-pencil-alt"></i>
						    </a>
						 </td>
					</tr>
				@endforeach
					</tbody>
					<tfooter>
					    <th colspan="8"></th>
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
  