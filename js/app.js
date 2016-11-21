(function() {

    Vue.filter('min', function(value, z) {
        var r = 40;
        if (z == 'more') {
            r = 80;
        }
        if (value.length >= r) {
            return value.substring(0, r) + '...';
        } else {
            return value;
        }
    });

    Vue.filter('tags', function(value) {
        var tags = '';
        if (value.length === 0 || value[0] === '') {
            return '#Sin Tags';
        } else {
            for (var i = 0; i < value.length; i++) {
                tags += "#" + value[i] + ' ';
            }
            return tags;
        }
    });
    var noteSelected = null;
    var sesion = false;
    var app = new Vue({
        el: '#app',
        data: {
            hasError: 0,
            typeError: '',
            note: {
                title: '',
                content: '',
                tags: [],
                tagsString: ''
            },
            notes: []
        },
        methods: {
            addTags: function() {
                var t = this.note.tagsString.split(',');
                if (t[0] !== '') {
                    for (var i = 0; i < t.length; i++) {
                        t[i] = t[i].trim();
                    }
                    this.note.tags = t;
                }
            },
            newNote: function() {
                if (noteSelected !== null && sesion === true) {
                    this.saveNote();
                }
                noteSelected = null;
                this.resetError(1300);
                this.note = {
                    title: '',
                    content: '',
                    tags: [],
                    tagsString: ''
                };
            },
            saveNote: function() {
                if (this.validate() === true && noteSelected !== null && sesion === true) {
                    for (var i = 0; i < this.notes.length; i++) {
                        if (this.notes[i] == noteSelected) {
                            this.addTags();
                            noteSelected = this.note;
                            this.notes[i] = noteSelected;
                            this.hasError = 2;
                            this.typeError = 'info';
                        }
                    }
                } else if (this.validate() === true && sesion === true && noteSelected === null) {
                    this.addTags();
                    noteSelected = this.note;
                    this.notes.push(noteSelected);
                } else if (this.validate() === true && (sesion === false || sesion === true)) {
                    this.addTags();
                    noteSelected = this.note;
                    this.notes.push(noteSelected);
                    sesion = true;
                }
            },
            selectNote: function(notita) {
                // this.note = note;
                noteSelected = notita;
                this.note = noteSelected;
            },
            validate: function() {
                if (this.note.content.trim() === '') {
                    this.hasError = 1;
                    this.typeError = 'danger';
                    this.resetError(1500);
                    return false;
                } else if (this.note.title === '' && this.note.tags === '' && this.hasError === 0) {
                    this.note.title = 'Nota sin Titulo';
                    this.note.tags = 'Sin Tags';
                    return true;
                } else if (this.note.title === '' && this.hasError === 0) {
                    this.note.title = 'Nota sin Titulo';
                    return true;
                } else if (this.hasError === 0) {
                    return true;
                } else {
                    return false;
                }
            },
            deleteNote: function() {
                for (var i = 0; i < this.notes.length; i++) {
                    if (this.notes[i] == noteSelected) {
                        this.notes.splice(i, 1);
                        this.note = {
                            title: '',
                            content: '',
                            tags: [],
                            tagsString: ''
                        };
                        // sesion=false;
                        noteSelected = null;
                    }
                }
            },
            resetError: function(time) {
                setTimeout(this.reset, time);
            },
            reset: function() {
                this.hasError = 0;
                this.typeError = 'warning';
            }
        },
        computed: {
            footerMessaje: function() {
                return this.notes.length >= 1 ? 'Seleccione una nota para poder editarla' : 'No tienes ninguna nota, agrega una!';
            },
            errorMessage: function() {
                if (this.hasError === 1) {
                    return 'No puedes guardar una Nota con contenido vacio';
                } else if (this.hasError === 2) {
                    this.resetError(1300);
                    return 'Los datos han sido guardados Correctamente';
                }
            }
        }
    });
})();
