module.exports = function(grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            sitecss: {
                options: {
                    banner: '/* My minified css file */'
                },
                files: {
                    'css/bundle/os-portal-ss.css': [
                        'css/src/bootstrap.css',
                        'css/src/community-base-theme.css',
                        'css/src/os-core.css',
                        'css/src/menu-mobile.css',
                        'css/src/ideas.css',
                        'css/src/forums.css',
                        'css/src/partner-center.css',
                        'css/src/forge.css',
                        'css/src/profile.css',
                        'css/src/learn.css',
                        'css/src/search.css',
                        'css/src/home.css',
                        'css/src/homeipp.css',
                        'css/src/widgets.css',
                        'css/src/community.css',
                        'css/src/support-portal.css',
                        'css/src/licensingfo.css',
			'css/src/customer-area.css'
                    ],
                    'css/bundle/os-portal.css': [
                        'css/src/bootstrap.css',
                        'css/src/community-base-theme.css',
                        'css/src/os-core.css',
                        'css/src/menu-mobile.css'
                    ],
                    'css/bundle/os-portal-apps.css': [
                        'css/src/ideas.css',
                        'css/src/forums.css',
                        'css/src/partner-center.css',
                        'css/src/forge.css',
                        'css/src/profile.css',
                        'css/src/learn.css',
                        'css/src/search.css',
                        'css/src/home.css',
                        'css/src/homeipp.css',
                        'css/src/widgets.css',
                        'css/src/community.css',
                        'css/src/support-portal.css',
                        'css/src/licensingfo.css',
			'css/src/customer-area.css'
                    ]
                }
            }
        },
        uglify: {
            options: {
                compress: true
            },
            build: {
                files: {
                    'js/bundle/os-portal.js': [
                        'js/src/portal-common.js',
                        'js/src/bootstrap.js'
                    ],
                    'js/bundle/os-portal-extra.js': [


                    ]
                }
            }
        }
    });
    // Default task.
    grunt.registerTask('default', ['cssmin', 'uglify']);
};
