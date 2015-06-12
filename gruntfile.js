module.exports = function(grunt) {
  grunt.initConfig({
    // ---------------------JS-----------------------------------------------
    // ________concationation______
    jshint: {
      options: {
          reporter: require('jshint-stylish')
      },

      main: [
          'public/js/*.js',
          '!public/js/*.concat.js',
          '!public/js/*.min.js',
      ]
    },

    concat: {
        default: {
            src: ['public/js/*.js', '!public/js/*.concat.js'],
            dest: 'public/js/built.concat.js'
        }
    },

    uglify: {
      target: {
        files: {
          'public/js/output.min.js': ['public/js/built.concat.js']
        }
      }
    },


    // ----------------------CSS-----------------------------------------------
    cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          },
          target: {
            files: {
              'public/css/output.min.css': ['public/css/*.css', '!public/css/*.min.css']
            }
          }
    },

    // ------------------------OPEN EXPRESS SERVER------------------------
    express : {
      dev: {
        options: {
          script: 'app.js'
        }
      }
    },

    // ----------------------SIMPLE SERVER---------------------------
    // connect: {
    //   default: {
    //     options: {
    //       port: 8000,
    //       hostname: 'localhost',
    //       base: {
    //         path: 'public',
    //       }
    //     }
    //   }
    // },

    // ----------------------WATCHING FOR FILES CHANGING----------------------
    watch: {
      all: {
        files: ["public/**/*"],
        tasks: ["filetask"],
        options: {
          nospawn: true,
          interrupt: false,
          debounceDelay: 250
        }
      }
    },

    // ----------------------RELOADED SERVER ON--------------------------------
    // localhost:35729
    // ----------------------------------------
    reload: {
      port: 35729,
      liveReload: {},
      proxy: {
        host: "localhost",
        port: 3000,
      }
    },

    clean: {
      default: ["public/js/*t.js", "public/css/*.css"]
    },

    reactjsx: {
      all: {
        files: [{
          expand: true,
          src: [
            'public/**/*.jsx'
          ],
          ext: '.js'
        }]
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-reload");
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-express-server');
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-reactjsx');

  
  grunt.registerTask("default", ["reload", "watch", "express"]);
  grunt.registerTask("expressrun", ["express"]);
  grunt.registerTask("filetask", ["reload"]);
};