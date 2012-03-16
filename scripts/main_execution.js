var youtube_obj = new youtube_videos();
var search_obj = new search_videos();

function switch_page(page_index)
{
	$("#tabs").tabs("select",page_index);
	keypress_mode = page_index;
}


function bind_related_videos()
{
	$(".related_video").bind("click", function()
	{
		selector = $(this);
		var entry= JSON.parse(selector.attr("video_data"));
		
		console.log(entry);
		
		youtube_obj.get_related_videos(entry["media$group"]["yt$videoid"]["$t"], youtube_obj.set_related_videos);
		youtube_obj.play_video_by_id(entry["media$group"]["yt$videoid"]["$t"]);
		
	});
		
}

function show_readme()
{
	$("#readme_content").dialog({
		modal: true,
		width: '800px',
		close: function(event, ui) { 
			keypress_mode = keypress_mode_prev;
		}

	});
	
	$(".ui-dialog-titlebar").hide();
}