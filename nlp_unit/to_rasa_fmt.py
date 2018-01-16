import json
import sys
from pprint import pprint
from io import StringIO
import ntpath
import os
from file_utils import *
import pdb


class Rasa(object):
    def __init__(self, json_file):
        f = open(json_file)
        self.examples = json.load(f)
        f.close()

    def get_common_examples(self):
        """
        Given a set of examples in self.examples that is a
        list of elements like <UTTERANCE,INTENT [,[[entity_name, value]]]>, ex:
            I'm looking for a Chinese restaurant, Restaurant_search, [['cousine','Chinese']]
        """
        r = []
        for test in self.examples:
            test_type = test[1]
            text = test[0]

            example_js = {}
            example_js["text"] = text
            example_js["intent"] = test_type
            example_js["entities"] = []
            if len(test) == 3:
                entities = test[2]
                processed_val = {}
                #print("entities=> {}".format(entities))
                for ent, value in entities:
                    entity = {}
                    entity["entity"] = ent
                    entity["value"] = value
                    last_pos = processed_val[
                        value] if value in processed_val else 0
                    start = text.find(value, last_pos)
                    end = start + len(value)
                    entity["start"] = start
                    entity["end"] = end
                    example_js["entities"].append(entity)
                    processed_val[value] = end
            r.append(example_js)
        return r

    def execute(self):
        rasa = {
            "rasa_nlu_data": {
                "common_examples": self.get_common_examples(),
                "regex_features": [],
                "entity_synonyms": []
            }
        }
        return rasa


if __name__ == "__main__":
    ensure_one_param(sys.argv, "Usage: to_rasa_fmt input_file")
    ensure_file_exist(sys.argv[1])

    r = Rasa(sys.argv[1])
    folder, filename = ntpath.split(sys.argv[1])
    if "." in filename:
        name, ext = filename.split(".")
    else:
        name = filename
    #io = StringIO()
    output = "{}/rasa_{}.json".format(folder, name)
    f = open(output, "w+")
    # json.dump(r.execute(),io,indent=2)
    json.dump(r.execute(), f, indent=2)
    print("processed in {}".format(output))
    f.close()
    # pprint(io.getvalue())

# print(r)
