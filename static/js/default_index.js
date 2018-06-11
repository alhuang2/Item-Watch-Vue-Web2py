// This is the js for the default/index.html view.

var app = function() {
    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
          && 
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000, function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              };
            });
          }
        }
      });

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
                console.log("Success");
                processData(data);
            },
            error: function(data) {
                console.log("Errored" + data);
                processData(data);
            }
        });
    }

    //Takes in HTML string.
    function processData(data){
        // console.log(data);
        self.vue.html_data = data
        //$('#site-loader').contents().find('body').html(data);
        $("#site-loader").html(data);
        $('#site-loader').find('input, textarea, button, select').attr('disabled','true');
        $("#site-loader").find("a").addClass("disablehyper").click(function (e) {                
            e.preventDefault();
        });
        var url = self.parseURI(self.vue.url);
        self.vue.favicon_url = url + '/favicon.ico';
        // console.log("url: " + self.vue.url);
        // var editedURL = self.vue.url.substring(8);
        // console.log("editedURL: " + editedURL);
        // var end_index = editedURL.search(".com/");
        // console.log(end_index);
        // var favicon = self.parseURI(self.vue.url);

        // console.log("favicon: ", favicon);
        // self.vue.favicon_url = editedURL.substring(0, end_index+5);
        // console.log("Substring: " + self.vue.favicon_url);
        // self.vue.favicon_url = 'https://' + self.vue.favicon_url + "favicon.ico";
        // console.log("Favicon url: " + self.vue.favicon_url);
        $("#site-loader").click(function(event) {
                self.vue.elem = (event.target).outerHTML;
                self.vue.innerHTML = (event.target).innerHTML;
                self.vue.elem_id = (event.target).id;
                self.vue.elem_tag = (event.target).localName;
                self.vue.elem_className = (event.target).className;
                console.dir(event.target);
                /* $("#site-loader").hover(function(){
                   $('self.vue.elem_id').css({'color': 'yellow', 'background-color': 'black'});
                }); */
            });
        $('#site-loader').show();
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



    self.parseURI = function (url)
    {

        // var uri = new URI(url);
        // console.log(uri);
        var parser = document.createElement('a');
        // parser.href = self.vue.url;
        parser.href = url;

        console.log(parser.href);
        console.log(parser.protocol);
        console.log(parser.hostname);
        // console.log(parser.port);
        console.log(parser.pathname);
        // console.log(parser.hash);
        console.log(parser.host);


        if(parser.protocol == '') {
            return parser.hostname;
        }

        var string = parser.protocol +'//' + parser.hostname;
        return string;


    }
    self.toggle_select = function(){
        self.vue.is_selecting = !self.vue.is_selecting;
        if(self.vue.is_selecting){
            $("#site-loader").show();
            /* $("#site-loader").click(function(e){
                e.preventDefault();
                return false;
            }); */
            $("#site-loader").click(function(event) {
                /*
                   First attempt at preventing redirecting on pressing a link
                   Should prevent default action the uploading link (i.e. pressable
                   link in page shouldn't redirect)
                */
                event.preventDefault();
                /*
                    Second attempt at preventing redirecting on pressing a link
                */
                // event.stopImmediatePropagation();

                self.vue.elem = (event.target).outerHTML;
                self.vue.innerHTML = (event.target).innerHTML;
                self.vue.elem_id = (event.target).id;
                self.vue.elem_tag = (event.target).localName;
                self.vue.elem_className = (event.target).className;
                console.dir(event.target);
                
                // Third attempt at preventing redirecting on pressing a link
                /* document.getElementById('elem').contentWindow.document.body.onclick = function () {
                    return false;
                }; */
                // (event.target).preventDefault();
            });
            // First attempt on getting element boxed upon hovering
            $("#site-loader").hover(function(event){
                var $tgt = (event.target);
                if(!tgt.closest('.syntax_hilite').length){
                    ($tgt).toggleClass(event.type == 'click' ? 'outline-element-clicked' : 'outline-element');
                }
                /*
                   Second attempt on getting element boxed upon hovering
                   Comment out code from declaration of var $tgt to end of if statement
                */
                /* $(".mouseover-box").removeClass("mouseover-box");
                $(event.target).addClass("mouseover-box");
                return false;
            }).mouseleave(function(event){
                $(event.target).removeClass("mouseover-box"); */
            });

            /* CSS for above code is in myapp.css */

            /* reference code for boxing an element on hovering:

            JS:

            $(document).ready(function() {
                $('.entrytext').bind('mouseover mouseout click', function(event) {
                    var $tgt = $(event.target);
                    if (!$tgt.closest('.syntax_hilite').length) {
                        $tgt.toggleClass(event.type == 'click' ? 'outline-element-clicked' : 'outline-element');
                    }
                });
            });

            CSS:

            .outlineElement {
                outline: 1px solid #c00;
            }

            .outlineElementClicked {
                outline: 1px solid #0c0;
            }

            */
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
        var url = self.parseURI(self.vue.url);
        self.vue.favicon_url = url + '/favicon.ico';
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
                self.vue.name = '';
                self.vue.url = '';
                self.get_items(); // write this method
            });
            $('#site-loader').hide();
    };

    self.refresh_one = function(idx){
        $.ajax({
            type: 'GET',
            url: self.vue.item_list[idx].url,
            processData: true,
            data: {},
            dataType: "html",
            crossDomain: true,
            success: function (data) {
                console.log(data);
                console.log(self.vue.item_list[idx].tracking_elem);
                $.post(check_item_url,
                {
                    tag: self.vue.item_list[idx].tag,
                    elem_id: self.vue.item_list[idx].elem_id,
                    innerHTML: self.vue.item_list[idx].innerHTML,
                    id: self.vue.item_list[idx].id,
                    tracking_elem: self.vue.item_list[idx].tracking_elem,
                    htmlString: data,
                    url: self.vue.item_list[idx].url
                },
                function(response){
                    console.log(response);
                    self.vue.item_list[idx].in_stock = response
                })
            }
        });
    }

    self.refresh_all = function(){
        for(var i=0; i<self.vue.item_list.length; i++){
            self.refresh_one(i);
        }
    }

    self.delete_item = function(id) {
        console.log("the db id is : " + id);
        $.post(delete_item_url,
            {
                id: id
            },
            function(data) {
                console.log(data);
            }
        );

        self.get_items();
      }


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
            get_items: self.get_items,
            refresh_one: self.refresh_one,
            refresh_all: self.refresh_all,
            delete_item: self.delete_item
        },
        mounted: function(){
            self.get_items();
        }

    });

    //self.get_items();
    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
$("#vue-div").show();
jQuery(function(){APP = app();});
