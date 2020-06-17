const scheduleUrl = 'https://sandbox.gibm.ch/tafel.php';

document.addEventListener('DOMContentLoaded', function () {


    //get localstorage
    const info = getLocalStorage().split(';');

    var calendarEl = document.getElementById('calendar');
    var events = [];
    updateEvents();


    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid',],
        defaultView: 'dayGridWeek',
        weekends: false,
        events: events
    });
    
    function updateEvents() {
        $.getJSON(scheduleUrl, { klasse_id: localStorage.getItem('class') }, function (data) {
            for (var table of data) {
               
                var event = {
                    title: table.tafel_longfach,
                    start: table.tafel_datum + 'T' + table.tafel_von,
                    end: table.tafel_datum + 'T' + table.tafel_bis,
                    prof: table.tafel_lehrer,
                    room: table.tafel_raum,
                    comment: table.tafel_kommentar,
                    allDay: false
                };
                console.log(JSON.stringify(
                    events,      // the object to stringify
                    null, // a function or array transforming the result
                    "   "    // prettyprint indentation spaces
                ));
                events.push(event);
            }
        }).done(function () {
            //alert when there are no events this week
        });
    }
    
    calendar.addEventSource(events);
    console.log(calendar.getEventSources());
    calendar.refetchEvents()
    calendar.rerenderEvents()
    calendar.render();
});


