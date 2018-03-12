$(document).ready(function() {
  // This function displays a messgae when there are no events
  function displayEmpty(id) {
    var query = window.location.search;
    eventContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No events yet. Add an event in order to get started.");
    eventContainer.append(messageh2);
  }
  
  // Submit button on click will create a new event
  $(".form-inline").on("submit", function(event) {
    // Prevent page from reloading on click
    event.preventDefault();

    // Temporary event holder
    // Trim any unnecessary white space
    var newEvent = {
      title: $("#title").val().trim(),
      date: $("#date").val().trim(),
      start: $("#start").val().trim(),
      end: $("#end").val().trim(),
      description: $("#description").val().trim(),
      location: $("#location").val().trim()
    };

    // Send post request
    $.ajax({
      method: "post",
      url: "/api/event/",
      data: newEvent
    }).then(function() {
      console.log("created new event");
      // Reload to update list
      location.reload();
    });
  });

  // Edit button will allow user to edit event
  $("#edit-event").on("click", function(event) {
    // Prevent page from reloading on click
    event.preventDefault();

    var currentEvent = $(this)
      .parent()
      .parent()
      .data("event");
      window.location.href = "/cms?event_id=" + currentEvent.id;
  });

  // Button to post to facebook will change posted value
  $("#post-event").on("click", function(event) {
    // Prevent page from reloading on click
    event.preventDefault();
    // temporary variable to caputure id
    var id = $(this).data("id");
    var eventPosted = $(this).data("posted");
    // temporary variable to change posted state
    var state = {
      posted: true
    }
    console.log("Posted event");
    $.ajax("/api/event", {
      type: "PUT",
      data: state
    }).then(
      function() {
        console.log("changed posted to " + state);
      }
    );
  });

  // Delete button will delete an event
  $("#delete-event").on("click", function(event) {
    // Prevent page from reloading on click
    event.preventDefault();
    
    var id = $(this).data("id");
    console.log("Id to delete: " + id)
    // Sent the POST request
    $.ajax("/api/event/" + id, {
      type: "DELETE",
    }).then(
      function() {
        console.log("deleted event");
        // Reload to update the list
        location.reload();
      }
    ); 
  });


  // // The code below handles the case where we want to get blog events for a specific client
  // // Looks for a query param in the url for client_id
  // var url = window.location.search;
  // var ClientId;
  // if (url.indexOf("?client_id=") !== -1) {
  //  ClientId = url.split("=")[1];
  //   getEvents (ClientId);
  // }
  // // If there's no ClientId we just get all events as usual
  // else {
  //   getEvents();
  // }

  // // This function grabs events from the database and updates the view
  // function getEvents(client) {
  //  ClientId = client || "";
  //   if  (ClientId) {
  //    ClientId = "/?client_id=" + ClientId;
  //   }
  //   $.get("/api/event" + ClientId, function(data) {
  //     console.log("Events", data);
  //     events = data;
  //     if (!events || !events.length) {
  //       displayEmpty(client);
  //     }
  //     else {
  //       initializeRows();
  //     }
  //   });
  // }

  // // InitializeRows handles appending all of our constructed post HTML inside eventContainer
  // function initializeRows() {
  //   eventContainer.empty();
  //   var eventsToAdd = [];
  //   for (var i = 0; i < events.length; i++) {
  //     eventsToAdd.push(createNewRow(events[i]));
  //   }
  //   eventContainer.append(eventsToAdd);
  // }

});
