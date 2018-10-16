(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * @brief Increment the number of visits to the browser's current URL.
 */
function LogVisit() {
	var thisUrl = window.location.pathname;

	// Default to 'homepage' when the blank URL is loaded.
	if (thisUrl == '/') {
		thisUrl = '/homepage';
	}

	const refPath = "https://personal-website-1c1a9.firebaseio.com/visits" + thisUrl;
	var thisUrlRef = new Firebase(refPath);

	// Use a transaction to ensure that increments are protected.
  thisUrlRef.transaction(function(data) {
  	if (data) {
  		data.count++;
  	} else {
  		data = {"count": 1};
  	}
  	return data;
  });
}

// Increment the visit count for the current page.
LogVisit();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvamF2YXNjcmlwdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXG4gKiBAYnJpZWYgSW5jcmVtZW50IHRoZSBudW1iZXIgb2YgdmlzaXRzIHRvIHRoZSBicm93c2VyJ3MgY3VycmVudCBVUkwuXG4gKi9cbmZ1bmN0aW9uIExvZ1Zpc2l0KCkge1xuXHR2YXIgdGhpc1VybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuXHQvLyBEZWZhdWx0IHRvICdob21lcGFnZScgd2hlbiB0aGUgYmxhbmsgVVJMIGlzIGxvYWRlZC5cblx0aWYgKHRoaXNVcmwgPT0gJy8nKSB7XG5cdFx0dGhpc1VybCA9ICcvaG9tZXBhZ2UnO1xuXHR9XG5cblx0Y29uc3QgcmVmUGF0aCA9IFwiaHR0cHM6Ly9wZXJzb25hbC13ZWJzaXRlLTFjMWE5LmZpcmViYXNlaW8uY29tL3Zpc2l0c1wiICsgdGhpc1VybDtcblx0dmFyIHRoaXNVcmxSZWYgPSBuZXcgRmlyZWJhc2UocmVmUGF0aCk7XG5cblx0Ly8gVXNlIGEgdHJhbnNhY3Rpb24gdG8gZW5zdXJlIHRoYXQgaW5jcmVtZW50cyBhcmUgcHJvdGVjdGVkLlxuICB0aGlzVXJsUmVmLnRyYW5zYWN0aW9uKGZ1bmN0aW9uKGRhdGEpIHtcbiAgXHRpZiAoZGF0YSkge1xuICBcdFx0ZGF0YS5jb3VudCsrO1xuICBcdH0gZWxzZSB7XG4gIFx0XHRkYXRhID0ge1wiY291bnRcIjogMX07XG4gIFx0fVxuICBcdHJldHVybiBkYXRhO1xuICB9KTtcbn1cblxuLy8gSW5jcmVtZW50IHRoZSB2aXNpdCBjb3VudCBmb3IgdGhlIGN1cnJlbnQgcGFnZS5cbkxvZ1Zpc2l0KCk7XG4iXX0=
