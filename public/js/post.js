window.fbAsyncInit = function() {
  FB.init({
    appId: "189718291635703",
    cookie: true,
    xfbml: true,
    version: "v2.12"
  });

  //   FB.AppEvents.logPageView();
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

function statusChangeCallback(response) {
  if (response.status === "connected") {
    console.log("Logged in and authenticated");
    // setElements(true);
    testAPI();
  } else {
    console.log("not authenticated");
    // setElements(false);
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function testAPI() {
  FB.api("/me?accounts", function(response) {
    if (response && !response.error) {
      console.log(response);
      // buildProfile(response);
    }
  });
}

// function buildProfile(user) {
//     let profile = `
//     <h3>${user.name}</h3>
//     <ul>
//         <li>User ID: ${user.id}</li>
//         <li>User Birthday: ${user.birthday}</li>
//         <li>User Email: ${user.email}</li>
//         <li>User Location: ${user.location.name}</li>
//     </ul>`;
//     document.getElementById('profile').innerHTML = profile;
// }

// function setElements(isLoggedIn) {
//     if (isLoggedIn) {
//         document.getElementById('logout').style.display = 'block';
//         document.getElementById('profile').style.display = 'block';
//         document.getElementById('fb-btn').style.display = 'none';
//         document.getElementById('heading').style.display = 'none';
//     } else {
//         document.getElementById('logout').style.display = 'none';
//         document.getElementById('profile').style.display = 'none';
//         document.getElementById('fb-btn').style.display = 'block';
//         document.getElementById('heading').style.display = 'block';
//     }
// }

function logout() {
  FB.logout(function(response) {
    // setElements(false);
  });
}

//add event listener to login button
// document.getElementById('loginBtn').addEventListener('click', function() {
// 	//do the login
// 	FB.login(function(response) {
// 		if (response.authResponse) {
// 			//user just authorized your app
// 			document.getElementById('loginBtn').style.display = 'none';
// 			// getUserData();
// 		}
// 	}, {scope: 'mangage_pages publish_actions', return_scopes: true});
// }, false);

// do the work
function fbPostIt() {
  var pageId = "203801840389513"; // facebook page id from page info

  // ensure we have permissions we need
  FB.login(
    function() {
      // used to get user accessToken
      var authResp = FB.getAuthResponse();

      // see what accounts user has access to
      FB.api(
        "/me/accounts",
        "get",
        { access_token: authResp.accessToken },
        function(response) {
          console.log(response); // this is returning an object with the accounts
          FB.api(
            "/me/permissions",
            "get",
            { access_token: pageAccessToken },
            function(resp) {
              console.log(resp);
            }
          );
          /**
           * permissions listed are "manage_pages", "publish_actions" and "public_profile"
           * all marked as "status : granted"
           */

          // find the page access token for the page we want to admin
          var pageAccessToken = "";
          for (i in response.data) {
            if (response.data[i].id == pageId) {
              pageAccessToken = response.data[i].access_token;
              // console.log("here");
              // do the actual post now
            }
        }
//================= post ==========================
            // FB.api(
            // "/" + pageId + "/feed",
            // "post",
            // {
            //     message: "Hello",
            //     access_token: pageAccessToken
            // },
            // function(info) {
            //     console.log(info);
            //     /**
            //      * code    : 200
            //      * message : "(#200) The user hasn't authorized the application to perform this action"
            //      * type    : "OAuthException"
            //      */
            // }
            // );
        }
      );
    },
    { scope: "manage_pages publish_pages" }
  );
}
