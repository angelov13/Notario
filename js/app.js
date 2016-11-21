// Vue.config.degug = true;
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
            if (this.validate() === true) {
                this.addTags();
                this.notes.push(this.note);
                noteSelected = null;
                this.note = {
                    title: '',
                    content: '',
                    tags: [],
                    tagsString: ''
                };
            }
        },
        saveNote: function() {
            if (this.validate() === true && noteSelected !== null) {

            }
        },
        addNote: function() {

        },
        selectNote: function(note) {
            this.note = note;
            noteSelected = note;
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
                this.typeError = 'danger';
                this.hasError = 3;
                return false;
            }
        },
        deleteNote: function() {

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
                return 'No puedes guardar una Nota vacia';
            } else if (this.hasError === 2) {
                this.resetError(1500);
                return 'Los datos han sido guardados Correctamente';
            } else if (this.hasError === 3) {
                this.resetError(1000);
                return 'A habido un error indesperado a la hora de guardar';
            }
        }
    }
});
