this["JST"] = this["JST"] || {};

this["JST"]["static/templates/sessionboard.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "\n"
    + this.escapeExpression(((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"data","hash":{},"data":data}) : helper)))
    + "\n<div class=\"table-responsive\">\n    <table class=\"table table-bordered sessiontable\">\n        <colgroup>\n            <col width=\"10%\">\n            \n            <col ng-repeat=\"room in rooms | slice:1:10000\" width=\"{[{90/rooms.length}]}%\">\n        </colgroup>\n        <thead>\n            <tr id=\"roomcontainment\" ui-sortable=\"sortableOptions\" ng-model=\"rooms\">\n                <td></td>\n                <td class=\"sorted room-slot\" ng-repeat=\"room in rooms | slice:1:10000\" data-id=\"{[{room.id}]}\">\n                    <h5 class=\"room-name\">{[{room.name}]}</h5>\n                    <div class=\"room-actions\">\n                    </div>\n                    <small>{[{room.description}]}</small><br>\n                    <small>{[{room.capacity}]} persons</small>\n                </td>\n                <td class=\"not-sortable\">\n                    \n                </td>\n            </tr>\n        </thead>\n    </table>\n</div>\n";
},"useData":true});