this["JST"] = this["JST"] || {};

this["JST"]["room-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <input type=\"hidden\" name=\"room_idx\" value=\""
    + alias1(((helper = (helper = lookupProperty(helpers,"room_idx") || (depth0 != null ? lookupProperty(depth0,"room_idx") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"room_idx","hash":{},"data":data,"loc":{"start":{"line":11,"column":64},"end":{"line":11,"column":76}}}) : helper)))
    + "\">\n                    <input type=\"hidden\" name=\"id\" value=\""
    + alias1(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"room") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\">\n";
},"3":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <button class=\"add-room-button btn btn-primary\">"
    + container.escapeExpression((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Add new room",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":41,"column":64},"end":{"line":41,"column":84}}}))
    + "</button>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <button class=\"update-room-button btn btn-primary\">"
    + container.escapeExpression((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Update",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":43,"column":67},"end":{"line":43,"column":81}}}))
    + "</button>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"modal\" id=\"add-room-modal\">\n    <form name=\"room_form\" class=\"form-horizontal\" role=\"form\" id=\"add-room-form\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Add new room",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":7,"column":40},"end":{"line":7,"column":60}}}))
    + "</h4>\n            </div>\n            <div class=\"modal-body\">\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_room") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":20},"end":{"line":13,"column":31}}})) != null ? stack1 : "")
    + "                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Name",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":15,"column":62},"end":{"line":15,"column":74}}}))
    + "</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? lookupProperty(depth0,"room") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\" class=\"form-control\" id=\"room-form-name\" name=\"name\" required placeholder=\""
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"e.g. seminar room 1",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":17,"column":144},"end":{"line":17,"column":171}}}))
    + "\">\n                        </div>\n                    </div> \n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Capacity",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":21,"column":62},"end":{"line":21,"column":78}}}))
    + "</label>\n                        <div class=\"col-sm-5\">\n                            <input value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? lookupProperty(depth0,"room") : depth0)) != null ? lookupProperty(stack1,"capacity") : stack1), depth0))
    + "\" type=\"number\" class=\"form-control\" integer min=1 max=1000 name=\"capacity\" required>\n                        </div>\n                    </div> \n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Video conference URL",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":27,"column":62},"end":{"line":27,"column":90}}}))
    + "</label>\n                        <div class=\"col-sm-9\">\n                            <input value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? lookupProperty(depth0,"room") : depth0)) != null ? lookupProperty(stack1,"confurl") : stack1), depth0))
    + "\" type=\"url\" class=\"form-control\" name=\"confurl\">\n                        </div>\n                    </div> \n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Description",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":33,"column":62},"end":{"line":33,"column":81}}}))
    + "</label>\n                        <div class=\"col-sm-9\">\n                            <textarea class=\"form-control\" maxlength=100 name=\"description\" placeholder=\""
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"e.g. beamer available",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":35,"column":105},"end":{"line":35,"column":134}}}))
    + "\">"
    + alias3(alias4(((stack1 = (depth0 != null ? lookupProperty(depth0,"room") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</textarea>\n                        </div>\n                    </div> \n            </div>\n            <div class=\"modal-footer\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_room") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":40,"column":16},"end":{"line":44,"column":23}}})) != null ? stack1 : "")
    + "                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Close",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":45,"column":83},"end":{"line":45,"column":96}}}))
    + "</button>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n    </form>\n</div><!-- /.modal -->\n";
},"useData":true});

this["JST"]["session-modal"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"modal\" id=\"edit-session-modal\">\n    <form name=\"session_form\" class=\"form-horizontal\" role=\"form\" id=\"edit-session-form\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Edit Session",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":7,"column":40},"end":{"line":7,"column":60}}}))
    + "</h4>\n            </div>\n            <div class=\"modal-body\">\n                    <input type=\"hidden\" name=\"session_idx\" value=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"session_idx") || (depth0 != null ? lookupProperty(depth0,"session_idx") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"session_idx","hash":{},"data":data,"loc":{"start":{"line":10,"column":67},"end":{"line":10,"column":82}}}) : helper)))
    + "\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Title",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":12,"column":62},"end":{"line":12,"column":75}}}))
    + "</label>\n                        <div class=\"col-sm-8\">\n                            <input \n                            	name=\"title\" required \n                            	type=\"text\" \n                            	id=\"ac-title\" \n                            	class=\"form-control\" \n                            	value=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":19,"column":36},"end":{"line":19,"column":45}}}) : helper)))
    + "\"\n                            	placeholder=\""
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"enter the title of the session",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":20,"column":42},"end":{"line":20,"column":80}}}))
    + "\">\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Description",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":24,"column":62},"end":{"line":24,"column":81}}}))
    + "</label>\n                        <div class=\"col-sm-8\">\n                            <textarea \n                            	class=\"form-control\" \n                            	rows=10\n                            	id=\"session-description\"\n                            	name=\"description\"\n                            	placeholder=\""
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"The description of the session",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":31,"column":42},"end":{"line":31,"column":80}}}))
    + "\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":31,"column":82},"end":{"line":31,"column":97}}}) : helper)))
    + "</textarea>\n                        </div>\n                    </div> \n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Speaker / Moderator",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":35,"column":62},"end":{"line":35,"column":89}}}))
    + "</label>\n                        <div class=\"col-sm-8\">\n                        	<input \n                        		id=\"moderator\"\n                        		name=\"moderator\"\n                        		type=\"text\"\n                        		value=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"moderator") || (depth0 != null ? lookupProperty(depth0,"moderator") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"moderator","hash":{},"data":data,"loc":{"start":{"line":41,"column":33},"end":{"line":41,"column":46}}}) : helper)))
    + "\"\n                        		class=\"form-control\"\n                        		>\n                            <div class=\"help-block\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Please press enter after entering a name to make it permanent",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":44,"column":52},"end":{"line":44,"column":122}}}))
    + "</div>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"How many people are interested in this session?",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":48,"column":62},"end":{"line":48,"column":117}}}))
    + "</label>\n                        <div class=\"col-sm-3\">\n                            <input \n                                id=\"interested\"\n                                name=\"interested\"\n                                type=\"text\"\n                                size=3\n                                value=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"interested") || (depth0 != null ? lookupProperty(depth0,"interested") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"interested","hash":{},"data":data,"loc":{"start":{"line":55,"column":39},"end":{"line":55,"column":53}}}) : helper)))
    + "\"\n                                class=\"form-control\"\n                                >\n                        </div>\n                    </div> \n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Video Conference URL",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":61,"column":62},"end":{"line":61,"column":90}}}))
    + "</label>\n                        <div class=\"col-sm-8\">\n                            <input \n                            	name=\"confurl\"  \n                            	type=\"text\" \n                            	id=\"ac-title\" \n                            	class=\"form-control\" \n                            	value=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"confurl") || (depth0 != null ? lookupProperty(depth0,"confurl") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"confurl","hash":{},"data":data,"loc":{"start":{"line":68,"column":36},"end":{"line":68,"column":47}}}) : helper)))
    + "\"\n                            	placeholder=\""
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"https://...",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":69,"column":42},"end":{"line":69,"column":61}}}))
    + "\">\n                        </div>\n                    </div>\n\n            </div>\n            <div class=\"modal-footer\">\n                <button id=\"update-session-button\" class=\"btn btn-primary\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Update",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":75,"column":75},"end":{"line":75,"column":89}}}))
    + "</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Close",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":76,"column":83},"end":{"line":76,"column":96}}}))
    + "</button>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n    </form>\n</div><!-- /.mo";
},"useData":true});

this["JST"]["sessionboard"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"data") || (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"data","hash":{},"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":2,"column":8}}}) : helper)))
    + "\n<div class=\"table-responsive\">\n    <table class=\"table table-bordered sessiontable\">\n        <colgroup>\n            <col width=\"10%\">\n            <col ng-repeat=\"room in rooms | slice:1:10000\" width=\"{[{90/rooms.length}]}%\">\n        </colgroup>\n        <thead>\n            <tr id=\"roomcontainment\" ui-sortable=\"sortableOptions\" ng-model=\"rooms\">\n                <td></td>\n                <td class=\"sorted room-slot\" ng-repeat=\"room in rooms | slice:1:10000\" data-id=\"{[{room.id}]}\">\n                    <h5 class=\"room-name\">{[{room.name}]}</h5>\n                    <div class=\"room-actions\">\n                    </div>\n                    <small>{[{room.description}]}</small><br>\n                    <small>{[{room.capacity}]} persons</small>\n                </td>\n                <td class=\"not-sortable\">\n                    \n                </td>\n            </tr>\n        </thead>\n    </table>\n</div>\n";
},"useData":true});

this["JST"]["sessiontest"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <col width=\""
    + container.escapeExpression(container.lambda((depths[1] != null ? lookupProperty(depths[1],"colwidth") : depths[1]), depth0))
    + "%\">\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <th class=\"sorted room-slot\" data-id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":16,"column":54},"end":{"line":16,"column":60}}}) : helper)))
    + "\" id=\"room-"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":16,"column":71},"end":{"line":16,"column":77}}}) : helper)))
    + "\">\n                    <h5 class=\"room-name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":17,"column":42},"end":{"line":17,"column":50}}}) : helper)))
    + "</h5>\n                    <div class=\"room-actions\">\n                        <a data-index=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":19,"column":39},"end":{"line":19,"column":49}}}) : helper)))
    + "\" data-confirm=\""
    + alias4((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Are you sure?",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":19,"column":65},"end":{"line":19,"column":86}}}))
    + "\" class=\"del-room-button btn btn-xs btn-danger\" title=\""
    + alias4((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"delete room",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":19,"column":141},"end":{"line":19,"column":160}}}))
    + "\" href=\"#\"><i class=\"fa fa-trash\"></i></a>\n                        <a data-index=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":20,"column":39},"end":{"line":20,"column":49}}}) : helper)))
    + "\" class=\"edit-room-modal-button btn btn-xs btn-info\" title=\"edit room\" href=\"#\" ><i class=\"fa fa-pencil\"></i></a>\n                        <span title=\""
    + alias4((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"drag to sort this list",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":21,"column":37},"end":{"line":21,"column":67}}}))
    + "\" class=\"btn btn-xs btn-info\"><i class=\"fa fa-arrows\"></i></span>\n                    </div>\n                    <small>"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":23,"column":27},"end":{"line":23,"column":42}}}) : helper)))
    + "</small><br />\n                    <small>"
    + alias4(((helper = (helper = lookupProperty(helpers,"capacity") || (depth0 != null ? lookupProperty(depth0,"capacity") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"capacity","hash":{},"data":data,"loc":{"start":{"line":24,"column":27},"end":{"line":24,"column":39}}}) : helper)))
    + " "
    + alias4((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"persons",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":24,"column":40},"end":{"line":24,"column":55}}}))
    + "</small>\n                </th>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <tr class=\"sorted "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"blocked") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":34},"end":{"line":31,"column":62}}})) != null ? stack1 : "")
    + "\">\n                    <th class=\"time-slot\">\n                        <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":33,"column":30},"end":{"line":33,"column":38}}}) : helper)))
    + "</span>\n                        <a  href=\"#\" \n                            data-toggle=\"tooltip\" \n                            data-index=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":36,"column":40},"end":{"line":36,"column":50}}}) : helper)))
    + "\"\n                            title=\""
    + alias4((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"delete timeslot",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":37,"column":35},"end":{"line":37,"column":58}}}))
    + "\" \n                            class=\"pull-right btn btn-xs btn-danger del-timeslot-button\"><i class=\"fa fa-trash\"></i></a>\n                    </th>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"slots") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":40,"column":20},"end":{"line":64,"column":29}}})) != null ? stack1 : "")
    + "                </tr>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "danger";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <td class=\"sessionslot "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"blocked") : depths[1]),{"name":"unless","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":41,"column":43},"end":{"line":41,"column":83}}})) != null ? stack1 : "")
    + "\"\n                        id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"sid") || (depth0 != null ? lookupProperty(depth0,"sid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sid","hash":{},"data":data,"loc":{"start":{"line":42,"column":28},"end":{"line":42,"column":35}}}) : helper)))
    + "\"\n                        data-id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"_id") || (depth0 != null ? lookupProperty(depth0,"_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data,"loc":{"start":{"line":43,"column":33},"end":{"line":43,"column":40}}}) : helper)))
    + "\">\n\n                        <h5>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":45,"column":28},"end":{"line":45,"column":37}}}) : helper)))
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"interested") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":24},"end":{"line":48,"column":31}}})) != null ? stack1 : "")
    + "                        </h5>\n                        <div class=\"description\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":50,"column":49},"end":{"line":50,"column":64}}}) : helper)))
    + "</div>\n                        <div class=\"moderators\">\n                            "
    + alias4(((helper = (helper = lookupProperty(helpers,"moderator") || (depth0 != null ? lookupProperty(depth0,"moderator") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"moderator","hash":{},"data":data,"loc":{"start":{"line":52,"column":28},"end":{"line":52,"column":41}}}) : helper)))
    + "\n                        </div>\n\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"blocked") : depths[1]),{"name":"unless","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":55,"column":24},"end":{"line":61,"column":35}}})) != null ? stack1 : "")
    + "\n                    </td>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "enabled";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            ("
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"interested") || (depth0 != null ? lookupProperty(depth0,"interested") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"interested","hash":{},"data":data,"loc":{"start":{"line":47,"column":29},"end":{"line":47,"column":43}}}) : helper)))
    + ")\n";
},"13":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"pull-right slot-actions\">\n                            <span class=\"edit-session-button btn btn-primary btn-xs\"><i class=\"fa fa-pencil\"></i> "
    + container.escapeExpression((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Edit",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":57,"column":114},"end":{"line":57,"column":126}}}))
    + "</span>\n                            <span class=\"del-session-button text-danger\"><i class=\"fa fa-trash\"></i></span>\n                            <span><i class=\"move-session-handle fa fa-arrows\"></i></span>\n                        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"table-responsive\">\n    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"version") || (depth0 != null ? lookupProperty(depth0,"version") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data,"loc":{"start":{"line":2,"column":7},"end":{"line":2,"column":18}}}) : helper)))
    + "</p>\n    <table class=\"table table-bordered\">\n        <colgroup>\n            <col width=\"10%\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"rooms") : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":12},"end":{"line":8,"column":21}}})) != null ? stack1 : "")
    + "                <col width=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"colwidth") || (depth0 != null ? lookupProperty(depth0,"colwidth") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"colwidth","hash":{},"data":data,"loc":{"start":{"line":9,"column":28},"end":{"line":9,"column":40}}}) : helper)))
    + "%\">\n        </colgroup>\n\n        <thead>\n            <tr id=\"roomcontainment\">\n                <th></th>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"rooms") : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":16},"end":{"line":26,"column":25}}})) != null ? stack1 : "")
    + "            </tr>\n        </thead>\n        <tbody>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"sessions") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":12},"end":{"line":66,"column":21}}})) != null ? stack1 : "")
    + "        </tbody>\n    </table>\n</div>\n<div id=\"table-buttons\">\n    <a  title=\""
    + alias4((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Add new timeslot",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":71,"column":15},"end":{"line":71,"column":39}}}))
    + "\" href=\"#\" \n        id=\"add-timeslot-modal-button\"\n        class=\"btn btn-lg btn-success\">\n        <i class=\"fa fa-plus\"></i> "
    + alias4((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Add new time slot",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":74,"column":35},"end":{"line":74,"column":60}}}))
    + "\n    </a>\n    <a title=\""
    + alias4((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Add new room",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":76,"column":14},"end":{"line":76,"column":34}}}))
    + "\" href=\"#\" id=\"add-room-modal-button\" class=\"add-room-modal-button btn btn-lg btn-inverse\">\n        <i class=\"fa fa-plus\"></i> "
    + alias4((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Add new Room",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":77,"column":35},"end":{"line":77,"column":55}}}))
    + "\n    </a>\n\n</div>\n";
},"useData":true,"useDepths":true});

this["JST"]["timeslot-modal"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"modal\" id=\"add-timeslot-modal\">\n    <form name=\"timeslot_form\" class=\"form-horizontal\" role=\"form\" id=\"add-timeslot-form\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Add new timeslot",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":7,"column":40},"end":{"line":7,"column":64}}}))
    + "</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Time",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":11,"column":58},"end":{"line":11,"column":70}}}))
    + "</label>\n                    <div class=\"col-sm-2\">\n                        <input type=\"text\" \n                            class=\"form-control\" \n                            id=\"timepicker\" \n                            value=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":16,"column":35},"end":{"line":16,"column":43}}}) : helper)))
    + "\" \n                            name=\"time\" \n                            required \n                            data-parsley-pattern=\"^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$\"\n                            placeholder=\""
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"e.g. 11:00",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":20,"column":41},"end":{"line":20,"column":59}}}))
    + "\">\n                    </div>\n                </div> \n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Blocked?",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":24,"column":58},"end":{"line":24,"column":74}}}))
    + "</label>\n                    <div class=\"col-sm-10\">\n                        <input type=\"checkbox\" class=\"form-control\" name=\"blocked\" >\n                        <span class=\"help-block\">\n                            "
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Select if this time slot is blocked, e.g. because of a break. This means you cannot add sessions in this slot.",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":28,"column":28},"end":{"line":28,"column":146}}}))
    + "\n                        </span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button id=\"add-timeslot-button\" class=\"btn btn-primary\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Add new timeslot",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":34,"column":73},"end":{"line":34,"column":97}}}))
    + "</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">"
    + alias3((lookupProperty(helpers,"_")||(depth0 && lookupProperty(depth0,"_"))||alias2).call(alias1,"Close",{"name":"_","hash":{},"data":data,"loc":{"start":{"line":35,"column":83},"end":{"line":35,"column":96}}}))
    + "</button>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n    </form>\n</div><!-- /.modal -->\n";
},"useData":true});