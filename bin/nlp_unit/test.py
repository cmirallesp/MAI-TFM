import sys
import json
import codecs
from rasa_nlu.config import RasaNLUConfig
from rasa_nlu.model import Interpreter
from file_utils import ensure_three_params, ensure_file_exist, ensure_dir_exist
import pdb
from pprint import pprint
PRINT_ENTITIES = False
OKGREEN = '\033[92m'
FAIL = '\033[91m'
ENDC = '\033[0m'


def find_entity(ent, lst):
    l, v, s, e = ent["entity"], ent["value"], ent["start"], ent["end"]
    for x in lst:
        l2, v2, s2, e2 = x["entity"], x["value"], x["start"], x["end"]
        if [l, v, s, e] == [l2, v2, s2, e2]:
            return True
    # print("times=>", times)
    return False


def printok(*text):
    return
    print(OKGREEN, text, ENDC)


def printko(*text):
    print(FAIL, text, ENDC)


def add_label_to_couters(label):
    if label not in ENC_COUNTERS:
        ENC_COUNTERS[label] = {
            "OK": 0,
            "WR": 0,
            "MI": 0,
            "PCT_WR": 0,
            "PCT_MI": 0
        }


def get_entities(ent):
    return ent["entity"], ent["value"], ent["start"], ent["end"]


def create_error(errors, text, start, end, LBL):
    k = "{}%{}%{}".format(text, start, end)
    if k not in errors:
        errors[k] = ["", "", LBL]
    return k


def parts_from_key(k):
    return k.split("%")


ENC_COUNTERS = {}
ensure_three_params(
    sys.argv, "Usage: train.py test_file rasa_configuration MODEL_DIRECTORY")
TEST_FNAME, CONFIG_FNAME, MODEL_DIRECTORY = sys.argv[1:]
ensure_file_exist(TEST_FNAME)
ensure_file_exist(CONFIG_FNAME)
ensure_dir_exist(MODEL_DIRECTORY)
# where `MODEL_DIRECTORY points to the folder the model is persisted in
CFG = RasaNLUConfig(CONFIG_FNAME)
IS_MITIE = "nlp_mitie" in CFG["pipeline"]
IS_SPACY = "nlp_spacy" in CFG["pipeline"]
assert (IS_MITIE != IS_SPACY) and (IS_SPACY or IS_MITIE)
NLP_TYPE = "SPACY" if IS_SPACY else "MITIE"

INTERPRETER = Interpreter.load(MODEL_DIRECTORY, CFG)
with codecs.open(TEST_FNAME, "r", 'utf-8-sig') as f:
    TEST_SET = json.load(f)["rasa_nlu_data"]["common_examples"]

OK = KO = 0

OK_ENT = WR_ENT = MI_ENT = TOTAL = 0
print("pipeline=>", INTERPRETER.pipeline)
for i, el in enumerate(TEST_SET):
    errors = {}
    # el = ["describe a method for car test", "MODEL_METHOD_THEST,
    # [['model_name',car]]]
    error = False
    text, label = el["text"], el["intent"]
    entities = el["entities"]
    TOTAL += len(entities)
    # parse
    R = INTERPRETER.parse(text)
    predicted = R['intent']['name']
    predicted_entities = R["entities"]
    if PRINT_ENTITIES:
        pe = [[e["entity"], e["value"]] for e in R["entities"]]
        print(text)
        pprint(pe)

    # count label prediction
    if label == predicted:
        OK += 1
    else:
        KO += 1
        error = True
        print("\t[L] Act: {} => Pred: {}".format(label, predicted))
    LBL = label
    # label/value in the test set but not predicted (miss prediction)
    for entity in entities:
        label, value, start, end = get_entities(entity)
        add_label_to_couters(label)

        if find_entity(entity, R["entities"]):
            ENC_COUNTERS[label]["OK"] += 1
            OK_ENT += 1
        else:
            error = True
            k = create_error(errors, value, start, end, LBL)
            errors[k][0] = label
            # print("\t[M] {} => {} (s:{}, e:{})".format(label, value, start,
            #                                           end))
            MI_ENT += 1
            ENC_COUNTERS[label]["MI"] += 1

    # label/value predicted but not in the test (MI)
    for predicted_e in predicted_entities:
        label, value, start, end = get_entities(predicted_e)
        if label in ['then', 'given', 'when', 'and']:
            continue
        add_label_to_couters(label)
        # if predicted_e not in entities:
        if not find_entity(predicted_e, entities):
            error = True
            k = create_error(errors, value, start, end, LBL)
            errors[k][1] = label
            # print("\t[W] {} => {} (s:{}, e:{})".format(label, value, start,
            # end))
            WR_ENT += 1
            ENC_COUNTERS[label]["WR"] += 1
        # elif LBL == "SERVICE_TEST":
        # print("\t[OK] {} => {} (s:{}, e:{})".format(
        # label, value, start, end))
    if not error:
        printok("[√]: ", text)

    else:
        printko("[X]: ", text)
        for k in errors:
            l, s, e = parts_from_key(k)
            print("\t[{}] {} (s:{}, e:{}) => M: {}  vs W: {}".format(
                errors[k][2], l, s, e, errors[k][0], errors[k][1]))
print("==============================================================")
ACC = round(100. * OK_ENT / TOTAL, 2)
PCT_MI = round(100. * MI_ENT / TOTAL, 2)
PCT_WR = round(100. * WR_ENT / TOTAL, 2)
F1 = 2 * (MI_ENT * WR_ENT) / (MI_ENT + WR_ENT)
print(
    "Entity identification> TOTAL: {} OK: {} WR: {} ({} %) MI: {} ({} %) ACC: {} F1: {}".
    format(TOTAL, OK_ENT, WR_ENT, PCT_WR, MI_ENT, PCT_MI, ACC, F1))

PCT_ACC = 1. * OK / (OK + KO)
R = "Intent classification> TOTAL: {}, OK:{}, KO:{}, accuracy: {}".format(
    OK + KO, OK, KO, PCT_ACC)
print(R)

for k in ENC_COUNTERS:
    OK = ENC_COUNTERS[k]["OK"]
    WR = ENC_COUNTERS[k]["WR"]
    MI = ENC_COUNTERS[k]["MI"]
    ENC_COUNTERS[k]["PCT_WR"] = 0 if OK == 0 else round(1. * WR / (OK + WR), 2)
    ENC_COUNTERS[k]["PCT_MI"] = 0 if OK == 0 else round(1. * MI / (OK + MI), 2)

KEYS = ENC_COUNTERS.keys()
epsilon = 1e-10
print("| ALG  | K    | TOT  | OK   | WR   | PCT_WR | MI   | PCT_MI | F |")
print("| :--: | :--: | :--: | :--: | :--: | :----: | :--: | :----: |:----: |")
for k in ENC_COUNTERS:
    el = ENC_COUNTERS[k]
    F = round(2 * (el["WR"] * el["MI"]) / (el["WR"] + el["MI"] + epsilon), 2)
    print("| {} | {} |  {} | {} | {} | {} | {} | {} | {} | ".format(
        NLP_TYPE, k, el["OK"] + el["MI"], el["OK"], el["WR"], el["PCT_WR"],
        el["MI"], el["PCT_MI"], F))
exit(1)
