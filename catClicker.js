var Cat = function(name, url){
    this.name = name;
    this.url = url;
    this.counter = 0;
};

Cat.prototype.clicked = function(){
    this.counter++;
};

var catList = [];
catList.push( new Cat('cat1', 'img/cat1.jpg') );
catList.push( new Cat('cat2', 'img/cat2.jpg') );
catList.push( new Cat('cat3', 'img/cat3.jpg') );
catList.push( new  Cat('Nyan Cat', 'img/nyanCat.PNG') );
catList.push( new Cat('Grumpy Cat', 'img/Grumpy_Cat.jpg') );
    
$(document).ready(function(){
    
    for (var i = 0; i < catList.length; i++) {
        var element = document.createElement('li');
        var t = document.createTextNode(catList[i].name);
        element.appendChild(t);
        $('#list').append(element);

        element.addEventListener("click", (function(catCopy) {
            return function() {
                $('#cat>#name').text( catCopy.name );
                $('#cat>#image').attr('src', catCopy.url );
                $('#cat>#counter').text( catCopy.counter );
                $("#cat>#image").off('click');
                $("#cat>#image").on('click', function(){
                    catCopy.clicked();
                    $('#cat>#counter').text( catCopy.counter );
                });
            };
        })(catList[i]));
    }
    
    $( "li:first" ).trigger( "click" );
    
});