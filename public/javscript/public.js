$("#articles").empty();

$(document).on("click", "#clear", function(){
    $("#articles").empty();

  })
$(document).on("click", "#scrapeButton", function() {
    $.get("/scrape");
    location.reload();
});

$.getJSON("/api/saved", function(data) {
    for (var i = 0; i < data.length; i++) {
      $("#articles").append("<div id='newArticle' data-id='" + data[i]._id + "'>" + "<p> <h4>" 
      + data[i].title + "<button id='saveArticle' type='button' class='btn btn-primary' style='float: right;'>Save</button></h4>" 
      + "<a href='" + data[i].link + "'>Link To Article</a></p>");
    }
  });

  $(document).on("click", "#saveArticle", function() {
    $.get("/saved/:id");
      var thisId =$(this).attr("data-id");
      $.ajax({
        method: "POST",
        url: "/saved" + thisId,
        data: {
          title: $("#savedArticleTitle"),
          link: $("#savedLink")
        }
      })
      .then(function(data) {
          console.log(data);
      })
  })
