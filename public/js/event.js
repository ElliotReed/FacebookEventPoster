$(document).ready(function() {
  /* global moment */

  // eventContainer holds all of our events
  var eventContainer = $(".event-container");
  // var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleEventDelete);
  $(document).on("click", "button.edit", handleEventEdit);
  $(document).on("click", "#submit", handleEventCreate);
  // Variable to hold our events
  var events;

  // The code below handles the case where we want to get blog events for a specific client
  // Looks for a query param in the url for client_id
  var url = window.location.search;
  var ClientId;
  if (url.indexOf("?client_id=") !== -1) {
   ClientId = url.split("=")[1];
    getEvents (ClientId);
  }
  // If there's no ClientId we just get all events as usual
  else {
    getEvents();
  }

  

  // This function creates a new event at submit click
  function handleEventCreate() {
    var newEvent = {
      title: $("#title").val().trim(),
      date: $("#date").val().trim(),
      start: $("#start").val().trim(),
      end: $("#end").val().trim(),
      description: $("#description").val().trim(),
      location: $("#location").val().trim()
    }
    $.ajax({
      method: "post",
      url: "/api/event/",
      data: newEvent
    })
      .then(function() {
        getevents(postCategorySelect.val());
      });
  }


  // This function grabs events from the database and updates the view
  function getEvents(client) {
   ClientId = client || "";
    if  (ClientId) {
     ClientId = "/?client_id=" + ClientId;
    }
    $.get("/api/event" + ClientId, function(data) {
      console.log("Events", data);
      events = data;
      if (!events || !events.length) {
        displayEmpty(client);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete events
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/events/" + id
    })
      .then(function() {
        getevents(postCategorySelect.val());
      });
  }

  // InitializeRows handles appending all of our constructed post HTML inside eventContainer
  function initializeRows() {
    eventContainer.empty();
    var eventsToAdd = [];
    for (var i = 0; i < events.length; i++) {
      eventsToAdd.push(createNewRow(events[i]));
    }
    eventContainer.append(eventsToAdd);
  }

  // This function constructs an event's HTML
  function createNewRow(event) {
    var formattedDate = new Date(event.createdAt);
    // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newEventPanel = $("<div>");
    newEventPanel.addClass("panel panel-default");
    var newEventPanelHeading = $("<div>");
    newEventPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newEventTitle = $("<h2>");
    var newEventDate = $("<small>");
    var newEventclient = $("<h5>");
    newEventclient.text("Written by: " + event.client.name);
    newEventclient.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newEventPanelBody = $("<div>");
    newEventPanelBody.addClass("panel-body");
    var newEventBody = $("<p>");
    newEventTitle.text(event.title + " ");
    newEventBody.text(event.body);
    newEventDate.text(formattedDate);
    newEventTitle.append(newEventDate);
    newEventPanelHeading.append(deleteBtn);
    newEventPanelHeading.append(editBtn);
    newEventPanelHeading.append(newEventTitle);
    newEventPanelHeading.append(newEventclient);
    newEventPanelBody.append(newEventBody);
    newEventPanel.append(newEventPanelHeading);
    newEventPanel.append(newEventPanelBody);
    newEventPanel.data("event", event);
    return newEventPanel;
  }

  // This function figures out whichwEvent we want to delete and then calls deleteEvent
  function handleEventDelete() {
    var currentEvent = $(this)
      .parent()
      .parent()
      .data("event");
    deletwEvent(currentEvent.id);
  }

  // This function figures out whichwEvent we want to edit and takes it to the appropriate url
  function handleEventEdit() {
    var currentEvent = $(this)
      .parent()
      .parent()
      .data("event");
    window.location.href = "/cms?event_id=" + currentEvent.id;
  }

  // This function displays a messgae when there are no events
  function displayEmpty(id) {
    var query = window.location.search;
    eventContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No events yet. Add an event in order to get started.");
    eventContainer.append(messageh2);
  }

});
