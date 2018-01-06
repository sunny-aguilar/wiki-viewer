$(document).ready(function() {
    //hides container div
    $('.container').hide();

    $('#search').hide();
    $('input ~ div').hide();

    // Shows search field
    $('#mag-glass').on('click', function() {
        $('#mag-glass').fadeOut();
        $('h3').fadeOut();
        
        $('#search').fadeIn();
        $('input ~ div').fadeIn();
        $('#search').focus();
    });

    $('#btn-clear').on('click', function() {
        // Returns icon back to initial state  
        $('#mag-glass').fadeIn();
        $('h3').fadeIn();
        
        $('#search').fadeOut();
        $('input ~ div').fadeOut();

        // Removes search results on blur
        const element = document.querySelector('.container');

        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        
        $('.search-container-search').addClass('search-container');
    });    

    $('input').on('keypress', function(e){
        if(e.which == 13) {
            let userQuery = $('input').val();
            
            $('.search-container').addClass('search-container-search');
            $('.search-container').removeClass('search-container');
            $('.container').fadeIn(1200);

            submitSearch(userQuery);
            userQuery = '';
        }  
    });

    function submitSearch(userQuery) {
        let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + userQuery + '&format=json&callback=?';

        $.ajax({
            type: 'get',
            url: url,
            async: false,
            dataType: 'json',
            success: function(data) {
                //console.log(data);
                
                const node = $('.container');
                const element = document.querySelector('.container');
                
                // Removes first child
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }

                // Appends entries into DOM
                for(let i = 0; i < data[1].length; i++) {                   
                    const newNode = $('<div>').addClass('content');
                    
                    newNode.html('<h2>' + data[1][i] + '</h2>' + '<br>' + data[2][i] + '<br>' + '<h4>' + '<a class="links" target="_blank">' + 'Visit Link' + '</a>' + '</h4>');

                    node.append(newNode);
                    $('h4 > a').attr('href', data[3][i]);
                } 
            }, 
            error: function(errMessage) {
                // Adds an error message and removes it
                const node = $('#error').addClass('container');
                const newNode = $('<div>').addClass('content').css('text-align', 'center');
                newNode.text('There seems to be an error with the search, try again');
                node.append(newNode);
                node.fadeOut(2800);
                setTimeout(function(){newNode.remove()}, 2000);
            }
        });
        //$(".content1").load("test.txt");
    } // End submitSearch function
});