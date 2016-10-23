MilesBM.Views.FolderView = Backbone.View.extend
({
 
    tagName: 'ul',
    className:'collection-item avatar own', 
    template: _.template($('#folderItem-template').html()),
    initialize: function() 
    {
        this.listenTo(this.model, 'destroy', this.remove);
    },
    events: 
    {
            'click #deleteFolderItem' : 'deleteFolder',  
            'blur .title' : 'editFolderTitle',
            'click #editFolderItem' : 'changeMode'
    },       
    render: function()  
    {
        this.$el.html(this.template(this.model.attributes));
        return this; 
    },
     changeMode : function(e) 
    {
        var bItem = $(e.target).parent().parent().parent().find('.beditItem');
        console.log(" changeMode Folder ",$(e.target).parent().parent().parent(), bItem);  
        var mode = ($(".collection-item > .title").attr('contentEditable') === "true")
        $(bItem).attr('contentEditable',!mode);
        $(".collection-item > .title").focus();  
    },
    editFolderTitle : function()
    {
        this.model.save({name: $(".title.beditItem").text()}); 
        this.changeCurrentMode(e);     
    },
     deleteFolder : function()
    {  
        this.model.destroy(); 
    }, 
   

    
}); 
 
