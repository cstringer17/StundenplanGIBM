document.addEventListener('DOMContentLoaded', function () {

  //initialize all modals
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);

  $('#classes').hide();

  $('#modal1').modal();

  console.log(getLocalStorage());
 
  if (localStorage.getItem("class") === null && localStorage.getItem("job") === null) {
    $('#modal1').modal('open');
  }
  $('#jobs').on('change', function () {

    console.log("Somethings changed...");

    //getClass
    retrieveClass();

    $('#classes').show();
  });
});

function retrieveClass(){
  getClass($("#jobs option:selected").val());
}


function getLocalStorage() {
  var localJob = localStorage.getItem('job');
  var localClass = localStorage.getItem('class');
  return localJob + ";" + localClass;
}