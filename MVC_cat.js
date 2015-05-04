$(function(){
    //Objects
    var Cat = function(name, url){
        this.name = name;
        this.url = url;
        this.counter = 0;
    };
        
    var model = {
        currentCat : null,
        
        catList : [
            new Cat('cat1', 'img/cat1.jpg'),
            new Cat('cat2', 'img/cat2.jpg'),
            new Cat('cat3', 'img/cat3.jpg'),
            new Cat('Nyan Cat', 'img/nyanCat.PNG'),
            new Cat('Grumpy Cat', 'img/Grumpy_Cat.jpg')
        ]
    };

    var controller = {
        init : function(){
            model.currentCat = 0;
            view.renderCat(model.currentCat);
            view.init();
        },
        
        getAllCats: function(){
            return model.catList;
        },
        
        catClicked : function(catID){
            model.currentCat = catID;
            view.renderCat(catID);
        },
        
        catVote : function(){
            var cats = model.catList;
            cats[model.currentCat].counter++;
            view.renderCat(model.currentCat);
        },
        
        adminUpdate : function(){
            var cats = model.catList;
            var cat = cats[model.currentCat];
            
            cat.name = $('#catName').val();
            cat.url = $('#catUrl').val();
            cat.counter = $('#catCount').val();
            
            view.renderCat(model.currentCat);
            view.renderList();
        }
        
        
    };

    var view = {
        init : function(){
            this.renderList();
            
            //Add click event
            $("#cat>#image").on('click', function(){
                controller.catVote();
            });
            
            //Add admin click event
            $("#adminButton").on('click', function(){
                $("#admin").toggle();
            });
            
            //Add admin submit event
            $("#admin>form").submit(function(e){
                controller.adminUpdate();
                $("#adminButton").trigger( "click" );
                return false;
            });
            
        },
        
        renderCat : function( catID ){
            var cats=controller.getAllCats();
            
            $('#cat>#name').text( cats[catID].name );
            $('#cat>#image').attr('src', cats[catID].url );
            $('#cat>#counter').text( cats[catID].counter );
            
            //fill Admin form
            $('#catName').val( cats[catID].name );
            $('#catUrl').val( cats[catID].url );
            $('#catCount').val( cats[catID].counter );
        },
        
        //Render Cat List
        renderList : function(){
            var cats=controller.getAllCats();
            $('#catList').empty();
            for(var cat in cats){
                var element = document.createElement('li');
                var t = document.createTextNode( cats[cat].name );
                element.appendChild(t);
                $('#catList').append(element);
                
                //Add Click Event
                element.addEventListener("click", (function(catCopy) {
                    return function() {
                        controller.catClicked(catCopy);
                    };
                })(cat));
            }
        }
    };

    controller.init();
});