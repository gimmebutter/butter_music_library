$(document).ready(function() {
	toggleButtons();
	selectAll();
	$("table#tracks_container").tablesorter({ headers: { 0: {sorter: false }, 1:{ sorter: false}, 6: { sorter: false } } });
	
	//jplayer
	 $("#jquery_jplayer").jPlayer({
		 ready: function ()
 		{
 			this.element.jPlayer("setFile", "").jPlayer("stop");

 		},
    customCssIds: true,
    swfPath: "http://gimmebutter.com/javascripts"
 	})
 	.jPlayer("onProgressChange", function(lp,ppr,ppa,pt,tt) {
  		var lpInt = parseInt(lp);
  		var ppaInt = parseInt(ppa);
  		global_lp = lpInt;

 		$('#loaderBar').progressbar('option', 'value', lpInt);
  		$('#sliderPlayback').slider('option', 'value', ppaInt);
 	})
 	.jPlayer("onSoundComplete", function() {
 		this.element.jPlayer("play");
 	});

 	$("#pause").hide();

 	function showPauseBtn()
 	{
 		$("#play").fadeOut(function(){
 			$("#pause").fadeIn();
 		});
 	}

 	function showPlayBtn()
 	{
 		$("#pause").fadeOut(function(){
 			$("#play").fadeIn();
 		});
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
  
  var trackBtn = $("#tracks_container .trackPlayBtn a");
  var trackURL = "";
  var trackTitle = "";
  
  trackBtn.click(function() {
    $(this).blur();
    trackURL = $(this).parent().attr("title");
    trackTitle = $(this).parent().next("trackTitle");
    return(playTrack(trackURL, trackTitle));
  });
	
	/*tracks & buttons

	$("#theseparation").click(function() {
		$(this).blur();
 		return(playTrack("http://www.miaowmusic.com/audio/mp3/Miaow-05-The-separation.mp3",$("#theseparation").text()));
	});

	$("#lismore").click(function() {
		$(this).blur();
		return(playTrack("http://www.miaowmusic.com/audio/mp3/Miaow-04-Lismore.mp3",$("#lismore").text()));
	});

	$("#thinice").click(function() {
		$(this).blur();
		return(playTrack("http://www.miaowmusic.com/audio/mp3/Miaow-10-Thin-ice.mp3",$("#thinice").text()));
	});
	*/
	
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
