const scheduleUrl = 'https://sandbox.gibm.ch/tafel.php';
var calendarEl = document.getElementById('calendar');
var events = [];
var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['timeGrid'],
    defaultView: 'timeGridWeek',
    weekends: false,
    minTime: '05:00:00',
    maxTime: '19:00:00',
    footer: false,
    nowIndicator: true,
    allDaySlot: false,
    header: {
        left: 'prevDate,nextDate,todayB',
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
                initializeCalendar();
            }
        },
        todayB: {
            text: 'today',
            click: function () {
                calendar.today()
                initializeCalendar();
            }
        },
        prevDate: {
            text: 'prev',
            click: function () {
                calendar.prev()
                initializeCalendar();
            }
        }
    },
    eventRender: function(info) {
        tippy(info.el, {
            allowHTML: true,
            content: info.event.title +"<br>"+ 
                    info.event.prof,
          });
      }
    
});
document.addEventListener('DOMContentLoaded', function something() {
    //get localstorage
    const info = getLocalStorage().split(';');
    initializeCalendar();
});

function initializeCalendar() {
    events = [];

    var now = moment(calendar.getDate())
    var week = now.format('ww-yyyy');
    console.log("Current Week", week);
    const url = `${scheduleUrl}?klasse_id=${localStorage.getItem('class')}&woche=${week}`;
    $.getJSON(url, function (data) {
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
            events.push(event);
        }
    }).done(function () {

        calendar.getEvents().forEach(event => event.remove());
        events.forEach(event => calendar.addEvent(event));
        
        M.Toast.dismissAll()

        if (events.length == 0) {
            M.toast({ html: 'Sit back and relax, no school this week :)' })
        }
    });


    calendar.rerenderEvents();
    calendar.refetchEvents();
    calendar.render();
}

function openModal() {
    $('#modal1').modal('open');
    console.log("opening modal");
}






