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
        console.log(self.vue.url);
        $.ajax({
            type: 'GET',
            url: self.vue.url,
            processData: true,
            data: {},
            dataType: "html",
            crossDomain: true,
            success: function (data) {
             processData(data);
            }
        });
    }

    function processData(data){
        //Do some stuff with the data
        console.log(data);
        self.vue.html_data = data
        $("#site-loader").html(data);
    }

    self.toggle_select = function(){
        self.vue.is_selecting = !self.vue.is_selecting;
        if(self.vue.is_selecting){
            $(document).click(function(event) {
                var outerHTML = $(event.target).outerHTML;
                console.dir("wait a minute: " + (event.target).outerHTML);
                console.log("type of target: " + typeof((event.target).outerHTML));
                console.log("type of html_data: " + typeof(self.vue.html_data));
                console.log(self.vue.html_data.includes(outerHTML));
            });
        }
    }

    self.add_item_button = function () {
        // The button to add a track has been pressed.
        console.log(self.vue.is_adding_item);
        self.vue.is_adding_item = !self.vue.is_adding_item;
    };

    self.add_item = function () {
        // The submit button to add a track has been added.
        $.post(add_item_url,
            {
                name: self.vue.url,
                url: self.vue.url,
            },
            function (data) {
                $.web2py.enableElement($("#add_item_submit"));
                self.vue.checklist.unshift(data.checklist);
                self.vue.is_adding_item = false;
                self.name = '';
                self.url = '';
                // self.get_items(); // write this method
            });
    };

    //httpGet("https://computers.woot.com/offers/hp-omen-870-intel-i7-gtx1070-desktop-2");
    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            is_adding_item: false,
            name: '',
            linkExists: false,
            url: "",
            logged_in: false,
            is_selecting: false,
            html_data: null
        },
        methods: {
            add_item_button: self.add_item_button,
            add_item: self.add_item,
            linkSubmit: self.linkSubmit,
            toggle_select: self.toggle_select
        }

    });


    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
$("#vue-div").show();
jQuery(function(){APP = app();});
