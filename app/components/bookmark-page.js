MilesBM.Collections.Bookmark = Backbone.Collection.extend
({
        model: MilesBM.Model.Bookmark,

});

MilesBM.Collections.Folder = Backbone.Collection.extend
({
        model: MilesBM.Model.Folder,

});

var bookmarkcollection = new MilesBM.Collections.Bookmark;
var folderCollection = new MilesBM.Collections.Folder;

var FolderView = Backbone.View.extend
({
        el: $('#bookmarkPageView'),
        events: 
        {
            'click #addBookmarkItem': 'addBookmark',  
            'click #deleteBookmarkItem' : 'deleteBookmarkItem',                        
            'click #addNewBookmark' : 'addNewBookmark',
            'click #addNewFolderItem' : 'addNewFolder',
            'click #submitNewFolderItem' : 'addNewFolderItem',
            'blur .collection-item > .title' : 'editBookmarkTitle'  
        },        
        addNewFolder : function()
        { 
            console.log(" CSK addFolder item"); 
            $('#addFolderModalForm').openModal();  
        },
        addNewFolderItem : function()
        {
            this.newFolderItem = new MilesBM.Model.Folder();
            folderCollection.add(this.newFolderItem); 
            console.log(" CSK this.newFolderItem ",this.newFolderItem, folderCollection);    
 
        },              
        addNewBookmark : function()
        { 

                
            this.newItem = new MilesBM.Model.Bookmark();

            this.currentItem =this.newItem;

            var url = $("#bookmarkpageurl").val();
            var name = $("#bookmarkpagename").val();


            this.newItem.set({
                url: url,
                name : name
            }); 

            bookmarkcollection.create(this.newItem);     

            $("#bookmarkpageurl").val("");
            $("#bookmarkpagename").val("");
        },        
        initialize: function()
        { 
            _.bindAll(this, 'render', 'addBookmark', 'appendBookmark');

            this.listenTo(bookmarkcollection, 'add', this.appendBookmark);

            this.render();
        },
        render: function()
        {
            
            var self = this;

            $(this.el).append("<ul class='collection bookmarkListView blue-grey lighten-5' id='bookmarkListView'></ul>"); 

            _(bookmarkcollection.models).each(function(item)
            {
                self.appendBookmark(item);
            }, this);
            
        },
         addBookmark: function()
        {
            this.isEditMode = false;    
            $('#addBookmarkModalForm').openModal();
            $(".bookMarkTitle").text("New Bookmark"); 
        },
        openEditBookmarkModal : function(e)
        {
            var elementID = e.target.id;
            var obj = bookmarkcollection.find({cid:elementID});
            this.isEditMode = true; 

            this.currentItem = obj;
            // console.log(" this.newItem ",this.collection, elementID);
            // console.log(" this.newItem ",obj, elementID); 

            $("#bookmarkpageurl").val(obj.attributes.url);  
            $("#bookmarkpagename").val(obj.attributes.name); 
            $('#addBookmarkModalForm').openModal();
            $(".bookMarkTitle").text("Edit Bookmark");
        },
        deleteBookmarkItem : function()
        {
            // $('#deleteBookmarkModal').openModal(); 
        },        
        appendBookmark: function(item)
        {

            
            console.log(" appendBookmark ",item); 
            // console.log(" CSK item is here ",this.isEditMode); 
            if(!this.isEditMode)
            {  
                var itemView = new MilesBM.Views.BookmarkView({ 
                    model: item 
                });

                $('#bookmarkListView', this.el).append(itemView.render().el);

                
            }else
            {
                //   item.save({title: this.currentItem.attributes.name});  
                // console.log(" this.currentItem is ",this.currentItem, this.collection);  
                // // this.currentItem.save(); 
                // $("#bookmarkpageurl").val(this.currentItem.attributes.name); 
                // $("#bookmarkpagename").val(this.currentItem.attributes.url);   
            }
              
        },
        appendFolderItem : function(item)
        {
                console.log("");
            var itemView = new MilesBM.Views.FolderView({ 
                model: item
            });

            $('#bookmarkListView', this.el).append(itemView.render().el);
      } 
});

var listView = new FolderView();
