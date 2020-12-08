var client = new String();
var prefs;

chrome.storage.sync.get({"shprefs": [true, true, false, true]}, function(index) {
	prefs = index.shprefs;
});

if(window.location.href.toString().indexOf("tweetdeck") == -1){
	//We are on Twitter.com
	client = "Twitter";
}
else if(window.location.href.toString().indexOf("tweetdeck") > -1){
	//We are on TweetDeck
	client = "TweetDeck";
}
//console.log(client);

//Initialize Mutation Observer
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
    	if(mutation.type == "attributes" || mutation.type == "characterData" || mutation.type == "childList"){

    		//console.log("Mutation Observer recognized mutation of type: " + mutation.type);

    		//Choose function to execute based off of client variable we declared earlier
    		if(client == "Twitter"){
					fixTwitter();
    			//console.log("Mutation Observer will now observe Twitter.");
    		}
    		else if(client == "TweetDeck"){
					fixTweetDeck();
    			//console.log("Mutation Observer will now observe TweetDeck.");
    		}
    	}
	});
});

function fixTwitter(){
	//Retrieve saved preferences
	chrome.storage.sync.get({"shprefs": [true, true, true, false, true, 3]}, function(index) {
		if(index.shprefs[0] == true){
			//Replace text on twitter
			replaceTextTwitter();
		}

		if(index.shprefs[1] == true){
			//Replace Hearts on twitter with stars
			replaceHeartsTwitter();
			//This is done with CSS
		}

		if(index.shprefs[2] == true){
			//Fix Image Bug on Twitter
			fixImageBugTwitter();
		}
	});
}

function fixTweetDeck(){
	//Retrieve saved preferences
	chrome.storage.sync.get({"shprefs": [true, true, true, false, true, 3]}, function(index) {
		if(index.shprefs[3] == true){
			//Replace text on twitter
			replaceTextTweetdeck();
		}

		if(index.shprefs[4] == true){
			//Replace Hearts on tweetdeck with stars
			replaceHeartsTweetdeck();
			//This is done with CSS
		}
	});
}

//Config variable for Mutation Observer
var config = { attributes: true, childList: true, characterData: true };

//Engage Mutation Observer
observer.observe(document.body, config);

//Run functions
if(client == "Twitter"){
    fixTwitter();
}
else if(client == "TweetDeck"){
	fixTweetDeck();
	//Retrieve saved preferences
	chrome.storage.sync.get({"shprefs": [true, true, true, false, true, 3]}, function(index) {
		var time = index.shprefs[5] * 1000;
		setInterval(fixTweetDeck, time);
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function replaceTextTwitter(){
	//console.log("ooh mama");

	//Change tooltip for favorite
	$("button.ProfileTweet-actionButton.js-actionFavorite").each(function(index){
		//English
		$(this).find("div.js-tooltip[data-original-title*='Like']").attr("data-original-title", "Favorite");
		$(this).find("div.js-tooltip[data-original-title*='Like']").attr("title", "Favorite");


		//German
		$(this).find("div.js-tooltip[data-original-title*='Gefällt mir']").attr("data-original-title", "Favorisieren");
		$(this).find("div.js-tooltip[data-original-title*='Gefällt mir']").attr("title", "Favorisieren");
	});

	//change tooltip for unfavorite
	$("button.ProfileTweet-actionButtonUndo.js-actionFavorite").each(function(index){
		//English
		$(this).find("div.js-tooltip[data-original-title*='Undo like']").attr("data-original-title", "Undo favorite");
		$(this).find("div.js-tooltip[data-original-title*='Undo like']").attr("title", "Undo favorite");

		//German
		$(this).find("div.js-tooltip[data-original-title*='Gefällt mir nicht mehr']").attr("data-original-title", "Favorisieren rückgängig machen");
		$(this).find("div.js-tooltip[data-original-title*='Gefällt mir nicht mehr']").attr("title", "Favorisieren rückgängig machen");

	});

	//Rename the "Likes" stat on user profiles
	$(".ProfileNav-label").each(function(index){
		//English
		$(this).html($(this).html().trim().replace("Likes", "Favorites"));

		//German
		$(this).html($(this).html().trim().replace("PERSONEN GEFÄLLT DAS", "Favoriten"));
	});

	//Chenge the Like/Likes counter on a tweet
	$("a.request-favorited-popup").each(function(index){
		//English
		$(this).html($(this).html().trim().replace("Like", "Favorite"));
		$(this).html($(this).html().trim().replace("like", "favorite"));

		//German
		$(this).html($(this).html().trim().replace("Gefällt mir", "Favorisieren"));
	});

	//Change "# other likes" to "# other favorites"
	$(".hide-text").each(function(index){
		//English
		$(this).text($(this).text().trim().replace("like", "favorite"));

		//German
		$(this).text($(this).text().trim().replace("Gefällt mir", "Favorisieren"));
	});

	//Change "# other likes" to "# other favorites"
	$(".show-text").each(function(index){
		//English
		$(this).text($(this).text().trim().replace("like", "favorite"));

		//German
		$(this).text($(this).text().trim().replace("Gefällt mir", "Favorisieren"));
	});

	//Change the "user liked your tweet(s)" text on the notifications page
	$(".stream-item-activity-line, .js-actionable-user, .stream-item-activity-line-notification").each(function(index){
		//English
		$(this).html($(this).html().trim().replace("liked your Tweet", "favorited your Tweet"));
		$(this).html($(this).html().trim().replace("liked some Tweet", "favorited some Tweet"));
		$(this).html($(this).html().trim().replace("liked a Tweet", "favorited a Tweet"));
		$(this).html($(this).html().trim().replace("liked a photo", "favorited a photo"));
		$(this).html($(this).html().trim().replace("liked your Retweet", "favorited your Retweet"));

		//German
		$(this).html($(this).html().trim().replace("gefällt Dein Tweet", "favorisierte deinen Tweet"));
		$(this).html($(this).html().trim().replace("gefällt einige Tweet", "favorisierte einige Tweet"));
		$(this).html($(this).html().trim().replace("gefällt ein Tweet", "favorisierte einen Tweet"));
		$(this).html($(this).html().trim().replace("gefällt ein Foto", "favorisierte einen Foto"));
		$(this).html($(this).html().trim().replace("gefällt Dein Retweet", "favorisierte deinen Retweet"));
	});

	//Change the "Liked" to "Favorited" in the web notification popup
	$(".WebToast-contentBox").each(function(index){
		//English
		$(this).html($(this).html().trim().replace("Like", "Favorite"));
		$(this).html($(this).html().trim().replace("like", "favorite"));

		//German
		$(this).html($(this).html().trim().replace("gefällt", "Favorisieren"));
		$(this).html($(this).html().trim().replace("gefällt", "Favorisieren"));
	});

	//Change thhe "Likes" title on the "Favorites" page
	$(".ProfileHeading-title").each(function(index){
		//English
		$(this).html($(this).html().trim().replace("Like", "Favorite"));

		//German
		$(this).html($(this).html().trim().replace("PERSONEN GEFÄLLT DAS", "Favoriten"));
	});
}

function replaceHeartsTwitter(){
	$(document.body).addClass("sh-nohearts");
}

function fixImageBugTwitter(){
	//Add image that Twitter stupidly removes when JS is run in the container...
	//Luckily they keep the link in a parent attribute so I can grab it
	var image = document.createElement("img");
	$(image).attr("alt", "Embedded image permalink");
	$(image).attr("style", "width: 100%; top: -15%;");
	//$(image).src =  $(".js-old-media-img-placeholder").parent().attr("data-image-url");
	$(image).attr("src", $(".OldMedia").find(".OldMedia-photoContainer, .js-old-photo").attr("data-image-url"));
	$(".js-old-media-img-placeholder").parent().append(image);
	$(".js-old-media-img-placeholder").remove();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function replaceTextTweetdeck(){
	//console.log("ooh mama");

	//Change the "user liked your tweet(s)" text on the notifications panel
	$(".nbfc").each(function(index){

		//English
		$(this).html($(this).html().trim().replace("liked", "favorited"));
		$(this).html($(this).html().trim().replace("liked your Tweet", "favorited your Tweet"));
		$(this).html($(this).html().trim().replace("liked some Tweet", "favorited some Tweet"));
		$(this).html($(this).html().trim().replace("liked a Tweet", "favorited a Tweet"));
		$(this).html($(this).html().trim().replace("liked a photo", "favorited a photo"));
		$(this).html($(this).html().trim().replace("liked your Retweet", "favorited your Retweet"));


		//German
		/*
		$(this).html($(this).html().trim().replace("gefällt", "favorisierte"));
		$(this).html($(this).html().trim().replace("gefällt Dein Tweet", "favorisierte deinen Tweet"));
		$(this).html($(this).html().trim().replace("gefällt einige Tweet", "favorisierte einige Tweet"));
		$(this).html($(this).html().trim().replace("gefällt ein Tweet", "favorisierte einen Tweet"));
		$(this).html($(this).html().trim().replace("gefällt ein Foto", "favorisierte einen Foto"));
		$(this).html($(this).html().trim().replace("gefällt Dein Retweet", "favorisierte deinen Retweet"));
		*/

	});

	//Change likes stat on tweetdeck profile
	$(".lst-profile, .cf").each(function(index){
		var profileFav = $(this).find(".js-item-launch")[5];

		//English
		$(profileFav).find(".txt-ellipsis").text("Favorites");

		//German
		//$(profileFav).find(".txt-ellipsis").text("Favoriten");
	});

	//Change like to favorite when inspecting tweet
	$(".stat-word, .txt-size-variable--10").each(function(index){

		//English
		$(this).html($(this).html().trim().replace("Like", "Favorite"));

		//German
		//$(this).html($(this).html().trim().replace("Gefällt mir", "Favorisieren"));
	});

	//Change popup text for favoriting
	$(".js-tweet, .tweet, .is-favorite").each(function(index){
		var unfavPar = $(this).find(".tweet-action-item")[2];

		//English
		$(unfavPar).find(".js-show-tip, .tweet-action[data-original-title*='Undo like']").attr("data-original-title", "Unfavorite");
		$(unfavPar).find(".js-show-tip, .tweet-action[data-original-title*='Undo like']").attr("title", "Unfavorite");

		//German
		/*
		$(unfavPar).find(".js-show-tip, .tweet-action[data-original-title*='Gefällt mir nicht mehr']").attr("data-original-title", "Entfavorisieren");
		$(unfavPar).find(".js-show-tip, .tweet-action[data-original-title*='Gefällt mir nicht mehr']").attr("title", "Entfavorisieren");
		*/
	});

	//Change popup text for unfavoriting
	$(".js-tweet, .tweet").each(function(index){
		var favPar = $(this).find(".tweet-action-item")[2];

		//English
		$(favPar).find(".js-show-tip, .tweet-action[data-original-title*='Like']").attr("data-original-title", "Favorite");
		$(favPar).find(".js-show-tip, .tweet-action[data-original-title*='Like']").attr("title", "Favorite");

		//German
		/*
		$(favPar).find(".js-show-tip, .tweet-action[data-original-title*='Gefällt mir']").attr("data-original-title", "Favorisieren");
		$(favPar).find(".js-show-tip, .tweet-action[data-original-title*='Gefällt mir']").attr("title", "Favorisieren");
		*/
	});
}

function replaceHeartsTweetdeck(){
	$(document.body).addClass("sh-nohearts");
}
