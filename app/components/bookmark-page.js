MilesBM.Collections.Bookmark = Backbone.Collection.extend
({
        model: MilesBM.Model.Bookmark,        

});

MilesBM.Collections.Folder = Backbone.Collection.extend
({
        model: MilesBM.Model.Folder,        

});


var FolderView = Backbone.View.extend
({
        el: $('#bookmarkPageView'),
        events: 
        {
            'click #addBookmarkItem': 'addBookmark',  
            'click #editBookmarkItem' : 'openEditBookmarkModal',
            'click #deleteBookmarkItem' : 'deleteBookmarkItem',
            'input #searchBookmarkInputBox' : 'searchBookmarks',
            'click #addNewBookmark' : 'addNewBookmark',
            'click #addNewFolderItem' : 'addNewFolder',
            'click #submitNewFolderItem' : 'addNewFolderItem',
             'dblclick .collection-item > .title' : 'changeMode',
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
            this.folderCollection.add(this.newFolderItem); 
            console.log(" CSK this.newFolderItem ",this.newFolderItem, this.folderCollection);    
 
        },
        changeMode : function(e) 
        {
            var mode = ($(".collection-item > .title").attr('contentEditable') === "true")
            $(e.target).attr('contentEditable',!mode);
        },
        editBookmarkTitle  : function(e) 
        {
                console.log(" editBookmarkTitle is here ",$(e.target), $(e.target).val(), this.newItem);
                this.newItem.set({name:$(e.target).text()}); 
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
            this.collection.add(this.newItem);
            $("#bookmarkpageurl").val("");
            $("#bookmarkpagename").val("");
        },
        searchBookmarks : function(e)
        {
            var inputVal = $(e.target).val();
            this.collection.filter(function(obj,item,arr)
            {
                console.log(" CSK master ",obj.attributes.name, " :: ",inputVal);
            })
            // console.log(" Bookmark item ",inputVal,this);   
        },
        initialize: function()
        { 
            _.bindAll(this, 'render', 'addBookmark', 'appendBookmark');
            
            console.log(" initialize ",this, this.model); 

            this.collection = new MilesBM.Collections.Bookmark();
            this.folderCollection = new MilesBM.Collections.Folder();             
            this.collection.bind('add', this.appendBookmark);
            this.folderCollection.bind('add', this.appendFolderItem);

            this.render();
        },
        render: function()
        {
            
            var self = this;

            $(this.el).append("<ul class='collection bookmarkListView blue-grey lighten-5' id='bookmarkListView'></ul>"); 

            _(this.collection.models).each(function(item)
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
            var obj = this.collection.find({cid:elementID});
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
            $('#deleteBookmarkModal').openModal(); 
        },        
        appendBookmark: function(item)
        {

            
            console.log(" CSK item is here ",this.isEditMode); 
            if(!this.isEditMode)
            {
                var itemView = new MilesBM.Views.BookmarkView({ 
                    model: item 
                });

                $('#bookmarkListView', this.el).append(itemView.render().el);
            }else
            {
                console.log(" this.currentItem is ",this.currentItem, this.collection);  
                // this.currentItem.save(); 
                $("#bookmarkpageurl").val(this.currentItem.attributes.name);
                $("#bookmarkpagename").val(this.currentItem.attributes.url); 
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