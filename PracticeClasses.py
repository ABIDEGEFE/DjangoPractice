class Students:
    def __init__(self, name, age, grade=None):
        self.name = name
        self.age = age
        self.grade = grade

    def get_details(self):
        return f"Welocome, {self.name}. You are {self.age} years old and in grade {self.grade}."
    

# StudentName = input("Enter your name: ")
# StudentAge = int(input("Enter your age: "))
# StudentGrade = int(input("Enter your grade: "))

# Student = Students(StudentName, StudentAge, StudentGrade)    

# details = Student.get_details()
# print(details)