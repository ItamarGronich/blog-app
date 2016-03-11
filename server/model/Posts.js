var fs = require('fs');
var root = __dirname + '/../';


/**
 * Posts Module
 * @retruns - {Object} - Methods for getting, setting and editing data on the main posts JSON.
 * @type {{enterNewPost, deletePost, editPost, getPosts}}
 */
var Posts = (function(){

	// THE MAIN POSTS ARR. an array of post objects.
	var postsArr;

	fs.readFile(root + 'server/data/posts.json','utf-8', function(err,data){
		if(err){
			return undefined;
		}
		postsArr =  JSON.parse(data).posts;
	});

	function findInPosts(query) {
		return postsArr.findIndex(function(post){
			for (var key in post) {
				if(post.hasOwnProperty(key) && post[key] === query){
					return true;
				}
			}
		});
	}

	return {
		enterNewPost: function(post){
			return postsArr[postsArr.push(post) - 1];
		},
		deletePost: function(post){
			var index = findInPosts(post);

			return postsArr.splice(index,1)[0];

		},
		editPost: function(post){
			var index = findInPosts(post.slug);
			return postsArr[index] = post;
		},
		getPosts: function(){
			return postsArr;
		}

	}

})();


function ifExists(filePath) {
	return fs.access(filePath, fs.F_OK, function(err) {

		return !err;
	});
}

function generateUniqueSlug(fileName) {
	return fileName + '-' + process.hrtime().join('');
}

function submitPost(postData){
	var filePath = root + 'server/data/posts/html/' + fileName + '.html',
	    exist = ifExists(filePath),
		post = postData.post,
		postHtml = postData.postHtml,
		postMd = postData.postMd;

	if (!exist) {

	}


}

function wrtieFile(postData) {
	var destination = root + 'server/data',
		htmlDestination = destination + 'html',
		mdDestination = destination + 'md';


	fs.writeFile(mdDestination + postData.post.slug + '.md', postData.postMd, 'utf8', (err) => {
		if (err) console.log('couldn\'t wrtie file: ' + postData.post.slug + '.md');
	});
	fs.writeFile( htmlDestination + postData.post.slug + '.html', postData.postHtml, 'utf8', (err) => {
		if (err) console.log('couldn\'t wrtie file: ' + postData.post.slug + '.hmtl');
	});

}