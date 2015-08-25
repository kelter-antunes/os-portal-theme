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
            "left": "0%",
            "width": "99%"
        });
    } else {
        _this.css({
            "left": Math.abs((osjs(window).width() / 2) - (parseInt(_startWidth) / 2)) + "px",
            "width": _startWidth
        });
    }
}

osjs(document).ready(function() {
    resizeDialog();
    osjs(window).resize(function() {
        resizeDialog();
    });
});






/* <script to fix footer to bottom> */
$(document).ready(function() {
    if (window.innerHeight > $('#WebForm1').height()) {
        var val = parseInt(window.innerHeight - $('#WebForm1').height() + parseInt($('.footer-landscape').css('margin-top'), 10), 10);

        $('.footer-landscape').css('margin-top', val);
    }

});
$(window).resize(function() {
    if (window.innerHeight > $('#WebForm1').height()) {
        var val = parseInt(window.innerHeight - $('#WebForm1').height() + parseInt($('.footer-landscape').css('margin-top'), 10), 10);

        $('.footer-landscape').css('margin-top', val);
    }
});





/* MobileMenu/DropDownMenu.js tweaked */
$(function($) {
    var RichWidgets = (window.RichWidgets = window.RichWidgets || {});

    // configuration
    var rootSel = '.Menu_DropDownButton',
        primarySel = '.Menu_TopMenu',
        panelSel = '.Menu_DropDownPanel',
        openClass = 'open';


    // auxiliary stuff
    var caproot = $(document.body);
    var $openRoots = $([]);

    var openRoot = function($root) {
        $root.addClass(openClass);
        if (RichWidgets.DropDownMenus.customOpenFunction) {
            $root.find(panelSel).each(function() {
                RichWidgets.DropDownMenus.customOpenFunction(this);
            });
        } else {
            $root.find(panelSel).show();
        }
        $openRoots = $openRoots.add($root);
    };
    var closeRoot = function($root) {
        $root.removeClass(openClass);
        if (RichWidgets.DropDownMenus.customCloseFunction) {
            $root.find(panelSel).each(function() {
                RichWidgets.DropDownMenus.customCloseFunction(this);
            });
        } else {
            $root.find(panelSel).hide();
        }
        $openRoots = $openRoots.not($root);
    };

    // 1. a click in a primary link toggles its menu
    caproot.delegate(primarySel, "click", function(ev) {
        var $primary = $(this);
        var $root = $primary.closest(rootSel);
        if (!$root.length) {
            return;
        } // not our menus, bail out
        var $panel = $root.find(panelSel);
        if (!$panel.text().length) {
            return;
        } // menu without content

        if ($root.hasClass(openClass)) { // close it
            closeRoot($root);
        } else { // open it
            openRoot($root);
        }
        ev.preventDefault();
    });

    // 2. a click somewhere that's not a menu, closes all menus
    $(document.body).bind("click", function(ev) {
        var $inMenu = $(ev.target).closest(rootSel);
        $openRoots.not($inMenu).each(function() {
            var $root = $(this);
            if ($root.hasClass(openClass)) {
                closeRoot($root);
            }
        });
    });

    // 3. add the V thingie
    $(rootSel).has(panelSel + " a").find('.MenuItemArrow').each(function() {
        var $this = $(this);
        $this.first("a").append(' <span class="Menu_DropDownArrow"/>');
    });


    // 4. expose an API
    RichWidgets.DropDownMenus = {
        // close all currently open menus
        closeAllMenus: function() {
            $openRoots.each(function() {
                closeRoot($(this));
            });
        },
        // open menu
        toggleMenu: function(_root) {
            if (_root.hasClass(openClass)) { // close it
                closeRoot(_root);
            } else { // open it
                openRoot(_root);
            }
        },
        // specify a custom function that shows the menu panel
        // (possibly using a different effect)
        // arguments: HTMLElement to be shown 
        customOpenFunction: function(e) {
            $(e).slideDown(50);
        },
        // specify a custom function that hides the menu panel
        // (possibly using a different effect)
        // arguments: HTMLElement to be hidden
        customCloseFunction: null
    };
});


/* MobileMenu/MenuSlider.js */
$(function($) {
    var RichWidgets = (window.RichWidgets = window.RichWidgets || {});

    // constants and configuration
    var menuSelector = '.Application_Menu',
        togglerOverlayCls = 'MenuSlider_Toggler_Overlay',
        togglerSelector = '.MenuSlider_Toggler';

    // main toggling function
    var toggleMenu = function toggleMenu(e) {
        $('body').toggleClass('MenuSlider_IsOpen');
        $('body').toggleClass('no-scroll');
        if (RichWidgets.MenuSlider.onMenuStateChanged) {
            RichWidgets.MenuSlider.onMenuStateChanged();
        }
        e.stopPropagation()
    };

    if (!$(menuSelector).has('a').length) {
        // there are no menu items (e.g login page)
        $(togglerSelector).hide();
        return;
    }

    $(togglerSelector).bind('click', toggleMenu);

    var x = $('<div class="' + togglerOverlayCls + '">').bind('click', toggleMenu).bind('swiperight', toggleMenu);
    $('body').append(x);

    $('.Application_Menu').bind('swiperight', toggleMenu);

    // provide API
    RichWidgets.MenuSlider = {
        isMenuOpen: function() {
            return $('body').hasClass('MenuSlider_IsOpen');
        },
        toggleMenu: toggleMenu,
        onMenuStateChanged: null
    };
});


$(function() {
    $('.no-scroll').on('touchmove', function(event) {
        event.preventDefault();
    }, false);
});





/* ConfirmationMessage */
function ShowValidationMessage(PopupMainContainer, ButtonId) {
    osjs('.popup-holder' + ButtonId).show();
    osjs('.MainBackground' + ButtonId).show();

    /*Center the window*/
    osjs("#" + PopupMainContainer).css({
        'top': (Math.abs(($(window).height() / 2) - ($("#" + PopupMainContainer).height() / 2))),
        'left': (Math.abs(($(window).width() / 2) - ($("#" + PopupMainContainer).width() / 2)))
    });

    return false;
}

function ValidateCancel(PopupMainContainer, ButtonId) {
    osjs('.popup-holder' + ButtonId).hide();
    osjs('.MainBackground' + ButtonId).hide();
}

function ValidateConfirmation(PopupMainContainer, ButtonId, eventClick) {
    osjs('.popup-holder' + ButtonId).hide();
    osjs('.MainBackground' + ButtonId).hide();

    if (eventClick != "") {
        /*$('#' + ButtonId).attr("onclick",eventClick);*/
        document.getElementById(ButtonId).setAttribute("onclick", eventClick);
    }
    osjs('#' + ButtonId).click();
    if (eventClick != "") {
        /*$('#' + ButtonId).attr("onclick","return ShowValidationMessage('" + PopupMainContainer + "','" + ButtonId + "')");*/
        document.getElementById(ButtonId).setAttribute("onclick", "return ShowValidationMessage('" + PopupMainContainer + "','" + ButtonId + "')");
    }
    return true;
}
