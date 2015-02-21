// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
	var results = [];
	var getElementsByClassNameHelper = function(element, className) {
		if (element.classList === undefined) {
			return results;
		} else {
			for (var j = 0; j < element.classList.length; j++) {
				if (element.classList[j] === className) {
					results.push(element);
				}
			}
		}
		for (var i = 0; i < element.childNodes.length; i++) {
			getElementsByClassNameHelper(element.childNodes[i], className);
		}
	};
	getElementsByClassNameHelper(document.body, className);
	return results;
};