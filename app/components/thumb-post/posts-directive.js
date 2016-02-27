(function(app){

    app.directive('thumbPosts', function () {

        return {
            restict: 'AE',
            scope: {
                postInfo: '=info'
            },
            templateUrl: '/app/components/thumb-post/posts.html',
            controller: function($scope, pagination){
                $scope.date = function(){
                    var date =  new Date(parseInt($scope.postInfo.date)).toDateString(),
                        regex = /(\w+)\s(\d+)/; // catch month and day

                    date = date.slice(4).replace(regex, '$1 $2,'); // add comma after day.

                    $scope.onlyHyphen = pagination.onlyHyphen;

                    return 'Posted on ' + date;

                };
            }
        }
    });

})(angular.module('blogApp'));