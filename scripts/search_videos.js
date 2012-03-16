/*
 * https://gdata.youtube.com/feeds/api/videos?
    q=football+-soccer
    &orderby=published
    &start-index=11
    &max-results=10
    &v=2
 */
var SEARCH_LINK = "http://gdata.youtube.com/feeds/api/videos?q=";
var SEARCH_VERSION_FORMAT = "&v=2&format=5&max-results=18&alt=json&key=AI39si4kMMM_MKoBruLHD17_U6_NqOf-qFOc5iqpzpH-G67oD3iCtuVv8F51GKJiD3I3bIuCy5Eo4-Pjf1rwMoNmfc6MUS4aOw";

function search_videos()
{
}


search_videos.prototype.set_search_videos = function(entries)
{
	var search_video, thumbnail, information;
	
	var search_block_keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "Q","W","E","R","T","Y"];
	
	for (var i=0; i<entries.length; i++)
	{
		search_video = $("#search_video_block_" + (search_block_keys[i]));
		thumbnail = search_video.children(".thumbnail");
		information = search_video.children(".information");

		search_video.attr("video_data", JSON.stringify(entries[i]));
		
		thumbnail.children("img").attr("src",entries[i]["media$group"]["media$thumbnail"][0]["url"]);
		thumbnail.children(".video_time").html(secondsToHms(entries[i]["media$group"]["yt$duration"]["seconds"]));

		youtube_videos.prototype.set_rating(entries[i], information.children(".progress_bar"));
		information.children(".title").html(entries[i]["title"]["$t"]);
		information.children(".view_count").html(add_commas(entries[i]["yt$statistics"]["viewCount"]) + " views");
	}
};

search_videos.prototype.search_for_videos = function(search_keywords)
{
	switch_page(SEARCH_PAGE_INDEX);
	
	var url = SEARCH_LINK + search_keywords + SEARCH_VERSION_FORMAT;

	$.get(url, function(data) 
	{
		// convert output to actualy json
		var json_data;
		try{json_data = JSON.parse(data);}
		catch(err){ json_data = data;}
		
		search_videos.prototype.set_search_videos(json_data["feed"]["entry"]);
	});	
};

search_videos.prototype.get_search_params = function()
{
	$("#search_keywords").val("");
	
	$("#search_keywords_dialog").dialog({
		modal: true,
		width: '800px',
		buttons: {
			"Search": function() {
				search_videos.prototype.search_for_videos($("#search_keywords").val());
				$(this).dialog("close");
			},
			"Cancel": function() {$(this).dialog("close");}
		},
		close: function() 
		{
			keypress_enable = true;
		}
	});
	
	$(".ui-dialog-titlebar").show();
	
	$("#search_keywords_dialog").bind("keypress", function(e) {

		if (e.keyCode == 13) {
	        e.preventDefault();
	        search_videos.prototype.search_for_videos($("#search_keywords").val());
	        $("#search_keywords_dialog").dialog("close");
	    }
	});	
	
};