familyPortalApp.filter('msToTimeDiff', function() {
  return function(ms, suffix) {
    ms = ms || 0;
    var out = '';
	
	var s = (ms / 1000).toFixed(0);
	var m = (ms / (1000 * 60)).toFixed(0);
	var h = (ms / (1000 * 60 * 60)).toFixed(0);
	var d = (ms / (1000 * 60 * 60 * 24)).toFixed(0);

	if (s < 60)
		out = s + " secs " + suffix;
	else if (m < 60)
		out = m + " mins " + suffix;
	else if (h < 24)
		out = h + " hrs " + suffix;
	else
		out = d + " days " + suffix;
		
    return out;
  };
});