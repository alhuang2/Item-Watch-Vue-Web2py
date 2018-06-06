// This is the js for the default/index.html view.

var app = function() {
    var self = {};

    Vue.config.silent = false; // show all warnings

    var enumerate = function(v) { var k=0; return v.map(function(e) {e._idx = k++;});};

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    self.linkSubmit = function(){
        self.vue.link_submitted = true;
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

    //Takes in HTML string. 
    function processData(data){
        console.log(data);
        self.vue.html_data = data
        //$('#site-loader').contents().find('body').html(data);
        $("#site-loader").html(data);
        console.log("url: " + self.vue.url);
        var editedURL = self.vue.url.substring(7);
        var end_index = editedURL.search(".com/");
        self.vue.favicon_url = editedURL.substring(0, end_index+5);
        self.vue.favicon_url = 'https:/' + editedURL + "/favicon.ico";
        console.log("Favicon url: " + self.vue.favicon_url);
    }

    function queryHTMLdocument(htmlString, element, innerHTML, id, tag, className){
        console.log(element);
        $.post(html_string_url,
        {
            htmlString: htmlString,
            element: element,
            innerHTML: innerHTML,
            id: id,
            tag: tag,
            className: className
        },
        function(response){
            console.log("success");
        })
    }

    //TODO for @jaisal: put outerHTML (the element) into the database.
    self.toggle_select = function(){
        self.vue.is_selecting = !self.vue.is_selecting;
        if(self.vue.is_selecting){
            $("#site-loader").show();
            $("#site-loader").click(function(event) {
                self.vue.elem = (event.target).outerHTML;
                self.vue.innerHTML = (event.target).innerHTML;
                self.vue.elem_id = (event.target).id;
                self.vue.elem_tag = (event.target).localName;
                self.vue.elem_className = (event.target).className;
                console.dir(event.target);
                //debugging
                // var outerHTML = (event.target).outerHTML;
                // var innerHTML = (event.target).innerHTML;
                // var id = (event.target).id;
                // var tag = (event.target).localName;
                // var className = (event.target).className;
                // console.log("innerHTML = " +  innerHTML + '\n' + 
                //     "id: " + id + '\n' + 
                //     'tag: ' +  tag + '\n' + 
                //     'className: ' + className);
                //queryHTMLdocument(self.vue.html_data, outerHTML, innerHTML, id, tag, className);
            });
        }
        else{
            $("#site-loader").hide();
        }
    }

    self.choose_element = function (element, name) {
        self.vue.element_chosen = element;

        $.post(choose_element_url,
            {
                element:element,
                name:name
            },
            function(data) {
                console.log("element added to db");
            }

        );
    }


    self.get_items = function ()
    {
        $.getJSON(get_items_url,
            function(response) {
                self.vue.item_list = response.list_items;
                enumerate(self.vue.item_list);
                console.log(self.vue.item_list);
            }
        );
    }
    self.add_item_button = function () {
        // The button to add a track has been pressed.
        console.log(self.vue.is_adding_item);
        self.vue.is_adding_item = !self.vue.is_adding_item;
    };

    self.add_item = function () {
        // The submit button to add a track has been added.
        console.log("Favicon url in add_item " + self.vue.favicon_url);
        $.post(add_item_url,
            {
                name: self.vue.name,
                url: self.vue.url,
                elem: self.vue.elem,
                elem_tag: self.vue.elem_tag,
                elem_id: self.vue.elem_id,
                elem_innerHTML: self.vue.elem_innerHTML,
                elem_className: self.vue.elem_className,
                favicon_url: self.vue.favicon_url
            },
            function (response) {
                //$.web2py.enableElement($("#add_item_submit"));
                self.vue.item_list.unshift(response.item);
                enumerate(self.vue.item_list);
                self.vue.is_adding_item = false;
                self.name = '';
                self.url = '';
                self.get_items(); // write this method
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
            logged_in: false,
            is_selecting: false,
            link_submitted: false,
            html_data: null,
            name: "",
            url: "",
            favicon_url: '',
            elem_id: "",
            elem_className:"",
            elem_tag: "",
            elem_innerHTML: "",
            elem: "",
            item_list: []
        },
        methods: {
            add_item_button: self.add_item_button,
            add_item: self.add_item,
            linkSubmit: self.linkSubmit,
            toggle_select: self.toggle_select,
            get_items: self.get_items
        },
        mounted: function(){
            self.get_items();
        }

    });

    //self.get_items();
    self.choose_element("stuff", "stuff");
    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
$("#vue-div").show();
jQuery(function(){APP = app();});
