// add coordinates, to be able to show a map
events = {
    "ilpw2013" : {
        "url"        : "http://act.perl.org.il/ilpw2013/",
        "name"       : "Perl Workshop in Israel, 2013",
        "date-start" : "2013-02-25",
        "date-end"   : "2013-02-25",
        "location"   : "Rmat Gan, Israel"
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
    var html = "<select>\n";
    html += '<option id=""></option>\n';
    for (var id in events) {
        html += '<option id="' + id + '">' + events[id]["name"] + '</option>\n';
    }
    html += "</select>\n";
    console.log(html);
    $('#event-list').html(html);
}

$(document).ready(function() {
    //$('title').html(title);
    list_events();
});
