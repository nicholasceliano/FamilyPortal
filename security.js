module.exports = function(dataAccess, config) {
	var sessionLength = 15;
	var activeUserArray = [];
	
	return {
		activeUsers: activeUserArray,
		
		login: function (user, pwd) { 
			user = user.toLowerCase();
			
			return dataAccess.login(user, pwd).then(function(validUserData) {
				var userId = validUserData._id.toString();
				var familyId = validUserData.familyId;
				
				if (validUserData !== undefined)
					AddActiveUser(userId, familyId);
				
				return userId;
			});
		},
		
		logout: function(request) {
			var cookies = parseCookies(request);
			var userId = cookies.userId
			
			if (userId !== undefined)
				RemoveActiveUser(userId);
		},
		
		removeInactiveUsers: function() {
			for(var i = 0; i < activeUserArray.length; i++) {
				if (activeUserArray[i].sessionExp < new Date())
					activeUserArray.splice(i, 1);
			}
		},
		
		checkUserAccess: function (request) {
			var cookies = parseCookies(request);
			var userId = cookies.userId;
			var hasAccess = false;
			
			if (userId !== undefined)
				hasAccess = UpdateActiveUserSession(userId);
			
			return hasAccess;
		},
		
		sessionExpiredResponse: function(response) {
			response.render('login/login', { title: 'Login - Family Portal', accessDenied: true, username: '', password: '', error: 'Timeout: Session Expired'  });
		},
		
		getActiveUser: function (req) {
			var userId = GetUserIdCookie(req);
			var activeUser;
			
			for(var i = 0; i < activeUserArray.length; i++){
				var arrayUserId = activeUserArray[i].userId;
				
				if (arrayUserId == userId) {
					activeUser = activeUserArray[i];
					break;
				}
			}			
			return activeUser;
		},
		
		verifyRequstCount: function(ct) {
			return ((config.api.maxRequestRecordCt < ct) ? config.api.maxRequestRecordCt : ct);
		}
	}
	
	function GetUserIdCookie(request) {
		var cookies = parseCookies(request);
		return cookies.userId;
	}
	
	function GetActiveUser(userId) {
		var activeUser;
		
		for(var i = 0; i < activeUserArray.length; i++){
			var arrayUserId = activeUserArray[i].userId;
			
			if (arrayUserId == userId) {
				activeUser = activeUserArray[i];
				break;
			}
		}
		
		return activeUser;
	}
	
	function AddActiveUser(userId, familyId) {
		if (activeUserArray.length === 0) {
			activeUserArray.push({ userId: userId, familyId: familyId, sessionExp: newSessionExpTime() });
		} else {		
			for(var i = 0; i < activeUserArray.length; i++){
				if (activeUserArray[i] != userId)
					activeUserArray.push({ userId: userId, familyId: familyId, sessionExp: newSessionExpTime() });
			}
		}
	}
	
	function RemoveActiveUser(userId) {
		var index = -1;
		
		for(var i = 0; i < activeUserArray.length; i++){
			var arrayUserId = activeUserArray[i].userId;
			
			if (arrayUserId == userId) {
				index = i;
				break;
			}
		}
		
		if (index > -1)
			activeUserArray.splice(index, 1);
	}
	
	function UpdateActiveUserSession(userId) {
		var validUser = false;
		
		for(var i = 0; i < activeUserArray.length; i++){
			var arrayUserId = activeUserArray[i].userId;
			
			if (arrayUserId == userId) {
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