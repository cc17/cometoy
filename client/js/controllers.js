angular.module('starter.controllers', [])

.controller('BookingCtrl', ['$scope','$http',function($scope,$http) {
  $scope.items = [];
  $scope.noMoreItemsAvailable = false;
  $scope.loadMore = function() {
    $http.get('/bookingList').success(function(items) {
      if( ! (items.data.list && items.data.list.length == 10 ) ){
        $scope.noMoreItemsAvailable = true;
      }
      $scope.items.push(items.data.list);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.$on('$stateChangeSuccess', function(fromState,toState) {
    if(toState.name == 'tab.booking'){
      $scope.loadMore();
    }
    
  });
}])

.controller('OrderCtrl', function($scope, Chats) {
  
})
.controller('AccountCtrl', function($scope) {
  
});
