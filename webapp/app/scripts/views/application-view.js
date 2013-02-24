webapp.Views.applicationView = Backbone.View.extend({

  //template: application
  //
  el: '#shamanApp',

  statsTemplate: _.template( $('#stats-template').html() ),

  events: {
    'keypress #new-todo': 'createOnEnter',
    'click #new-todo': 'consoleLog'
  },

  consoleLog: function(){
    console.log(el);
  },

  createOnEnter: function(e){
    if ( e.which !== 13 || !this.$input.val().trim() ) {
      return;
    }

    app.Todos.create( this.newAttributes() );
    this.$input.val('');
  },

  initialize: function(){

    this.$input = this.$('#new-todo');
  }

});

