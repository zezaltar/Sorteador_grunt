module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        // Compilar LESS para CSS
        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less',
                },
            },
            production: {
                options: {
                    compress: true, // Minificar o CSS em produção
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less',
                },
            },
        },
        
        // Assistir mudanças nos arquivos
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development'],
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev'],
            },
            js: {
                files: ['src/scripts/**/*.js'],
                tasks: ['replace:dev'],
            }
        },
        
        // Substituir padrões nos arquivos
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css',
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.js',
                        },
                    ],
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/',
                    },
                ],
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css',
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js',
                        },
                    ],
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dist/',
                    },
                ],
            },
        },
        
        // Minificar o HTML
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    'dist/index.html': 'src/index.html',
                },
            },
        },

        // Limpar pastas desnecessárias
        clean: ['prebuild'],

        // Minificar o JavaScript
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js',
                },
            },
        }
    });

    // Carregar as tarefas do Grunt
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Tarefa default para observar as alterações
    grunt.registerTask('default', ['watch']);

    // Tarefa de build para produzir a versão de produção
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);
};
