const path = require("path");
module.exports = {
	entry:["./src/carousel.js","./src/gotop.js","./src/waterfall.js"],
	output: {
		filename:"bundle.js",
		path:path.resolve(__dirname,"dist")
	},
};