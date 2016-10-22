MilesBM.Views.BookmarkView = Backbone.View.extend
({
 
    tagName: 'li',
    className:'collection-item avatar own', 
    template: _.template($('#bookmarkItem-template').html()),
    render: function()  
    {
        this.$el.html(this.template(this.model));
        return this; 
    }

    
}); 
 