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

function list_events() {
    var html = '<select id="event-selector">\n';
    html += '<option id=""></option>\n';
    for (var id in events) {
        html += '<option value="' + id + '">' + events[id]["name"] + '</option>\n';
    }
    html += "</select>\n";
    //console.log(html);
    $('#event-list').html(html);
    $('#event-selector').focus();
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
            show_opening();
            return false;
        });
    })
}

function fetch_schedule() {
    if (! selected_event) {
        $('#error-no-selected-event').show();
        return false;
    }

    $('#error-no-selected-event').hide();
    $('#error-no-schedule').hide();
    var url = events[selected_event]["url"] + "timetable.ics";
    console.log(url);
    jQuery.get(url, '', schedule_arrived);
    return false;
}

function schedule_arrived(input, textStatus, jqXHR) {
    console.log('schedule arrived');
    var raw_data = localStorage.getItem( selected_event );
    var data;
    if (raw_data) {
        data = JSON.parse( raw_data );
    } else {
        data = new Array;
    }
    data["timetable"] = input;
    console.log(input);
    localStorage.setItem( selected_event, JSON.stringify(data));
    show_schedule();
}


function hide_all() {
    $('#page-event-selector').hide();
    $('#page-opening').hide();
    $('#page-schedule').hide();

    $('#error-no-selected-event').hide();
    $('#error-no-schedule').hide();
}
function show_schedule() {
    $('#error-no-schedule').hide();
    var data = localStorage.getItem( selected_event );
    if (! data || !  data["timetable"] ){
        $('#error-no-schedule').show();
        return false;
    }
    hide_all();
    $('#page-schedule').show();
    $('#page-schedule').html('');
}
function show_event_selector() {
    hide_all();
    $('#page-event-selector').show();
    list_events();
}
function show_opening() {
    hide_all();
    $('#page-opening').show();
    $('title').html( events[selected_event]["name"] );
    $('#title').html( events[selected_event]["name"] );
    $('#show-selector').click(function() {
        show_event_selector();
        return false;
    });
    $('#fetch-schedule').click(function() {
        fetch_schedule();
        return false;
    });
    $('#show-schedule').click(function() {
        show_schedule();
        return false;
    });
}

$(document).ready(function() {
    if (selected_event && events[selected_event]) {
        show_opening();
    } else {
        show_event_selector();
    }
});

