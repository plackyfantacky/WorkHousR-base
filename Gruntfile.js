let sass = require('sass')
let package = require('./package.json')
let dotenv = require('dotenv').config()

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        'dart-sass': {
            workhousr: {
                options: {
                    sourceMap: true
                },
                files: {
                    './resources/css/app.css': './resources/scss/app.scss'
                }
            }
        },
        watch: {
            workhousr: {
                files: ['./resources/scss/**/*'],
                tasks: ['dart-sass:workhousr'],
                options: { spawn: true }
            },
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: './resources/css/app.css'
                },
                options: {
                    watchTask: true,
                    proxy: {
                        target: process.env.APP_URL + ':' + process.env.APP_PORT,
                    }
                }
            }
        },
    })

    grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-dart-sass')
	grunt.loadNpmTasks('grunt-browser-sync')
	grunt.registerTask('default', ['browserSync', 'watch'])
}