const jobUrl = 'https://sandbox.gibm.ch/berufe.php';
const classUrl = 'https://sandbox.gibm.ch/klassen.php';
const scheduleUrl = 'https://sandbox.gibm.ch/tafel.php';



//get data from url
$.getJSON(serverUrl)
    //if successful return the data into $data
    .done(function (data) {
        //empty message (no problem with api call)
        $('warningMessage').empty;
        //append drop down box 
        $.each(data, function (i, beruf) {
            const onclickId = ()=>{getClass(beruf.beruf_id)};
           
            $('<button onclick="'+ onclickId +'"><option value="' + beruf.beruf_id + '">'
                + beruf.beruf_name + '</option></button').appendTo($('#jobs'));
        })
    })
    .fail(function () {
        $('warningMessage').html('No Connection to Server :(')
    }

    );

function getClass(job_id) {
    //build url
    let build = 'http://sandbox.gibm.ch/klassen.php?beruf_id=${job_id} '
    console.log('getClass called')

    $.getJSON(build)
        .done(function (classData) {
            //console.log(classData);
            //empty message (no problem with api call)
            $('warningMessage').empty;
            //append drop down box 

        })
        .fail(function () {
            $('warningMessage').html('No Connection to Server :(')
        }

        );
    return 
}
function getCalendar(params) {

}