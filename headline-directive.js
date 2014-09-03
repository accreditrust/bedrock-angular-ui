/*!
 * Headline directive.
 *
 * Copyright (c) 2014 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([], function() {

'use strict';

/* @ngInject */
function factory() {
  return {
    restrict: 'E',
    scope: {
      title: '@brTitle',
      loading: '=?brLoading'
    },
    transclude: true,
    template: '\
      <h3 class="headline"> \
        {{title}} \
        <span ng-hide="!options.menu || loading" \
          class="btn-group pull-right"> \
          <button type="button" \
            class="btn btn-default btn-sm" \
            stackable-trigger="menu" \
            stackable-toggle="\'active\'"> \
            <i class="fa fa-bars"></i> \
          </button> \
        </span> \
        <span ng-show="loading" class="pull-right"> \
          <i class="fa fa-refresh fa-spin text-muted"></i> \
        </span> \
      </h3> \
      <div br-lazy-compile="br-headline" \
        br-compile-trigger="menu.show"> \
        <stackable-popover stackable="menu" \
          stackable-hide-arrow="true" \
          stackable-placement="bottom" \
          stackable-alignment="right"> \
          <div ng-transclude></div> \
        </stackable-popover> \
      </div>',
    link: function(scope, element, attrs) {
      attrs.$observe('brOptions', function(value) {
        var options = value ? scope.$eval(value) : {};
        scope.options = options || {};
        if(!('menu' in scope.options)) {
          scope.options.menu = true;
        }
      });
    }
  };
}

return {brHeadline: factory};

});