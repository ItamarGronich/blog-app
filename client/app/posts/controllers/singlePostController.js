(function (app) {


    function singlePostController(post){

        this.post = post;
    }

    singlePostController.$inject = ['post'];


    app.controller('singlePostController', singlePostController);



})(angular.module('blogApp'));