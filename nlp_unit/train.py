from rasa_nlu.converters import load_data
from rasa_nlu.config import RasaNLUConfig
from rasa_nlu.model import Trainer
import sys
from file_utils import *

ensure_two_params(sys.argv, "Usage: train.py train_data rasa_config")
ensure_file_exist(sys.argv[1])
train_fname = sys.argv[1]
config_fname = sys.argv[2]
training_data = load_data(train_fname)
trainer = Trainer(RasaNLUConfig(config_fname))
trainer.train(training_data)
# Returns the directory the model is stored in
model_directory = trainer.persist('./projects/')
exit(model_directory)

# provde two examples minimum of each kind of pattern (eg. att name with
# two words)
