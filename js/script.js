
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $nytElem = $('#nytimes-articles');
    var $wikiContainer= $(".wikipedia-container");

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    //$( "#single" ).val();

    // $wikiContainer.load("http://www.zillow.com/homes/48749425_zpid/");

    var street = $("#street").val();
    var city = $("#city").val();
    var addr = street + ', ' + city;
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=1600x1600&location=' +
        addr + '">');

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+
    city+"&api-key=e7f7732aa2274dbf82dd2d1c6dd4aac8";

    $.getJSON( url, function( data ) {
        // console.log(data.response.docs[0].snippet);
        //for
        var p = data.response.docs;
        // console.log(p.length);
        var tmp = [];
        for (var i=0; i<p.length; i++)
        {
            tmp +=
                ('<li>No.' + i + '  '+
                    '<a href=' + p[i].web_url + '>' + p[i].headline.main + '</a>' +
                    '<p>' + p[i].snippet + '</p>' +
                '</li>');
        }
        $nytElem.append(tmp);

    }).fail(function() {
        console.log( "NY Times Articles Could Not Be Loaded." );
        $nytHeaderElem.text("NY Times Articles Could Not Be Loaded." );
    });

    var urlwiki = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
    city + '&format=json&prop=revisions&rvprop=content&callback=wikiCallbackFunction';
    // var urlwiki = 'https://en.wikipedia.org/w/api.php';

    $.ajax( {
        url: urlwiki,
        dataType: 'jsonp'
    } ).success( function ( data ) {
        // console.log(data);
        var p = data[2];
        // console.log(p.length);
        var tmp = [];
        for (var i=0; i<p.length; i++)
        {
            tmp +=
                ('<li>No.' + i + '  '+
                    // '<a href=' + p[i].web_url + '>' + p[i].headline.main + '</a>' +
                    '<p>' + p[i] + '</p>' +
                '</li>');
        }
        $wikiElem.append(tmp);
    } );




    return false;
};

$('#form-container').submit(loadData);
