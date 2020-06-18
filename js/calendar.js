const scheduleUrl = 'https://sandbox.gibm.ch/tafel.php';
var calendarEl = document.getElementById('calendar');
var events = [];
var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['dayGrid',],
    defaultView: 'dayGridWeek',
    weekends: false,
    minTime: '07:00:00',
    maxTime: '18:30:00',
    handleWindowResize: true,
});
document.addEventListener('DOMContentLoaded', function something() {
    //get localstorage
    const info = getLocalStorage().split(';');
    initiliazeCalendar(); 
});

function initiliazeCalendar() {
    events = [];
    updateEvents();
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
            calendar.getEvents().forEach(event => event.remove());
            events.forEach(event => calendar.addEvent(event));
        });
    }

    calendar.refetchEvents()
    calendar.rerenderEvents()
    calendar.render();
    console.log(calendar.getEventSources());
}





