window.onload=function(){
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();


	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un astfel de pachet)
	4 - a terminat
	*/
	ajaxRequest.onreadystatechange = function() 
  {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					obJson = JSON.parse(this.responseText);
					afiseazaJsonTemplate(obJson);
			}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)

  var imagini_jocuri = ["chicken.jpg", "dokidoki.jpg", "FNaF.jpg", "imvu.png", "osu.png", "solitaire.jpg"];

  function imag_rand()
  {
    let cale = "images/";
    let indice = randInt(0, imagini_jocuri.length);
    cale += imagini_jocuri[indice];
    document.getElementById("poza").src=cale;
  }
  
  imag_rand();
  var poze_random = setInterval(function()
  {
    imag_rand();
  }, 1000);


  setTimeout(function(){
    clearInterval(poze_random);
    document.getElementById("poza").src="";
  },5000);

	ajaxRequest.open("GET", "/json/objects.json", true);
	//trimit catre server cererea
	ajaxRequest.send();

	box=document.getElementById("afisTemplate");
	function afiseazaJsonTemplate(obJson) { 
			//in acets div voi afisa template-urile   

			//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
			let textTemplate ="";
			//parcurg vetorul de studenti din obJson
      if(!localStorage.getItem("cheie"))
			for(let i=0;i<obJson.jocuri.length;i++){
				//creez un template ejs (primul parametru al lui ejs.render)
				//acesta va primi ca parametru un student din vectorul de studenti din json {student: obJson.studenti[i]}
				//practic obJson.studenti[i] e redenumit ca "student" in template si putem sa ii accesam proprietatile: student.id etc
				textTemplate+=ejs.render("<div class='templ_jocuri'>\
				<p>Id: <%= joc.id %></p>\
				<p>Nume si data lansare: <%= joc.nume %> - <%= joc.data_lansare %></p>\
				<p>Are link de descarcare? <%= joc.link_descarcare %></p>\
				</div>", 
				{joc: obJson.jocuri[i]});
			} 
      else{
      if(localStorage.getItem("litera-input"))
        document.getElementById("input-caracter").value = localStorage.getItem("litera-input");
      textTemplate = localStorage.getItem("cheie");
      }
			//adaug textul cu afisarea studentilor in container
			box.innerHTML=textTemplate;
	}


  var buton = document.getElementById("sort-an");
  buton.onclick = function()
  {
    var tabel = document.getElementsByClassName("templ_jocuri");
    var detalii = box.children;
    var jocuri = Array.prototype.slice.call(detalii);
    jocuri.sort(function(a,b)
    {
      let n1 = a.children[1].innerHTML.split(" ");
      n1 = parseInt(n1[n1.length - 1]);
      let n2 = b.children[1].innerHTML.split(" ");
      n2 = parseInt(n2[n2.length - 1]);

      return n1-n2;
    });

    for(let joc of jocuri)
      box.appendChild(joc);

    var informatii_totale = box.innerHTML;

    localStorage.setItem("cheie", informatii_totale);
  }

  var ok = 0;
  var butonCalculare = document.getElementById("buton-calculare");
  butonCalculare.onclick = function()
  {
    var tabel = document.getElementsByClassName("templ_jocuri");
    var detalii = box.children;
    var jocuri = Array.prototype.slice.call(detalii);
    var medie = 0;
    if(ok == 0){
    for(let joc of jocuri)
    {
      let an = joc.children[1].innerHTML.split(" ");
      an = parseInt(an[an.length - 1]);
      medie += an;
    }
    medie = parseInt(medie/jocuri.length);
    let afisare = document.getElementById("calculare").children[1];
    let text = afisare.innerHTML+medie;
    afisare.innerHTML=text;
    ok = 1;
    }
    
    var informatii_totale = box.innerHTML;

    localStorage.setItem("cheie", informatii_totale);
  }

  //filtrare-nume, filtrare-descarcare

  var buton_filtrareDescarcare = document.getElementById("filtrare-descarcare");
  buton_filtrareDescarcare.onclick = function()
  {
    var tabel = document.getElementsByClassName("templ_jocuri");
    var detalii = box.children;
    var jocuri = Array.prototype.slice.call(detalii);
    
    for(let i = 0; i < detalii.length; i++)
    {
      var link = detalii[i].children[2].innerHTML.split(" ");
      link = link[4];
      if(link != "DA!")
      {
        detalii[i].remove();
        i-=1;
      }
    }
    
    var informatii_totale = box.innerHTML;

    localStorage.setItem("cheie", informatii_totale);
  }

  var buton_filtrareNume = document.getElementById("filtrare-nume");
  buton_filtrareNume.onclick = function()
  {
    var tabel = document.getElementsByClassName("templ_jocuri");
    var detalii = box.children;
    var jocuri = Array.prototype.slice.call(detalii);
    var litera = document.getElementById("input-caracter").value.toLowerCase();
    for(let i = 0; i < detalii.length; i++)
    {
      var caracter = detalii[i].children[1].innerHTML[22].toLowerCase();
      if(litera)
      if(litera != caracter)
      {
        detalii[i].remove();
        i-=1;
      }
    }
    
    var informatii_totale = box.innerHTML;

    localStorage.setItem("cheie", informatii_totale);
    localStorage.setItem("litera-input", document.getElementById("input-caracter").value);
  }

  var buton_resetare = document.getElementById("resetare");
  buton_resetare.onclick = function()
  {
    localStorage.clear();
    if(document.getElementById("input-caracter").value != "")
      document.getElementById("input-caracter").value = "";
    afiseazaJsonTemplate(obJson);

  }
  

  function randInt(a,b){
        return Math.trunc(a+(b-a)*Math.random());
    }

}