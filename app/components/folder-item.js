MilesBM.Views.FolderView = Backbone.View.extend
({
 
    tagName: 'ul',
    className:'collection-item avatar own', 
    template: _.template($('#folderItem-template').html()),
    render: function()  
    {
        this.$el.html(this.template(this.model.attributes));
        return this; 
    }

    
}); 
 