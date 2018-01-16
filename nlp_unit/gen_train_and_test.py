import sys
import json
from sklearn.model_selection import train_test_split
import ntpath
from io import StringIO
from file_utils import *

examples = [ ["I want to describe a validation", "MODEL_VALIDATION"],
        ["I want to describe a new model", "MODEL_TEST"],
        ["I want to describe a User validation", "MODEL_VALIDATION",[["model_name","User"]]],
        ["I want to describe a validation", "MODEL_VALIDATION"],
        ["I want to describe a validation for user model", "MODEL_VALIDATION",[["model_name","user"]]],
        ["I want to describe a method for user entity","MODEL_METHOD_TEST",[["model_name","user"]]],
        ["I want to describe a property for user model","MODEL_METHOD_TEST",[["model_name","user"]]],
        ["I want to describe service method","SERVICE_TEST"],
        ["I want to describe application functionality", "SERVICE_TEST"],
        ["I want to describe a new functionality","SERVICE_TEST"],
        ["describe a new model", "MODEL_TEST"],
        ["describe a validation", "MODEL_VALIDATION"],
        ["describe a model method", "MODEL_METHOD_TEST"],
        ["describe a model property", "MODEL_METHOD_TEST"],
        ["describe service method","SERVICE_TEST"],
        ["describe application functionality", "SERVICE_TEST"],
        ["describe a new functionality","SERVICE_TEST"],
        ["add a new model", "MODEL_TEST"],
        ["add a validation", "MODEL_VALIDATION"],
        ["add a model method", "MODEL_METHOD_TEST"],
        ["add a model property", "MODEL_METHOD_TEST"],
        ["add service method","SERVICE_TEST"],
        ["add application functionality", "SERVICE_TEST"],
        ]

def array_to_json(array,filename):
    f = open(filename, "w+")
    json.dump(array,f,indent=2)
    f.close()

if (len(sys.argv)==1):
    print("You should provide a filename to export training set")
    exit(-1)

folder,filename = ntpath.split(sys.argv[1])
if filename.find(".") > -1 :
    name, _= filename.split(".")
else:
    name = filename
train,test = train_test_split(examples, test_size=0.2, random_state=42)
print("train:{} test:{}".format(len(train), len(test)))
train_name = "{}/{}.train".format(folder,name)
test_name = "{}/{}.test".format(folder,name)
array_to_json(train,train_name)
array_to_json(test,test_name)
print("Training set has been exported in {}".format(train_name))
print("Test set has been exported in {}".format(test_name))

