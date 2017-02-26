module.exports = function(dataAccess, config, logger) {
	var sessionLength = 15;
	var activeUserArray = [];
	
	return {
		activeUsers: activeUserArray,
		
		login: function (user, pwd) { 
			logger.info("Begin: security.login - user:" + user);
			user = user.toLowerCase();
			
			return dataAccess.login(user, pwd).then(function(validUserData) {
				logger.info("End: security.login");
				return AddActiveUser(validUserData);
			});
		},
		
		logout: function(req, res) {
			var cookies = parseCookies(req);
			var userId = cookies.userId;
			logger.info("Begin: security.logout - userId:" + userId);
			
			if (userId !== undefined)
				RemoveActiveUser(userId);
			
			res.clearCookie('userId');
			
			logger.info("End: security.logout");
			res.redirect('/');
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
			
			logger.info("Begin: security.checkUserAccess - userId:" + userId);
			
			if (userId !== undefined)
				hasAccess = UpdateActiveUserSession(userId);
			
			logger.info("End: security.checkUserAccess - userId:" + userId + " hasAccess:" + hasAccess);
			
			return hasAccess;
		},
		
		sessionExpiredResponse: function(response) {
			response.render('login/login', { title: 'Login - Family Portal', accessDenied: true, username: '', password: '', error: 'Timeout: Session Expired'  });
		},
		
		getActiveUser: function (req) {
			logger.info("Begin: security.getActiveUser");
			
			var userId = GetUserIdCookie(req);
			var activeUser;
			
			for(var i = 0; i < activeUserArray.length; i++){
				var arrayUserId = activeUserArray[i].userId;
				
				if (arrayUserId == userId) {
					activeUser = activeUserArray[i];
					break;
				}
			}
			
			logger.info("End: security.getActiveUser");
			
			return activeUser;
		},
		
		verifyRequstCount: function(ct) {
			return ((config.api.maxRequestRecordCt < ct) ? config.api.maxRequestRecordCt : ct);
		}
	};
	
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
	
	function AddActiveUser(validUserData) {
		if (validUserData === undefined)
			return { validUserData: undefined, err: 'Error: Username or password incorrect' };
		else {
			var userAlreadyLoggedIn = false;
			
			for(var i = 0; i < activeUserArray.length; i++){
				if (activeUserArray[i].userId == validUserData._id.toString()){
					userAlreadyLoggedIn = true;
					break;
				}
			}
			
			if (userAlreadyLoggedIn){
				return { validUserData: undefined, err: 'Error: User with that username already logged in' };
			} else {		
				activeUserArray.push({ userId: validUserData._id.toString(), userName: validUserData.username, familyId: validUserData.familyId, sessionExp: newSessionExpTime() });
				return { validUserData: validUserData, err: null };
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

		if (rc !== undefined) {
			rc.split(';').forEach(function(c) {
				var parts = c.split('=');
				list[parts.shift().trim()] = decodeURI(parts.join('='));
			});
		}

		return list;
	}
};