module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),
        meta: {
            srcDir: 'src',
            destDir: 'dist',
            banner: '/*!\n' +
                ' * StrapGallery v<%= pkg.version %>\n' +
                ' * <%= pkg.repository.url %>\n' +
                ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.authors[0] %>\n' +
                ' */\n'
        },
        
        cssmin: {
            minify: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                expand: true,
                cwd: '<%= meta.srcDir %>',
                src: ['*.css'],
                dest: '<%= meta.destDir %>',
                ext: '.min.css'
            }
        },
        

        // Компилятор шаблонов angular
        ngtemplates: {
            dest: '<%= meta.destDir %>/templates.js',
            strapGallery: {
//                cwd: '<%= meta.srcDir %>',
                src: ['<%= meta.srcDir %>/*.html'],
                dest: '<%= ngtemplates.dest %>'
            }
        },
        
        concat: {
            dist: {
//                src: ['<%= meta.srcDir %>/*.js'],
                src: ['<%= meta.srcDir %>/<%= pkg.name %>.js', '<%= ngtemplates.dest %>'],
                dest: '<%= meta.destDir %>/<%= pkg.name %>.js'
            }
        },
        
        uglify: {
            options: {
                banner: '<%= meta.banner %>',
                preserveComments: false, //will strip all comments
                compress: {
                    drop_console: true
                }
            },
            dist: {
//                src: '<%= concat.dist.dest %>',
                src: ['<%= meta.destDir %>/<%= pkg.name %>.js'],
                dest: '<%= meta.destDir %>/<%= pkg.name %>.min.js'
            }
        },
        
        clean: {
            app: ['<%= ngtemplates.dest %>', '<%= concat.dist.dest %>']
        }
        
    });
    
    grunt.registerTask('default', [
        'cssmin:minify',
        'ngtemplates',
        'concat:dist',
        'uglify:dist',
        'clean'
    ]);

//    grunt.registerTask('build', ['clean', 'less:app', 'htmlbuild:dev']);
    
//    grunt.registerTask('build-prod', ['clean', 'less:app', 'cssmin:app', 'ngAnnotate:prod', 'ngtemplates', 'concat:prod', 'uglify:prod', 'htmlbuild:prod', 'clean']);
};
