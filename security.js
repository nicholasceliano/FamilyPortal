module.exports = function(data) {
	var sessionLength = 15;
	var activeUserArray = [];
	
	return {
		activeUsers: activeUserArray,
		
		login: function (user, pwd) { 
			user = user.toLowerCase();
			
			return data.login(user, pwd).then(function(validUser) {
				if (validUser)
					AddActiveUser(user);
				
				return validUser;
			});
		},
		
		logout: function(request) {
			var cookies = parseCookies(request);
			var user = cookies.user
			
			if (user !== undefined)
				RemoveActiveUser(user);
		},
		
		removeInactiveUsers: function() {
			for(var i = 0; i < activeUserArray.length; i++) {
				if (activeUserArray[i].sessionExp < new Date())
					activeUserArray.splice(i, 1);
			}
		},
		
		checkUserAccess: function (request) {
			var cookies = parseCookies(request);
			var user = cookies.user
			var hasAccess = false;
			
			if (user !== undefined)
				hasAccess = UpdateUserSession(user);
			
			return hasAccess;
		},
		
		sessionExpiredResponse: function(response) {
			response.render('login/login', { title: 'Login - Family Portal', accessDenied: true, username: '', password: '', error: 'Timeout: Session Expired'  });
		}		
	}
	
	function AddActiveUser(user) {
		user = user.toLowerCase();
		
		if (activeUserArray.length === 0) {
			activeUserArray.push({ username: user, sessionExp: newSessionExpTime() });
		} else {		
			for(var i = 0; i < activeUserArray.length; i++){
				if (activeUserArray[i].toLowerCase() != user)
					activeUserArray.push({ username: user, sessionExp: newSessionExpTime() });
			}
		}
	}
	
	function RemoveActiveUser(user) {
		var index = -1;
		user = user.toLowerCase();
		
		for(var i = 0; i < activeUserArray.length; i++){
			var username = activeUserArray[i].username;
			
			if (username == user) {
				index = i;
				break;
			}
		}
		
		if (index > -1)
			activeUserArray.splice(index, 1);
	}
	
	function UpdateUserSession(user) {
		var validUser = false;
		user = user.toLowerCase();
		
		for(var i = 0; i < activeUserArray.length; i++){
			var username = activeUserArray[i].username;
			
			if (username == user) {
				activeUserArray[i].sessionExp = newSessionExpTime();
				validUser = true;
				break;
			}
		}
		
		return validUser;
	}
	
	function newSessionExpTime() {
		return new Date(new Date().getTime() + sessionLength*60000);
	}
	
	function parseCookies (request) {
		var list = {},
			rc = request.headers.cookie;

		rc && rc.split(';').forEach(function( cookie ) {
			var parts = cookie.split('=');
			list[parts.shift().trim()] = decodeURI(parts.join('='));
		});

		return list;
	}
};