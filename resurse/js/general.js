//var bgc = document.getElementById("butonelul");
window.onload=function(){
  document.getElementById("butonelul").onclick=Ascunde_imagini;
}
function Ascunde_imagini()
{
  var elemente = document.getElementsByClassName("imagine_joc")
  

  for(var i = 0; i < elemente.length; i++)
  {
    if(elemente[i].style.display === "none")
      elemente[i].style.display = "block";
    else
      elemente[i].style.display = "none";
  }
  // if(elemente[0].style.display === "none";)
  //   document.getElementById("butonelul").innerHTML = "Afiseaza imagini";
  // else
  //   document.getElementById("butonelul").innerHTML = "Ascunde imagini";

  
}