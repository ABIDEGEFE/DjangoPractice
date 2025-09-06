from StudentInfo import StoredInfo

class Authentication(StoredInfo):
    def __init__(self, email, password):
        self.email = email
        self.password = password

    def authenticate(self):
        if (not '@' in self.email) or super().personInfo["email"] != self.email:
            return f"Invalid email format or email does not exist."
        elif len(self.password) < 8:
            return f"Password must be at least 8 characters long."
        elif super().personInfo["password"] != self.password:
            return f"Incorrect password."
        else:
            return f"yes"


def credentials():
    global userEmail
    userEmail = input("Enter your email: ")
    global userPassword
    userPassword = input("Enter your password: ")
    global auth
    auth = Authentication(userEmail, userPassword)

result = ""
count = 0
while result != "yes" and count < 3:
    credentials()
    result = auth.authenticate()
    print(result)
    count += 1

if result == "yes":
    print("you have logged in succesfully.")


            
    