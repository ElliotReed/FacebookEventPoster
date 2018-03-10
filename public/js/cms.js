$(document).ready(function() {
  // Getting jQuery references to the event body, title, form, and client select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var clientSelect = $("#client");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a event)
  var url = window.location.search;
  var eventId;
  var clientId;
  // Sets a flag for whether or not we're updating a event to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the event id from the url
  // In '?event_id=1', eventId is 1
  if (url.indexOf("?event_id=") !== -1) {
    eventId = url.split("=")[1];
    getEventData(eventId, "event");
  }
  // Otherwise if we have an client_id in our url, preset the client select box to be our Client
  else if (url.indexOf("?client_id=") !== -1) {
    clientId = url.split("=")[1];
  }

  // Getting the clients, and their events
  getClients();

  // A function for handling what happens when the form to create a new event is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the event if we are missing a body, title, or client
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !clientSelect.val()) {
      return;
    }
    // Constructing a newEvent object to hand to the database
    var newEvent = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      ClientId: clientSelect.val()
    };

    // If we're updating a event run updateEvent to update a event
    // Otherwise run submitEvent to create a whole new event
    if (updating) {
      newEvent.id = eventId;
      updateEvent(newEvent);
    }
    else {
      submitEvent(newEvent);
    }
  }

  // Submits a new event and brings user to blog page upon completion
  function submitEvent(event) {
    $.event("/api/event", event, function() {
      window.location.href = "/blog";
    });
  }

  // Gets event data for the current event if we're editing, or if we're adding to an client's existing events
  function getEventData(id, type) {
    var queryUrl;
    switch (type) {
    case "event":
      queryUrl = "/api/event/" + id;
      break;
    case "client":
      queryUrl = "/api/clients/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.ClientId || data.id);
        // If this event exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        clientId = data.ClientId || data.id;
        // If we have a event with this id, set a flag for us to know to update the event
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Clients and then render our list of Clients
  function getClients() {
    $.get("/api/clients", renderClientList);
  }
  // Function to either render a list of clients, or if there are none, direct the user to the page
  // to create an client first
  function renderClientList(data) {
    if (!data.length) {
      window.location.href = "/clients";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createClientRow(data[i]));
    }
    clientSelect.empty();
    console.log(rowsToAdd);
    console.log(clientSelect);
    clientSelect.append(rowsToAdd);
    clientSelect.val(clientId);
  }

  // Creates the client options in the dropdown
  function createClientRow(client) {
    var listOption = $("<option>");
    listOption.attr("value", client.id);
    listOption.text(client.name);
    return listOption;
  }

  // Update a given event, bring user to the blog page when done
  function updateEvent(event) {
    $.ajax({
      method: "PUT",
      url: "/api/event",
      data: event
    })
      .then(function() {
        window.location.href = "/blog";
      });
  }
});
