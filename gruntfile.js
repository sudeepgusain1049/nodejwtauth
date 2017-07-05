module.exports = function (grunt) {

  grunt.initConfig({

    shell:
    {
      mongo: {
        options: {
          stdout: true
          //    ,async: true
        },
        command: "startdb.bat",

      }
    }
    ,
    run: {
      options: {
        // Task-specific options go here.
      },
      node_server: {
        cmd: 'node',
        args: [
          'server.js'
        ]
      }
    }
  });


  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('default', ['run']);
  //grunt.task.run('shell');
  //grunt.task.run('run');

};