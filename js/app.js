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
        noteSelected: 1,
        note: {
            title: '',
            content: '',
            tags: [''],
            tagsString: ''
        },
        notes: [{
            title: '',
            content: '',
            tags: [''],
            tagsString: ''
        }]
    },
    methods: {
        addTags: function() {
            var t = this.note.tagsString.split(',');
            for (var i = 0; i < t.length; i++) {
                t[i] = t[i].trim();
            }
            this.note.tags = t;
        },
        newNote: function(){

        },
        saveNote: function() {

        },
        addNote: function() {

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
            }else if (this.hasError === 2) {
                this.resetError(1500);
                return 'Los datos han sido guardados Correctamente';
            } else if (this.hasError === 3) {
                this.resetError(2000);
                return 'A habido un error indesperado a la hora de guardar';
            }
        }
    }
});
