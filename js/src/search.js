/* CommunitySearchST Webscreen Expression */
$(document).ready(function() {
    $('#" + searchQueryHolder.Id + "').html( htmlEscape( $.hashParams().stq ));

    if ( $.queryParams().tag !== undefined && $.queryParams().tag !== '') {
        if ($.hashParams().stq !== '') {
            $('#" + queryAndTag.Id + "').show();
            $('#" + onlyTag.Id + "').hide();
        } else {
            $('#" + onlyTag.Id + "').show();
            $('#" + queryAndTag.Id + "').hide();
        }
    } else {
        $('#" + onlyTag.Id + "').hide();
        $('#" + queryAndTag.Id + "').hide();
    } 


    $('span.st-search-tag a').click(function(event) {
        event.preventDefault();
        var URL = window.location.href;
        var hashURL = $.hashParams().stq;
        var finalUrl = URL.split('?')[0] + '#stq=' + hashURL;
        window.location.href = finalUrl;
    });
});

/* CommunitySearchST Webscreen */
!function(a,b,c){"$:nomunge";function j(a){return a=a||location.href,"#"+a.replace(/^[^#]*#?(.*)$/,"$1")}var f,d="hashchange",e=document,g=a.event.special,h=e.documentMode,i="on"+d in b&&(h===c||h>7);a.fn[d]=function(a){return a?this.bind(d,a):this.trigger(d)},a.fn[d].delay=50,g[d]=a.extend(g[d],{setup:function(){return i?!1:(a(f.start),void 0)},teardown:function(){return i?!1:(a(f.stop),void 0)}}),f=function(){function n(){var c=j(),e=m(h);c!==h?(l(h=c,e),a(b).trigger(d)):e!==h&&(location.href=location.href.replace(/#.*/,"")+e),g=setTimeout(n,a.fn[d].delay)}var g,f={},h=j(),k=function(a){return a},l=k,m=k;return f.start=function(){g||n()},f.stop=function(){g&&clearTimeout(g),g=c},a.browser.msie&&!i&&function(){var b,c;f.start=function(){b||(c=a.fn[d].src,c=c&&c+j(),b=a('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){c||l(j()),n()}).attr("src",c||"javascript:0").insertAfter("body")[0].contentWindow,e.onpropertychange=function(){try{"title"===event.propertyName&&(b.document.title=e.title)}catch(a){}})},f.stop=k,m=function(){return j(b.location.href)},l=function(c,f){var g=b.document,h=a.fn[d].domain;c!==f&&(g.title=e.title,g.open(),h&&g.write('<script>document.domain="'+h+'"</script>'),g.close(),b.location.hash=c)}}(),f}()}(jQuery,this),!function(a){function b(a){return String(a).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var c=function(a){var b,c,d={};if(""===a)return{};for(b=0;b<a.length;b+=1)c=a[b].split("="),2===c.length&&(d[c[0]]=decodeURIComponent(c[1].replace(/\+/g," ")));return d};a.queryParams=function(){return c(window.location.search.substr(1).split("&"))},a.hashParams=function(){return c(window.location.hash.substr(1).split("&"))},window.Swiftype=window.Swiftype||{},Swiftype.root_url=Swiftype.root_url||"https://api.swiftype.com",Swiftype.pingUrl=function(a,b){var c=setTimeout(b,350),d=new Image;return d.onload=d.onerror=function(){clearTimeout(c),b()},d.src=a,!1},Swiftype.pingSearchResultClick=function(b,c,d){var e={t:(new Date).getTime(),engine_key:b,doc_id:c,q:Swiftype.currentQuery},f=Swiftype.root_url+"/api/v1/public/analytics/pc?"+a.param(e);Swiftype.pingUrl(f,d)},a.fn.swiftypeSearch=function(b){var b=a.extend({},a.fn.swiftypeSearch.defaults,b);return this.each(function(){var c=a(this),d=a.meta?a.extend({},b,c.data()):b;c.data("swiftype-config-search",d),c.selectedCallback=function(b){return function(c){var e=a(this);c.preventDefault(),Swiftype.pingSearchResultClick(d.engineKey,b.id,function(){window.location=e.attr("href")})}},c.registerResult=function(b,d){b.data("swiftype-item",d),a("a",b).click(c.selectedCallback(d))},c.getContentCache=function(){return a("#"+g)};var e=a(d.resultContainingElement),f=e.html(),g="st-content-cache",h=c.getContentCache(),i=function(a,b){location.hash="stq="+encodeURIComponent(a)+"&stp="+b},j=function(b,c){function i(a){if(void 0!==a){var b=a;return"function"==typeof b&&(b=b.call()),b}return void 0}c=a.extend({page:1},c);var j={};h.length||(e.after("<div id='"+g+"' style='display: none;'></div>"),h.html(f).hide()),d.loadingFunction(b,e),Swiftype.currentQuery=b,j.q=b,j.engine_key=d.engineKey,j.page=c.page,j.per_page=d.perPage,j.search_fields=i(d.searchFields),j.fetch_fields=i(d.fetchFields),j.facets=i(d.facets),j.filters=i(d.filters),j.document_types=i(d.documentTypes),j.functional_boosts=i(d.functionalBoosts),j.sort_field=i(d.sortField),j.sort_direction=i(d.sortDirection),j.spelling=i(d.spelling),a.getJSON(Swiftype.root_url+"/api/v1/public/engines/search.json?callback=?",j).success(l)};a(window).hashchange(function(){var b=a.hashParams(),d=a.queryParams();if(b.stq||d.tag)j(b.stq,{page:b.stp});else{var f=c.getContentCache();f.length&&(e.html(f.html()),f.remove())}});var k=c.parents("form");k&&k.bind("submit",function(a){a.preventDefault();var b=c.val();i(b,1)}),a(document).on("click","[data-hash][data-page]",function(b){b.preventDefault();var c=a(this);i(a.hashParams().stq,c.data("page"))}),a(document).on("click","[data-hash][data-spelling-suggestion]",function(b){b.preventDefault();var c=a(this);i(c.data("spelling-suggestion"),1)});var l=function(a){"function"==typeof d.preRenderFunction&&d.preRenderFunction.call(c,a),d.renderResultsFunction(c.getContext(),a),"function"==typeof d.postRenderFunction&&d.postRenderFunction.call(c,a)};c.getContext=function(){return{config:d,resultContainer:e,registerResult:c.registerResult}},a(window).hashchange()})};var d=function(b,c){var d,e=-1,f=b.config;a.each(c,function(a,b){b.num_pages>e&&(d=a,e=b.num_pages)});var g=c[d].current_page,h=c[d].num_pages;a(f.renderPaginationForType(d,g,h)).appendTo(b.resultContainer)},e=function(b,c){var e=b.resultContainer,f=b.config;e.html(""),a.each(c.records,function(c,d){a.each(d,function(d,g){b.registerResult(a(f.renderFunction(c,g)).appendTo(e),g)})}),d(b,c.info)},f=function(a,c){return'<div class="st-result"><h3 class="title"><a href="'+c.url+'" class="st-search-result-link">'+b(c.title)+"</a></h3></div>"},g=function(a,b){b.html('<p class="st-loading-message">loading...</p>')},h=function(b){var c=0,d=this.getContext().resultContainer,e=null;b.info&&a.each(b.info,function(a,b){c+=b.total_result_count,b.spelling_suggestion&&(e=b.spelling_suggestion.text)}),0===c&&d.html("<div id='st-no-results' class='st-no-results'><div class='row'><div class='span12 bold bot20'>Your search did not match any documents.</div><div class='span12'>Search tips:</div><div class='span12'>\u2022&nbsp; Make sure all words are spelled correctly.</div><div class='span12'>\u2022&nbsp; Make your search more general</div><div class='span12'>\u2022&nbsp; Try different words that mean the same thing</div></div></div>"),null!==e&&d.append('<div class="st-spelling-suggestion">Did you mean <a href="#" data-hash="true" data-spelling-suggestion="'+e+'">'+e+"</a>?</div>")},i=function(a,b,c){var d,e,f='<div class="st-page">';return 1!=b&&(d=b-1,f=f+'<a href="#" class="st-prev" data-hash="true" data-page="'+d+'">&laquo; previous</a>'),c>b&&(e=b+1,f=f+'<a href="#" class="st-next" data-hash="true" data-page="'+e+'">next &raquo;</a>'),f+="</div>"};a.fn.swiftypeSearch.defaults={attachTo:void 0,documentTypes:void 0,facets:void 0,filters:void 0,engineKey:void 0,searchFields:void 0,functionalBoosts:void 0,sortField:void 0,sortDirection:void 0,fetchFields:void 0,preRenderFunction:void 0,postRenderFunction:h,loadingFunction:g,renderResultsFunction:e,renderFunction:f,renderPaginationForType:i,perPage:10,spelling:"strict"}}(jQuery),function(a){function n(a){this.size=0,this.limit=a,this._keymap={}}var b=function(a){var b,c,d={};if(""===a)return{};for(b=0;b<a.length;b+=1)c=a[b].split("="),2===c.length&&(d[c[0]]=decodeURIComponent(c[1].replace(/\+/g," ")));return d};a.queryParams=function(){return b(window.location.search.substr(1).split("&"))},a.hashParams=function(){return b(window.location.hash.substr(1).split("&"))};var c=0;window.Swiftype=window.Swiftype||{},Swiftype.root_url=Swiftype.root_url||"https://api.swiftype.com",Swiftype.pingUrl=function(a,b){var c=setTimeout(b,350),d=new Image;return d.onload=d.onerror=function(){clearTimeout(c),b()},d.src=a,!1},Swiftype.pingAutoSelection=function(b,c,d,e){var f={t:(new Date).getTime(),engine_key:b,doc_id:c,prefix:d},g=Swiftype.root_url+"/api/v1/public/analytics/pas?"+a.param(f);Swiftype.pingUrl(g,e)},Swiftype.findSelectedSection=function(){function c(a){var b=a.replace(/\s+/g,"");return b=b.toLowerCase()}var b=a.hashParams().sts;b&&(b=c(b),a("h1, h2, h3, h4, h5, h6").each(function(){return $this=a(this),c($this.text()).indexOf(b)>=0?(this.scrollIntoView(!0),!1):void 0}))},Swiftype.htmlEscape=Swiftype.htmlEscape||function(a){return String(a).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},a.fn.swiftype=function(b){Swiftype.findSelectedSection();var b=a.extend({},a.fn.swiftype.defaults,b);return this.each(function(){var e=a(this),f=a.meta?a.extend({},b,e.data()):b;e.attr("autocomplete","off"),e.data("swiftype-config-autocomplete",f),e.submitted=!1,e.cache=new n(10),e.emptyQueries=[],e.isEmpty=function(b){return a.inArray(d(b),this.emptyQueries)>=0},e.addEmpty=function(a){e.emptyQueries.unshift(d(a))};var h=f.dropdownStylesFunction(e),i=a('<div class="swiftype-widget" />'),j=a("<div />").addClass(f.suggestionListClass).appendTo(i).css(h).hide();i.appendTo(f.autocompleteContainingElement);var k=a("<"+f.suggestionListType+" />").appendTo(j);e.data("swiftype-list",k),e.abortCurrent=function(){e.currentRequest&&e.currentRequest.abort()},e.showList=function(){m(f.disableAutocomplete)===!1&&j.show()},e.hideList=function(a){a?j.hide():setTimeout(function(){j.hide()},10)},e.focused=function(){return e.is(":focus")},e.submitting=function(){e.submitted=!0},e.listResults=function(){return a(f.resultListSelector,k)},e.activeResult=function(){return e.listResults().filter("."+f.activeItemClass).first()},e.prevResult=function(){var a=e.listResults(),b=a.index(e.activeResult()),c=b-1,d=a.eq(c);e.listResults().removeClass(f.activeItemClass),c>=0&&d.addClass(f.activeItemClass)},e.nextResult=function(){var a=e.listResults(),b=a.index(e.activeResult()),c=b+1,d=a.eq(c);e.listResults().removeClass(f.activeItemClass),c>=0&&d.addClass(f.activeItemClass)},e.selectedCallback=function(a){return function(){var b=e.val(),c=function(){f.onComplete(a,b)};Swiftype.pingAutoSelection(f.engineKey,a.id,b,c)}},e.registerResult=function(a,b){a.data("swiftype-item",b),a.click(e.selectedCallback(b)).mouseover(function(){e.listResults().removeClass(f.activeItemClass),a.addClass(f.activeItemClass)})},e.getContext=function(){return{config:f,list:k,registerResult:e.registerResult}};var l,o=!1;e.lastValue="",e.keyup(function(a){return o?(o=!1,void 0):(a.which>36&&a.which<41||16==a.which||(f.typingDelay>0?(clearTimeout(l),l=setTimeout(function(){g(e)},f.typingDelay)):g(e)),void 0)}),e.styleDropdown=function(){j.css(f.dropdownStylesFunction(e))},a(window).resize(function(){e.styleDropdown()}),e.keydown(function(a){e.styleDropdown();var b=e.activeResult();switch(a.which){case 13:0!==b.length&&k.is(":visible")?(a.preventDefault(),e.selectedCallback(b.data("swiftype-item"))()):e.currentRequest&&e.submitting(),e.hideList(),o=!0;break;case 38:a.preventDefault(),0===b.length?e.listResults().last().addClass(f.activeItemClass):e.prevResult();break;case 40:a.preventDefault(),0===b.length?e.listResults().first().addClass(f.activeItemClass):b!=e.listResults().last()&&e.nextResult();break;case 27:e.hideList(),o=!0;break;default:e.submitted=!1}}),e.keypress(function(a){13==a.which&&e.activeResult().length>0&&a.preventDefault()});var p=!1,q=!1;a(document).bind("mousedown.swiftype"+ ++c,function(){p=!0}),a(document).bind("mouseup.swiftype"+c,function(){p=!1,q&&(q=!1,e.hideList())}),e.blur(function(){p?q=!0:e.hideList()}),e.focus(function(){setTimeout(function(){e.select()},10),e.listResults().filter(":not(."+f.noResultsClass+")").length>0&&e.showList()})})};var d=function(b){return a.trim(b).toLowerCase()},e=function(b,c){b.abortCurrent();var e={},f=b.data("swiftype-config-autocomplete");e.q=c,e.engine_key=f.engineKey,e.search_fields=m(f.searchFields),e.fetch_fields=m(f.fetchFields),e.filters=m(f.filters),e.document_types=m(f.documentTypes),e.functional_boosts=m(f.functionalBoosts),e.sort_field=m(f.sortField),e.sort_direction=m(f.sortDirection),e.per_page=f.resultLimit;var g=Swiftype.root_url+"/api/v1/public/engines/suggest.json";b.currentRequest=a.ajax({type:"GET",dataType:"jsonp",url:g,data:e}).success(function(a){var e=d(c);return a.record_count>0?(b.cache.put(e,a.records),h(b,a.records,c),void 0):(b.addEmpty(e),b.data("swiftype-list").empty(),b.hideList(),void 0)})},f=function(a,b){var c=d(b);if(a.isEmpty(c))return a.data("swiftype-list").empty(),a.hideList(),void 0;var f=a.cache.get(c);f?h(a,f,b):e(a,b)},g=function(b){var c=b.val();if(c!==b.lastValue)return b.lastValue=c,""===a.trim(c)?(b.data("swiftype-list").empty(),b.hideList(),void 0):("undefined"!=typeof b.data("swiftype-config-autocomplete").engineKey&&f(b,c),void 0)},h=function(a,b){var d=a.data("swiftype-list"),e=a.data("swiftype-config-autocomplete");d.empty(),a.hideList(!0),e.resultRenderFunction(a.getContext(),b);var f=a.listResults().length;(f>0&&a.focused()||void 0!==e.noResultsMessage)&&(a.submitted?a.submitted=!1:a.showList())},i=function(b,c){var d=b.list,e=b.config;a.each(c,function(c,f){a.each(f,function(f,g){b.registerResult(a("<li>"+e.renderFunction(c,g)+"</li>").appendTo(d),g)})})},j=function(a,b){return'<p class="title">'+Swiftype.htmlEscape(b.title)+"</p>"},k=function(a){window.location=a.url},l=function(b){var c=b.data("swiftype-config-autocomplete"),d=c.attachTo?a(c.attachTo):b,e=d.offset(),f={position:"absolute","z-index":9999,top:e.top+d.outerHeight()+1,left:e.left};return c.setWidth&&(f.width=d.outerWidth()-2),f},m=function(a){if(void 0!==a){var b=a;return"function"==typeof b&&(b=b.call()),b}return void 0};n.prototype.put=function(a,b){var c={key:a,value:b};return this._keymap[a]=c,this.tail?(this.tail.newer=c,c.older=this.tail):this.head=c,this.tail=c,this.size===this.limit?this.shift():(this.size++,void 0)},n.prototype.shift=function(){var a=this.head;return a&&(this.head.newer?(this.head=this.head.newer,this.head.older=void 0):this.head=void 0,a.newer=a.older=void 0,delete this._keymap[a.key]),a},n.prototype.get=function(a,b){var c=this._keymap[a];if(void 0!==c)return c===this.tail?c.value:(c.newer&&(c===this.head&&(this.head=c.newer),c.newer.older=c.older),c.older&&(c.older.newer=c.newer),c.newer=void 0,c.older=this.tail,this.tail&&(this.tail.newer=c),this.tail=c,b?c:c.value)},n.prototype.remove=function(a){var b=this._keymap[a];if(b)return delete this._keymap[b.key],b.newer&&b.older?(b.older.newer=b.newer,b.newer.older=b.older):b.newer?(b.newer.older=void 0,this.head=b.newer):b.older?(b.older.newer=void 0,this.tail=b.older):this.head=this.tail=void 0,this.size--,b.value},n.prototype.clear=function(){this.head=this.tail=void 0,this.size=0,this._keymap={}},n.prototype.keys="function"==typeof Object.keys?function(){return Object.keys(this._keymap)}:function(){var a=[];for(var b in this._keymap)a.push(b);return a},a.fn.swiftype.defaults={activeItemClass:"active",attachTo:void 0,documentTypes:void 0,filters:void 0,engineKey:void 0,searchFields:void 0,functionalBoosts:void 0,sortField:void 0,sortDirection:void 0,fetchFields:void 0,noResultsClass:"noResults",noResultsMessage:void 0,onComplete:k,resultRenderFunction:i,renderFunction:j,dropdownStylesFunction:l,resultLimit:void 0,suggestionListType:"ul",suggestionListClass:"autocomplete",resultListSelector:"li",setWidth:!0,typingDelay:80,disableAutocomplete:!1,autocompleteContainingElement:"body"}}(jQuery);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function htmlEscape(str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

var customRendererSearch = function(documentType, item) {
    var snippet = item.highlight['body'];
    if (snippet === undefined) {
        snippet = item['body'].substring(0, 300);
    }
    var out = '<div class="st-result"><h4 class="title"><a href="' + item['url'] + '" class="st-search-result-link">' + item['title'] + '</a></h4><div class="st-metadata"><span class="st-url">' + item['url'] + '</span><span class="st-snippet">' + snippet + '</span></div></div>';

    return out;
};

var customRenderAutoComplete = function(document_type, item) {
    var out = '<p class="title">' + item['title'] + '</p>';
    if (item.highlight.sections) {
        var i = '<span class="section">' + item.highlight.sections + "</span>";
        out = out.concat('<p class="sections">' + i + "</p>");
    }

    return out;
};

var reloadResults = function() {
    $(window).hashchange();
};

var searchConfig = {
    type: undefined,
    tags: undefined
};

var readFilters = function() {
    if (getParameterByName('tag') !== '') {
        return {
            page: {
                type: window.searchConfig.type,
                tags: getParameterByName('tag')
            }
        };
    } else {
        return {
            page: {
                type: window.searchConfig.type
            }
        };

    }
};


/** st init **/
$(function() {

    if($.queryParams().active !== undefined){

            var activeFilter = $.queryParams().active;
            var $this = $("[data-filter-type='" + activeFilter+"']");
            
            $(".st-search .link-tab").removeClass("active");
            $this.addClass("active");
            window.searchConfig.type = activeFilter;
            reloadResults();
    }
    
    $('.st-search .link-tab').on('click', function(e) {
        e.preventDefault();

        var dataType = $(this).attr('data-filter-type');

        $('.st-search .link-tab').removeClass('active');
        $(this).addClass('active');

        if (dataType !== 'all') {
            window.searchConfig.type = dataType;
        } else {
            window.searchConfig.type = undefined;
        };
        reloadResults();
    });

    $(".st-search-input").keydown(function(ev) {
        if (ev.which === 13 && !$('.autocomplete li.active').is(':visible')) {
            window.location = '/search/#stq=' + $(this).val() + '&stp=1';
            $(".st-search-input-big").val($(this).val());
        };
    });

    $(".st-search-input-big").keydown(function(ev) {
        if (ev.which === 13 && !$('.autocomplete li.active').is(':visible')) {
            if ($(this).val().indexOf('tag:') === -1) {
                ev.preventDefault();
                if ($.queryParams.tag !== undefined) {
                    window.location = '/search/#stq=' + $(this).val() + '&stp=1';
                } else {
                    window.location.hash = '#stq=' + $(this).val() + '&stp=1';
                    $(".st-search-input").val($(this).val());
                    $('.searchQueryHolder').html(htmlEscape($.hashParams().stq));
                };
            };

        };
    });

    if ($.hashParams().stq !== "") {
        $(".st-search-input").val($.hashParams().stq);
        $(".st-search-input-big").val($.hashParams().stq);
    };

    $('.st-search-input').swiftypeSearch({
        resultContainingElement: '.st-results-container',
        engineKey: 'GZhgtDYXiyvDjz48t2SP',
        renderFunction: customRendererSearch,
        perPage: 10,
        resultPageURL: '/community/st_search.aspx',
        filters: readFilters
    });


});
/* CommunityLicensesList WebBlock */
function ChangeToNameEditionMode(NameDiv, EditNameDiv){
    osjs('#' + NameDiv).hide();
    osjs('#' + EditNameDiv).show();
    return false;
}