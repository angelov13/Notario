Vue.config.degug = true;
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

var app = new Vue({
    el: '#app',
    data: {
        hasError: 0,
        typeError: '',
        sesion: false,
        saveButton: 'Guardar Nota',
        cancelButton: 'Cancelar',
        noteSelected: null,
        note: {
            title: '',
            content: '',
            tags: [''],
            tagsString: ''
        },
        notes: []
    },
    methods: {
        addTags: function() {
            var t = this.note.tagsString.split(',');
            for (var i = 0; i < t.length; i++) {
                t[i] = t[i].trim();
            }
            this.note.tags = t;
        },
        saveNote: function() {
            if (this.validate === true && this.noteSelected !== null) {
                this.addNote(true);
                this.sesion = true;
                // this.note.title = '';
                // this.note.content = '';
                // this.note.tags = [];
                // this.note.tagsString = '';

            }
        },
        addNote: function(save) {
            if (save) {
                if (this.sesion === true) {
                    this.addTags();
                    this.notes.replace(this.noteSelected, 1, this.note);
                    this.typeError = 'info';
                    this.hasError = 4;
                }
            } else {
                this.notes.push(this.noteSelected);
            }

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
                this.hasError = 5;
                return false;
            }
        },
        selectNote: function() {
            if (this.note.title === '' && this.note.content === '' && this.note.tags === '') {
                this.hasError = 3;
                this.typeError = 'danger';
            }
        },
        cancel: function() {
            this.resetError(1000);
        },
        resetError: function(time) {
            setTimeout(reset(), time);

            function reset() {
                this.hasError = 0;
                this.typeError = 'warning';
            }
        },
    },
    computed: {
        footerMessaje: function() {
            return this.notes.length >= 1 ? 'Seleccione una nota para poder editarla' : 'No tienes ninguna nota, agrega una!';
        },
        errorMessage: function() {
            if (this.hasError === 1) {
                return 'No puedes guardar una Nota vacia';
            } else if (this.hasError === 2) {
                return '¿Estas seguro que deceas salir sin guardar?';
            } else if (this.hasError === 3) {
                return 'Si abres esta nota perderas todos los cambios que no hayas guardado ¿Deseas continuar?';
            } else if (this.hasError === 4) {
                this.resetError(1500);
                return 'Los datos han sido guardados Correctamente';
            } else if (this.hasError === 5) {
                this.resetError(2000);
                return 'A habido un error indesperado a la hora de guardar';
            }
        }
    }
});
