
$(function () {

    const jobUrl = 'https://sandbox.gibm.ch/berufe.php';
    const classUrl = 'https://sandbox.gibm.ch/klassen.php';


    $.getJSON(jobUrl)
        //if successful return the data into $data
        .done(function (data) {
            //empty message (no problem with api call)
            $('warningMessage').empty;
            //append drop down box 
            $.each(data, function (i, beruf) {
                var option = '<option value="' + beruf.beruf_id + '">' + beruf.beruf_name + '</option>';
                $('#jobs').append(option);
            })
        })
        .fail(function () {
            $('warningMessage').html('No Connection to Server :(')
        }

        );
});
function getClass(job_id) {
    //build url
    console.log(job_id);
    let build = "http://sandbox.gibm.ch/klassen.php?beruf_id=" + job_id
    console.log(build)
    $('#classes').html("");
    $.getJSON(build)
        .done(function (classData) {
            //console.log(classData);
            //empty message (no problem with api call)
            $('warningMessage').empty;
            //append drop down box 
            for (var d of classData) {
                var option = '<option value="' + d.klasse_id + '">' + d.klasse_longname + '</option>';
                $('#classes').append(option);
            }
        })
        .fail(function () {
            $('warningMessage').html('No Connection to Server :(')
        }

        );
    return
}


function setLocalStorage() {
    
    //Current Local Storage
    let info = getLocalStorage().split(';');
    console.log("jobid = " + info[0]);
    console.log("classid = " + info[1]);

    localStorage.setItem('job', $("#jobs option:selected").val());
    localStorage.setItem('class', $("#classes option:selected").val());

    //New Local Storage
    info = getLocalStorage().split(';');
    console.log("new_jobid = " + info[0]);
    console.log("new_classid = " + info[1]);

    initiliazeCalendar();

}