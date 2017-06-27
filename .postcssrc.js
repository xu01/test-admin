// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": [
    // to edit target browsers: use "browserlist" field in package.json
    //"autoprefixer": {},
    require('postcss-px2rem')({
                remUnit: 75,
              }),
    require('autoprefixer')({
        		browsers: ['IOS >= 7', 'Android >= 4.0']
	    	  })
  ]
}
