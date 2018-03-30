var socket;
var editor;

window.onload = function(){
     socket = io();

    socket.on('connect', function(){

      var temp  = location.href;

      console.log(temp);
      console.log(socket.id);

      socket.emit('setup',socket.id,temp);

    });

    socket.on('editUpdate', function(data){
      console.log("WE MADE IT");
      //document.getElementById("editor"). = data;
      editor.setValue(data, -1);
    });








    editor = ace.edit("editor");
    editor.setTheme("ace/theme/pastel_on_dark");
    editor.getSession().setMode("ace/mode/javascript");
    // editor.getSession().on('change', function() {
    // update(editor)
    // });
}


function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("editor").style.marginLeft = "250px";
  document.getElementById("tabMenu").style.marginLeft = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("editor").style.marginLeft = "0";
  document.getElementById("tabMenu").style.marginLeft = "0";
  document.getElementById("main").style.marginLeft = "0";
    }

function update(event){
  console.log(event.keyCode);
  if(event.keyCode == 8){
    var data = editor.getValue();
    var room = location.href.split('/')[4];
    console.log("BACKSPACE");

    socket.emit('editorUpdate', data, room);
  }
  else{  var data = editor.getValue();
    var room = location.href.split('/')[4];
    console.log(data);
    console.log(room);

    socket.emit('editorUpdate', data, room);
}
 }






   //  <!-- <script>
   //  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
   // function openNav() {
   //   document.getElementById("mySidenav").style.width = "250px";
   //   document.getElementById("editor").style.marginLeft = "250px";
   //   document.getElementById("tabMenu").style.marginLeft = "250px";
   //   document.getElementById("main").style.marginLeft = "250px";
   // }
   //
   // /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
   // function closeNav() {
   //   document.getElementById("mySidenav").style.width = "0";
   //   document.getElementById("editor").style.marginLeft = "0";
   //   document.getElementById("tabMenu").style.marginLeft = "0";
   //   document.getElementById("main").style.marginLeft = "0";
   //     }
   //    </script> -->
