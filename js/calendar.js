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
    handleWindowResize: true,
    eventBackgroundColor:"#CE796B",
    eventBorderColor:"#CE796B",
    eventTextColor:"#495867",
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
                noSchoolAnimation();
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
    eventRender: function (info) {
        tippy(info.el, {
            allowHTML: true,
            content: info.event.title + "<br>",

        });
        console.log(info.event.prof);
    }

});
document.addEventListener('DOMContentLoaded', function something() {
    //get localstorage
    const info = getLocalStorage().split(';');
    initializeCalendar();
    if ($(window).width() < 768) {
        calendar.changeView('timeGridDay');
        calendar.setOption('contentHeight', 650);
        calendar.setOption('aspectRatio', 1.2);
    }

});

function initializeCalendar() {
    events = [];

    var now = moment(calendar.getDate());
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
            noSchoolAnimation();
        }else{
        schoolAnimation();
        }
    }).fail(function () {
        M.toast({ html: 'GIBM Servers seem to be having troubles :(' })
    });


    calendar.rerenderEvents();
    calendar.refetchEvents();
    calendar.render();
}

function openModal() {
    $('#modal1').modal('open');
    console.log("opening modal");
}


function noSchoolAnimation() {
    var elements = document.querySelectorAll('#calendar');
    anime({
        targets: elements,
        keyframes: [
            { translateX: -10 },
            { translateX: +10 },
            { translateX: -10 },
            { translateX: +10 },
            { translateX: 0 }
        ],
        duration: 500,
        easing: 'easeInOutQuad'
    });

}

function schoolAnimation() {
    var elements = document.querySelectorAll('#calendar');
    anime({
        targets: elements,
        keyframes: [
            { translateY: -5 },
            { translateY: +5 },
            { translateY: 0 }
        ],
        duration: 500,
        easing: 'easeInOutQuad'
    });

}