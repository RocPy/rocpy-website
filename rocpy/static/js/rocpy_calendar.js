//choose web app client Id, redirect URI and Javascript origin set to http://localhost
var clientId = '280052991968-3d2upar641cs1n7irilm1bk8im82ulva.apps.googleusercontent.com'; 
//choose public apiKey, any IP allowed (leave blank the allowed IP boxes in Google Dev Console)
var apiKey = 'AIzaSyDOvbTP1iAMt4xqI9HpdtucvTvaii_U41c';
var userEmail = "cobp4tp148oulmb0lghqtn4h58@group.calendar.google.com"; //your calendar Id
var userTimeZone = "America/New_York";
var maxRows = 10;
var calName = "RocPy Calendar";
var scopes = 'https://www.googleapis.com/auth/calendar.readonly';

function handleClientLoad() {
    // Simple authentication
    // https://developers.google.com/api-client-library/javascript/samples/samples#LoadinganAPIandMakingaRequest
    gapi.client.setApiKey(apiKey);

    loadCalendar();
}

/**
 * Loads the Event Calendar
 **/
function loadCalendar() {
    var today = new Date(); //today date

    gapi.client.load('calendar', 'v3', function () {
        var request = gapi.client.calendar.events.list({
            'calendarId' : userEmail,
            'timeZone' : userTimeZone, 
            'singleEvents': true, 
            'timeMin': today.toISOString(), //gathers only events not happened yet
            'maxResults': maxRows, 
            'orderBy': 'startTime'
        }
        );
        request.execute(listEvents);
    }
    );

    /*
       query.setOrderBy('starttime');
       query.setSortOrder('ascending');
       query.setFutureEvents(true);
       query.setSingleEvents(true);
        query.setMaxResults(10);

        service.getEventsFeed(query, listEvents, handleGDError);
        */
}

/**
 * Adds a leading zero to a single-digit number.  Used for displaying dates.
 **/
function padNumber(num) {
    if (num <= 9) {
        return "0" + num;
    }
    return num;
}


/**
 * Callback function for the Google data JS client library to call with a feed 
 * of events retrieved.
 *
 * Creates an unordered list of events in a human-readable form.  This list of
 * events is added into a div called 'events'.  The title for the calendar is
 * placed in a div called 'calendarTitle'
 *
 * @param {json} feedRoot is the root of the feed, containing all entries 
 **/ 
function listEvents(response) {
    var entries = response.items;
    var dd = $('#events dd.template').clone();
    var eventDL = document.getElementById('events');
    /* set the calendarTitle div with the name of the calendar */

    var elements = eventDL.getElementsByTagName("dd");
    for (var i = 0; i < elements.length; i++) {
        eventDL.removeChild(elements[i]);
    }


    /* loop through each event in the feed */
    //var len = entries.length;
    var len = 5; 

    var selDay = null;
	var prevEvent = null;

	var num_day_events = 0;
    for (var i = 0; i < len; i++) {
        var entry = entries[i];
        var title = entry.summary;
        var startDateTime = null;
        var allDay = false;

        if (entry.start.date) {
            allDay = true;
            startDateTime = new Date(entry.start.date);
        } else if (entry.start.dateTime) {
            startDateTime = new Date(entry.start.dateTime);

            var startTimeHourStr;

            if (startDateTime.getHours() > 12) {
                startTimeHourStr = startDateTime.getHours() - 12;
                add = "pm";
            } else if (startDateTime.getHours() <= 12) {
                startTimeHourStr = startDateTime.getHours();
                add = "am";
            } else if (hour == 12) {
                add = "pm";
            } else if (hour == 00) {
                hour = "12";
                add = "am";
            }
        }

        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        var startTimeDayOfWeekStr;
        var startTimeDayInt = startDateTime.getDay();
        switch(startTimeDayInt)
        {
            case 0:
                startTimeDayOfWeekStr = "Sunday";
                break;
            case 1:
                startTimeDayOfWeekStr = "Monday";
                break;
            case 2:
                startTimeDayOfWeekStr = "Tuesday";
                break;
            case 3:
                startTimeDayOfWeekStr = "Wednesday";
                break;
            case 4:
                startTimeDayOfWeekStr = "Thursday";
                break;
            case 5:
                startTimeDayOfWeekStr = "Friday";
                break;
            case 6:
                startTimeDayOfWeekStr = "Saturday";
                break;
            default:
                startTimeDayOfWeekStr = "";
                break;
        }

        var dateString = startTimeDayOfWeekStr + " " + startDateTime.getMonth() + "/" + startDateTime.getDate();
        if (!allDay) {
            dateString += " " + startTimeHourStr + ":" + 
                padNumber(startDateTime.getMinutes()) + " " + add;
        }

        newEvent = dd.clone();
        $(newEvent).removeClass('template');
        // manipulate its contents
		
		num_day_events++;
        if (startDateTime.getDate() != selDay) {
			// If the previous event is the last event of a previous day:
			// 1. If is a single event, don't hide the calendar badge
			// 2. Add a padding at the bottom

            if (selDay != null)
                $(newEvent).addClass('eventHeader');
            selDay = startDateTime.getDate();
            dateStr = '<p>' + monthNames[startDateTime.getMonth()] + " " + startDateTime.getDate() + ", " + startDateTime.getFullYear()+'</p>';

            $(newEvent).find('.date').empty();
            $(newEvent).find('.date').append(dateStr);

			num_day_events = 0;
        }
		if (num_day_events > 0) {
				$(newEvent).find('.date').css('visibility', 'hidden');
		}

		prevEvent = newEvent;
        if (entry.htmlLink) {
            entryLink = document.createElement('a');
            entryLink.setAttribute('href', entry.htmlLink);
            entryLink.appendChild(document.createTextNode(title));
        }
        var timeString = startTimeDayOfWeekStr;
        if (!allDay) {
            timeString += ", " + startTimeHourStr + ":" + padNumber(startDateTime.getMinutes()) + " " + add;
        }
        descStr = '<p class="eventTitle"><a href=' + entryLink + '>' + title + '</a></p>';
        descStr += '<p class="eventTime">' + timeString + '</p>';
        $(newEvent).find('.eventDesc').empty();
        $(newEvent).find('.eventDesc').append(descStr);
        $(newEvent).appendTo('#events');
    }
}

