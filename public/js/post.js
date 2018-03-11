window.fbAsyncInit = function() {
  FB.init({
    appId: '189718291635703',
    cookie: true,
    xfbml: true,
    version: 'v2.12',
  });

  //   FB.AppEvents.logPageView();
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      console.log('Logged in and authenticated');
      // setElements(true);
      // testAPI();
    } else {
      console.log('not authenticated');
      // setElements(false);
      FB.login(function(response) {
        console.log(response);
        // Handle the response object, like in statusChangeCallback() in our demo
        // code.
      });
    }
    // statusChangeCallback(response);
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
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

// function setElements(isLoggedIn) {
//     if (isLoggedIn) {
//         document.getElementById('logout').style.display = 'block';
//     } else {
//         document.getElementById('logout').style.display = 'none';
//     }
// }

// do the work
function fbPostIt(postData) {
  // var pageId = "203801840389513"; // facebook page id from page info
  console.log('postIt');
  // ensure we have permissions we need
  var authResp = FB.getAuthResponse();

  // see what accounts user has access to
  FB.api(
    '/me/accounts',
    'get',
    { access_token: authResp.accessToken },
    function(response) {
      console.log(response); // this is returning an object with the accounts
      FB.api(
        '/me/permissions',
        'get',
        { access_token: pageAccessToken },
        function(resp) {
          console.log(resp);
        }
      );

      // find the page access token for the page we want to admin
      var pageAccessToken = '';
      for (var i in response.data) {
        if (response.data[i].id == postData.pageId) {
          pageAccessToken = response.data[i].access_token;
        }
      }
      // do the actual post now
      FB.api(
        '/' + postData.pageId + '/feed',
        'post',
        {
          message: postData.postText,
          access_token: pageAccessToken,
        },
        function(info) {
          console.log(info);
        }
      );
    }
  );
  {scope: 'manage_pages publish_pages';}
  // );
}
