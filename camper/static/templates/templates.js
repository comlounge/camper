this["JST"] = this["JST"] || {};

this["JST"]["room-modal"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression;

  return "                    <input type=\"hidden\" name=\"room_idx\" value=\""
    + alias1(((helper = (helper = helpers.room_idx || (depth0 != null ? depth0.room_idx : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"room_idx","hash":{},"data":data}) : helper)))
    + "\">\n                    <input type=\"hidden\" name=\"id\" value=\""
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0.room : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\n";
},"3":function(depth0,helpers,partials,data) {
    return "                <button class=\"add-room-button btn btn-primary\">Add new room</button>\n";
},"5":function(depth0,helpers,partials,data) {
    return "                <button class=\"update-room-button btn btn-primary\">Update Room</button>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div class=\"modal\" id=\"add-room-modal\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\">Add new room</h4>\n            </div>\n            <div class=\"modal-body\">\n                <form name=\"room_form\" class=\"form-horizontal\" role=\"form\" id=\"add-room-form\">\n"
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.add_room : depth0),{"name":"unless","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">Name</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"text\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.room : depth0)) != null ? stack1.name : stack1), depth0))
    + "\" class=\"form-control\" id=\"room-form-name\" name=\"name\" required placeholder=\"e.g. seminar room\">\n                        </div>\n                    </div> \n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">Capacity</label>\n                        <div class=\"col-sm-5\">\n                            <input value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.room : depth0)) != null ? stack1.capacity : stack1), depth0))
    + "\" type=\"number\" class=\"form-control\" integer min=1 max=1000 name=\"capacity\" required>\n                        </div>\n                    </div> \n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">Description</label>\n                        <div class=\"col-sm-10\">\n                            <textarea class=\"form-control\" maxlength=100 name=\"description\" placeholder=\"e.g. beamer available\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.room : depth0)) != null ? stack1.description : stack1), depth0))
    + "</textarea>\n                        </div>\n                    </div> \n                </form>\n\n            </div>\n            <div class=\"modal-footer\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.add_room : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n";
},"useData":true});

this["JST"]["session-modal"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"modal\" id=\"edit-session-modal\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\">Edit Session</h4>\n            </div>\n            <div class=\"modal-body\">\n                <form name=\"timeslot_form\" class=\"form-horizontal\" role=\"form\" id=\"edit-session-form\">\n                    <input type=\"hidden\" name=\"session_idx\" value=\""
    + alias3(((helper = (helper = helpers.session_idx || (depth0 != null ? depth0.session_idx : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"session_idx","hash":{},"data":data}) : helper)))
    + "\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">Title</label>\n                        <div class=\"col-sm-8\">\n                            <input \n                            	name=\"title\" required \n                            	type=\"text\" \n                            	id=\"ac-title\" \n                            	nui-autocomplete=\"autocompleteOptions\" \n                            	class=\"form-control\" \n                            	value=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"\n                            	placeholder=\"enter the title of the session\">\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">Description</label>\n                        <div class=\"col-sm-8\">\n                            <textarea \n                            	class=\"form-control\" \n                            	rows=10\n                            	id=\"session-description\"\n                            	name=\"description\"\n                            	placeholder=\"The description of the session\">"
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</textarea>\n                        </div>\n                    </div> \n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">Speaker / Moderator</label>\n                        <div class=\"col-sm-8\">\n                        	<input \n                        		id=\"moderator\"\n                        		name=\"moderator\"\n                        		type=\"text\"\n                        		value=\""
    + alias3(((helper = (helper = helpers.moderator || (depth0 != null ? depth0.moderator : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"moderator","hash":{},"data":data}) : helper)))
    + "\"\n                        		class=\"form-control\"\n                        		>\n                        </div>\n                    </div> \n                </form>\n            </div>\n            <div class=\"modal-footer\">\n                <button id=\"update-session-button\" class=\"btn btn-primary\">Update Session</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.mo";
},"useData":true});

this["JST"]["sessionboard"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "\n"
    + this.escapeExpression(((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"data","hash":{},"data":data}) : helper)))
    + "\n<div class=\"table-responsive\">\n    <table class=\"table table-bordered sessiontable\">\n        <colgroup>\n            <col width=\"10%\">\n            \n            \n            <col ng-repeat=\"room in rooms | slice:1:10000\" width=\"{[{90/rooms.length}]}%\">\n        </colgroup>\n        <thead>\n            <tr id=\"roomcontainment\" ui-sortable=\"sortableOptions\" ng-model=\"rooms\">\n                <td></td>\n                <td class=\"sorted room-slot\" ng-repeat=\"room in rooms | slice:1:10000\" data-id=\"{[{room.id}]}\">\n                    <h5 class=\"room-name\">{[{room.name}]}</h5>\n                    <div class=\"room-actions\">\n                    </div>\n                    <small>{[{room.description}]}</small><br>\n                    <small>{[{room.capacity}]} persons</small>\n                </td>\n                <td class=\"not-sortable\">\n                    \n                </td>\n            </tr>\n        </thead>\n    </table>\n</div>\n";
},"useData":true});

this["JST"]["sessiontest"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    return "                <col width=\""
    + this.escapeExpression(this.lambda((depths[1] != null ? depths[1].colwidth : depths[1]), depth0))
    + "%\">\n";
},"3":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                <td class=\"sorted room-slot\" data-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" id=\"room-"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                    <h5 class=\"room-name\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h5>\n                    <div class=\"room-actions\">\n                        <a data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-confirm=\"Are you sure?\" class=\"del-room-button btn btn-xs btn-danger\" title=\"delete room\" href=\"#\"><i class=\"fa fa-trash\"></i></a>\n                        <a data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"edit-room-modal-button btn btn-xs btn-info\" title=\"edit room\" href=\"#\" ><i class=\"fa fa-pencil\"></i></a>\n                        <span title=\"drag to sort this list\" class=\"btn btn-xs btn-info\"><i class=\"fa fa-arrows\"></i></span>\n                    </div>\n                    <small>"
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</small><br />\n                    <small>"
    + alias3(((helper = (helper = helpers.capacity || (depth0 != null ? depth0.capacity : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"capacity","hash":{},"data":data}) : helper)))
    + " persons</small>\n                </td>\n";
},"5":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                <tr class=\"sorted\" class=\""
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.blocked : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                    <td class=\"time-slot\">\n                        <span>"
    + alias3(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"time","hash":{},"data":data}) : helper)))
    + "</span>\n                        <a  href=\"#\" \n                            data-toggle=\"tooltip\" \n                            data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\"\n                            title=\"delete timeslot\" \n                            class=\"btn btn-xs btn-danger del-timeslot-button\"><i class=\"fa fa-trash\"></i></a>\n                    </td>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.slots : depth0),{"name":"each","hash":{},"fn":this.program(8, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                    <td></td>\n                </tr>\n";
},"6":function(depth0,helpers,partials,data) {
    return "warning";
},"8":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                    <td class=\"sessionslot "
    + ((stack1 = helpers.unless.call(depth0,(depths[1] != null ? depths[1].blocked : depths[1]),{"name":"unless","hash":{},"fn":this.program(9, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"\n                        data-id=\""
    + alias3(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depths[1] != null ? depths[1].blocked : depths[1]),{"name":"if","hash":{},"fn":this.program(11, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                        <h5>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h5>\n                        <div class=\"description\">"
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</div>\n                        <div class=\"moderators\">\n                            "
    + alias3(((helper = (helper = helpers.moderators || (depth0 != null ? depth0.moderators : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"moderators","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n\n"
    + ((stack1 = helpers.unless.call(depth0,(depths[1] != null ? depths[1].blocked : depths[1]),{"name":"unless","hash":{},"fn":this.program(13, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                    </td>\n";
},"9":function(depth0,helpers,partials,data) {
    return "enabled";
},"11":function(depth0,helpers,partials,data,blockParams,depths) {
    return "                            <span>"
    + this.escapeExpression(this.lambda((depths[1] != null ? depths[1].reason : depths[1]), depth0))
    + "</span>\n";
},"13":function(depth0,helpers,partials,data) {
    return "                        <div class=\"pull-right slot-actions\">\n                            <span><i class=\"fa fa-pencil\"></i></span>\n                            <span class=\"text-danger\"><i class=\"fa fa-trash\"></i></span>\n                            <span><i class=\"fa fa-arrows\"></i></span>\n                        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"table-responsive\">\n    <p>"
    + alias3(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"version","hash":{},"data":data}) : helper)))
    + "</p>\n    <table class=\"table table-bordered\">\n        <colgroup>\n            <col width=\"10%\">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.rooms : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                <col width=\""
    + alias3(((helper = (helper = helpers.colwidth || (depth0 != null ? depth0.colwidth : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"colwidth","hash":{},"data":data}) : helper)))
    + "%\">\n        </colgroup>\n\n        <thead>\n            <tr id=\"roomcontainment\">\n                <td></td>\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.rooms : stack1),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                <td class=\"not-sortable\">\n                    <div id=\"add-room-div\" class=\"nobig-button-panel\">\n                        <a title=\"Add new room\" href=\"#\" id=\"add-room-modal-button\" class=\"add-room-modal-button btn btn-lg btn-block btn-primary\">\n                            <i class=\"fa fa-plus\"></i> Room\n                        </a>\n                    </div>\n                </td>\n\n            </tr>\n        </thead>\n        <tbody>\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.sessions : depth0),{"name":"each","hash":{},"fn":this.program(5, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                <tr>\n                    <td>\n                        <div class=\"nobig-button-panel\">\n                            <a  title=\"Add new timeslot\" href=\"#\" \n                                id=\"add-timeslot-modal-button\"\n                                class=\"btn btn-lg btn-block btn-info\">\n                                <i class=\"fa fa-plus\"></i> Time</a>\n                        </div>\n                    </td>\n                    <td colspan=\""
    + alias3(this.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.rooms : stack1)) != null ? stack1.length : stack1), depth0))
    + "\"></td>\n\n                </tr>\n        </tbody>\n    </table>\n</div>";
},"useData":true,"useDepths":true});

this["JST"]["timeslot-modal"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"modal\" id=\"add-timeslot-modal\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\">Add new timeslot</h4>\n            </div>\n            <div class=\"modal-body\">\n                <form name=\"timeslot_form\" class=\"form-horizontal\" role=\"form\" id=\"add-timeslot-form\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">Time</label>\n                        <div class=\"col-sm-2\">\n                            <input type=\"text\" \n                                class=\"form-control\" \n                                id=\"timepicker\" \n                                value=\""
    + this.escapeExpression(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"time","hash":{},"data":data}) : helper)))
    + "\" \n                                name=\"time\" \n                                required \n                                placeholder=\"e.g. 11:00\">\n                        </div>\n                    </div> \n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">Blocked?</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"checkbox\" class=\"form-control\" name=\"blocked\" required>\n                            <span class=\"help-block\">\n                                Define here if this time slot is blocked, e.g. because of a break. This means you cannot add sessions in this slot.\n                            </span>\n                        </div>\n                    </div> \n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">Reason for blocking</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"text\" class=\"form-control\" name=\"reason\" required placeholder=\"e.g. lunch break\">\n                        </div>\n                    </div> \n                </form>\n\n            </div>\n            <div class=\"modal-footer\">\n                <button id=\"add-timeslot-button\" class=\"btn btn-primary\">Add new timeslot</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n";
},"useData":true});