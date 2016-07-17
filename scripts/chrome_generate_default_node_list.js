var output = '[';

$('#Main > div:nth-child(4) > div.cell > table > tbody > tr').each(function() {
  var catName = $(this).find('td:nth-child(1) > span').text();
  output += `{ category_name: "${catName}", nodes: [`;

  $(this).find('td:nth-child(2) > a').each(function() {
    var nodeName = $(this).text();
    var nodeSlug = $(this).attr('href').replace('/go/', '');
    output += `{"name": "${nodeName}", "slug": "${nodeSlug}"}, `;
  });

  output += ']},';
});

output += ']';

console.log(output);
