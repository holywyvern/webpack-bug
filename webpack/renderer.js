//=============================================================================
// /webpack/renderer.js
// Author: Ramiro Rojo
// This code is under Apache 2.0 license. Check LICENSE for more information.
//-----------------------------------------------------------------------------
// Returns the electron renderer's webpack build.
//=============================================================================
// Webpack has neat modules to test
const webpack           = require('webpack');
// Node modules
const path              = require('path');

module.exports = {
    // The entry for the render file
    // OLD WAY: entry: path.resolve(__dirname, '..', 'src', 'renderer', 'main.js'),
	// NEW WAY: a relative path to the context:
	entry:  './src/renderer/main.js', 
    // The root of our application
    context: path.resolve(__dirname, '..'),
    // The output file
    output: {
        path:       path.resolve(__dirname, '..', 'build'),
        publicPath: "/",
        filename:  'bundle.js'
    },
    // The target is electron-renderer when building for renderer
    target: 'electron-renderer',
    resolve: {
        // Alias packages
        alias: {
            nova: path.resolve(__dirname, '..', 'nova_modules', 'renderer')
        },
        // Our node_modules directory
        modules: [
            path.resolve(__dirname, '..', 'node_modules')
        ],
        // Description files tells wich files are descriptors of our compilation
        //FIXED, removed the description file: descriptionFiles: [path.resolve(__dirname, '..', 'package.json')],
        // This are the extensions loaded automatically on require(filename) without extensions
        extensions: [
          '.jsx', '.js', 
          '.json'
        ],        
    },
    module: {
        // Rules handle the loading extensions and how they have to be resolved
        rules: [
            // Common JavaScript files are just compiled with babel
            {
                test: /\.js$/i,
                exclude: [
                  // Node modules shoudn't compile JavaScript files with babel.
                  path.resolve(__dirname, '..', 'node_modules')
                ],
                // We use the Babel loader to compile JS files
                loader: 'babel-loader',
                // The babel options are here
                options: {
                    // OLD WAY: presets: ['latest']
					// NEW WAY: disables babel transpiling ES2015 Modules => CJS
					presets: [ ['latest'] ] 
                }
            },
            // Extended JavaScript files uses React
            {
                test: /\.jsx$/i,
                // We use the Babel loader to compile JSX files
                loader: 'babel-loader',
                // The babel options are here, we added react preset to JSX files.
                options: {
                    // OLD WAY: presets: ['latest', 'react']
					// NEW WAY: disables babel transpiling ES2015 Modules => CJS
					presets: [ ['latest'], 'react' ] 
                }  
            },
            // JSON is also loaded with it's own loader:
            {
                test: /\.json/i,
                use: 'json-loader'
            }
        ]
    }
};