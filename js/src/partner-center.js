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
