<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Mess Bazar</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
    
		<style>
			body {
				font-family: "Lato", sans-serif;
			}



			.main-head{
				height: 150px;
				background: #FFF;
			   
			}

			.sidenav {
				height: 100%;
				background-color: #000;
				overflow-x: hidden;
				padding-top: 20px;
			}


			.main {
				padding: 0px 10px;
			}

			@media screen and (max-height: 450px) {
				.sidenav {padding-top: 15px;}
			}

			@media screen and (max-width: 450px) {
				.login-form{
					margin-top: 10%;
				}

				.register-form{
					margin-top: 10%;
				}
			}

			@media screen and (min-width: 768px){
				.main{
					margin-left: 40%; 
				}

				.sidenav{
					width: 40%;
					position: fixed;
					z-index: 1;
					top: 0;
					left: 0;
				}

				.login-form{
					margin-top: 80%;
				}

				.register-form{
					margin-top: 20%;
				}
			}


			.login-main-text{
				margin-top: 20%;
				padding: 60px;
				color: #fff;
			}

			.login-main-text h2{
				font-weight: 300;
			}

			.btn-black{
				background-color: #000 !important;
				color: #fff;
			}
		</style>
	</head>
    <body>
		<div class="sidenav">
			 <div class="login-main-text">
			    <p><img src="/assets/images/mobile/logo.png" width="180"></p>
				<h2>MESSBAZAR<br> Login Page</h2>
				<p>Login or register from here to access.</p>
			 </div>
		  </div>
		  <div class="main">
			 <div class="col-md-6 col-sm-12">
				<div class="login-form">
				   <form action="/login" method="post">
					  @csrf
					  <div class="form-group">
						 <label>User Name</label>
						 <input type="text" name="email" class="form-control" placeholder="User Name">
					  </div>
					  <div class="form-group">
						 <label>Password</label>
						 <input type="password" name="password" class="form-control" placeholder="Password">
					  </div>
					  <br> 
					  <div style="color:coral">
					      @if($errors->any())
					        {{ implode('', $errors->all(':message')) }}
					      @endif
					  </div>
					  <br> 
					  <div class="form-group">
					  <button type="submit" class="btn btn-black">Login</button>
					  
					  </div>
				   </form>
				</div>
			 </div>
		  </div>
	
	</body>
</html>
