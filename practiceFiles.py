open_file = open("countries.txt", "r")
lines = open_file.readlines()
open_file = open("countries.txt", "w")


for line in lines:
    line = line.strip()
    if "Canada" not in line and "Kenya" not in line:
        open_file.write(line+"\n")
open_file.close()
