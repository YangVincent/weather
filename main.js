/* Created by Vincent Yang for ECS 89h model.weatherApp April 26, 2016 */
var normal;
/*
 * model.weather.object retrieval
 */

var model = {
  weather: {},
  condition: function(s) {
    if (s < 12){ /* storm */
      return 'lightning';
    }
    else if (s < 17) {/* snow */
      return 'snow';
    }
    else if (s < 24) { /*wind */
      return 'wind';
    }
    else if (s < 31) { /* cloudy */
      return 'cloudy';
    }
    else if (s < 37) { /* sunny */
      return 'sunny';
    }
    else { /* rain */
      return 'rainy';
    }
  },
  day: function(s) {
    if (s == 'Mon') {
      return 'Monday';
    }
    else if (s == 'Tue'){
      return 'Tuesday';
    }
    else if (s == 'Wed'){
      return 'Wednesday';
    }
    else if (s == 'Thu'){
      return 'Thursday';
    }
    else if (s == 'Fri'){
      return 'Friday';
    }
    else if (s == 'Sat'){
      return 'Saturday';
    }
    else {
      return 'Sunday'
    }
  },
  month: function(s) {
    if (s == 'Jan') {
      return "January";
    }
    else if (s == 'Feb'){
      return 'Febuary';
    }
    else if (s == 'Mar'){
      return 'March';
    }
    else if (s == 'Apr'){
      return 'April';
    }
    else if (s == 'May'){
      return s;
    }
    else if (s == 'Jun'){
      return 'June';
    }
    else if (s == 'Jul'){
      return 'July';
    }
    else if (s == 'Aug'){
      return 'August';
    }
    else if (s == 'Sep'){
      return 'September';
    }
    else if (s == 'Oct'){
      return 'October';
    }
    else if (s == 'Nov'){
      return 'November';
    }
    else {
      return 'December';
    }
  }
}

var view = {
  enterClick: function() {
    if (event.keyCode == 13) {
      document.getElementById("sub").click();
    }
  },
  enterClick2: function() {
    if (event.keyCode == 13){
      view.submit2();
      /*document.getElementById('sub2').click();*/
    }
  },
  addDay: function(d) {
    var d1 = document.createElement('div');
    var d1left = document.createElement('div');
    d1.className = 'd1';
    d1left.className = 'd1left';
    t1 = document.createElement('p');
    t1.appendChild(document.createTextNode(model.day(model.weather.item.forecast[d].day)));
    t1.className = 'bold2';
    t2 = document.createElement('p');
    var s = model.weather.item.forecast[d].date;
    s = model.month(s.substring(3, 6)) + " " + s.substring(0, 2) + ', ' + s.substring(7, 12);
    t2.appendChild(document.createTextNode(s));
    t2.className = 'smallday';

    d1left.appendChild(t1);
    d1left.appendChild(t2);

    d1.appendChild(d1left);

    if (model.weather.size == 0) {
      return;
    }
    var code = model.weather.item.forecast[d].code;
    console.log("code is " + code);
    model.currentImage == null;

    var i1 = document.createElement('img');
    if (model.condition(code) == 'lightning'){
      i1.src = 'lightning.png';
    }
    else if (model.condition(code) == 'snow'){
      i1.src = 'snowy.png';
    }
    else if (model.condition(code) == 'wind'){
      i1.src = 'windy.png';
    }
    else if (model.condition(code) == 'cloudy') {
      i1.src = 'cloudy.png';
    }
    else if (model.condition(code) == 'sunny'){
      i1.src = 'sunny.png';
    }
    else { /* rainy*/
      i1.src = 'rainy.png';
    }
    i1.className = 'right';
    d1.appendChild(i1);

    var d1right = document.createElement('div');
    d1right.className = 'd1right';
    var d1p = document.createElement('p');
    var temp = (parseInt(model.weather.item.forecast[d].high) + parseInt(model.weather.item.forecast[d].low))/2;
    d1p.appendChild(document.createTextNode(temp + '\u2109'));
    
    d1right.appendChild(d1p);

    d1.appendChild(d1right);

    return d1;

  },
  submit: function() {
    var l = document.getElementById('zip').value;
    if (l == ''){
      l = 'davis'; //default is davis
    }

    normal=false;

	var http = new XMLHttpRequest();
  	var url = "https://query.yahooapis.com/v1/public/yql?q=select%20woeid,name,admin1,country%20from%20geo.places%20where%20text='"+l+"'&format=json"
  	http.open("POST", url, true);
  
  	//Send the proper header information along with the request
  	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
  	http.onreadystatechange = function() {//Call a function when the state changes.
  	    if(http.readyState == 4 && http.status == 200) {
  	        control.placeCallback(JSON.parse(http.responseText));
  	    }
  	}
  	http.send();
  },
  submit2: function() {
    var l = document.getElementById('zip2').value;
    if (l == ''){
      l = 'davis'; //default is davis
    }

    var d = document.getElementById('woeid');
    if (d != null){
      document.body.removeChild(d);
    }
    normal=true;
	var http = new XMLHttpRequest();
  	var url = "https://query.yahooapis.com/v1/public/yql?q=select%20woeid,name,admin1,country%20from%20geo.places%20where%20text='"+l+"'&format=json"
  	http.open("POST", url, true);
  
  	//Send the proper header information along with the request
  	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
  	http.onreadystatechange = function() {//Call a function when the state changes.
  	    if(http.readyState == 4 && http.status == 200) {
  	        control.placeCallback(JSON.parse(http.responseText));
  	    }
  	}
  	http.send();

  },
  setup: function() {

    var titlediv = document.createElement('div');
    titlediv.className = 'titlediv';
    var title = document.createElement('h1');
    title.id = 'title';
    title.appendChild(document.createTextNode("Weather!"));
    titlediv.appendChild(title);

    var search = document.createElement("input");
    search.onkeydown = view.enterClick;
    search.type='text';
    search.className = 'search';
    search.name = 'zip';
    search.placeholder = "City / Zip Code";
    search.id = 'zip';

    var sub = document.createElement("input");
    sub.type="submit";
    sub.value="Search!";
    sub.className = 'submit';
    sub.onclick = view.submit;
    sub.id = 'sub';
    document.body.appendChild(titlediv);
    document.body.appendChild(search);
    document.body.appendChild(sub);

  },
  setup2: function(n) {
    if (n == false){
      document.body.removeChild(document.getElementById('zip'));
      document.body.removeChild(document.getElementById('sub'));
    }
    else {
      while (document.body.firstChild){
        document.body.removeChild(document.body.firstChild);
      }
      var titlediv = document.createElement('div');
      titlediv.className = 'titlediv';
      var title = document.createElement('h1');
      title.id = 'title';
      title.appendChild(document.createTextNode("Weather!"));
      titlediv.appendChild(title);
      document.body.appendChild(titlediv);
    }
    var search = document.createElement("input");
    search.onkeydown = view.enterClick2;
    search.type='text';
    search.className = 'search2';
    search.name = 'zip';
    search.placeholder = "City / Zip Code";
    search.id = 'zip2';

    var sub = document.createElement("input");
    sub.type="submit";
    sub.value="Search!";
    sub.className = 'submit';
    sub.onclick = view.submit2;
    sub.id = 'sub2';

    document.body.appendChild(search);



    var left = document.createElement('div');
    left.className = 'left';
    var city = document.createElement('p');
    city.className = 'city';
    city.appendChild(document.createTextNode(model.weather.location.city + ',' + model.weather.location.region));
    left.appendChild(city);

    var today = document.createElement('div');
    /* attach image */
    var img = document.createElement("img");

    //get the current weather
    var code = model.weather.item.condition.code;
    if (model.condition(code) == 'lightning'){
      img.src = 'lightning.png';
    }
    else if (model.condition(code) == 'snow'){
      img.src = 'snowy.png';
    }
    else if (model.condition(code) == 'wind'){
      img.src = 'windy.png';
    }
    else if (model.condition(code) == 'cloudy') {
      img.src = 'cloudy.png';
    }
    else if (model.condition(code) == 'sunny'){
      img.src = 'sunny.png';
    }
    else {
      img.src = 'rainy.png';
    }
    img.className = 'left';
    img.height = 250;
    img.width = 300;

    /* Start here - fix paragraphs */
    var tp = document.createElement('p');
    tp.className = 'left';
    tp.appendChild(document.createTextNode("TODAY"));

    var td = document.createElement('p');
    var d = document.createTextNode(model.day(model.weather.item.forecast[0].day).toUpperCase());
    td.className = 'centerdate left';
    td.appendChild(d);

    var ts = document.createElement('p');

    var s = model.weather.item.forecast[0].date;
    s = model.month(s.substring(3, 6)) + " " + s.substring(0, 2) + ', ' + s.substring(7, 12);

    ts.appendChild(document.createTextNode(s));
    ts.className = 'smallday';
    ts.className = 'left';

    var t1 = document.createElement('p');
    t1.className = 'bold left';
    var temp = model.weather.item.condition.temp;
    t1.appendChild(document.createElement('br'));
    t1.appendChild(document.createTextNode(temp + '\u2109'));


    var tt = document.createElement('p');
    tt.appendChild(document.createElement('br'));
    tt.appendChild(document.createTextNode('HIGH ' + model.weather.item.forecast[0].high + '\u2109' + ' / LOW ' + model.weather.item.forecast[0].low + '\u2109'));
    tt.appendChild(document.createElement('br'));

    
    if (model.condition(code) == 'lightning'){ /* storm */
      tt.appendChild(document.createTextNode('There\'s lightning. Watch out!'));
    }
    else if (model.condition(code) == 'snow') {/* snow */
      tt.appendChild(document.createTextNode('It\'s snowy. Stay warm!'));
    }
    else if (model.condition(code) == 'wind') { /*wind */
      tt.appendChild(document.createTextNode('It\'s windy. Stay warm!'));
    }
    else if (model.condition(code) == 'cloudy') { /* cloudy */
      tt.appendChild(document.createTextNode('It\'s cloudy. Go to a park!'));
    }
    else if (model.condition(code) == 'sunny') { /* sunny */
      tt.appendChild(document.createTextNode('It\'s sunny. Time to break out those shorts.'));
    }
    else { /* rain */
      tt.appendChild(document.createTextNode('It\'s rainy. Don\'t forget an umbrella!'));
    }
    tt.className = 'left';

    today.appendChild(img);
    today.appendChild(tp);
    today.appendChild(td);
    today.appendChild(ts);
    today.appendChild(t1);
    today.appendChild(tt);
    left.appendChild(today);

    document.body.appendChild(left);

    var right = document.createElement('div');
    var next = document.createElement('p');
    next.className = 'next';
    next.appendChild(document.createTextNode('Next 5 days:'));
    right.appendChild(next);
    right.className='right';

    right.appendChild(view.addDay(1));
    right.appendChild(view.addDay(2));
    right.appendChild(view.addDay(3));
    right.appendChild(view.addDay(4));
    right.appendChild(view.addDay(5));

    document.body.appendChild(right);
  }  
}

window.onload = view.setup();

function callbackFunction1(JSONdata){
  var woeid = JSONdata.query.results.place[0].woeid;
  console.log("woeid is " + woeid);

  var q = document.createElement('script');
  q.src = 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid = ' + woeid + '&format=json&callback=callbackFunction2 ';
  document.body.appendChild(q);
}
function callbackFunction2(JSONdata){
  console.log(JSONdata);
  model.weather = JSONdata.query.results.channel;
  if (normal == true) {
    view.setup2(true);
  }
  else {
    view.setup2(false);
  }
}
