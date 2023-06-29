$(function () {
  // This is the Function to generate the time blocks for in this case standard business hours.
  function generateTimeBlocks() {
    var currentHour = dayjs().hour();

    for (var hour = 9; hour <= 17; hour++) {
      var DisplayedtimeBlock = $('<div>').addClass('row time-block');
      var hourBlock = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(dayjs().hour(hour).format('ha'));
      var descriptionBlock = $('<textarea>').addClass('col-8 col-md-10 description');

      // by doing the calculation below we are determining the color coding of the time blocks and whether or not they belong in the 'past' 'present' or the 'future'

      if (hour < currentHour) {
        DisplayedtimeBlock.addClass('past');
      } else if (hour === currentHour) {
        DisplayedtimeBlock.addClass('present');
      } else {
        DisplayedtimeBlock.addClass('future');
      }

      // Here we are checking for any saved events from the user // Also are creating a Dynamic time blocks with hour labels and save button.
      // Then we have to Append the time blocks to the HTML.
      // where this will ensure that saved events are shown to the user.
      var EventUserSaved = localStorage.getItem('event-' + hour);
      if (EventUserSaved) {
        descriptionBlock.val(EventUserSaved);
      }

      var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
      var saveIcon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');

      saveBtn.append(saveIcon);
      DisplayedtimeBlock.attr('id', 'hour-' + hour);
      DisplayedtimeBlock.append(hourBlock, descriptionBlock, saveBtn);

      $('#DynamictimeBlocksContainer').append(DisplayedtimeBlock);
    }
  }

  // Here we are adding a click event listener to the document, specifically targeting elements with the class "saveBtn". The trim part is also added to remove the whitespace. Then it saves the event text within our local storage using the hour value as the ID 
  $(document).on('click', '.saveBtn', function () {
    var hour = $(this).parent().attr('id').split('-')[1];
    var eventText = $(this).siblings('.description').val().trim();

    localStorage.setItem('event-' + hour, eventText);
  });

  // Here we want to display the date on top of the page hence we are targeting the element ID in the HTML file #currentDay and giving the text content applying the formatting that we want it to show
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // we are calling the function generateTimeBlocks(); where this Generates time blocks on page load
  generateTimeBlocks();
});
