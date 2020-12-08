window.onload=function(){
  var a = 'Am realizat acest site pentru a furniza o platformă de pe care oamenii își vor putea descărca niște jocuri populare freeware, dar totodată vor putea descoperi mai mult despre ce reprezintă acest niche în lumea jocurilor video.';
  var b = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

  var primul_text= a.split(' ');
  var al_doilea_text= b.split(' ');

  setInterval(treptat,333);

  var i=0;
  function treptat() {
    if (i < primul_text.length) {
      document.getElementById("p1").innerHTML += primul_text[i];
      document.getElementById("p1").innerHTML += ' ';
    }

    if(i < al_doilea_text.length){
      document.getElementById("p2").innerHTML += al_doilea_text[i];
      document.getElementById("p2").innerHTML += ' ';
    }
    i++;
  }
    
}