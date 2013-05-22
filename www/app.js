// add coordinates, to be able to show a map

var selected_event = localStorage.getItem('selected_event');
events = {
    "ilpw2013" : {
        "url"        : "http://act.perl.org.il/ilpw2013/",
        "name"       : "Perl Workshop in Israel, 2013",
        "date-start" : "2013-02-25",
        "date-end"   : "2013-02-25",
        "location"   : "Ramat Gan, Israel"
    },
    "nlpw2013" : {
        "url"        : "http://www.perlworkshop.nl/nlpw2013/",
        "name"       : "Dutch Perl Workshop 2013",
        "date-start" : "2013-04-19",
        "date-end"   : "2013-04-19",
        "location"   : "Arnhem, The Netherlands"
    },
    "dcbpw2013" : {
        "url"        : "http://dcbpw.org/dcbpw2013/",
        "name"       : "DC-Baltimore Perl Workshop 2013",
        "date-start" : "2013-04-20",
        "date-end"   : "2013-04-20",
        "location"   : "Baltimore, MD, USA"
    },
    "plpw2013" : {
        "url"        : "http://act.yapc.eu/plpw2013/",
        "name"       : "Polish Perl Workshop 2013",
        "date-start" : "2013-05-25",
        "date-end"   : "2013-05-26",
        "location"   : "Warsaw, Poland"
    },
    "yn2013"   : {
        "url"        : "http://www.yapcna.org/yn2013/",
        "name"       : "YAPC::NA 2013",
        "date-start" : "2013-06-03",
        "date-end"   : "2013-06-05",
        "location"   : "Austin, Texas, USA"
    }
};


function show_event_selector() {
  //console.log('list_events');
  for (var id in events) {
    //console.log(id);
    $("#event-selector").append('<option value="' + id + '">' + events[id]["name"] + '</option>\n');
  }
  $("#event-selector").trigger('create');
  //console.log(html);
//    $('#event-selector').focus();
    $('#event-selector').change(function() {
        //console.log('changed');
        //console.log( $('#event-selector').val() );
        var event_id = $('#event-selector').val();
        var html = '';
        if (event_id) {
            html += 'Location: ' + events[event_id]["location"] + '<br>\n';
            html += 'Start: '    + events[event_id]["date-start"] + '<br>\n';
            html += 'End: '      + events[event_id]["date-end"] + '<br>\n';
        }
        $('#event-details').html(html);
    })

    return false;
}
$('#goto-event').click(function() {
  selected_event = $('#event-selector').val();
  if (selected_event && events[selected_event]) {
    localStorage.setItem('selected_event', selected_event);
    // goto event-page
  } else {
    alert('invalid selection')
  }
  return false;
});



function show_opening() {
    $('#page-opening').show();
    $('title').html( events[selected_event]["name"] );
    $('#title').html( events[selected_event]["name"] );
    $('#show-selector').click(function() {
        show_event_selector();
    });
}

$(document).ready(function() {
  console.log('ready');
  show_event_selector();
  //if (selected_event && events[selected_event]) {
  //  console.log(selected_event);
  //  show_opening();
  //} else {
  //}
  
// get the username, pw and save them locally
// for development have a button that will use the saved credentials and will try to login
// for real life we will probably want to hide the need to login
// (once we have the saved username and password)

  $('#save-credentials').click(function() {
    var username = $('#username').val();
    var password = $('#pw').val();
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  
    //console.log('save');
    return false;
  });
  $('#login').click(function() {
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');
    //console.log(username);
    //console.log(password);
    url = 'http://act.perl.org.il/ilpw2013/' + 'LOGIN';
    // name="destination" value="/ilpw2013/main"> 
    data = "credential_0=" + username + '&credential_1=' + password;
    //Remember on this computer: 
    // data += "credential_2=CHECKED"
     jQuery.post(url, data, function(data) {
        console.log('success');
        console.log(data);
     });

    
    return false;
  });
});


