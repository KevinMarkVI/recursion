// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	var str;
  if (obj === null) {
    return "null";
  }
  if (obj === undefined) {
    return undefined;
  }
  if (obj === true) {
    return "true";
  }
  if (obj === false) {
    return "false";
  }
  if (typeof obj !== "object"){
    str = "";
    if (typeof obj === "number") {
      return obj.toString();
    } else {
      str = "\"" + obj + "\"";
      return str;
    }
  }
  if (Array.isArray(obj)) {
    str = "[" ;
    for (var i = 0; i < obj.length; i++ ) {
      if (obj[i] === obj[obj.length - 1]) {
        str += stringifyJSON(obj[i]);
      } else {
        str += stringifyJSON(obj[i]) + ",";
      }
    }
    str += "]";
    return str;
  } else {
    str = "{";
    if (Object.keys(obj).length === 0) {
        return "{}";
    }
    for (var j in obj) {
      var keys = Object.keys(obj);
      if (j === keys[keys.length -1]) {
        str += stringifyJSON(j) + ":" + stringifyJSON(obj[j]);
      } else {
        str += stringifyJSON(j) + ":" + stringifyJSON(obj[j]) + ",";
      }
    }
    str += "}";
    return str;
  }
};

var stringifiableObjects = [
  9,
  null,
  true,
  false,
  "Hello world",
  [],
  [8],
  ["hi"],
  [8, "hi"],
  [1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999],
  [8, [[],3,4]],
  [[[["foo"]]]],
  {},
  {"a": "apple"},
  {"foo": true, "bar": false, "baz": null},
  {"boolean, true": true, "boolean, false": false, "null": null },
  // basic nesting
  {"a":{"b":"c"}},
  {"a":["b", "c"]},
  [{"a":"b"}, {"c":"d"}],
  {"a":[],"c": {}, "b": true}
];

for (var j = 0; j < stringifiableObjects.length; j += 1) {
  var truthy = stringifyJSON(stringifiableObjects[j]) == JSON.stringify(stringifiableObjects[j]);
  if (!truthy) {
    console.log("FAILING ON", stringifiableObjects[j]);
    console.log(
      "\t",
      "INPUT:",
      stringifiableObjects[j],
      "OUTPUT:", stringifyJSON(stringifiableObjects[j]),
      "EXPECTED:", JSON.stringify(stringifiableObjects[j])
    );
  }
  

}

