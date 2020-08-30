function getBooks(f) {
  var p1 = $.get({
    dataType: 'json',
    url: 'https://spreadsheets.google.com/feeds/list/1Ae7qTNZi_DCz76_7LLUpGHAVRiugabSM0tpmjYO0erc/2/public/full?alt=json',
  });
    p1.done(function( data ) {
      f(data);
      var isbns = $('#BookLink, .thumbnail');
      $.each( isbns, function (i, isbndata) {
        isbn = $(isbndata).data('isbn');
        var p2 = $.get({
          dataType: 'json',
          url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn,
        });
        p2.done(function (data) {
          setThumb(data,isbndata);
          setBooklink(data,isbndata);
        });
      });
  });
}

function setThumb( response, img ) {
  var thumb = "";
  if(response.totalItems > 0){
    item = response.items[0];
    if (typeof(item.volumeInfo.imageLinks) != "undefined") {
      thumb    = item.volumeInfo.imageLinks.thumbnail;
    } else {
      thumb = "assets/img/no_cover_thumb.gif"
    }
  }
    $(img).attr('src', thumb);
}

function setBooklink( response, e ) {
  var bgimg = "";
  if(response.totalItems > 0){
    item = response.items[0];
    if (typeof(item.volumeInfo.imageLinks) != "undefined") {
      thumb    = item.volumeInfo.imageLinks.thumbnail;
    } else {
      thumb = "assets/img/no_cover_thumb.gif"
    }
      bgimg = 'background-image: url("'+thumb+'")'
  }
    $(e).attr('style', bgimg);
}


function parseRow( item ) {
  var title = item.gsx$title.$t,
      author = item.gsx$author.$t,
    plot = item.gsx$whatwasthestoryabout.$t,
    favouriteBit = item.gsx$whatwasyourfavouritebitandwhy.$t,
    favouriteCharacter = item.gsx$whatwasyourfavouritecharacterandwhy.$t,
    didntLike = item.gsx$whatdidntyoulike.$t,
    rating = item.gsx$howmanystarswouldyougiveit.$t,
    tag1 = item.gsx$whatwasthereadinglevel.$t,
    tag2 = item.gsx$thebookgenretickallthatapply.$t,
    reviewAuthor = item.gsx$whatnamedoyouwantthisreviewtobepublishedunder.$t,
    ISBN = item.gsx$isbn.$t;

  var ratingText = "Star rating: ";
  var i = 0;
  while (i<rating) {
    ratingText += "\u2b50";
    i++;
  }

    $('#title').text( title );
    $('#author').text( author );
    $('#plot').text( plot );
    $('#opinion').text( favouriteBit + favouriteCharacter);
    $('#tags').text( tag1 + ", " + tag2 + ", " + "written by " + reviewAuthor);
    $('#rating').text( ratingText );
    $('.thumbnail').attr("data-isbn",ISBN);
}

function ISBNorLastRow( response ) {
  if (window.location.hash) {
    ISBN = window.location.hash.substring(1)
    filteredItems = getLinesByISBN(response.feed.entry, ISBN)
    if(filteredItems.length==1) {
     parseRow(filteredItems[0])
     return;
    }
  }
  list = response.feed.entry
  item = list[list.length-1];
  parseRow(item);
}

function getLinesByISBN(rowArray,ISBN){
  return rowArray.filter(
    function(rowArray){ return rowArray.gsx$isbn.$t == ISBN}
  );
}

function parseSheet( response ) {
  $.each( response.feed.entry, function( i, item ) {
      var title = item.gsx$title.$t,
          author = item.gsx$author.$t,
          plot = item.gsx$whatwasthestoryabout.$t,
          favouriteBit = item.gsx$whatwasyourfavouritebitandwhy.$t,
          favouriteCharacter = item.gsx$whatwasyourfavouritecharacterandwhy.$t,
          didntLike = item.gsx$whatdidntyoulike.$t,
          rating = item.gsx$howmanystarswouldyougiveit.$t,
          tag1 = item.gsx$whatwasthereadinglevel.$t,
          tag2 = item.gsx$thebookgenretickallthatapply.$t,
          ISBN = item.gsx$isbn.$t,
          thumb = "/assets/img/loading.gif";

      var ratingText = "Star rating: ";
      var i = 0;
      while (i<rating) {
        ratingText += "\u2b50";
        i++;
      }

      divHtml = $("<div>").html("<br />" + title + "<br />" + author + "<br />" + ratingText);
      linkHtml = $("<a>");
      imgHtml = $("<img>") //.attr('src',VALUE)
      $(imgHtml).attr('alt','cover of '+title);
      $(imgHtml).attr('class','thumbnail');
      $(imgHtml).attr('src',thumb);
      $(imgHtml).attr('height', '200px');
      $(imgHtml).attr('data-isbn',ISBN);
      $(linkHtml).attr('href', 'bookreview.html#'+ISBN);
      linkHtml = $(linkHtml).append(imgHtml);
    articleHtml = $("<article>").append(linkHtml, divHtml);
    $(".threecolumneven").append(articleHtml);

  });
}
