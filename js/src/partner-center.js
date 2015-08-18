/* Blocks/BetterTabs WebBlock */
var RichWidgets_Tabs_ClientSide_onTabDisplayFunctions = new Array();
var RichWidgets_Tabs_ClientSide_containerIds = new Array();
var RichWidgets_Tabs_ClientSide_onTabShowFunction = null;

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for (var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property].indexOf(searchTerm) != -1) return i;
    }
    return -1;
}


function RichWidgets_Tabs_ClientSide_setInnerText(obj, text) {
    obj.innerText = text;
    obj.textContent = text;
}

function Tabs_ClientSide_Invalid_Use(header) {
    var errorElement = document.createElement("p");
    RichWidgets_Tabs_ClientSide_setInnerText(errorElement, "Invalid use of RichWidgets\\Tabs_ClientSide: The Tabs_ClientSide web block must be placed inside a container.");
    errorElement.style.color = "red";
    containerDiv.replaceChild(errorElement, header);
}

function RichWidgets_Tabs_ClientSide_bootstrap(headerId, blockRuntimeId, initialTab, onLoading, onLoaded, onTabDisplay, pageName, displayErrors) {
    var header = document.getElementById(headerId);
    var containerDiv = $(header).closest("div.Tabs_Wrapper")[0];

    if (typeof containerDiv == "undefined") {
        if (displayErrors) {
            Tabs_ClientSide_Invalid_Use(header);
        }
        return;
    }
    containerDiv.style.display = "none";

    var initFunc = new Function("RichWidgets_Tabs_ClientSide_init('" + headerId + "', '" + blockRuntimeId + "', '" + initialTab + "', '" + escape(onLoading) + "', '" + escape(onLoaded) + "', '" + escape(onTabDisplay) + "', '" + pageName + "', " + (displayErrors ? 'true' : 'false') + ");");

    $(initFunc);
}

function RichWidgets_Tabs_ClientSide_init(headerId, blockRuntimeId, initialTab, onLoading, onLoaded, onTabDisplay, pageName, displayErrors) {


    var URLHash = window.location.hash;
    var initialTabByUrlHash = $('.Tabs_Wrapper a[href=' + URLHash + ']').text();
    initialTab = initialTabByUrlHash;



    var header = document.getElementById(headerId);
    var containerDiv = $(header).closest("div.Tabs_Wrapper")[0];

    if (typeof containerDiv == "undefined") {
        if (displayErrors) {
            Tabs_ClientSide_Invalid_Use(header);
        }
        return;
    }
    var containerId = containerDiv.id;
    if (containerId == "" || containerId == undefined) {
        containerDiv.id = headerId + "_container";
        containerId = containerDiv.id;
    }

    RichWidgets_Tabs_ClientSide_onTabDisplayFunctions[pageName + ":" + blockRuntimeId] = new Function("title", unescape(onTabDisplay));
    RichWidgets_Tabs_ClientSide_containerIds[pageName + ":" + blockRuntimeId] = containerId;

    var onLoadingFunc = new Function("containerDiv", unescape(onLoading));
    onLoadingFunc(containerDiv);

    var children = RichWidgets_Tabs_ClientSide_getImmediateDivDescendants(containerDiv);
    var pos = 0;
    var initialTabPos = null;
    var firstTabPos = null;
    var lastTabPos = null;
    var html = "";
    var tabCount = 0;
    while (pos < children.length) {

        var childDiv = children[pos];
        if (childDiv.style.display != "none") {

            if (childDiv.title == "") {

                childDiv.style.display = "none";

            } else {

                if (childDiv.getAttribute("enabled") == "False" || childDiv.getAttribute("enabled") == "false") {

                    childDiv.style.display = "none";
                    childDiv.isActiveTab = "false";
                    childDiv.isDisabled2 = "true";

                    var dataUrl = $(childDiv).attr('data_url');
                    if (dataUrl === undefined) {
                        dataUrl = "#";
                    };


                    html = html + "<li class=\"Tabs_TabDisabled\" id=\"" + blockRuntimeId + "_li_" + pos + "\">" +
                        "<a style=\"display: none;\" class=\"Tabs_TabOff\" id=\"" + blockRuntimeId + "_a_" + pos + "\" href=\"" + dataUrl + "\" onclick=\" RichWidgets_Tabs_ClientSide_activate('" + blockRuntimeId + "', " + pos + ", '" + pageName + "'); return false;\">" + childDiv.title + "</a>" +
                        "<span class=\"Tabs_TabDisabled\" id=\"" + blockRuntimeId + "_span_" + pos + "\">" + childDiv.title + "</span>" +
                        "</li>";
                    childDiv.title2 = childDiv.title;
                    childDiv.title = "";

                } else {

                    if (initialTabPos == null && initialTab != "") {
                        if (childDiv.id == initialTab || childDiv.title == initialTab) {
                            initialTabPos = pos;
                        }
                    }

                    if (firstTabPos == null) {
                        firstTabPos = pos;
                    }
                    lastTabPos = pos;

                    childDiv.style.display = "none";
                    childDiv.isActiveTab = "false";
                    childDiv.isDisabled2 = "false";
                    tabCount = tabCount + 1;


                    var dataUrl = $(childDiv).attr('data_url');
                    if (dataUrl === undefined) {
                        dataUrl = "#";
                    };


                    html = html + "<li class=\"Tabs_TabOff\" id=\"" + blockRuntimeId + "_li_" + pos + "\">" +
                        "<a class=\"Tabs_TabOff\" id=\"" + blockRuntimeId + "_a_" + pos + "\" href=\"" + dataUrl + "\" onclick=\"javascript: RichWidgets_Tabs_ClientSide_activate('" + blockRuntimeId + "', " + pos + ", '" + pageName + "'); return false;\">" + childDiv.title + "</a>" +
                        "<span style=\"display: none;\" class=\"Tabs_TabOn\" id=\"" + blockRuntimeId + "_span_" + pos + "\">" + childDiv.title + "</span>" +
                        "</li>";
                    childDiv.title2 = childDiv.title;
                    childDiv.title = "";

                }
            }
        }
        childDiv = childDiv.nextSibling;
        pos = pos + 1;
    }

    if (initialTabPos == null) {

        if (initialTab != "") {

            if (displayErrors) {

                var errorElement = document.createElement("p");
                var initialTabDiv = document.getElementById(initialTab);

                var errorMessage;
                if (initialTabDiv == null) {
                    errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide: Can't find the initial tab ('" + initialTab + "').";
                } else if (initialTabDiv.isDisabled2 == "true") {
                    errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide: The initial tab must be an enabled tab.";
                } else if (initialTabDiv.title == "") {
                    errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide: The initial tab must have the 'title' extended property defined.";
                } else if (initialTabDiv.style.display == 'none') {
                    errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide: The initial tab must have the 'Display' property set to true.";
                } else {
                    errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide: The initial tab must be inside the tab area container.";
                }
                RichWidgets_Tabs_ClientSide_setInnerText(errorElement, errorMessage);

                errorElement.style.color = "red";
                containerDiv.appendChild(errorElement);
            }
        }
        initialTabPos = firstTabPos;
    }

    if (tabCount < 1) {
        if (displayErrors) {
            var errorElement = document.createElement("p");
            RichWidgets_Tabs_ClientSide_setInnerText(errorElement, "Invalid use of RichWidgets\\Tabs_ClientSide: You must have at least one tab.");
            errorElement.style.color = "red";
            containerDiv.appendChild(errorElement);
            containerDiv.style.display = "block";
        }
        return;
    }

    var newHeaderUl = document.createElement("ul");
    newHeaderUl.id = blockRuntimeId + "_ul";
    newHeaderUl.className = "Tabs_Header";
    newHeaderUl.innerHTML = html;
    var tmpNode = header;
    while (tmpNode.parentNode != containerDiv) {
        tmpNode = tmpNode.parentNode;
    }
    containerDiv.removeChild(tmpNode);

    containerDiv.insertBefore(newHeaderUl, containerDiv.firstChild);

    if (initialTab == "") {
        var cookie = RichWidgets_Tabs_ClientSide_getCookie(pageName + "_" + blockRuntimeId + "_InitialTab");
        if (cookie != null && cookie <= lastTabPos) {
            initialTabPos = cookie;
        }
    }

    containerDiv.style.display = "";

    var nodeList = Array.prototype.slice.call($('.Tabs_Wrapper a.Tabs_TabOff[href^=#]'));
    var URLHash = window.location.hash;
    initialTabPos = arrayObjectIndexOf(nodeList, URLHash, "href");



    RichWidgets_Tabs_ClientSide_activate(blockRuntimeId, initialTabPos, pageName);

    var onLoadedFunc = new Function("containerDiv", "headerUl", unescape(onLoaded));
    onLoadedFunc(containerDiv, newHeaderUl);
}

function RichWidgets_Tabs_ClientSide_activate(blockRuntimeId, tabPos, pageName) {

    var containerId = RichWidgets_Tabs_ClientSide_containerIds[pageName + ":" + blockRuntimeId];
    var containerDiv = document.getElementById(containerId);
    var children = RichWidgets_Tabs_ClientSide_getImmediateDivDescendants(containerDiv);
    var pos = 0
    var tabDiv;

    if (tabPos == "") {
        tabPos = 0;
    }

    while (pos < children.length) {
        var childDiv = children[pos];
        if (pos == tabPos) {
            tabDiv = childDiv;
        } else if (childDiv.isActiveTab == "true") {
            var tabA = document.getElementById(blockRuntimeId + "_a_" + pos);
            var tabSpan = document.getElementById(blockRuntimeId + "_span_" + pos);
            var tabLi = document.getElementById(blockRuntimeId + "_li_" + pos);
            RichWidgets_Tabs_ClientSide_hide(childDiv, tabA, tabSpan, tabLi);
        }
        childDiv = childDiv.nextSibling;
        pos = pos + 1;
    }

    var tabA = document.getElementById(blockRuntimeId + "_a_" + tabPos);
    var tabSpan = document.getElementById(blockRuntimeId + "_span_" + tabPos);
    var tabLi = document.getElementById(blockRuntimeId + "_li_" + tabPos);
    RichWidgets_Tabs_ClientSide_show(tabDiv, tabA, tabSpan, tabLi);

    RichWidgets_Tabs_ClientSide_setCookie(pageName + "_" + blockRuntimeId + "_InitialTab", tabPos);
    RichWidgets_Tabs_ClientSide_onTabDisplayFunctions[pageName + ":" + blockRuntimeId](tabSpan.innerHTML);
}

function RichWidgets_Tabs_ClientSide_AttachShowTabEvent(code) {
    RichWidgets_Tabs_ClientSide_onTabShowFunction = new Function(code);
}

function RichWidgets_Tabs_ClientSide_getOrdinal(n) {
    switch (n % 10) {
        case 1:
            return "st";
            break;
        case 2:
            return "nd";
            break;
        case 3:
            return "rd";
            break;
        default:
            return "th";
            break;
    }
}

function RichWidgets_Tabs_ClientSide_show(tabDiv, tabA, tabSpan, tabLi) {
    tabDiv.isActiveTab = "true";
    tabDiv.style.display = "";
    tabA.style.display = "none";
    tabSpan.style.display = "";
    tabLi.className = "Tabs_TabOn";

    window.location.hash = tabDiv.attributes.data_url.value;


    if (typeof RichWidgets_Tabs_ClientSide_onTabShowFunction == 'function') {
        RichWidgets_Tabs_ClientSide_onTabShowFunction();
    }
    Tab_Show_Callback_Execute();
}

function RichWidgets_Tabs_ClientSide_hide(tabDiv, tabA, tabSpan, tabLi) {
    tabDiv.isActiveTab = "false";
    tabDiv.style.display = "none";
    tabA.style.display = "";
    tabSpan.style.display = "none";
    tabLi.className = "Tabs_TabOff";
}

function RichWidgets_Tabs_ClientSide_enable(tabDiv, tabA, tabSpan, tabLi) {
    tabDiv.isDisabled2 = "false";
    tabA.style.display = "";
    tabSpan.style.display = "none";
    tabSpan.className = "Tabs_TabOn";
    tabLi.className = "Tabs_TabOff";
    Tab_Show_Callback_Execute();
}

function RichWidgets_Tabs_ClientSide_disable(tabDiv, tabA, tabSpan, tabLi) {
    tabDiv.isDisabled2 = "true";
    tabA.style.display = "none";
    tabSpan.style.display = "";
    tabSpan.className = "Tabs_TabDisabled";
    tabLi.className = "Tabs_TabDisabled";
}

function RichWidgets_Tabs_ClientSide_setCookie(name, value) {
    var path = document.location.href;
    path = path.replace(/\/\([^\/]*/, ""); //remove sessionId
    path = path.replace(/https?:\/\/[^\/]*/i, ""); //remove protocol and server
    path = path.replace(/[^\/]+\.[^\.\/]+/, ""); //remove filename
    name = name.replace(/:/g, "_"); // replace colon
    document.cookie = name + "=" + escape(value) + "; path=" + path;
}

registeredObservers = [];

//#599152 Allows external widgets to register a callback for the visible change tab event.
Tab_Show_Callback_Register = function(fn) {
    registeredObservers.push(fn);
}

Tab_Show_Callback_Execute = function() {
    var i;
    var length = registeredObservers.length;
    for (i = 0; i < length; i++) {
        registeredObservers[i]();
    }
}

function RichWidgets_Tabs_ClientSide_getCookie(name) {
    name = name.replace(/:/g, "_"); // replace colon
    var arg = name + "=";
    var i = 0;
    while (i < document.cookie.length) {
        var offset = i + arg.length;
        if (document.cookie.substring(i, offset) == arg) {
            var str = document.cookie.indexOf(";", offset);
            if (str == -1)
                str = document.cookie.length;
            return unescape(document.cookie.substring(offset, str));
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) {
            break;
        }
    }
    return null;
}

function RichWidgets_Tabs_ClientSide_ActivateTab(pageName, blockRuntimeId, tabToActivate, displayErrors) {

    var containerId = RichWidgets_Tabs_ClientSide_containerIds[pageName + ":" + blockRuntimeId];
    var containerDiv = document.getElementById(containerId);
    var children = RichWidgets_Tabs_ClientSide_getImmediateDivDescendants(containerDiv);
    var pos = 0;
    var tabPos = null;

    while (pos < children.length) {
        var childDiv = children[pos];
        if (childDiv.isDisabled2 == "false" && (childDiv.id == tabToActivate || childDiv.title2 == tabToActivate)) {
            tabPos = pos;
            break;
        }
        pos = pos + 1;
    }

    if (tabPos == null) {

        if (displayErrors) {

            var errorElement = document.createElement("p");
            var tabDiv = document.getElementById(tabToActivate);

            var errorMessage;
            if (tabDiv == null) {
                errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide_ActivateTab: Can't find the specified tab ('" + tabToActivate + "').";
            } else if (tabDiv.isDisabled2 == "true") {
                errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide_ActivateTab: The specified tab must be an enabled tab.";
            } else if (tabDiv.title == "") {
                errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide_ActivateTab: The specified tab must have the 'title' extended property defined.";
            } else if (tabDiv.style.display == 'none') {
                errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide_ActivateTab: The specified tab must have the 'Display' property set to true.";
            } else {
                errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide_ActivateTab: The specified tab must be inside the tab area container.";
            }

            RichWidgets_Tabs_ClientSide_setInnerText(errorElement, errorMessage);

            errorElement.style.color = "red";
            containerDiv.appendChild(errorElement);
        }

    } else if (childDiv.isActiveTab == "false") {
        RichWidgets_Tabs_ClientSide_activate(blockRuntimeId, tabPos, pageName);
    }
}

function RichWidgets_Tabs_ClientSide_EnableTab(pageName, blockRuntimeId, tabToEnable, displayErrors) {

    var containerId = RichWidgets_Tabs_ClientSide_containerIds[pageName + ":" + blockRuntimeId];
    var containerDiv = document.getElementById(containerId);
    var children = RichWidgets_Tabs_ClientSide_getImmediateDivDescendants(containerDiv);
    var pos = 0;
    var tabDiv = null;
    var tabPos = null;

    while (pos < children.length) {
        var childDiv = children[pos];
        if (childDiv.id == tabToEnable || childDiv.title2 == tabToEnable) {
            tabDiv = childDiv;
            tabPos = pos;
            break;
        }
        pos = pos + 1;
    }

    if (tabDiv == null) {

        if (displayErrors) {

            var errorElement = document.createElement("p");
            tabDiv = document.getElementById(tabToEnable);

            var errorMessage;
            if (tabDiv == null) {
                errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide_EnableTab: Can't find the specified tab ('" + tabToEnable + "').";
            } else if (tabDiv.title == "") {
                errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide_EnableTab: The specified tab must have the 'title' extended property defined.";
            } else if (tabDiv.style.display == 'none') {
                errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide_EnableTab: The specified tab must have the 'Display' property set to true.";
            } else {
                errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide_EnableTab: The specified tab must be inside the tab area container.";
            }

            RichWidgets_Tabs_ClientSide_setInnerText(errorElement, errorMessage);

            errorElement.style.color = "red";
            containerDiv.appendChild(errorElement);
        }

    } else if (childDiv.isDisabled2 == "true") {

        var tabA = document.getElementById(blockRuntimeId + "_a_" + tabPos);
        var tabSpan = document.getElementById(blockRuntimeId + "_span_" + tabPos);
        var tabLi = document.getElementById(blockRuntimeId + "_li_" + tabPos);
        RichWidgets_Tabs_ClientSide_enable(tabDiv, tabA, tabSpan, tabLi);
    }
}

function RichWidgets_Tabs_ClientSide_DisableTab(pageName, blockRuntimeId, tabToDisable, displayErrors) {

    var containerId = RichWidgets_Tabs_ClientSide_containerIds[pageName + ":" + blockRuntimeId];
    var containerDiv = document.getElementById(containerId);
    var children = RichWidgets_Tabs_ClientSide_getImmediateDivDescendants(containerDiv);
    var pos = 0;
    var tabDiv = null;
    var tabPos = null;

    while (pos < children.length) {

        var childDiv = children[pos];
        if (childDiv.isActiveTab == "false" && (childDiv.id == tabToDisable || childDiv.title2 == tabToDisable)) {
            tabDiv = childDiv;
            tabPos = pos;
            break;
        }
        pos = pos + 1;
    }

    if (tabDiv == null) {

        if (displayErrors) {

            var errorElement = document.createElement("p");
            tabDiv = document.getElementById(tabToDisable);

            var errorMessage;
            if (tabDiv == null) {
                errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide_DisableTab: Can't find the specified tab ('" + tabToDisable + "').";
            } else if (tabDiv.isActive == "true") {
                errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide_DisableTab: It's not possible to disabled the current active tab.";
            } else if (tabDiv.title == "") {
                errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide_DisableTab: The specified tab must have the 'title' extended property defined.";
            } else if (tabDiv.style.display == 'none') {
                errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide_DisableTab: The specified tab must have the 'Display' property set to true.";
            } else {
                errorMessage = "Invalid use of RichWidgets\\Tabs_ClientSide_DisableTab: The specified tab must be inside the tab area container.";
            }

            RichWidgets_Tabs_ClientSide_setInnerText(errorElement, errorMessage);

            errorElement.style.color = "red";
            containerDiv.appendChild(errorElement);
        }

    } else if (tabDiv.isDisabled2 == "false") {

        var tabA = document.getElementById(blockRuntimeId + "_a_" + tabPos);
        var tabSpan = document.getElementById(blockRuntimeId + "_span_" + tabPos);
        var tabLi = document.getElementById(blockRuntimeId + "_li_" + tabPos);
        RichWidgets_Tabs_ClientSide_disable(tabDiv, tabA, tabSpan, tabLi);
    }
}

function RichWidgets_Tabs_ClientSide_getImmediateDivDescendants(element) {
    var result = [];
    $(element).find(".Tabs_TabBody").not($(element).find(".Tabs_Wrapper .Tabs_TabBody")).each(function(i, elem) {
        result.push(elem);
    })
    return result;
}
/* Blocks/BetterTabs WebBlock expression */
RichWidgets_Tabs_ClientSide_bootstrap('" + Bootstrapper.Id + "',
                                        '" + BetterTabs_ClientSide.RuntimeId + "',
                                        '" + InitialActiveTab + "',
                                        '" + EncodeJavaScript(OnLoading) + "',
                                        '" + EncodeJavaScript(OnLoaded) + "',
                                        '" + EncodeJavaScript(OnTabActivation) + "',
                                        '" + GetPageName() + "',
                                        " + If(IgnoreErrors, "false", "true") + "
                                    );
/* Blocks/ButtonsGroup WebBlock */
    /* Button Group */
function buttonGroup() {

    function onFocusIn() {
        $(this).addClass('active');
    };
    
    function labelClick() {
        if (!$(this).hasClass('disabled')) {
            $(this).parent().children('.ButtonGroup_button').removeClass('active');
            $(this).addClass('active');
        }
    };
    
    function initButtonGroup() {
        $('.ButtonGroup:not(.BtnGroup)').each(function() {
            $(this).find('.ButtonGroup_button').on('click', labelClick);
            $(this).on('focusin', onFocusIn);
            $(this).addClass('BtnGroup');
            
            var radioButtons = $(this).find('input');            
            $(radioButtons).each(function(){
                if ($(this).is(':checked')) { $(this).parent().addClass('active'); }                
                if ($(this).is(':disabled')) { $(this).parent().addClass('disabled'); }
            });             
        });  
    };
    
    initButtonGroup();
    osAjaxBackend.BindAfterAjaxRequest(initButtonGroup);
};

$(document).ready(function() {
    buttonGroup();
});
/* Blocks/Collapse WebBlock */
/*
 * Collapse plugin for jQuery
 * --
 * source: http://github.com/danielstocks/jQuery-Collapse/
 * site: http://webcloud.se/jQuery-Collapse
 *
 * @author Daniel Stocks (http://webcloud.se)
 * Copyright 2013, Daniel Stocks
 * Released under the MIT, BSD, and GPL Licenses.
 */

(function($) {

  // Constructor
  function Collapse (el, options) {
    options = options || {};
    var _this = this,
      query = options.query || "> :even";

    $.extend(_this, {
      $el: el,
      options : options,
      sections: [],
      isAccordion : options.accordion || false,
      db : options.persist ? jQueryCollapseStorage(el.get(0).id) : false
    });

    // Figure out what sections are open if storage is used
    _this.states = _this.db ? _this.db.read() : [];

    // For every pair of elements in given
    // element, create a section
    _this.$el.find(query).each(function() {
      new jQueryCollapseSection($(this), _this);
    });

    // Capute ALL the clicks!
    (function(scope) {
      _this.$el.on("click", "[data-collapse-summary] " + (scope.options.clickQuery || ""),
        $.proxy(_this.handleClick, scope));

      _this.$el.bind("toggle close open",
        $.proxy(_this.handleEvent, scope));

    }(_this));
  }

  Collapse.prototype = {
    handleClick: function(e, state) {
      e.preventDefault();
      var state = state || "toggle"
      var sections = this.sections,
        l = sections.length;
      while(l--) {
        if($.contains(sections[l].$summary[0], e.target)) {
          sections[l][state]();
          break;
        }
      }
    },
    handleEvent: function(e) {
      if(e.target == this.$el.get(0)) return this[e.type]();
      this.handleClick(e, e.type);
    },
    open: function(eq) {
      if(isFinite(eq)) return this.sections[eq].open();
      $.each(this.sections, function(i, section) {
        section.open();
      })
    },
    close: function(eq) {
      if(isFinite(eq)) return this.sections[eq].close();
      $.each(this.sections, function(i, section) {
        section.close();
      })
    },
    toggle: function(eq) {
      if(isFinite(eq)) return this.sections[eq].toggle();
      $.each(this.sections, function(i, section) {
        section.toggle();
      })
    }
  };

  // Section constructor
  function Section($el, parent) {

    if(!parent.options.clickQuery) $el.wrapInner('<a href="#"/>');

    $.extend(this, {
      isOpen : false,
      $summary : $el.attr("data-collapse-summary",""),
      $details : $el.next(),
      options: parent.options,
      parent: parent
    });
    parent.sections.push(this);

    // Check current state of section
    var state = parent.states[this._index()];

    if(state === 0) {
      this.close(true)
    }
    else if(this.$summary.is(".open") || state === 1) {
      this.open(true);
    } else {
      this.close(true)
    }
  }

  Section.prototype = {
    toggle : function() {
      this.isOpen ? this.close() : this.open();
    },
    close: function(bypass) {
      this._changeState("close", bypass);
    },
    open: function(bypass) {
      var _this = this;
      if(_this.options.accordion && !bypass) {
        $.each(_this.parent.sections, function(i, section) {
          section.close()
        });
      }
      _this._changeState("open", bypass);
    },
    _index: function() {
      return $.inArray(this, this.parent.sections);
    },
    _changeState: function(state, bypass) {

      var _this = this;
      _this.isOpen = state == "open";
      if($.isFunction(_this.options[state]) && !bypass) {
        _this.options[state].apply(_this.$details);
      } else {
        _this.$details[_this.isOpen ? "show" : "hide"]();
      }

      _this.$summary.toggleClass("open", state != "close")
      _this.$details.attr("aria-hidden", state == "close");
      _this.$summary.attr("aria-expanded", state == "open");
      _this.$summary.trigger(state == "open" ? "opened" : "closed", _this);
      if(_this.parent.db) {
        _this.parent.db.write(_this._index(), _this.isOpen);
      }
    }
  };

  // Expose in jQuery API
  $.fn.extend({
    collapse: function(options, scan) {
      var nodes = (scan) ? $("body").find("[data-collapse]") : $(this);
      return nodes.each(function() {
        var settings = (scan) ? {} : options,
          values = $(this).attr("data-collapse") || "";
        $.each(values.split(" "), function(i,v) {
          if(v) settings[v] = true;
        });
        new Collapse($(this), settings);
      });
    }
  });

  //jQuery DOM Ready
  $(function() {
    $.fn.collapse(false, true);
  });

  // Expose constructor to
  // global namespace
  jQueryCollapse = Collapse;
  jQueryCollapseSection = Section;

})(window.jQuery);
/* Blocks/Collapse WebBlock expression */
$(document).ready(function() {
    $('#" + collapse_wrapper.Id + "').collapse({
        query: '.collapse-content .colapse-title',
        open: function() {
            this.slideDown(100);
        },
        close: function() {
            this.slideUp(100);
        },
        accordion: false
    });
   " +If(OpenFirst,"$('.collapse-title a').first().trigger('open');","")  + "
   " +If(OpenAll,"$('.collapse-title a').trigger('open');","")  + "
});
/* CommunityFlow/EditProfilePage WebScreen */
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip({
        'placement': 'bottom'
    });

    $('a.prevent-me').click(function(event) {
        event.preventDefault();
    });
});
/* CommunityFlow/Partner_AddMembers expression*/
$(function() {
    $('a[data-toggle=popover]').click(function(event) {
        event.preventDefault();
        $('.popover').toggle();
        $('.popover-text-email').focus();
    });
});
/* CommunityFlow/Partner_SalesFunnel WebBlock Checkbox onclick */
"$('.chb-view').prop('checked',false);
$(this).prop('checked',true);
$('#" + OnViewChange.Id + "').click();
return false;"