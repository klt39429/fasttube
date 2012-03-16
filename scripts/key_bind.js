var SEARCH_PAGE_INDEX = 0;
var VIDEO_PAGE_INDEX = 1;
var README_PAGE_INDEX = 2;

var keypress_enable = true;
var keypress_mode_prev = 0;
var keypress_mode = 0;

function bind_keypress()
{
	$(document).bind('keypress', function(e)
	{
		if (keypress_enable)
		{
			var key_code = (e.keyCode > 0) ? e.keyCode : e.charCode;

			// Capitalize if its an uppercase
			if (key_code >= 97 && key_code <= 122)
			{
				key_code -= 32;
			}
			var char_code = String.fromCharCode(key_code); 
				
			if (char_code == "I") // I to view READ ME
			{
				keypress_mode_prev = keypress_mode;
				keypress_mode = README_PAGE_INDEX;
				show_readme();
			}
			
			// Inside the Video page tab, will detect "S" and numbers [1..9]
			if (keypress_mode == VIDEO_PAGE_INDEX)
			{
				if (key_code > 48 && key_code < 58) // [1..9], load video according to key 
				{
					selector = $("#related_video_block_" + (key_code - 48));
					selector.trigger("click");
				}
				else if (char_code == "S") // "S" for searching
				{
					keypress_enable = false;
					search_obj.get_search_params();
					return false;
				}
			}
			
			// Inside Search page tab, will detect "S", "V", numbers [1..9] and ["Q","W","E","R","T","Y"]
			else if (keypress_mode == SEARCH_PAGE_INDEX)
			{
				var play_index_keys = [1,2,3,4,5,6,7,8,9,"Q","W","E","R","T","Y"];  
				
				if (key_code == 86 || key_code == 118) // "V" for video tab
				{
					switch_page(VIDEO_PAGE_INDEX);
				}
				else if (key_code == 83 || key_code == 115) // "S" for searching
				{
					keypress_enable = false;
					search_obj.get_search_params();
					return false;
				}				
				else // scan against play_index_keys = [1,2,3,4,5,6,7,8,9,"Q","W","E","R","T","Y"];
				{
					for (var i = 0; i<play_index_keys.length; i++)
					{
						if (char_code == play_index_keys[i])
						{
							selector = $("#search_video_block_" + char_code);
							selector.trigger("click");
							switch_page(VIDEO_PAGE_INDEX);
							return
						}
						
					}
				}
			}
			
			// Inside Read me Tab
			else if (keypress_mode == README_PAGE_INDEX)
			{
				var page_index_keys = ["A","K","C"];
				
				for (var i=0; i<page_index_keys.length; i++)
				{
					if (page_index_keys[i] == char_code)
					{
						$("#readme_tabs").tabs("select",i);
						return;
					}
				}
			}
		}
	});
}