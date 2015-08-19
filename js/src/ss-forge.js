/* Header_Popup WebBlock */
osjs(document).ready(function() {
    osjs(".component-icon-big").children().css("max-width","");
});
/* Forge_Install WebScreen */
function InstallApp(StringAppDataInstall){
    
    ForgeAPI.InstallApplication(StringAppDataInstall);
    return false;
}
/* MainFlow/Forge_Versions WebScreen */
function ApplicationStatus_HistoryPopUp(result, versionID){

  var appStatus = result;
    
   try{ 
            console.log('APP STATUS: ' + appStatus);
            //SET LINKs TO INVISIBLE
            $('.componentAction_' + versionID).addClass('Invisible');
                       
            if(appStatus == 'NotInstalled')
            {
                $('.TrueChangeChecking_' + versionID).addClass('Invisible');
                $('.InstallLnk_' + versionID).removeClass('Invisible');
            }
            else if(appStatus == 'OutDated'){
                $('.TrueChangeChecking_' + versionID).addClass('Invisible');
                $('.UpgradeLnk_' + versionID).removeClass('Invisible');
            }
            else if(appStatus == 'Installed'){
                $('.TrueChangeChecking_' + versionID).addClass('Invisible');
                $('.AlreadyInstalledLnk_' + versionID).removeClass('Invisible');
            }
            else if(appStatus == 'ChangedLocally'){
                $('.TrueChangeChecking_' + versionID).addClass('Invisible');
                $('.GoToForgeLnk_' + versionID).removeClass('Invisible');
            }    
            else if(appStatus == 'NewerVersionInstalled'){
                $('.TrueChangeChecking_' + versionID).addClass('Invisible');
                $('.GoToForgeLnk_' + versionID).removeClass('Invisible');
            }    
            else{
                $('.TrueChangeChecking_' + versionID).addClass('Invisible');
                $('.GoToForgeLnk_' + versionID).removeClass('Invisible');
            }  
        }
    catch(exception){
        console.log(exception);
    }
  }
  /* SSForge_WebBlocks_Utils/AddTeamMemberJSPopup WebBlock */
  function ShowValidationMessage(PopupMainContainer,ButtonId){    
    //SHOW CONFIRMATION MESSAGE WINDOW
    osjs('.popup-holder'+ButtonId).show();
    osjs('.MainBackground'+ButtonId).show();
    
    //CENTER CONFIRMATION MESSAGE WINDOW
    osjs("#" + PopupMainContainer).css({
        'top': (Math.abs(($(window).height() / 2) - ($("#" + PopupMainContainer).height() / 2))),
        'left': (Math.abs(($(window).width() / 2) - ($("#" + PopupMainContainer).width() / 2)))
    });
    
    return false;
}

function ValidateCancel(PopupMainContainer,ButtonId){
    //HIDE CONFIRMATION MESSAGE 
    osjs('.popup-holder'+ButtonId).hide();
    osjs('.MainBackground'+ButtonId).hide();
}

function ValidateConfirmation(PopupMainContainer,ButtonId,eventClick){
    //HIDE CONFIRMATION MESSAGE WINDOW
    osjs('.popup-holder'+ButtonId).hide();
    osjs('.MainBackground'+ButtonId).hide();
    
    
    if (eventClick != "") {
        document.getElementById(ButtonId).setAttribute("onclick",eventClick);
    }
    
    //osjs('#' + ButtonId).click();
    $('#' + ButtonId)[0].click();
    
    if (eventClick != "") {
       /*$('#' + ButtonId).attr("onclick","return ShowValidationMessage('" + PopupMainContainer + "','" + ButtonId + "')");*/
       document.getElementById(ButtonId).setAttribute("onclick","return ShowValidationMessage('" + PopupMainContainer + "','" + ButtonId + "')");
    }
    return true;
}

function move(tagEvent, tag) {
    var Jx = 0;
    var Jy = 0;
    var JiTopo = 20;
    var JiBase = 20;
    $("#" + tagEvent).css({
        'cursor':'move'
    });
    $(tag).css({"left":"0px", "top":"0px"});
    
    cliq = 0;
    
    $("#" + tagEvent).mousedown(function(cxy){
        JiTopo = Math.abs($(window).scrollLeft() - $("#" + tag).position().left);
        JiBase = Math.abs($(window).scrollTop() -  $("#" + tag).position().top);
        
        cliq = 0;
        
        Jx = Math.abs($(window).scrollLeft() - cxy.pageX);
        Jy = Math.abs($(window).scrollTop() - cxy.pageY);
        
        $(document).mousemove(function(e){
            $('body').css('cursor','move');
            cliq = 1;
            
            if (Math.abs($(window).scrollLeft() - $("#" + tag).position().left) > 0)
                $("#" + tag).css({"left":(JiTopo + (Math.abs($(window).scrollLeft() - e.pageX) - Jx))});
            else
                $("#" + tag).css({"left": 1});
            if (Math.abs($(window).scrollTop() -  $("#" + tag).position().top) > 0)
                $("#" + tag).css({"top":(JiBase + (Math.abs($(window).scrollTop() - e.pageY) - Jy))});
            else
                $("#" + tag).css({"top": 1});
            
            return false; // To object is not selected.
        });
        
        return false; // Prevent selection on drag.
    });

    $(document).mouseup(function(c){
        $(this).unbind('mousemove');
        $('body').css('cursor','default');
    });
 }
 /* SSForge_webBlocks_Utils/TermsAndConditionsJSPopup WebBlock */
 function ShowValidationMessage(PopupMainContainer,ButtonId){    
    //SHOW CONFIRMATION MESSAGE WINDOW
    osjs('.popup-holder'+ButtonId).show();
    osjs('.MainBackground'+ButtonId).show();
    
    //CENTER CONFIRMATION MESSAGE WINDOW
    osjs("#" + PopupMainContainer).css({
        'top': (Math.abs(($(window).height() / 2) - ($("#" + PopupMainContainer).height() / 2))),
        'left': (Math.abs(($(window).width() / 2) - ($("#" + PopupMainContainer).width() / 2)))
    });
    
    return false;
}

function ValidateCancel(PopupMainContainer,ButtonId){
    //HIDE CONFIRMATION MESSAGE 
    osjs('.popup-holder'+ButtonId).hide();
    osjs('.MainBackground'+ButtonId).hide();
}

function ValidateConfirmation(PopupMainContainer,ButtonId,eventClick){
    //HIDE CONFIRMATION MESSAGE WINDOW
    osjs('.popup-holder'+ButtonId).hide();
    osjs('.MainBackground'+ButtonId).hide();
    
    
    if (eventClick != "") {
        document.getElementById(ButtonId).setAttribute("onclick",eventClick);
    }
    
    //osjs('#' + ButtonId).click();
    $('#' + ButtonId)[0].click();
    
    if (eventClick != "") {
       /*$('#' + ButtonId).attr("onclick","return ShowValidationMessage('" + PopupMainContainer + "','" + ButtonId + "')");*/
       document.getElementById(ButtonId).setAttribute("onclick","return ShowValidationMessage('" + PopupMainContainer + "','" + ButtonId + "')");
    }
    return true;
}

function move(tagEvent, tag) {
    var Jx = 0;
    var Jy = 0;
    var JiTopo = 20;
    var JiBase = 20;
    $("#" + tagEvent).css({
        'cursor':'move'
    });
    $(tag).css({"left":"0px", "top":"0px"});
    
    cliq = 0;
    
    $("#" + tagEvent).mousedown(function(cxy){
        JiTopo = Math.abs($(window).scrollLeft() - $("#" + tag).position().left);
        JiBase = Math.abs($(window).scrollTop() -  $("#" + tag).position().top);
        
        cliq = 0;
        
        Jx = Math.abs($(window).scrollLeft() - cxy.pageX);
        Jy = Math.abs($(window).scrollTop() - cxy.pageY);
        
        $(document).mousemove(function(e){
            $('body').css('cursor','move');
            cliq = 1;
            
            if (Math.abs($(window).scrollLeft() - $("#" + tag).position().left) > 0)
                $("#" + tag).css({"left":(JiTopo + (Math.abs($(window).scrollLeft() - e.pageX) - Jx))});
            else
                $("#" + tag).css({"left": 1});
            if (Math.abs($(window).scrollTop() -  $("#" + tag).position().top) > 0)
                $("#" + tag).css({"top":(JiBase + (Math.abs($(window).scrollTop() - e.pageY) - Jy))});
            else
                $("#" + tag).css({"top": 1});
            
            return false; // To object is not selected.
        });
        
        return false; // Prevent selection on drag.
    });

    $(document).mouseup(function(c){
        $(this).unbind('mousemove');
        $('body').css('cursor','default');
    });
 }