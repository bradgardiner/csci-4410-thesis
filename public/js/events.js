var editor = ace.edit("editor");
editor.setTheme("src/ace/theme/monokai");
editor.getSession().setMode("src/ace/mode/javascript");
editor.getSession().on('change', function() {
  update()
});


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



function update()
{
  var val = editor.getSession().getValue();
  var divecho = document.getElementById("output");
  divecho.innerHTML = val;
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
