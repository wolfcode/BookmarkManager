MilesBM.Views.BookmarkView = Backbone.View.extend
({
 
    tagName: 'li',
    className:'collection-item avatar own', 
    template: _.template($('#bookmarkItem-template').html()),
    initialize: function() 
    {
        this.listenTo(this.model, 'destroy', this.remove);
    },
    events: {
      'click #deleteBookmarkItem' : 'deleteBookmark',
      'blur .title' : 'editBookmarkTitle',
      'blur .pageurl' : 'editBookmarkURL', 
      'click #editBookmarkItem' : 'changeMode'  
    }, 
    changeMode : function(e) 
    {
        var bItem = $(e.target).parent().parent().parent().find('.beditItem'); 
        var mode = ($(".collection-item > .title").attr('contentEditable') === "true")
        $(bItem).attr('contentEditable',!mode);
        $(".collection-item > .title").focus();  
    },       

    editBookmarkURL : function(e) 
    {

         this.model.save({url: $(".title.beditItem").text(),url: $(".pageurl.beditItem").text()});
         this.changeCurrentMode(e);            
    },
    editBookmarkTitle  : function(e) 
    {
        this.model.save({name: $(".title.beditItem").text(),url: $(".pageurl.beditItem").text()});
        this.changeCurrentMode(e);     
    },  
    render: function()  
    {
        this.$el.html(this.template(this.model));
        return this; 
    },
    changeCurrentMode : function(e)
    {
        var bItem = $(e.target).parent().parent().parent().find('.beditItem');
        $(bItem).attr('contentEditable',false);
    },
    deleteBookmark : function()
    {  
        this.model.destroy(); 
    },

    
}); 
 
