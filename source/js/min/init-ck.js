!function(e){function t(){$(".donate-range").change(function(){var e=$(this).val();a(e),n(e)}),setTimeout(function(){a($(".donate-range").val())},50)}function a(e){$(".ui-slider-handle").html("$"+e)}function n(e){s.html(2>e?"Every dollar counts. 96% of every dollar goes to services to feed the hungry.":e>=2&&10>e?"By donating this amount, you can feed a child for one week":e>=10&&25>e?"By donating this amount, you can feed a family of 4 for a week":e>=25&&50>e?"By donating this amount, you can feed a family of 4 for a month":e>=50&&100>e?"This donation level helps 25 people eat for a week.":e>=100&&250>e?"This donation level allows us to feed 50 people.":e>=250?'Thank you for your generosity. If you\'d like to consider becoming a <a href="/about/sponsors">sponsor</a>, please <a href="/contact">contact us</a>':"Every dollar counts. 96% of every dollar goes to services to feed the hungry.")}var o=document.body.clientWidth,i=document.body.clientHeight;$(e).resize(function(){o=document.body.clientWidth,i=document.body.clientHeight}),$(".nav-toggle-menu").click(function(e){return e.preventDefault(),$(this).toggleClass("active"),$(".nav").toggleClass("active"),!1}),$(".nav-toggle-search").click(function(e){e.preventDefault(),$(this).toggleClass("active"),$(".header .search-form").toggleClass("active")}),$("body").on("click",function(){$(".nav-subnav-link, .nav-subnav").removeClass("active")}),$(".nav-subnav-link").on("click",function(e){var t=$(this),a=t.next(".nav-subnav");e.stopPropagation(),t.hasClass("active")?(a.removeClass("active"),t.removeClass("active")):(t.addClass("active"),a.addClass("active"))}),$(".donate-step").not("#donate-step-1").hide(),$(".donate-range").slider({create:t(),highlight:!0});var s=$(".donate-slider-message");$("#donate-step-2-link").on("click",function(e){e.preventDefault(),$("#donate-step-1").hide(),$("#donate-step-1").show()}),$(".donate-form").submit(function(e){e.preventDefault(),$(".donate-range").val(400).slider("refresh")}),$(".acc-handle a").on("click",function(){return window.matchMedia("(max-width: 46.8em)").matches?($(this).parent().toggleClass("active"),$(this).parent().next(".acc-panel").toggleClass("active"),!1):void 0}),$(".acc-handle").on("click",function(){return window.matchMedia("(max-width: 46.8em)").matches?($(this).toggleClass("active"),$(this).next(".acc-panel").toggleClass("active"),!1):void 0})}(this);