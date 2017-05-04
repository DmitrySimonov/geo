require('babel-core/register')({
    presets: ["es2015"],
    plugins: [
      ["babel-plugin-transform-require-ignore",
              {
                "extensions": [".less", ".sass", ".scss", ".svg"]
              }
      ],
      ["transform-inline-environment-variables"],
      ["inline-react-svg"],
      ["module-alias", [
        { "src": "./client", "expose": "konux" }
      ]]
    ]
            
});
require('./src');