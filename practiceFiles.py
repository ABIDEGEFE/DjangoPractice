createPythonFile = open("writeOnFiles.py", "w")

createPythonFile.write(
    "open_file = open('countries.txt', 'r')\n"
    "lines = open_file.readlines()\n"
    "for line in lines:\n"
    "    line = line.strip()\n"
    "    print('This is', line)\n"
)

createPythonFile.close()

appendContent = open("writeOnFiles.py", "a")
appendContent.write("\n# You have successfully appended content.")

appendContent.close() 