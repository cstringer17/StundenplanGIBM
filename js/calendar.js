const scheduleUrl = 'https://sandbox.gibm.ch/tafel.php';
var calendarEl = document.getElementById('calendar');
var events = [];
var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['timeGrid'],
    defaultView: 'timeGridWeek',
    weekends: false,
    minTime: '07:00:00',
    maxTime: '18:30:00',
    footer: false,
    allDaySlot: false,
    header: {
        left: 'prevDate,nextDate,today',
        center: 'title',
        right: 'openModal,timeGridWeek,timeGridDay'
    },
    customButtons: {
        openModal: {
            text: 'settings',
            click: function () {
                openModal();
            }
        },
        nextDate: {
            text: 'next',
            click: function () {
                calendar.next()
                initiliazeCalendar();
            }
        },
        prevDate: {
            text: 'prev',
            click: function () {
                calendar.prev()
                initiliazeCalendar();
            }
        }
    },
});
document.addEventListener('DOMContentLoaded', function something() {
    //get localstorage
    const info = getLocalStorage().split(';');
    initiliazeCalendar();
});

function initiliazeCalendar() {
    events = [];
    updateEvents();
    var now = moment(calendar.getDate())
    var week = now.format('ww-yyyy');
    console.log(week);
    function updateEvents() {
        $.getJSON(scheduleUrl, { klasse_id: localStorage.getItem('class'), woche: week }, function (data) {
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
                console.log(JSON.stringify(events,null,"   "));
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
}

function openModal() {
    $('#modal1').modal('open');
    console.log("opening modal");
}






