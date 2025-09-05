open_file = open('countries.txt', 'r')
lines = open_file.readlines()
for line in lines:
    line = line.strip()
    print('This is', line)

# You have successfully appended content.