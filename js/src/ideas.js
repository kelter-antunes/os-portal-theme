function refreshIdeaLikes(IdeaId, Likes, isLiked) {
    /*Element with or without class identifying if is liked*/
    $this = osjs(".IdeaLikeToRefresh_" + IdeaId);
    /*Children element with label and number of likes*/
    $target =  $this.children();
    
    /*If clicked idea is liked by the logged user we need to change the style of the same ideas in other list on the same page*/
    if (isLiked == "False") {
        /*In all classes update the style to make him "like" style and change label to "Like"*/
        $this.removeClass("liked");
        $target.children(".like-label").html("Like");
    }
    else {
     /*In all classes update the style to make him "liked" style and change label to "Liked"*/
        $this.addClass("liked");
        $target.children(".like-label").html("Liked");
    }
    /*In all classes update the the number of likes*/
    $target.children(".ribbon").html(Likes);
}