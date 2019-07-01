var SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin");

module.exports = {
  entry: {
    main: "./app/assets/scripts/index.js",
    vendor: "./app/assets/scripts/vendor.js"
  },
  plugins: [
    new SVGSpritemapPlugin("./app/assets/images/icons/**/*.svg", {
      output: {
        filename: "assets/images/sprites/spritemap.svg",
        svg4everybody: {
          nosvg: true,
          polyfill: true
        },
        svgo: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: ["img:srcset", "source:srcset", "img:src"]
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};