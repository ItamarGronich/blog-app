
/**
 * @function takes another function and calls it with a `this` value
 *  of the promise object with a resolve and a reject methods
 * @param cb - function - the callback function you wish to promise.
 * @param args - [Array] - an array of the arguments that you wish to apply
 *                       to the promised function.
 * @returns {Promise} Object. with added methods for it's own
 *          resolve & reject
 */
module.exports = function(cb, args) {
	var resolveIt, rejectIt;

	var promise = new Promise(function(resolve, reject) {
		// caches the resolve and reject fucntion ponters
		resolveIt = resolve;
		rejectIt = reject;
	});

	// assigns the resolve & reject methods to the promise object itslef.
	promise.resolve = resolveIt;
	promise.reject = rejectIt;

	// calls the callback function with a this value of the promise
	// object and with the supplied array of arguments.
	cb.apply(promise, args);
	return promise;
};