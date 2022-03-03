$(document).ready(function(){

    $('form').on('submit', '#ingredientsForm', function(event){
        $.ajax({
            data: {
                ingredients : $('#ingrform').val(), 
            },
            type : 'POST',
            url : '/Recipes.html'
        })

        event.preventDefault();

    });


});