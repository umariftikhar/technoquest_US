<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Technoquest</title>

	<link rel="icon" type="image/png" href="./img/favicon.png">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />    

    <link href="./css/bootstrap.min.css" rel="stylesheet" />
    <link href="./css/bootstrap-responsive.min.css" rel="stylesheet" />

    <link href="./css/font-awesome.min.css" rel="stylesheet" />
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,800italic,400,600,800" rel="stylesheet" />
        
    <link href="./css/focus-1.1.css" rel="stylesheet" /> 
    <link href="./css/focus-1.1-responsive.css" rel="stylesheet" />
        
    <link href="./css/pages/contact.css" rel="stylesheet" />

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
	
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>

<body>

<div id="wrapper" class="clearfix">
	
	<div id="header">
		
		<div class="container">
			
			<h1 id="title">
				<a href="./index.html">
					Technoquest
				</a>
			</h1>
			
		</div> <!-- /container -->
		
	</div> <!-- /header -->	
	
	
	<div id="nav" class="clearfix">
		
		<div class="container">
		
			<ul id="main-nav">
				<li class="active">
					<a href="./index.html">Home</a>
				</li>
				
				<li class="dropdown">
				  <a href="#" class="dropdown-toggle" data-toggle="dropdown">Services <b class="caret"></b></a>
					<ul class="dropdown-menu">
					  <li class="dropdown-submenu"> <a tabindex="-1" href="#">Water Treatment Solutions</a>
						  <ul class="dropdown-menu">
							  <li class="dropdown-submenu"> <a href="#">Chlorine Dioxide</a>
								  <ul class="dropdown-menu">
									  <li><a href="#">Technology</a></li>
									  <li><a href="#">Applications</a></li>
									  <li class="dropdown-submenu"> <a href="#">Products</a>
										  <ul class="dropdown-menu">
											  <li><a href="#">Powders</a></li>
											  <li><a href="#">Tablets</a></li>
											  <li><a href="#">Solutions</a></li>
										  </ul>
									  </li>
									  <li><a href="#">FAQ</a></li>
								  </ul>
							  </li>
						  </ul>
					  </li>
					</ul>
				</li>
				
				<li>
					<a href="./about.html">About</a>
				</li>
				
				<li>
					<a href="./contact.php">Contact</a>
				</li>
				
			</ul>
			
		</div> <!-- /container -->
		
	</div> <!-- /nav -->

	
	
	<div id="page-title">
		
		<h1>Contact Us</h1>
		<p>Feel free to contact us for more information</p>
		
	</div> <!-- /page-title -->
	
	
	<div id="contact-map">
		<iframe width="100%" height="180" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3484281.5885433787!2d74.32314715!3d31.47967249999976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore!5e0!3m2!1sen!2sus!4v1403003562801"></iframe>
	</div> <!-- /contact-map -->
	
	
	<div id="content">
		
		<div class="container">
			
			<div class="row">
				
				<div class="grid-12" style="margin: 0 4px 20px;">
				
					<div class="sidebar">
						
						<h2><span class="slash">//</span> More Information</h2>
						
						<p style="margin-left:0px;margin-bottom:25px;">The Applied Oxidation team would be pleased to tackle your most challenging disinfection, sanitation and water treatment problems.<br />
						We look forward to helping you. Contact us today!</p>
						
							<div class="grid-5" style="margin: 0 0px 20px;">
				
							<h2>Leave a message</h2>
				
								<form method="post" action="contact.php">
								
									<label>Name:</label>
									<input name="name" type="text" placeholder="Name">
									
									<label>Email:</label>
									<input name="email" type="email" placeholder="Email">
									
									<label>Message</label>
									<textarea name="message" placeholder="Query"></textarea>
									
									<br />
									
									<input id="submit" name="submit" type="submit" value="Submit">
										
										<?php
											$name = $_POST['name'];
											$email = $_POST['email'];
											$message = $_POST['message'];
											$from = 'From: Technoquest'; 
											$to = 'info@technoquest.com.pk'; 
											$subject = 'New contact form';
													
											$body = "From: $name\nE-Mail: $email\nMessage: $message";
														
											if ($_POST['submit']) {
												if ($name != '' && $email != '') {
													if (mail ($to, $subject, $body, $from)) { 
													echo 'Your message has been sent!';
													}
												} else {
													echo 'You need to fill in all required fields!';
												}
											}
										?>
										
								</form>

							</div> <!-- /grid-6 -->
						
							<div class="grid-5" style="margin: 0 0px 20px;">
				
							<h2>Contact us directly</h2><br />
			
							<h5><strong>Phone:</strong> +92 321 432 3408</h5><br />
							<h5><strong>Fax:</strong> +92 423 717 5382</h5><br />
							<h5><strong>Email:</strong> info@technoquest.com.pk<h5>
							
							</div> <!-- /grid-6 -->

					</div> <!-- /sidebar -->
					
				</div> <!-- /grid-12 -->
				

				
			</div> <!-- /row -->
			
		</div> <!-- /container -->
		
	</div> <!-- /content -->
	
	
	<div id="footer">
		
		<div class="container">
		
			<div class="row">
				
				<div class="grid-4">
				
					<h1 id="footer-logo">Technoquest</h1>

				</div> <!-- /grid-4 -->
				
				<div class="grid-4">
								
					<h4><span class="slash">//</span> info@technoquest.com.pk</h4>

				</div> <!-- /grid-4 -->
				
				<div class="grid-4">
						
					<h4><span class="slash">//</span> +92-321-432-3408</h4>								
					
				</div><!-- /grid-4 -->
				
			</div> <!-- /row -->
			
		</div> <!-- /container -->
		
	</div> <!-- /footer -->
	
	
	<div id="copyright">
		
		<div class="container">
			
			<div class="row">
			
				<div id="rights" class="grid-6">
				© 2014 Technoquest Pvt. Ltd. All Rights Reserved.
				</div> <!-- /grid-6 -->
				
<!-- 				<div id="totop" class="grid-6">
					Theme by  <a href="http://jumpstartui.com" target="_blank">Jumpstart UI.</a>
				</div> <!-- /grid-6 -->
				
			</div> <!-- /row -->
			
		</div> <!-- /container -->
			
	</div> <!-- /copyright -->
	
</div> <!-- /wrapper -->

<!-- Le javascript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="./js/jquery-1.9.1.min.js"></script>

<script src="./js/bootstrap.min.js"></script>
<script src="./js/focus.js"></script>

<script>

$(function () {
	
});

</script>
  </body>
</html>