$('input[name="cities"]').typeahead({
	fitToElement: true,
	matcher: function(item) {
		return true;
	},
	highlighter: function(item) {

		console.log(item);

		var index1Title = item.indexOf('<span>')+6;

		var index2Title = item.indexOf('</span>');

		var part1 = item.slice(0, index1Title);

		var title = item.slice(index1Title, index2Title);

		var part2 = item.slice(index2Title);

		var index1 = title.toUpperCase().indexOf(this.query.toUpperCase());
		var index2 = index1 + this.query.length;

		var titleHighligh = title.slice(0, index1)+'<strong style="color: #2ecc71;">'+title.slice(index1, index2)+'</strong>'+title.slice(index2);

		// console.log(titleHighligh);
		// console.log(part1+title.slice(0, index1)+'<strong style="color: #2ecc71;">'+title.slice(index1, index2)+'</strong>'+title.slice(index2)+part2);
		// console.log(item);
		// console.log(part1);
		// console.log(index1Title);
		// console.log(title);
		// console.log(index1Title);
		// console.log(part2);

		return part1+titleHighligh+part2;
	},
	source: function(q, cb) {

		$.ajax({
			methode: 'GET',
			dataType: 'json',
			url: 'http://www.omdbapi.com/?s='+q,
			success: function(data) {

				// console.log(data);

				if ( data.Response != "False" ) {
					cb(data.Search);
				} else {
					cb([]);
				}
			},
			error: function(data) {
				cb([]);
			}
		});
	},
	displayText: function(item) {
		var html = 
			'<div class="row" style="border-bottom: 1px solid black;">'+
				'<div style="float: left;">Title : '+
					'<span>'+item.Title+'</span><br/>'+
					'Type : '+item.Type+'<br/>'+
					'Year : '+item.Year+'<br/>'+
				'</div>'+
				'<div style="float: right;">'+
					'<img src="'+item.Poster+'" style="height: 50px;">'+
				'</div>'+
			'</div>'
		;


		return html;
	},
	afterSelect: function(item) {

		$('input[name="cities"]').val(item.Title);

		document.location.href="http://www.imdb.com/title/"+item.imdbID;
	}
});