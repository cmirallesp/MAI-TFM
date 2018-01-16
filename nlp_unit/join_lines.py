import json
import sys
from pprint import pprint
from io import StringIO
import ntpath
import os
from file_utils import *
import pdb


class MDMultiline(object):

    def __init__(self, json_file):
        f = open(json_file)
        self.lines = f.readlines()
        f.close()

    def join_lines(self):
        def add_prev(r, prev):
            if prev.startswith("-"):
                prev = prev.replace("\n", "\\n") + "\n"
            r.append(prev)
            return r
        r = []
        prev = ''
        for line in self.lines:
            if line.startswith("##"):
                add_prev(r, prev)
                prev = line
            elif line.startswith("<!-"):
                pass
            elif not line.startswith("-") and prev.startswith("-"):
                prev += line
            else:
                add_prev(r, prev)
                prev = line

        r = add_prev(r, prev)

        return r

if __name__ == "__main__":
    ensure_one_param(sys.argv, "Usage: process_md input_file")
    ensure_file_exist(sys.argv[1])

    r = MDMultiline(sys.argv[1])
    folder, filename = ntpath.split(sys.argv[1])
    name, ext = filename.split(".")
    # io = StringIO()
    f = open("{}/rasa_{}.md".format(folder, name), "w+")
    f.writelines(r.join_lines())
    f.close()
    # pprint(io.getvalue())

# print(r)
