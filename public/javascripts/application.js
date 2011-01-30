$(document).ready(function() {
	toggleButtons();
	selectAll();
	$("table#tracks_container").tablesorter({ headers: { 0: {sorter: false }, 5: { sorter: false }, 4: { sorter: false }, 6: { sorter: false } } });

	var jpPlayInfo = $("#play-info");
	//jplayer
	 $("#jquery_jplayer").jPlayer({
		 ready: function ()
 		{
 			this.element.jPlayer("setFile", "").jPlayer("stop");

 		},
    customCssIds: true,
    swfPath: "http://gimmebuttertracks.com/javascripts"
 	})
 	.jPlayer("onProgressChange", function(lp,ppr,ppa,pt,tt) {
 		jpPlayInfo.text("at " + parseInt(ppa)+"% of " + $.jPlayer.convertTime(tt) + ", which is " + $.jPlayer.convertTime(pt));
	})
 	.jPlayer("onProgressChange", function(lp,ppr,ppa,pt,tt) {
  		var lpInt = parseInt(lp);
  		var ppaInt = parseInt(ppa);
  		var jpPlayInfo = $("#play-info");
  		global_lp = lpInt;
  		jpPlayInfo.text($.jPlayer.convertTime(pt))

 		$('#loaderBar').progressbar('option', 'value', lpInt);
  		$('#sliderPlayback').slider('option', 'value', ppaInt);
 	})
 	/*.jPlayer("onSoundComplete", function() {
 		this.element.jPlayer("play");
 	});*/

 	//$("#pause").hide();

 	function showPauseBtn()
 	{
 		
 	}

 	function showPlayBtn()
 	{
 		
 	}

 	function playTrack(t,n)
 	{
 		$("#jquery_jplayer").jPlayer("setFile", t).jPlayer("play");

 		showPauseBtn();

 		return false;
 	}

 	$("#play").click(function() {
 		$("#jquery_jplayer").jPlayer("play");
 		showPauseBtn();
 		return false;
 	});

 	$("#pause").click(function() {
 		$("#jquery_jplayer").jPlayer("pause");
 		showPlayBtn();
 		return false;
 	});

 	$("#stop").click(function() {
 		$("#jquery_jplayer").jPlayer("stop");
 		showPlayBtn();
 		return false;
 	});


 	$("#volume-min").click( function() {
 		$('#jquery_jplayer').jPlayer("volume", 0);
 		$('#sliderVolume').slider('option', 'value', 0);
 		return false;
 	});

 	$("#volume-max").click( function() {
 		$('#jquery_jplayer').jPlayer("volume", 100);
 		$('#sliderVolume').slider('option', 'value', 100);
 		return false;
 	});

 	$("#player_progress_ctrl_bar a").live( "click", function() {
 		$("#jquery_jplayer").jPlayer("playHead", this.id.substring(3)*(100.0/global_lp));
 		return false;
 	});

 	// Slider
 	$('#sliderPlayback').slider({
 		max: 100,
 		range: 'min',
 		animate: true,

 		slide: function(event, ui) {
 			$("#jquery_jplayer").jPlayer("playHead", ui.value*(100.0/global_lp));
 		}
 	});

 	$('#sliderVolume').slider({
 		value : 50,
 		max: 100,
 		range: 'min',
 		animate: true,

 		slide: function(event, ui) {
 			$("#jquery_jplayer").jPlayer("volume", ui.value);
 		}
 	});

 	$('#loaderBar').progressbar();


 	//hover states on the static widgets
 	$('#dialog_link, ul#icons li').hover(
 		function() { $(this).addClass('ui-state-hover'); },
 		function() { $(this).removeClass('ui-state-hover'); }
 	);
  
  
  //play tracks
  
  var trackBtn = $("#tracks_container .trackPlayBtn li");
  var trackURL = "";
  var trackTitle = "";
  
  trackBtn.live('click', function() {
    if ($(this).is('.current')) {
      if ($(this).is('.playing')) {
        $("#jquery_jplayer").jPlayer("pause");
        showPlayBtn();
        $(this).children("span").removeClass("ui-icon-pause").addClass("ui-icon-play");
        $(this).removeClass("playing")
      } else {  
        $("#jquery_jplayer").jPlayer("play");
        showPauseBtn();
        $(this).children("span").removeClass("ui-icon-play").addClass("ui-icon-pause");
        $(this).addClass("playing")
      }
    } else {
      trackURL = $(this).parent().attr("title");
      trackTitle = $(this).parent().next(".trackTitle").text();
      $("#trackname").text(trackTitle);
      
      $("#tracks_container .trackPlayBtn li").each(function(){
        $(this).removeClass('current');
        $(this).children("span").removeClass("ui-icon-pause").addClass("ui-icon-play");
        $(this).parent().parent().removeClass('highlight');
      });
      $(this).addClass('current').addClass('playing');
      $(this).children("span").removeClass("ui-icon-play").addClass("ui-icon-pause");
      showPauseBtn();
      $(this).parent().parent("tr").addClass('highlight');
      return(playTrack(trackURL, trackTitle));
    }
  });
  
  $("#jquery_jplayer").jPlayer("onSoundComplete", function() {
    currentTrack = $(".current")
    var nextTrack = currentTrack.parent().parent().next().children(".trackPlayBtn");
    trackURL = nextTrack.attr("title");
    trackTitle = nextTrack.next(".trackTitle").text();
    nextPlaybtn = nextTrack.children("li")
    
    currentTrack.children("span").removeClass("ui-icon-pause").addClass("ui-icon-play");
    currentTrack.removeClass("playing");
    currentTrack.parent().parent("tr").removeClass('highlight');
    //playTrack(trackURL);
    currentTrack.removeClass("current");
    nextTrack.parent("tr").addClass('highlight');
    nextPlaybtn.addClass("current").addClass("playing");
    nextPlaybtn.children("span").removeClass("ui-icon-play").addClass("ui-icon-pause");
    $("#trackname").text(trackTitle);
    return(playTrack(trackURL, trackTitle));
 	});
  
  $.jPlayer.timeFormat.padMin = false;
	$.jPlayer.timeFormat.padSec = true;
	$.jPlayer.timeFormat.sepMin = ":";
	//$.jPlayer.timeFormat.sepSec = "sec";

	//$("#tracks_container").tableScroll({height:500}); //needs to be called at end
	
});

function toggleButtons() {
	if ($("#tracks_container :input").is(":checked"))  {
		$("#group_edit_button").removeAttr('disabled');
		$("#group_delete_button").removeAttr('disabled');
	} else {
		$("#group_edit_button").attr('disabled', true);
		$("#group_delete_button").attr('disabled', true);
	}
}

function selectAll() {
  var tog = false; // or true if they are checked on load
  var able = true;
   $('#tracks_container th :input').click(function() { 
      $("input[type=checkbox]").attr("checked",!tog);
      $("#group_edit_button").attr("disabled",!able);
      $("#group_delete_button").attr("disabled",!able);
    tog = !tog;
    able = !able; 
   });
}
