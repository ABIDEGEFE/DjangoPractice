from PracticeClasses import Students

# createPythonFile = open("writeOnFiles.py", "w")

# createPythonFile.write(
#     "open_file = open('countries.txt', 'r')\n"
#     "lines = open_file.readlines()\n"
#     "for line in lines:\n"
#     "    line = line.strip()\n"
#     "    print('This is', line)\n"
# )

# createPythonFile.close()

# appendContent = open("writeOnFiles.py", "a")
# appendContent.write("\n# You have successfully appended content.")

# appendContent.close() 

class StudentInfo(Students):

    def __init__(self, fatherName, Course, name, age):
        super().__init__(name, age)
        self.fatherName = fatherName
        self.Course = Course

    def get_student_info(self):
        detail = self.get_details()
        print(detail)
        return f"Welocome, {self.name} {self.fatherName}\n You are taking {self.Course} course at age of {self.age}."
    

StudentName = input("Enter your name: ")
StudentAge = int(input("Enter your age: "))
# StudentGrade = int(input("Enter your grade: "))
FatherName = input("Enter your father's name: ")
Courese = input("Enter your course name: ")
StudentInfo1 = StudentInfo(FatherName, Courese, StudentName, StudentAge)

# StudentName = input("Enter your name: ")
# StudentAge = int(input("Enter your age: "))
# StudentGrade = int(input("Enter your grade: "))

# Student = Students(StudentName, StudentAge, StudentGrade) 
info = StudentInfo1.get_student_info()
print(info)