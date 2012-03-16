<!---------------------------- PHP Include files ------------------------------>
<?php 
	require_once "search_dialog.php";
	require_once "readme.php";
?>

<!---------------------------- Include CSS Files ------------------------------>

<link href="styles/main.css" rel="stylesheet" type="text/css"/>
<link href="styles/readme.css" rel="stylesheet" type="text/css"/>
<link href="styles/search.css" rel="stylesheet" type="text/css"/>
<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>


<!---------------------------- Include JS Files ------------------------------>

<script type="text/javascript" src="scripts/key_bind.js"></script>
<script type="text/javascript" src="scripts/search_videos.js"></script>
<script type="text/javascript" src="scripts/youtube_videos.js"></script>
<script type="text/javascript" src="scripts/main_execution.js"></script>
<script type="text/javascript" src="scripts/utils.js"></script>
<script type="text/javascript" src="http://swfobject.googlecode.com/svn/trunk/swfobject/swfobject.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"> </script>

<!---------------------------- Include JS Files ------------------------------>

<script type="text/javascript">

	$(function()
	{
		var video_id = "2xjJXT0C0X4";
		youtube_obj.get_related_videos(video_id, youtube_obj.set_related_videos);
		youtube_obj.play_video_by_id(video_id);
	
		bind_related_videos();
		bind_keypress();
		$("#readme_icon").bind("click", show_readme);
		$("#tabs").tabs({});
		$("#readme_tabs").tabs({event: 'mouseover'});
		switch_page(VIDEO_PAGE_INDEX);
	});

</script>

<!---------------------------- Page Layout ------------------------------>

<div id="header">
	<p id="title"> fasttube </p>
	<p id="search_tip"><span class="any_hot_key">S</span> to Search </p>
</div>

<img id="readme_icon" src="images/readme-icon.png">

<div id="tabs">

	<ul style="display: none;">
		<li><a href="#tabs-1">Search</a></li>
		<li><a href="#tabs-2">Video</a></li>
	</ul>
		
	<div id="tabs-1">
		<?php require_once "search_page.php"; ?>
	</div>

	<div id="tabs-2">
		<?php require_once "video_page.php"; ?>		
	</div>
	
</div>