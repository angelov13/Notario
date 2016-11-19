// Vue.config.debug = true;
var app = new Vue({
    el: '#app',
    data: {
        userName: '',
        newNote: {
            title: '',
            content: '',
            tags: ''
        },
        notes: [{
            title: '',
            content: '',
            tags: '',
        }],
    },
    methods: {
        empyNewNote: function(){
            this.newNote = {
                title: '',
                content: '',
                tags: ''
            };
        },
        addNote: function(add) {
            if (this.newNote.title !== '' && this.newNote.content !== '') {
                if (add===true) {
                    this.notes.push(this.newNote);
                    this.empyNewNote();
                }else{
                    this.notes.push(this.newNote);
                }
            }
        },
    }
});
