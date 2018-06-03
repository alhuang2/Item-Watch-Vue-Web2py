// This is the js for the default/index.html view.

var app = function() {
    var self = {};

    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    self.linkSubmit = function(){
        self.vue.linkExists = true;
        console.log("hello");
        console.log(self.vue.url);
    }

    $.ajax({
     type: 'GET',
     url: "https://computers.woot.com/offers/hp-omen-870-intel-i7-gtx1070-desktop-2",
     processData: true,
     data: {},
     dataType: "html",
     crossDomain: true,
     success: function (data) {
         processData(data);
     }
    });

    function processData(data){
        //Do some stuff with the data
        console.log(data);
        $("#site-loader").html(data);
    }

    //httpGet("https://computers.woot.com/offers/hp-omen-870-intel-i7-gtx1070-desktop-2");
    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            linkExists: false,
            url: "",
            logged_in: false
        },
        methods: {
            linkSubmit: self.linkSubmit
        }

    });


    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
$("#vue-div").show();
jQuery(function(){APP = app();});
