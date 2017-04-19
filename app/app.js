(function() {
  "use strict";
  return {
    initialize: function() {
      console.log("Aishik Saha");
      // Generate low probability hash
      function makeid(){
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for( var i=0; i < 10; i++ ){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}		
		return text;
	  }
      if(page_type == "ticket") {
        var requesterName = domHelper.ticket.getTicketInfo()
          .helpdesk_ticket.requester_name;
        jQuery(this.$container).find('#apptext').text("Share this link with " + requesterName + " to start a video call");
		var hash = makeid();
		var url = "https://appear.in/" + hash;
		jQuery(this.$container).find('#appear').text(url);
      }
      else if(page_type == "contact"){
        var agentName = domHelper.contact.getContactInfo().user.name;
        var hash = makeid();
		var url = "https://appear.in/" + hash;
        jQuery(this.$container).find('#apptext').text("Share this link to video call with " + agentName);
        jQuery(this.$container).find('#appear').text(url);
      }

    }
  };
})();

/*
{%comment%}

## Help: Using iparam (​installation parameters) in code

iparam: The ​settings that you want your users to configure when installing the
app.

iparam definition is made in config/iparam_en.yml file. To use the defined
iparam in code, use Liquid notation like:

- {{iparam.username}}
- {{iparam.country}}

{%endcomment%}
*/
