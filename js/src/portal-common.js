/*Resize the popup windows when browser width is bigger*/
var _startWidth;
var _thisId;
function resizeDialog() {
    /*Set the current open popup window element.*/
    var _this = osjs(".ui-dialog.ui-widget.ui-widget-content.ui-corner-all.Popup.ui-draggable");
    
    /*Verifies the change of _thisId.*/
    if ((_thisId == null) || (_thisId != _this.attr("id"))) {
        /*Get identifier attribute of this popup window.*/
        _thisId = _this.attr("id");
        _startWidth = _this.css("width");
    }
    
    /*Verifies if the browser window width is bigger than popup.*/
    if (osjs(window).width() < parseInt(_startWidth)) {
        _this.css({
            "left":"0%",
            "width":"99%"
        });
    }
    else {
        _this.css({
            "left":Math.abs((osjs(window).width() / 2) - (parseInt(_startWidth) / 2)) + "px",
            "width":_startWidth
        });
    }
}

osjs(document).ready(function () {
    resizeDialog();
    osjs(window).resize(function() {
        resizeDialog();
    });
});