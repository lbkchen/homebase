import requests


def homepage():
    text = '<a href="%s">Authenticate with reddit</a>'
    return text % make_authorization_url()


def login_and_save_session(session):
    url = make_authorization_url()


def make_authorization_url():
    # Generate a random string for the state parameter
    # Save it for use later to prevent xsrf attacks
    from uuid import uuid4
    state = str(uuid4())
    # save_created_state(state)
    params = {"client_id": CLIENT_ID,
              "response_type": "code",
              "state": state,
              "redirect_uri": REDIRECT_URI,
              "duration": "temporary",
              "scope": "identity"}
    import urllib
    url = "https://ssl.reddit.com/api/v1/authorize?" + urllib.urlencode(params)
    return url
