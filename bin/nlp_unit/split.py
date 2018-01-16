import shutil
import json
import codecs
from sklearn.model_selection import train_test_split


def get_rasa(data, syn):
    return {
        "rasa_nlu_data": {
            "common_examples": data,
            "regex_features": [],
            "entity_synonyms": SYN
        }
    }


with codecs.open("data/all_data.json", "r", 'utf-8-sig') as f:
    data = json.load(f)["rasa_nlu_data"]
    EX = data["common_examples"]
    SYN = data["entity_synonyms"]

train, test = train_test_split(EX, test_size=0.2, random_state=0)
print(len(train), len(test))
ftrain = "data/training_data.json"
with open(ftrain, "w+") as f:
    json.dump(get_rasa(train, SYN), f, indent=2)

ftest = "data/test_data.json"
shutil.copyfile(ftest, ftest + ".last")
with open(ftest, "w+") as f:
    json.dump(get_rasa(test, SYN), f, indent=2)
