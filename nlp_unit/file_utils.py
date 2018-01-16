import ntpath

def ensure_one_param(argv,msg):
    if len(argv) < 2:
        print("One parameter is needed.{}.format(msg)")
        exit(-1)

def ensure_two_params(argv,msg):
    if len(argv) < 3:
        print("Two params are needed.\n {}".format(msg))
        exit(-1)

def ensure_three_params(argv,msg):
    if len(argv) < 4:
        print("Three params are needed.\n {}".format(msg))
        exit(-1)


def ensure_file_exist(filename):
    if not ntpath.exists(filename):
        print("Filename '{}' does not exists".format(filename))
        exit(-1)

    if not ntpath.isfile(filename):
        print("Filename '{}' is not file".format(filename))
        exit(-1)

def ensure_dir_exist(directory):
    if not ntpath.exists(directory):
        print("Directory '{}' does not exists".format(directory))
        exit(-1)

    if not ntpath.isdir(directory):
        print("Directory name '{}' is not a directory".format(directory))
        exit(-1)

