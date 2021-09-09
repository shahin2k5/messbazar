 
 <style>
     .nav-link p{
         position:revert;
     }
 </style>
 <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="/dashboard" class="brand-link">
      <img src="/assets/images/mobile/logo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">MESSBAZAR</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="/adminlte/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="/dashboard" class="d-block">MESSBAZAR ADMIN</a>
        </div>
      </div>

      <!-- SidebarSearch Form -->
      <div class="form-inline">
        
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item menu-open">
            <a href="/dashboard" class="nav-link active">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
           
          </li>
          <li class="nav-item">
            <a href="/sales/orders" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Sales
                @php
                    $sales=\App\Models\Order::where('cart_status','processing')->count();
                @endphp
                <span class="right badge badge-danger">New {{$sales}}</span>
              </p>
            </a>
          </li>
           
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon far fa-envelope"></i>
              <p>
                Products
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="/products/products" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Products</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/products/categories" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Categories</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/products/sub-categories" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Sub Categories</p>
                </a>
              </li>
              
             
              
              
            </ul>
          </li>
         
          <li class="nav-item">
                <a href="/users/list" class="nav-link">
                  <i class="far fa-user nav-icon"></i>
                  <p>User List</p>
                </a>
          </li>
         
        
   <!--       <li class="nav-header">EXAMPLES</li>-->
   <!--       <li class="nav-item">-->
   <!--         <a href="pages/calendar.html" class="nav-link">-->
   <!--           <i class="nav-icon far fa-calendar-alt"></i>-->
   <!--           <p>-->
   <!--             Calendar-->
   <!--             <span class="badge badge-info right">2</span>-->
   <!--           </p>-->
   <!--         </a>-->
   <!--       </li>-->
   <!--       <li class="nav-item">-->
   <!--         <a href="pages/gallery.html" class="nav-link">-->
   <!--           <i class="nav-icon far fa-image"></i>-->
   <!--           <p>-->
   <!--             Gallery-->
   <!--           </p>-->
   <!--         </a>-->
   <!--       </li>-->
   <!--       <li class="nav-item">-->
   <!--         <a href="pages/kanban.html" class="nav-link">-->
   <!--           <i class="nav-icon fas fa-columns"></i>-->
   <!--           <p>-->
   <!--             Kanban Board-->
   <!--           </p>-->
   <!--         </a>-->
   <!--       </li>-->
   <!--       <li class="nav-item">-->
   <!--         <a href="#" class="nav-link">-->
   <!--           <i class="nav-icon far fa-envelope"></i>-->
   <!--           <p>-->
   <!--             Mailbox-->
   <!--             <i class="fas fa-angle-left right"></i>-->
   <!--           </p>-->
   <!--         </a>-->
   <!--         <ul class="nav nav-treeview">-->
   <!--           <li class="nav-item">-->
   <!--             <a href="pages/mailbox/mailbox.html" class="nav-link">-->
   <!--               <i class="far fa-circle nav-icon"></i>-->
   <!--               <p>Inbox</p>-->
   <!--             </a>-->
   <!--           </li>-->
   <!--           <li class="nav-item">-->
   <!--             <a href="pages/mailbox/compose.html" class="nav-link">-->
   <!--               <i class="far fa-circle nav-icon"></i>-->
   <!--               <p>Compose</p>-->
   <!--             </a>-->
   <!--           </li>-->
   <!--           <li class="nav-item">-->
   <!--             <a href="pages/mailbox/read-mail.html" class="nav-link">-->
   <!--               <i class="far fa-circle nav-icon"></i>-->
   <!--               <p>Read</p>-->
   <!--             </a>-->
   <!--           </li>-->
   <!--         </ul>-->
   <!--       </li>-->
       
		 <li class="nav-item">
            <a href="/logout" class="nav-link">
              <i class="nav-icon fas fa-columns"></i>
              <p>
                LOGOUT
              </p>
            </a>
          </li>
         
         
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

