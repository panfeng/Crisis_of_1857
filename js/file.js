var src_list = './src_list.html';
var src_content = './src_content.html';
var e_arr = [];
var div_page;



// format number with leading 0, 1 => 0001
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}


// add img file to img_list[];
var dir = "./img/e/";
var fileextension = ".jpg";
var img_list = [];
$.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: dir,
    success: function (data) {
        $(data).find("a:contains(" + fileextension + ")").each(function () {
            img_list.push(this.text);
        });
    }
});


// $(document).ready(function() {
    $.get(src_list, function(data) {
        var fileDom = $(data);
		// $('#src_list').append(fileDom);
		var div_text = fileDom.find("div");

	    for (var i = div_text.length - 1; i >= 0; i--) {
		    	// e_arr[i+1] = $(div_text[i]).text().trim();
		    	e_arr[i] = $(div_text[i]).text().replace(/\[\d*\]/, "").trim();
	    		    };
    });

    $.get(src_content, function(data) {
	    // var fileDom = $(data).contents();
	    var fileDom = $(data);

	   $(window).scroll(function() {
		    var height = $(window).scrollTop();
		   	var page_onScreen = $("page:onScreen");
		   	var a_onScreen = $("a:onScreen");
			var href_onScreen = [];
			var href_onScreen_num = [];

		   	for (var i = 0; i < a_onScreen.length; i++) {
		   		// /\[\d*\]/
		   		// var matched = $(a_onScreen[i]).attr("href").match(/#_ftn[0-9]*/);
		   		var href_string = $(a_onScreen[i]).attr("href");
		   		var regex = /#_ftn[0-9]*/;
		   		var matched = regex.exec(href_string);

				if (typeof matched !== 'undefined' && matched !== null ) {
			   			href_onScreen[i] = matched[0];
			   			var tmp =  parseInt(href_onScreen[i].replace(/#_ftn/,''));
			   			href_onScreen_num.push(tmp);

			   			// var tmp = href_onScreen[i].replace(/#_ftn/,'');
			   			// console.log(tmp);
						// $("#src_list").append("<tr><td>"+ (tmp) +"</td><td>" + e_arr[tmp] + "</td></tr>");
						// $("#src_list").append("<tr><td>"+ (tmp) +"</td></tr>");
					}
			// console.log(href_onScreen_num);

		   	};

		   	if(href_onScreen_num.length !== 0){
		   		var max = Math.max.apply(Math, href_onScreen_num);
		   		var min = Math.min.apply(Math, href_onScreen_num);
		   		// $("#src_list").html('');

	   			for (var i = min; i < max; i++) {
					var dir = "./img/e/";
					var img_name = pad(i,4) + ".jpg";
		   			// var tr_td = tr_td + "<tr><td>"+ (i) +"</td><td><a href='" + file_dir + "'>" + e_arr[i] + "</a></td></tr>";
		   			// console.log(img_name);
		   			if(img_list.indexOf(img_name) > -1){
			   			var file_dir = dir + img_name;
			   			var tr_td = tr_td + "<tr><td>"+ (i) +"</td><td><a href='" + file_dir + "'>" + e_arr[i] + "</a></td></tr>";
		   			}else{
			   			var tr_td = tr_td + "<tr><td>"+ (i) +"</td><td>" + e_arr[i] + "</td></tr>";
		   			}

					// $("#src_list").html("<tr><td>"+ (i) +"</td><td>" + e_arr[i] + "</td></tr>");
	   			};
					$("#src_list").html(tr_td);


		   	}



		    if(height == 0){
		    	$(".navbar-inner").show();
		    	$("#pager").hide();


		    }else{
		    	$(".navbar-inner").hide();
		    	$("#pager").show();
		    	$("#pager").css('position', 'fixed');
		    	$("#pager").css('top', 0);

		    	$(".span4").css('position', 'fixed');
		    	$("span4").css('top', 0);

		    	if(page_onScreen.attr("num")){
			    	$("#page_num").attr("placeholder",page_onScreen.attr("num")[0]);
		    	}

		    }
			   // console.log(a_onScreen);
	   });
 

		// $('#src_content').append(fileDom.find("page")[1]);

		$( "#src_content" ).load( "./src_content.html" );

    });
// });
// <hr style="border-top: solid 1px #3E1485;">

