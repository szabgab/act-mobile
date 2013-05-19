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


function hide_all() {
    //$('#page-event-selector').hide();
    //$('#page-opening').hide();
}
function show_event_selector() {
//    hide_all();
//    $('#page-event-selector').show();
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
        html += '<input type="button" id="event-set" value="Set" />';
        $('#event-details').html(html);
        $('#event-set').click(function() {
            selected_event = $('#event-selector').val();
            localStorage.setItem('selected_event', selected_event);
            return false;
        });
    })

    return false;
}
function show_opening() {
    hide_all();
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
});


