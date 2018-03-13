// Use the year in the footer
var year = moment().format('YYYY');
$("#year").text(year);

// var eventId = 2;
$('.fb-button').on('click', function() {
  eventId = $(this).attr("data-id")
  // console.log(eventId);
  $.ajax({
    method: 'get',
    url: '/api/event/' + eventId,
  }).then(function(eventData) {
    // eventData.pageId = '203801840389513';
    // console.log(eventData);

    var postText =
      'Hey everybody, we have a new event coming up, ' + eventData.title + '!\n' + 
      'Date: ' + eventData.date + '.\n' + 
      'Show starts at ' + eventData.start + ' and ends at ' + eventData.end + '.\n' + 
      'Location: @' + eventData.location + '\n\n' +
      eventData.description + '\n' +
      (eventData.public ? 'This event is open to the public, come on out!' : 'This is a private event.');
    // console.log(postText);
    var postData = { postText: postText, pageId: eventData.Client.pageId };
    console.log(postData);

    fbPostIt(postData);
  });
});
