function mutateTwitter(){$("button.ProfileTweet-actionButton.js-actionFavorite").each(function(t){$(this).find("div.js-tooltip[data-original-title*='Like']").attr("data-original-title","Favorite"),$(this).find("div.js-tooltip[data-original-title*='Like']").attr("title","Favorite")}),$("button.ProfileTweet-actionButtonUndo.js-actionFavorite").each(function(t){$(this).find("div.js-tooltip[data-original-title*='Undo like']").attr("data-original-title","Undo favorite"),$(this).find("div.js-tooltip[data-original-title*='Undo like']").attr("title","Undo favorite")}),$(".ProfileNav-label").each(function(t){$(this).html($(this).html().trim().replace("Likes","Favorites"))}),$("a.request-favorited-popup").each(function(t){$(this).html($(this).html().trim().replace("Like","Favorite")),$(this).html($(this).html().trim().replace("like","favorite"))}),$(".hide-text").each(function(t){$(this).text($(this).text().trim().replace("like","favorite"))}),$(".show-text").each(function(t){$(this).text($(this).text().trim().replace("like","favorite"))}),$(".stream-item-activity-line, .js-actionable-user, .stream-item-activity-line-notification").each(function(t){$(this).html($(this).html().trim().replace("liked your Tweet","favorited your Tweet")),$(this).html($(this).html().trim().replace("liked some Tweet","favorited some Tweet")),$(this).html($(this).html().trim().replace("liked a Tweet","favorited a Tweet")),$(this).html($(this).html().trim().replace("liked a photo","favorited a photo")),$(this).html($(this).html().trim().replace("liked your Retweet","favorited your Retweet"))}),$(".WebToast-contentBox").each(function(t){$(this).html($(this).html().trim().replace("Like","Favorite")),$(this).html($(this).html().trim().replace("like","favorite"))}),$(".ProfileHeading-title").each(function(t){$(this).html($(this).html().trim().replace("Like","Favorite"))})}function fixImageBugTwitter(){var t=document.createElement("img");$(t).attr("alt","Embedded image permalink"),$(t).attr("style","width: 100%; top: -15%;"),$(t).attr("src",$(".OldMedia").find(".OldMedia-photoContainer, .js-old-photo").attr("data-image-url")),$(".js-old-media-img-placeholder").parent().append(t),$(".js-old-media-img-placeholder").remove()}function mutateTweetdeck(){console.log("StarHeart: Refreshing TweetDeck..."),$(".nbfc").each(function(t){$(this).html($(this).html().trim().replace("liked","favorited")),$(this).html($(this).html().trim().replace("liked your Tweet","favorited your Tweet")),$(this).html($(this).html().trim().replace("liked some Tweet","favorited some Tweet")),$(this).html($(this).html().trim().replace("liked a Tweet","favorited a Tweet")),$(this).html($(this).html().trim().replace("liked a photo","favorited a photo")),$(this).html($(this).html().trim().replace("liked your Retweet","favorited your Retweet"))}),$(".lst-profile, .cf").each(function(t){var e=$(this).find(".js-item-launch")[5];$(e).find(".txt-ellipsis").text("Favorites")}),$(".stat-word, .txt-size-variable--10").each(function(t){$(this).html($(this).html().trim().replace("Like","Favorite"))}),$(".js-tweet, .tweet, .is-favorite").each(function(t){var e=$(this).find(".tweet-action-item")[2];$(e).find(".js-show-tip, .tweet-action[data-original-title*='Undo like']").attr("data-original-title","Unfavorite"),$(e).find(".js-show-tip, .tweet-action[data-original-title*='Undo like']").attr("title","Unfavorite")}),$(".js-tweet, .tweet").each(function(t){var e=$(this).find(".tweet-action-item")[2];$(e).find(".js-show-tip, .tweet-action[data-original-title*='Like']").attr("data-original-title","Favorite"),$(e).find(".js-show-tip, .tweet-action[data-original-title*='Like']").attr("title","Favorite")})}