username = "admin"
password = "jAisdhD5"
token = "secret_token"


def equals(t):
    return token == t


def auth(usern, passw):
    if usern == username and password == passw:
        return token
