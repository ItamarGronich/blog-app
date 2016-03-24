var fs = require('fs');
var root = __dirname + '/../../';
var promisify = require('../utilities/promisify.js');


/**
 * General read write functions
 */




function readMd(slug) {
	return promisify(function(slug){
		var mdDestination = root + 'server/data/posts/md/';
		var promise = this;
		fs.readFile(mdDestination + slug + '.md', 'utf8', (err,data) => {
			if (err) {
				promise.reject(data);
				return;
			}
			promise.resolve(data);
		});
	}, [slug])

}

function readHtml(slug) {
	return promisify(function(slug) {
		var htmlDestination = root + 'server/data/posts/html/';
		var promise = this;
		fs.readFile(htmlDestination + slug + '.html', 'utf8', (err, data) => {
			if (err) {
				promise.reject(data);
				return;
			}
			promise.resolve(data);
		});
	}, [slug]);
}

function writeHtml(postData) {
	return promisify(function(postData){
		var htmlDestination = root + 'server/data/posts/html/';
		var promise = this;


		fs.writeFile(htmlDestination + postData.post.slug + '.html', postData.postHtml,'utf8', (err) => {
			if (!err) {
				promise.resolve();
				return;
			}

			promise.reject();
		})

	}, [postData]);
}

function writeMd (postData) {
	return promisify(function(postData){
		var mdDestination = root + 'server/data/posts/md/';
		var promise = this;



		fs.writeFile(mdDestination + postData.post.slug + '.md', postData.postMd, 'utf8', (err) => {
			if (!err) {
				promise.resolve();
				return;
			}

			promise.reject();
		})

	}, [postData]);
}

function deleteMd(slug) {
	return promisify(function(slug){
		var mdDestination = root + 'server/data/posts/md/';
		var promise = this;

		fs.unlink(mdDestination + slug + '.md', (err) => {
			if (!err) {
				promise.resolve();
				return;
			}

			promise.reject();
		})

	}, [slug]);
}

function deleteHtml(slug) {
	return promisify(function(slug){
		var htmlDestination = root + 'server/data/posts/html/';
		var promise = this;

		fs.unlink(htmlDestination + slug + '.html', (err) => {
			if (!err) {
				promise.resolve();
				return;
			}

			promise.reject();
		})

	}, [slug]);
}

function readPostsJson() {
	return promisify(function() {
		var jsonDestination = root + 'server/data/posts.json';
		var promise = this;
		fs.readFile(jsonDestination, 'utf-8' , function (err, data) {


			if (err) {
				promise.reject(err);
				return;
			}
			promise.resolve(JSON.parse(data));
		});
	});
}

function writePostsJson(JSONfile) {

	return promisify(function(JSONfile) {
		var jsonDestination = root + 'server/data/posts.json';
		var promise = this;


		fs.writeFile(jsonDestination, JSON.stringify(JSONfile ,null,2), 'utf8', (err) => {
			if (err) {
				promise.reject(err);
				return;
			}


			promise.resolve();
		})
	}, [JSONfile]);

}

/**
 * Posts Module
 * @retruns - {Object} - Methods for getting, setting and editing data on the main posts JSON.
 * @type {{enterNewPost, deletePost, editPost, getPosts}}
 */
var Posts = (function(){

	// THE MAIN POSTS ARR. an array of post objects.
	var postsObj;
	var postsArr;

	readPostsJson()
		.then(function(data){
			postsObj = data;
			postsArr = postsObj.posts;
		});

	function findInPosts(query) {


		return postsArr.findIndex(function(post){
			for (var key in post) {
				if (post.hasOwnProperty(key) && post[key] === query) {

					return true;
				}
			}
		});
	}



	return {
		enterNewPost: function(post){
			var newPost = postsArr[postsArr.push(post) - 1];


			writePostsJson(postsObj);
			return newPost;
		},
		deletePost: function(slug){
			var index = findInPosts(slug);

			var deletedPost;
			if(index !== -1) {deletedPost = postsArr.splice(index,1)[0];}


			writePostsJson(postsObj);

			return deletedPost;

		},
		editPost: function(post){
			var index = findInPosts(post.slug);
			var editedPost;
			if(index !== -1) {editedPost = postsArr[index] = post; }

			writePostsJson(postsObj);
			return editedPost;
		},
		getPosts: function(){
			return promisify(function(){
				this.resolve(postsObj);
			});

		},
		ifExists: function (post, callback) {


			var found = findInPosts(post.slug);


			if (found !== -1) {
				callback(post, null);
			} else {
				callback(null, post);
			}
		}

	}

})();



var FullPosts = (function(){

	function writeFiles(postData) {
		return Promise.all([writeHtml(postData), writeMd(postData)])
			.then(function(){
				return FullPosts.getFiles(postData.post.slug);
			});
	}

	function deleteFiles(slug) {
		return Promise.all([deleteHtml(slug), deleteMd(slug)]);
	}


	function getFiles(slug) {
		return Promise.all([readMd(slug), readHtml(slug)])
			.then(function(values){
					return{
						postHtml: values[1],
						postMd: values[0]
					}
				},
				function(reason){
					console.log(reason);
				})
	}

	return {
		writeFiles: writeFiles,
		getFiles: getFiles,
		deleteFiles: deleteFiles
	};

})();

function generateUniqueSlug(fileName) {
	var newFileName = fileName.replace(/(-\d{14})/g,'');
	return newFileName + '-' + process.hrtime().join('');
}


function submitPost(postData){


	var newPost = {};

	return promisify(function(){
		var promise = this;
		function createAllData(exists){
			if (exists) {
				postData.post.slug = generateUniqueSlug(postData.post.slug);
			}

			newPost.post = Posts.enterNewPost(postData.post);
			FullPosts.writeFiles(postData)
				.then(function(postFiles){
					newPost.postHtml = postFiles.postHtml;
					newPost.postMd = postFiles.postMd;
					promise.resolve(newPost);
				});
		}

		Posts.ifExists(postData.post, createAllData);
	});
}


function editPost(postData) {
	return promisify(function(){
		var promise = this;
		var editedPost = {};

		editedPost.post = Posts.editPost(postData.post);

		if (!editedPost.post) {
			promise.reject('post does not exist');
			return;
		}

		FullPosts.writeFiles(postData)
			.then(function(postFiles){
				editedPost.postHtml = postFiles.postHtml;
				editedPost.postMd = postFiles.postMd;
				promise.resolve(editedPost);
			});

	})
}

function deletePost(slug) {
	return promisify(function(){
		var promise = this;

		console.log(slug);
		if (!Posts.deletePost(slug)) {
			promise.reject('post does not exist');
			return;
		}

		FullPosts.deleteFiles(slug)
			.then(function(){
				promise.resolve(slug);
			});

	})
}


module.exports = {
	submitPost: submitPost,
	editPost: editPost,
	getPosts: Posts.getPosts,
	deletePost: deletePost,
	getMd: readMd,
	getHtml: readHtml

};
